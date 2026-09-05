import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "dist", "public");
const sourceFile = path.join(outputDirectory, "index.html");
const faqDirectory = path.join(outputDirectory, "faq");
const outputFile = path.join(faqDirectory, "index.html");

const pageTitle =
  "Accounting and Tax FAQs for South African Small Businesses | FutureCents";

const pageDescription =
  "Answers to common bookkeeping, tax, payroll, VAT, SARS and financial reporting questions from South African small businesses.";

const faqs = [
  {
    question: "Do I need to be VAT registered to use FutureCents?",
    answer:
      "No. We work with both VAT-registered and non-VAT businesses. We can help you understand your obligations and identify the appropriate next step for your business.",
  },
  {
    question: "What documents do I need to get started?",
    answer:
      "Typically, we need your company registration documents, recent bank statements, existing bookkeeping records and any SARS correspondence.",
  },
  {
    question: "Can you help if my books are behind?",
    answer:
      "Yes. We can assist with bookkeeping catch-ups and once-off backlog work. We will assess how far behind your records are and provide a quote before starting.",
  },
  {
    question: "How does monthly billing work?",
    answer:
      "Monthly services are generally invoiced in advance. Once-off services may require a deposit before work begins.",
  },
  {
    question: "What should I do if SARS contacts me directly?",
    answer:
      "Forward the correspondence to us as soon as possible. We can help you understand what is being requested and advise you on the appropriate response.",
  },
  {
    question: "Is my financial information secure?",
    answer:
      "We take reasonable technical and organisational steps to protect the personal information and financial documents shared with us.",
  },
  {
    question: "Do you work with businesses outside South Africa?",
    answer:
      "We primarily serve South African-registered businesses. If your business has foreign operations or offshore income, contact us so we can assess whether we are able to assist.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Start dates depend on the service required, the availability of your records and the onboarding process.",
  },
  {
    question: "Can you help with payroll?",
    answer:
      "Yes. We can assist with monthly payroll administration, payslips, PAYE, UIF and related payroll records for small businesses.",
  },
  {
    question: "Can you prepare annual financial statements?",
    answer:
      "We can assist with preparing financial information and annual financial statements based on your business requirements.",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function replaceMetaContent(html, pattern, value) {
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

const faqHtml = faqs
  .map(
    (faq) => `
      <article>
        <h2>${escapeHtml(faq.question)}</h2>
        <p>${escapeHtml(faq.answer)}</p>
      </article>
    `,
  )
  .join("\n");

const fallbackHtml = `
  <main>
    <header>
      <p>FutureCents frequently asked questions</p>
      <h1>Accounting and tax answers for South African small businesses</h1>
      <p>
        Find answers to common questions about bookkeeping, tax compliance,
        payroll and working with FutureCents.
      </p>
    </header>

    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      ${faqHtml}
    </section>

    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">Still have a question?</h2>
      <p>
        <a href="/#contact">Contact FutureCents</a>
      </p>
    </section>
  </main>
`;

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

let html = await readFile(sourceFile, "utf8");

if (!html.includes('<div id="root"></div>')) {
  throw new Error("Could not find the empty React root in index.html");
}

html = html.replace(
  /<title>[\s\S]*?<\/title>/i,
  `<title>${escapeHtml(pageTitle)}</title>`,
);

html = replaceMetaContent(
  html,
  /(<meta[\s\S]*?name="description"[\s\S]*?content=")[^"]*(")/i,
  pageDescription,
);

html = replaceMetaContent(
  html,
  /(<meta[\s\S]*?property="og:title"[\s\S]*?content=")[^"]*(")/i,
  pageTitle,
);

html = replaceMetaContent(
  html,
  /(<meta[\s\S]*?property="og:description"[\s\S]*?content=")[^"]*(")/i,
  pageDescription,
);

html = replaceMetaContent(
  html,
  /(<meta[\s\S]*?property="og:url"[\s\S]*?content=")[^"]*(")/i,
  "https://www.futurecents.co.za/faq",
);

html = replaceMetaContent(
  html,
  /(<meta[\s\S]*?name="twitter:title"[\s\S]*?content=")[^"]*(")/i,
  pageTitle,
);

html = replaceMetaContent(
  html,
  /(<meta[\s\S]*?name="twitter:description"[\s\S]*?content=")[^"]*(")/i,
  pageDescription,
);

html = html.replace(
  /(<link[\s\S]*?rel="canonical"[\s\S]*?href=")[^"]*(")/i,
  "$1https://www.futurecents.co.za/faq$2",
);

html = html.replace(
  "</head>",
  `<script type="application/ld+json">${faqSchema}</script>\n</head>`,
);

html = html.replace(
  '<div id="root"></div>',
  `<div id="root">${fallbackHtml}</div>`,
);

await mkdir(faqDirectory, { recursive: true });
await writeFile(outputFile, html, "utf8");

console.log("Created dist/public/faq/index.html");