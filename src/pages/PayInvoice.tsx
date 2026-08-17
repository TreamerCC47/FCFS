import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronDown,
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
  Sparkles,
  X,
} from 'lucide-react';

type PaymentMethod = 'card' | 'eft';
type PaymentState = 'ready' | 'processing' | 'success';

const invoice = {
  number: 'FC-2024-0841',
  issued: '06 September 2024',
  due: '20 September 2024',
  client: 'Mahlangu & Sons Trading',
  description: 'Monthly accounting & compliance',
  period: 'September 2024',
  amount: 'R4,250.00',
  checkoutUrl: 'https://whop.com/future-cents/itr14-tax-return/',
};

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-futurecents">
      <span className="brand-mark" aria-hidden="true"><span>fc</span></span>
      <div className={compact ? 'leading-tight' : ''}>
        <p className="text-[1.02rem] font-extrabold tracking-[-.045em] text-[#f8f1df]">FutureCents</p>
        {!compact && <p className="mt-0.5 text-[.61rem] font-bold uppercase tracking-[.2em] text-[#c4a86c]">Smart finance partner</p>}
      </div>
    </div>
  );
}

function TrustItem({ icon: Icon, children }: { icon: typeof ShieldCheck; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-[.76rem] text-[#dbe3d7]" data-testid={`trust-${String(children).toLowerCase().replace(/\s+/g, '-')}`}>
      <Icon size={15} strokeWidth={1.8} className="shrink-0 text-[#c4a86c]" />
      <span>{children}</span>
    </div>
  );
}

function InvoiceSummary() {
  return (
    <section className="soft-card reveal reveal-delay-1 overflow-hidden rounded-[1.35rem]" data-testid="section-invoice-summary">
      <div className="flex items-start justify-between border-b border-[#e9e1d2] px-5 py-5 sm:px-7">
        <div className="flex items-center gap-3.5">
          <div className="grid size-10 place-items-center rounded-xl bg-[#e7eee4] text-[#255c4a]">
            <Receipt size={20} strokeWidth={1.7} />
          </div>
          <div>
            <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">Invoice summary</p>
            <h2 className="mt-1 text-[.96rem] font-bold text-[#16392e]" data-testid="text-invoice-number">{invoice.number}</h2>
          </div>
        </div>
        <span className="rounded-full bg-[#f6e9c9] px-3 py-1.5 text-[.65rem] font-bold text-[#6d5628]" data-testid="status-invoice-due">Due 20 Sep</span>
      </div>
      <div className="px-5 py-5 sm:px-7">
        <div className="flex justify-between gap-5">
          <div>
            <p className="text-[.68rem] font-semibold text-[#758178]">Billed to</p>
            <p className="mt-1.5 text-[.86rem] font-bold text-[#234638]" data-testid="text-invoice-client">{invoice.client}</p>
          </div>
          <div className="text-right">
            <p className="text-[.68rem] font-semibold text-[#758178]">Issued</p>
            <p className="mt-1.5 font-mono-brand text-[.72rem] text-[#42594e]" data-testid="text-invoice-issued">{invoice.issued}</p>
          </div>
        </div>
        <div className="my-5 h-px bg-[#ebe4d6]" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[.86rem] font-semibold text-[#234638]" data-testid="text-invoice-description">{invoice.description}</p>
            <p className="mt-1 text-[.72rem] text-[#78847c]" data-testid="text-invoice-period">{invoice.period}</p>
          </div>
          <p className="font-mono-brand text-[.83rem] font-medium text-[#234638]" data-testid="text-invoice-line-amount">{invoice.amount}</p>
        </div>
        <div className="mt-5 flex items-end justify-between rounded-xl bg-[#f4efe3] px-4 py-3.5">
          <div>
            <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">Amount payable</p>
            <p className="mt-1 text-[.68rem] text-[#78847c]">Inclusive of VAT where applicable</p>
          </div>
          <p className="font-mono-brand text-[1.32rem] font-medium tracking-[-.05em] text-[#16392e]" data-testid="text-invoice-total">{invoice.amount}</p>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  placeholder,
  onChange,
  error,
  type = 'text',
  className = '',
  maxLength,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  className?: string;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email';
}) {
  return (
    <label className={`block ${className}`} htmlFor={id} data-testid={`field-${id}`}>
      <span className="mb-2 block text-[.7rem] font-bold text-[#40584b]">{label}</span>
      <span className={`field-shell flex min-h-[3.15rem] items-center rounded-xl border bg-[#fbfaf6] px-3.5 ${error ? 'has-error border-[#b95348]' : 'border-[#ddd9cb]'}`}>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          maxLength={maxLength}
          inputMode={inputMode}
          className="w-full border-0 bg-transparent text-[.82rem] font-medium text-[#193c30] outline-none placeholder:text-[#a4aaa0]"
          data-testid={`input-${id}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </span>
      {error && <span id={`${id}-error`} className="mt-1.5 block text-[.66rem] font-semibold text-[#b95348]" data-testid={`error-${id}`}>{error}</span>}
    </label>
  );
}

function MethodButton({ active, method, onClick }: { active: boolean; method: PaymentMethod; onClick: () => void }) {
  const isCard = method === 'card';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-1 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all ${active ? 'border-[#255c4a] bg-[#eaf0e7] shadow-[0_0_0_2px_rgba(37,92,74,.1)]' : 'border-[#dedacd] bg-[#fbfaf6] hover:border-[#91a293]'}`}
      data-testid={`button-method-${method}`}
      aria-pressed={active}
    >
      <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${active ? 'bg-[#255c4a] text-[#f7f2e6]' : 'bg-[#eeeade] text-[#53665a]'}`}>
        {isCard ? <CreditCardIcon /> : <Banknote size={17} strokeWidth={1.7} />}
      </span>
      <span>
        <span className="block text-[.78rem] font-bold text-[#24493a]">{isCard ? 'Card' : 'EFT'}</span>
        <span className="mt-0.5 block text-[.62rem] text-[#748077]">{isCard ? 'Visa or Mastercard' : 'Bank transfer'}</span>
      </span>
      {active && <Check size={15} className="absolute right-3 top-3 text-[#255c4a]" strokeWidth={2.5} />}
    </button>
  );
}

function CreditCardIcon() {
  return <span className="relative block h-[13px] w-[18px] rounded-[3px] border-[1.5px] border-current"><span className="absolute inset-x-0 top-[3px] border-t-[1.5px] border-current" /></span>;
}

function PaymentForm() {
  return (
    <section
      className="soft-card reveal reveal-delay-2 rounded-[1.35rem] p-5 sm:p-7"
      data-testid="section-payment-form"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">
            Secure payment
          </p>

          <h2
            className="mt-1 text-[1.15rem] font-extrabold tracking-[-.04em] text-[#16392e]"
            data-testid="text-payment-heading"
          >
            Pay securely with Whop
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
              You will be redirected to Whop to complete payment. FutureCents
              does not collect or store your card details.
            </p>
          </div>
        </div>
      </div>

      <a
        href={invoice.checkoutUrl}
        className="mt-5 flex min-h-[3.35rem] w-full items-center justify-center gap-2 rounded-xl bg-[#255c4a] px-5 text-[.82rem] font-bold text-[#f8f1df] shadow-[0_8px_20px_rgba(37,92,74,.17)] transition-all hover:-translate-y-0.5 hover:bg-[#1b4c3c]"
        data-testid="link-whop-checkout"
      >
        Continue to secure payment
        <ArrowRight size={16} />
      </a>

      <p className="mt-3 text-center text-[.65rem] leading-relaxed text-[#78847c]">
        Whop will show the available payment methods for this invoice.
      </p>
    </section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-[680px] items-center justify-center px-5 py-10">
      <section className="soft-card success-in w-full rounded-[1.5rem] px-6 py-10 text-center sm:px-14 sm:py-14" data-testid="section-payment-success">
        <div className="success-ring mx-auto grid size-20 place-items-center rounded-full bg-[#e5efe4] text-[#255c4a]">
          <CheckCircle2 size={42} strokeWidth={1.5} />
        </div>
        <p className="mt-7 text-[.68rem] font-bold uppercase tracking-[.2em] text-[#718176]">Payment received</p>
        <h1 className="mt-3 text-[2rem] font-extrabold tracking-[-.065em] text-[#16392e] sm:text-[2.65rem]" data-testid="text-success-heading">That’s sorted.</h1>
        <p className="mx-auto mt-3 max-w-md text-[.84rem] leading-relaxed text-[#65756a]" data-testid="status-payment-success">Thanks, Thabo. Your demo payment for <strong className="font-bold text-[#315e4c]">{invoice.number}</strong> has been recorded successfully.</p>
        <div className="mx-auto mt-7 max-w-sm rounded-xl border border-[#e6e0d3] bg-[#f7f4ec] px-5 py-4 text-left">
          <div className="flex justify-between text-[.72rem]"><span className="text-[#758178]">Amount</span><strong className="font-mono-brand text-[#24493a]" data-testid="text-success-amount">{invoice.amount}</strong></div>
          <div className="my-3 h-px bg-[#e4dfd4]" />
          <div className="flex justify-between text-[.72rem]"><span className="text-[#758178]">Reference</span><strong className="font-mono-brand text-[#24493a]" data-testid="text-success-reference">{invoice.number}</strong></div>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-[.72rem] text-[#718176]" data-testid="text-receipt-note"><Mail size={14} /> A receipt will be sent to your email.</p>
        <button type="button" onClick={onReset} className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#cfd8cd] px-4 py-2.5 text-[.73rem] font-bold text-[#315e4c] transition-colors hover:bg-[#edf2ea]" data-testid="button-return-to-payment">Make another demo payment <ArrowRight size={14} /></button>
      </section>
    </main>
  );
}

function SupportPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-[#18392e]/20 p-4 backdrop-blur-[2px] sm:items-center" role="dialog" aria-modal="true" aria-labelledby="support-heading" data-testid="dialog-support">
      <section className="soft-card success-in w-full max-w-[420px] rounded-[1.3rem] p-6">
        <div className="flex items-start justify-between">
          <div><p className="text-[.66rem] font-bold uppercase tracking-[.16em] text-[#6e7d71]">Need a hand?</p><h2 id="support-heading" className="mt-1 text-[1.2rem] font-extrabold tracking-[-.04em] text-[#16392e]" data-testid="text-support-heading">We’re here to help.</h2></div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-[#718176] hover:bg-[#edf0e9]" data-testid="button-close-support" aria-label="Close support"><X size={18} /></button>
        </div>
        <p className="mt-3 text-[.78rem] leading-relaxed text-[#65756a]">Questions about this invoice or your account? Speak to the team that knows your business.</p>
        <div className="mt-5 grid gap-2.5">
          <a href="mailto:hello@futurecents.co.za" className="flex items-center gap-3 rounded-xl border border-[#dedacd] bg-[#fbfaf6] px-3.5 py-3 text-[.76rem] font-bold text-[#315e4c] hover:border-[#91a293]" data-testid="link-support-email"><Mail size={16} /> hello@futurecents.co.za <MoveUpRight size={14} className="ml-auto" /></a>
          <a href="tel:+27105550184" className="flex items-center gap-3 rounded-xl border border-[#dedacd] bg-[#fbfaf6] px-3.5 py-3 text-[.76rem] font-bold text-[#315e4c] hover:border-[#91a293]" data-testid="link-support-phone"><Phone size={16} /> +27 10 555 0184 <MoveUpRight size={14} className="ml-auto" /></a>
        </div>
        <button type="button" onClick={onClose} className="mt-5 w-full rounded-xl bg-[#255c4a] py-3 text-[.75rem] font-bold text-[#f8f1df] hover:bg-[#1b4c3c]" data-testid="button-support-done">Back to payment</button>
      </section>
    </div>
  );
}

export default function PayInvoice() {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [paymentState, setPaymentState] = useState<PaymentState>('ready');
  const [supportOpen, setSupportOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (paymentState === 'success') {
    return (
      <div className="payment-page">
        <header className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 py-6 sm:px-8" data-testid="header-success">
          <Brand compact />
          <span className="flex items-center gap-2 text-[.68rem] font-bold text-[#637268]"><ShieldCheck size={15} className="text-[#315e4c]" /> Secure payment handoff</span>
        </header>
        <SuccessState onReset={() => setPaymentState('ready')} />
      </div>
    );
  }

  return (
    <div className="payment-page" data-testid="page-payment">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <header className="flex items-center justify-between py-6 sm:py-8" data-testid="header-payment">
          <Brand />
          <button type="button" onClick={() => setSupportOpen(true)} className="group flex items-center gap-2 rounded-full border border-[#d8d9ca] bg-[#f8f5ed]/75 px-3.5 py-2 text-[.7rem] font-bold text-[#315e4c] transition-colors hover:border-[#8ca194]" data-testid="button-open-support">
            <CircleHelp size={15} className="text-[#9c7739]" /> Need help?
          </button>
        </header>
        <div className="grid gap-9 pb-12 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] lg:items-start lg:gap-20 lg:pb-16 lg:pt-12">
          <aside className="reveal max-w-[500px] lg:sticky lg:top-10">
            <div className="mb-7 flex items-center gap-2 text-[.66rem] font-bold uppercase tracking-[.2em] text-[#a37e40]" data-testid="text-payment-eyebrow"><span className="h-px w-8 bg-[#c4a86c]" /> Client payment portal</div>
            <h1 className="max-w-[510px] text-balance text-[2.55rem] font-extrabold leading-[1.06] tracking-[-.075em] text-[#16392e] sm:text-[3.8rem]" data-testid="text-page-heading">A small step for your business.<span className="text-[#b08442]"> A solid one.</span></h1>
            <p className="mt-6 max-w-[430px] text-[.92rem] leading-[1.8] text-[#637268]" data-testid="text-page-intro">Review your invoice below and settle up in the way that suits you. Your FutureCents team has got the rest covered.</p>
            <div className="mt-9 hidden border-l-2 border-[#c4a86c] pl-4 sm:block" data-testid="quote-payment">
              <p className="text-[.82rem] font-semibold leading-relaxed text-[#315e4c]">“Smart. Simple. Solid Finance.”</p>
              <p className="mt-1.5 text-[.68rem] text-[#829087]">The FutureCents way of doing business.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 sm:mt-14" data-testid="list-trust-cues">
              <TrustItem icon={LockKeyhole}>Secure handoff</TrustItem>
              <TrustItem icon={ShieldCheck}>No hidden fees</TrustItem>
              <TrustItem icon={MessageCircle}>Real people, nearby</TrustItem>
            </div>
          </aside>
          <main className="space-y-4">
            <InvoiceSummary />
         <PaymentForm />
            <div className="reveal reveal-delay-3 flex items-center justify-between px-1 pt-2">
              <button type="button" onClick={() => setDetailsOpen(!detailsOpen)} className="flex items-center gap-1 text-[.68rem] font-bold text-[#6c7c70] hover:text-[#315e4c]" data-testid="button-toggle-invoice-details" aria-expanded={detailsOpen}>
                <FileText size={14} /> View invoice details <ChevronDown size={13} className={`transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
              </button>
              <button type="button" onClick={() => window.print()} className="flex items-center gap-1.5 text-[.68rem] font-bold text-[#6c7c70] hover:text-[#315e4c]" data-testid="button-download-invoice">
                <Download size={14} /> Save invoice
              </button>
            </div>
            {detailsOpen && <div className="reveal rounded-xl border border-[#e2ddcf] bg-[#f9f7f0] px-4 py-3 text-[.7rem] text-[#69786e]" data-testid="panel-invoice-details">FutureCents (Pty) Ltd · VAT Reg. 4580293187 · Professional accounting, payroll and compliance services.</div>}
          </main>
        </div>
        <footer className="flex flex-col gap-2 border-t border-[#dddccd] py-6 text-[.65rem] text-[#7d887f] sm:flex-row sm:items-center sm:justify-between" data-testid="footer-payment">
          <p>FutureCents (Pty) Ltd · South Africa</p>
          <p className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#315e4c]" /> Your information is handled with care.</p>
        </footer>
      </div>
      {supportOpen && <SupportPanel onClose={() => setSupportOpen(false)} />}
    </div>
  );
}

