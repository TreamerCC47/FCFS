import { createClient } from '@supabase/supabase-js';

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

function getString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
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
    response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return response.status(500).json({
      error: 'Invoice service is not configured',
    });
  }

  const body =
    request.body && typeof request.body === 'object'
      ? (request.body as Record<string, unknown>)
      : {};

  const invoiceNumber = getString(body.invoiceNumber).toUpperCase();
  const email = getString(body.email).toLowerCase();

  if (!invoiceNumber || !email) {
    return response.status(400).json({
      error: 'Invoice number and email are required',
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

  const { data, error } = await supabase
    .from('invoices')
   .select(
  'invoice_number, customer_name, customer_email, description, amount, currency, due_date, status',
)
    .eq('invoice_number', invoiceNumber)
    .eq('customer_email', email)
    .maybeSingle();

  if (error) {
    return response.status(500).json({
      error: 'Unable to look up invoice',
    });
  }

  if (!data) {
    return response.status(404).json({
      error: 'Invoice not found',
    });
  }

  return response.status(200).json({
    invoice: data,
  });
}