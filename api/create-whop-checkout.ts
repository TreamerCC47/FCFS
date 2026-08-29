import { createClient } from '@supabase/supabase-js';

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
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

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const whopApiKey = process.env.WHOP_API_KEY;
  const whopCompanyId = process.env.WHOP_COMPANY_ID;
  const publicSiteUrl = process.env.PUBLIC_SITE_URL;

  if (
    !supabaseUrl ||
    !supabaseServiceRoleKey ||
    !whopApiKey ||
    !whopCompanyId ||
    !publicSiteUrl
  ) {
    const missingVariables = [
      ['SUPABASE_URL', supabaseUrl],
      ['SUPABASE_SERVICE_ROLE_KEY', supabaseServiceRoleKey],
      ['WHOP_API_KEY', whopApiKey],
      ['WHOP_COMPANY_ID', whopCompanyId],
      ['PUBLIC_SITE_URL', publicSiteUrl],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    console.error('Missing checkout configuration:', missingVariables);

    return response.status(500).json({
      error: 'Checkout service is not configured',
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

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select('invoice_number, customer_email, whop_plan_id, status')
    .eq('invoice_number', invoiceNumber)
    .eq('customer_email', email)
    .maybeSingle();

  if (invoiceError) {
    return response.status(500).json({
      error: 'Unable to look up invoice',
    });
  }

  if (!invoice) {
    return response.status(404).json({
      error: 'Invoice not found',
    });
  }

  if (invoice.status === 'paid') {
    return response.status(409).json({
      error: 'This invoice has already been paid',
    });
  }

  if (invoice.status === 'cancelled') {
    return response.status(409).json({
      error: 'This invoice has been cancelled',
    });
  }

  if (!invoice.whop_plan_id) {
    return response.status(500).json({
      error: 'This invoice has no payment plan configured',
    });
  }

  const siteUrl = publicSiteUrl.replace(/\/$/, '');

  const whopResponse = await fetch(
    'https://api.whop.com/api/v1/checkout_configurations',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${whopApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        plan_id: invoice.whop_plan_id,
        mode: 'payment',
        redirect_url: `${siteUrl}/#/pay?invoice=${encodeURIComponent(invoiceNumber)}`,
        metadata: {
          invoice_number: invoiceNumber,
        },
      }),
    },
  );

  if (!whopResponse.ok) {
    console.error(
      'Whop checkout creation failed:',
      whopResponse.status,
      await whopResponse.text(),
    );

    return response.status(502).json({
      error: 'Unable to create Whop checkout',
    });
  }

  const checkout = (await whopResponse.json()) as {
    id?: string;
    purchase_url?: string;
  };

  if (!checkout.id || !checkout.purchase_url) {
    return response.status(502).json({
      error: 'Whop returned an incomplete checkout',
    });
  }

  const { error: updateError } = await supabase
    .from('invoices')
    .update({
      whop_checkout_configuration_id: checkout.id,
      status: 'pending',
      updated_at: new Date().toISOString(),
    })
    .eq('invoice_number', invoiceNumber)
    .eq('customer_email', email);

  if (updateError) {
    return response.status(500).json({
      error: 'Unable to save checkout details',
    });
  }

  return response.status(200).json({
    purchaseUrl: checkout.purchase_url,
  });
}