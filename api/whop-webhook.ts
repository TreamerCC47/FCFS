import { createHmac, timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

type HeaderValue = string | string[] | undefined;

type ApiRequest = {
  method?: string;
  headers?: Record<string, HeaderValue>;
  on: (
    event: 'data' | 'end' | 'error',
    listener: (...args: any[]) => void,
  ) => void;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
};

type JsonRecord = Record<string, unknown>;

export const config = {
  api: {
    bodyParser: false,
  },
};

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null;
}

function getHeader(
  headers: Record<string, HeaderValue> | undefined,
  name: string,
): string {
  const value = headers?.[name] ?? headers?.[name.toLowerCase()];

  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

function readRawBody(request: ApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk: Buffer | string) => {
      body += chunk.toString();
    });

    request.on('end', () => resolve(body));
    request.on('error', (error: unknown) => reject(error));
  });
}

function hasValidSignature(
  rawBody: string,
  headers: Record<string, HeaderValue> | undefined,
  secret: string,
): boolean {
  const webhookId = getHeader(headers, 'webhook-id');
  const webhookTimestamp = getHeader(headers, 'webhook-timestamp');
  const webhookSignature = getHeader(headers, 'webhook-signature');

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return false;
  }

  const timestamp = Number(webhookTimestamp);

  if (!Number.isFinite(timestamp)) {
    return false;
  }

  const ageInSeconds = Math.abs(Date.now() / 1000 - timestamp);

  if (ageInSeconds >  fiveMinutesInSeconds) {
    return false;
  }

  const signedPayload = `${webhookId}.${webhookTimestamp}.${rawBody}`;

  // Use the Whop secret exactly as provided. Do not remove the ws_ prefix.
  const expectedSignature = createHmac('sha256', secret)
    .update(signedPayload)
    .digest('base64');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  return webhookSignature.split(/\s+/).some((candidate) => {
    const [version, signature] = candidate.split(',', 2);

    if (version !== 'v1' || !signature) {
      return false;
    }

    const receivedBuffer = Buffer.from(signature, 'utf8');

    return (
      receivedBuffer.length === expectedBuffer.length &&
      timingSafeEqual(receivedBuffer, expectedBuffer)
    );
  });
}

const fiveMinutesInSeconds = 5 * 60;

function toIsoTimestamp(value: unknown): string {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value > 10_000_000_000 ? value : value * 1000).toISOString();
  }

  if (typeof value === 'string' && value.trim()) {
    const numericValue = Number(value);

    if (Number.isFinite(numericValue)) {
      return new Date(
        numericValue > 10_000_000_000 ? numericValue : numericValue * 1000,
      ).toISOString();
    }

    const parsedDate = new Date(value);

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    }
  }

  return new Date().toISOString();
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({
      error: 'Method not allowed',
    });
  }

  const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!webhookSecret || !supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Webhook configuration is incomplete');

    return response.status(500).json({
      error: 'Webhook service is not configured',
    });
  }

  let rawBody: string;

  try {
    rawBody = await readRawBody(request);
  } catch (error) {
    console.error('Unable to read webhook body:', error);

    return response.status(400).json({
      error: 'Invalid webhook body',
    });
  }

  if (!hasValidSignature(rawBody, request.headers, webhookSecret)) {
    return response.status(401).json({
      error: 'Invalid webhook signature',
    });
  }

  let event: JsonRecord;

  try {
    const parsedBody: unknown = JSON.parse(rawBody);

    if (!isRecord(parsedBody)) {
      throw new Error('Webhook payload is not an object');
    }

    event = parsedBody;
  } catch {
    return response.status(400).json({
      error: 'Invalid webhook JSON',
    });
  }

  const eventId = getString(event.id);
  const eventType = getString(event.type);

  if (!eventId || !eventType) {
    return response.status(400).json({
      error: 'Webhook event is missing an id or type',
    });
  }

  // This endpoint only processes successful payments.
  if (eventType !== 'payment.succeeded') {
    return response.status(200).json({
      received: true,
      ignored: true,
    });
  }

  const payment = isRecord(event.data) ? event.data : null;

  if (!payment) {
    return response.status(400).json({
      error: 'Payment data is missing',
    });
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const { data: existingEvent, error: existingEventError } = await supabase
    .from('whop_webhook_events')
    .select('event_id')
    .eq('event_id', eventId)
    .maybeSingle();

  if (existingEventError) {
    console.error('Unable to check webhook event:', existingEventError);

    return response.status(500).json({
      error: 'Unable to check webhook event',
    });
  }

  if (existingEvent) {
    return response.status(200).json({
      received: true,
      duplicate: true,
    });
  }

  const metadata = isRecord(payment.metadata) ? payment.metadata : {};
  const invoiceNumber = getString(metadata.invoice_number).toUpperCase();
  const checkoutConfigurationId = getString(
    payment.checkout_configuration_id,
  );

  if (!invoiceNumber && !checkoutConfigurationId) {
    await supabase.from('whop_webhook_events').insert({
      event_id: eventId,
      event_type: eventType,
    });

    return response.status(200).json({
      received: true,
      matched: false,
    });
  }

  const paymentUpdate = {
    status: 'paid',
    paid_at: toIsoTimestamp(payment.paid_at),
    updated_at: new Date().toISOString(),
  };

  const updateQuery = invoiceNumber
    ? supabase
        .from('invoices')
        .update(paymentUpdate)
        .in('status', ['unpaid', 'pending'])
        .eq('invoice_number', invoiceNumber)
        .select('id')
    : supabase
        .from('invoices')
        .update(paymentUpdate)
        .in('status', ['unpaid', 'pending'])
        .eq(
          'whop_checkout_configuration_id',
          checkoutConfigurationId,
        )
        .select('id');

  const { data: updatedInvoices, error: updateError } = await updateQuery;

  if (updateError) {
    console.error('Unable to mark invoice as paid:', updateError);

    return response.status(500).json({
      error: 'Unable to update invoice',
    });
  }

  const { error: eventInsertError } = await supabase
    .from('whop_webhook_events')
    .insert({
      event_id: eventId,
      event_type: eventType,
    });

  if (eventInsertError && eventInsertError.code !== '23505') {
    console.error('Unable to save webhook event:', eventInsertError);

    return response.status(500).json({
      error: 'Unable to save webhook event',
    });
  }

  return response.status(200).json({
    received: true,
    matched: Boolean(updatedInvoices?.length),
  });
}