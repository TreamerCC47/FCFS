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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Contact form Supabase configuration is incomplete');

    return response.status(500).json({
      error: 'Contact service is not configured',
    });
  }

  const body =
    request.body && typeof request.body === 'object'
      ? (request.body as Record<string, unknown>)
      : {};

  // Honeypot field: silently accept automated submissions without saving them.
  const website = getString(body.website);

  if (website) {
    return response.status(200).json({
      success: true,
    });
  }

  const name = getString(body.name);
  const email = getString(body.email).toLowerCase();
  const businessType = getString(body.businessType);
  const message = getString(body.message);

  if (name.length < 2 || name.length > 120) {
    return response.status(400).json({
      error: 'Please enter your full name',
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      error: 'Please enter a valid email address',
    });
  }

  if (businessType.length < 2 || businessType.length > 160) {
    return response.status(400).json({
      error: 'Please enter your business type or industry',
    });
  }

  if (message.length < 10 || message.length > 4000) {
    return response.status(400).json({
      error: 'Please provide a message between 10 and 4000 characters',
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

  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name,
      email,
      business_type: businessType,
      message,
    });

  if (error) {
    console.error('Unable to save contact submission:', error);

    return response.status(500).json({
      error: 'Unable to submit your enquiry',
    });
  }

  return response.status(201).json({
    success: true,
  });
}