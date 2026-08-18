import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import {
  ArrowRight,
  CircleHelp,
  Download,
  FileText,
  LockKeyhole,
  Mail,
  MessageCircle,
  MoveUpRight,
  Phone,
  Receipt,
  ShieldCheck,
  X,
} from 'lucide-react';

type Invoice = {
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  description: string;
  amount: string | number;
  currency: string;
  due_date: string;
  status: 'unpaid' | 'pending' | 'paid' | 'cancelled';
};
type ApiPayload = {
  invoice?: Invoice;
  purchaseUrl?: string;
  error?: string;
};

async function readApiPayload(response: Response): Promise<ApiPayload> {
  const text = await response.text();

  if (!text) {
    throw new Error(`Server returned status ${response.status}`);
  }

  try {
    return JSON.parse(text) as ApiPayload;
  } catch {
    throw new Error(text);
  }
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-futurecents">
      <span className="brand-mark" aria-hidden="true">
        <span>fc</span>
      </span>

      <div className={compact ? 'leading-tight' : ''}>
        <p className="text-[1.02rem] font-extrabold tracking-[-.045em] text-[#f8f1df]">
          FutureCents
        </p>

        {!compact && (
          <p className="mt-0.5 text-[.61rem] font-bold uppercase tracking-[.2em] text-[#c4a86c]">
            Smart finance partner
          </p>
        )}
      </div>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  children,
}: {
  icon: typeof ShieldCheck;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 text-[.76rem] text-[#dbe3d7]">
      <Icon size={15} strokeWidth={1.8} className="shrink-0 text-[#c4a86c]" />
      <span>{children}</span>
    </div>
  );
}

function formatAmount(invoice: Invoice) {
  const amount = Number(invoice.amount);

  if (!Number.isFinite(amount)) {
    return `${invoice.currency} ${invoice.amount}`;
  }

  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: invoice.currency,
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getStatusLabel(status: Invoice['status']) {
  switch (status) {
    case 'paid':
      return 'Paid';
    case 'pending':
      return 'Payment pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unpaid';
  }
}

function InvoiceSummary({ invoice }: { invoice: Invoice }) {
  const amount = formatAmount(invoice);

  return (
    <section
      className="soft-card overflow-hidden rounded-[1.35rem]"
      data-testid="section-invoice-summary"
    >
      <div className="flex items-start justify-between border-b border-[#e9e1d2] px-5 py-5 sm:px-7">
        <div className="flex items-center gap-3.5">
          <div className="grid size-10 place-items-center rounded-xl bg-[#e7eee4] text-[#255c4a]">
            <Receipt size={20} strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">
              Invoice summary
            </p>

            <h2
              className="mt-1 text-[.96rem] font-bold text-[#16392e]"
              data-testid="text-invoice-number"
            >
              {invoice.invoice_number}
            </h2>
          </div>
        </div>

        <span className="rounded-full bg-[#f6e9c9] px-3 py-1.5 text-[.65rem] font-bold text-[#6d5628]">
          {getStatusLabel(invoice.status)}
        </span>
      </div>

      <div className="px-5 py-5 sm:px-7">
        <div className="flex justify-between gap-5">
          <div>
            <p className="text-[.68rem] font-semibold text-[#758178]">
              Billed to
            </p>

            <p
              className="mt-1.5 text-[.86rem] font-bold text-[#234638]"
              data-testid="text-invoice-client"
            >
              {invoice.customer_name}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[.68rem] font-semibold text-[#758178]">
              Due date
            </p>

            <p
              className="mt-1.5 text-[.72rem] text-[#42594e]"
              data-testid="text-invoice-due-date"
            >
              {formatDate(invoice.due_date)}
            </p>
          </div>
        </div>

        <div className="my-5 h-px bg-[#ebe4d6]" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[.86rem] font-semibold text-[#234638]"
              data-testid="text-invoice-description"
            >
              {invoice.description}
            </p>

            <p className="mt-1 text-[.72rem] text-[#78847c]">
              Customer email: {invoice.customer_email}
            </p>
          </div>

          <p className="font-mono-brand text-[.83rem] font-medium text-[#234638]">
            {amount}
          </p>
        </div>

        <div className="mt-5 flex items-end justify-between rounded-xl bg-[#f4efe3] px-4 py-3.5">
          <div>
            <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">
              Amount payable
            </p>

            <p className="mt-1 text-[.67rem] text-[#8a918b]">
              Includes the amount shown on your invoice
            </p>
          </div>

          <p
            className="font-mono-brand text-[1.32rem] font-medium tracking-[-.05em] text-[#16392e]"
            data-testid="text-invoice-total"
          >
            {amount}
          </p>
        </div>
      </div>
    </section>
  );
}

function InvoiceLookupForm({
  invoiceNumber,
  email,
  setInvoiceNumber,
  setEmail,
  onSubmit,
  isSubmitting,
}: {
  invoiceNumber: string;
  email: string;
  setInvoiceNumber: (value: string) => void;
  setEmail: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}) {
  return (
    <section
      className="soft-card rounded-[1.35rem] p-5 sm:p-7"
      data-testid="section-invoice-lookup"
    >
      <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">
        Find your invoice
      </p>

      <h2 className="mt-1 text-[1.15rem] font-extrabold tracking-[-.04em] text-[#16392e]">
        Enter your invoice details
      </h2>

      <p className="mt-2 text-[.76rem] leading-relaxed text-[#69786e]">
        Use the invoice number and customer email address associated with your
        FutureCents account.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[.69rem] font-bold text-[#315e4c]">
            Invoice number
          </span>

          <input
            value={invoiceNumber}
            onChange={(event) => setInvoiceNumber(event.target.value)}
            placeholder="e.g. FC-2024-0841"
            autoComplete="off"
            required
            className="w-full rounded-xl border border-[#d8d9ca] bg-[#fbfaf6] px-3.5 py-3 text-[.8rem] text-[#24493a] outline-none transition-colors placeholder:text-[#a0aaa1] focus:border-[#8ca194] focus:ring-2 focus:ring-[#dce7db]"
            data-testid="input-invoice-number"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[.69rem] font-bold text-[#315e4c]">
            Customer email
          </span>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@yourbusiness.co.za"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-[#d8d9ca] bg-[#fbfaf6] px-3.5 py-3 text-[.8rem] text-[#24493a] outline-none transition-colors placeholder:text-[#a0aaa1] focus:border-[#8ca194] focus:ring-2 focus:ring-[#dce7db]"
            data-testid="input-customer-email"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-[3.35rem] w-full items-center justify-center gap-2 rounded-xl bg-[#255c4a] px-5 text-[.82rem] font-bold text-[#f8f1df] shadow-[0_8px_20px_rgba(37,92,74,.17)] transition-all hover:-translate-y-0.5 hover:bg-[#1b4c3c] disabled:cursor-wait disabled:opacity-75 disabled:hover:translate-y-0"
          data-testid="button-find-invoice"
        >
          {isSubmitting ? 'Looking up invoice...' : 'View invoice'}
          {!isSubmitting && <ArrowRight size={16} />}
        </button>
      </form>
    </section>
  );
}

function CheckoutPanel({
  invoice,
  onCheckout,
  isSubmitting,
}: {
  invoice: Invoice;
  onCheckout: () => void;
  isSubmitting: boolean;
}) {
  const isPaid = invoice.status === 'paid';
  const isCancelled = invoice.status === 'cancelled';

  return (
    <section
      className="soft-card rounded-[1.35rem] p-5 sm:p-7"
      data-testid="section-payment-form"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">
            Secure payment
          </p>

          <h2 className="mt-1 text-[1.15rem] font-extrabold tracking-[-.04em] text-[#16392e]">
            Continue with Whop
          </h2>
        </div>

        <div className="hidden items-center gap-1.5 rounded-full bg-[#e7eee4] px-2.5 py-1.5 text-[.6rem] font-bold text-[#315e4c] sm:flex">
          <ShieldCheck size={12} />
          Hosted checkout
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#dce7db] bg-[#f1f6ef] p-4">
        <div className="flex gap-3">
          <div className="mt-0.5 text-[#315e4c]">
            <LockKeyhole size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[.76rem] font-bold text-[#24493a]">
              Your payment is handled securely
            </p>

            <p className="mt-1 text-[.69rem] leading-relaxed text-[#637268]">
              Whop will handle your payment details. FutureCents does not
              collect or store your card information.
            </p>
          </div>
        </div>
      </div>

      {isPaid && (
        <div className="mt-5 rounded-xl border border-[#cfe2cd] bg-[#edf6eb] px-4 py-3 text-[.74rem] font-semibold text-[#315e4c]">
          This invoice is already marked as paid.
        </div>
      )}

      {isCancelled && (
        <div className="mt-5 rounded-xl border border-[#ead2cd] bg-[#fbefec] px-4 py-3 text-[.74rem] font-semibold text-[#8b4e43]">
          This invoice has been cancelled. Please contact FutureCents for help.
        </div>
      )}

      {!isPaid && !isCancelled && (
        <>
          <button
            type="button"
            onClick={onCheckout}
            disabled={isSubmitting}
            className="mt-5 flex min-h-[3.35rem] w-full items-center justify-center gap-2 rounded-xl bg-[#255c4a] px-5 text-[.82rem] font-bold text-[#f8f1df] shadow-[0_8px_20px_rgba(37,92,74,.17)] transition-all hover:-translate-y-0.5 hover:bg-[#1b4c3c] disabled:cursor-wait disabled:opacity-75 disabled:hover:translate-y-0"
            data-testid="button-start-whop-checkout"
          >
            {isSubmitting
              ? 'Preparing secure checkout...'
              : 'Continue to secure payment'}
            {!isSubmitting && <ArrowRight size={16} />}
          </button>

          <p className="mt-3 text-center text-[.65rem] leading-relaxed text-[#78847c]">
            You will be redirected to Whop to complete payment.
          </p>
        </>
      )}
    </section>
  );
}

function SupportPanel({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-[#18392e]/20 p-4 backdrop-blur-[2px] sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-heading"
      data-testid="dialog-support"
    >
      <section className="soft-card success-in w-full max-w-[420px] rounded-[1.3rem] p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">
              Need a hand?
            </p>

            <h2
              id="support-heading"
              className="mt-1 text-[1.2rem] font-extrabold tracking-[-.04em] text-[#16392e]"
            >
              We’re here to help.
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#718176] hover:bg-[#edf0e9]"
            aria-label="Close support"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-3 text-[.78rem] leading-relaxed text-[#65756a]">
          Questions about this invoice or your account? Speak to the team that
          knows your business.
        </p>

        <div className="mt-5 grid gap-2.5">
          <a
            href="mailto:hello@futurecents.co.za"
            className="flex items-center gap-3 rounded-xl border border-[#dedacd] bg-[#fbfaf6] px-3.5 py-3 text-[.76rem] font-bold text-[#315e4c] hover:border-[#91a293]"
          >
            <Mail size={16} />
            hello@futurecents.co.za
            <MoveUpRight size={14} className="ml-auto" />
          </a>

          <a
            href="tel:+27105550184"
            className="flex items-center gap-3 rounded-xl border border-[#dedacd] bg-[#fbfaf6] px-3.5 py-3 text-[.76rem] font-bold text-[#315e4c] hover:border-[#91a293]"
          >
            <Phone size={16} />
            +27 10 555 0184
            <MoveUpRight size={14} className="ml-auto" />
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-[#255c4a] py-3 text-[.75rem] font-bold text-[#f8f1df] hover:bg-[#1b4c3c]"
        >
          Back to invoice
        </button>
      </section>
    </div>
  );
}

export default function PayInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  useEffect(() => {
    const queryString = window.location.hash.split('?')[1] ?? '';
    const params = new URLSearchParams(queryString);
    const invoiceFromUrl = params.get('invoice');

    if (invoiceFromUrl) {
      setInvoiceNumber(invoiceFromUrl);
    }
  }, []);

  async function lookupInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setInvoice(null);
    setIsLookingUp(true);

    try {
      const result = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceNumber,
          email,
        }),
      });

const payload = await readApiPayload(result);

      if (!result.ok || !payload.invoice) {
        throw new Error(payload.error || 'Unable to find this invoice');
      }

      setInvoice(payload.invoice);
    } catch (lookupError) {
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : 'Unable to find this invoice',
      );
    } finally {
      setIsLookingUp(false);
    }
  }

  async function startCheckout() {
    if (!invoice) {
      return;
    }

    setError('');
    setIsCheckingOut(true);

    try {
      const result = await fetch('/api/create-whop-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceNumber: invoice.invoice_number,
          email,
        }),
      });

 const payload = await readApiPayload(result);

      if (!result.ok || !payload.purchaseUrl) {
        throw new Error(payload.error || 'Unable to prepare payment');
      }

      window.location.assign(payload.purchaseUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Unable to prepare payment',
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="payment-page" data-testid="page-payment">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <header
          className="flex items-center justify-between py-6 sm:py-8"
          data-testid="header-payment"
        >
          <Brand />

          <button
            type="button"
            onClick={() => setSupportOpen(true)}
            className="group flex items-center gap-2 rounded-full border border-[#d8d9ca] bg-[#f8f5ed]/75 px-3.5 py-2 text-[.7rem] font-bold text-[#315e4c] transition-colors hover:border-[#8ca194]"
          >
            <CircleHelp size={15} className="text-[#9c7739]" />
            Need help?
          </button>
        </header>

        <div className="grid gap-9 pb-12 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] lg:items-start lg:gap-20 lg:pb-16 lg:pt-12">
          <aside className="reveal max-w-[500px] lg:sticky lg:top-10">
            <div className="mb-7 flex items-center gap-2 text-[.66rem] font-bold uppercase tracking-[.2em] text-[#a37e40]">
              <span className="h-px w-8 bg-[#c4a86c]" />
              Client payment portal
            </div>

            <h1 className="max-w-[510px] text-balance text-[2.55rem] font-extrabold leading-[1.06] tracking-[-.075em] text-[#16392e] sm:text-[3.8rem]">
              A small step for your business.
              <span className="text-[#b08442]"> A solid one.</span>
            </h1>

            <p className="mt-6 max-w-[430px] text-[.92rem] leading-[1.8] text-[#637268]">
              Find your FutureCents invoice and settle it securely through
              Whop. Your FutureCents team has got the rest covered.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 sm:mt-14">
              <TrustItem icon={LockKeyhole}>Secure handoff</TrustItem>
              <TrustItem icon={ShieldCheck}>No card details stored</TrustItem>
              <TrustItem icon={MessageCircle}>Real people, nearby</TrustItem>
            </div>
          </aside>

          <main className="space-y-4">
            <InvoiceLookupForm
              invoiceNumber={invoiceNumber}
              email={email}
              setInvoiceNumber={setInvoiceNumber}
              setEmail={setEmail}
              onSubmit={lookupInvoice}
              isSubmitting={isLookingUp}
            />

            {error && (
              <div
                className="rounded-xl border border-[#ead2cd] bg-[#fbefec] px-4 py-3 text-[.74rem] font-semibold text-[#8b4e43]"
                role="alert"
                data-testid="text-payment-error"
              >
                {error}
              </div>
            )}

            {invoice && (
              <>
                <InvoiceSummary invoice={invoice} />

                <CheckoutPanel
                  invoice={invoice}
                  onCheckout={startCheckout}
                  isSubmitting={isCheckingOut}
                />

                <div className="flex items-center justify-between px-1 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 text-[.68rem] font-bold text-[#6c7c70] hover:text-[#315e4c]"
                  >
                    <Download size={14} />
                    Save invoice
                  </button>

                  <span className="flex items-center gap-1 text-[.68rem] text-[#78847c]">
                    <FileText size={14} />
                    Keep your invoice number for reference
                  </span>
                </div>
              </>
            )}
          </main>
        </div>

        <footer
          className="flex flex-col gap-2 border-t border-[#dddccd] py-6 text-[.65rem] text-[#7d887f] sm:flex-row sm:items-center sm:justify-between"
          data-testid="footer-payment"
        >
          <p>FutureCents (Pty) Ltd · South Africa</p>

          <p className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#315e4c]" />
            Your information is handled with care.
          </p>
        </footer>
      </div>

      {supportOpen && (
        <SupportPanel onClose={() => setSupportOpen(false)} />
      )}
    </div>
  );
}