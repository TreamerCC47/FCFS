import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "dist", "public");
const sourceFile = path.join(outputDirectory, "index.html");

const guides = [
  {
    slug: "bookkeeping-south-africa",
    title:
      "Small Business Bookkeeping in South Africa: A Practical Guide | FutureCents",
    description:
      "Learn how bookkeeping works, which financial records to keep and why accurate bookkeeping matters for South African small businesses.",
    heading: "Small business bookkeeping in South Africa: a practical guide",
    intro:
      "Good bookkeeping helps you understand how your business is performing, prepare for tax obligations and make decisions using reliable financial information.",
    sections: [
      {
        heading: "What is bookkeeping?",
        text:
          "Bookkeeping is the process of recording and organising the financial activity of a business. This includes tracking income, expenses, payments, receipts, bank transactions and amounts owed by or to the business.",
      },
      {
        heading: "Why bookkeeping matters for small businesses",
        text:
          "Up-to-date records help business owners understand profitability, monitor cash flow, prepare financial information and identify problems earlier.",
      },
      {
        heading: "Which records should a business keep?",
        text:
          "Most small businesses should organise sales invoices, supplier invoices, bank statements, receipts, payroll records, tax documents and important business correspondence.",
      },
      {
        heading: "A simple monthly bookkeeping routine",
        text:
          "A useful monthly routine includes collecting documents, reviewing bank transactions, reconciling records, checking unpaid invoices and preparing a basic financial report.",
      },
      {
        heading: "When should you get bookkeeping help?",
        text:
          "Professional support may be useful if your records are behind, you are unsure whether your business is profitable, or you are spending too much time managing financial administration.",
      },
    ],
  },
  {
    slug: "tax-compliance-south-africa",
    title:
      "Small Business Tax Compliance in South Africa: Practical Guide | FutureCents",
    description:
      "A practical guide to tax compliance for South African small businesses, including records, SARS communication, VAT, payroll taxes and tax preparation.",
    heading:
      "Small business tax compliance in South Africa: a practical guide",
    intro:
      "Understand the records, processes and communication habits that can help your business stay prepared for its tax obligations.",
    sections: [
      {
        heading: "What does tax compliance mean?",
        text:
          "Tax compliance means meeting the registration, record-keeping, reporting, payment and communication responsibilities that apply to your business.",
      },
      {
        heading: "Tax-related areas small businesses may need to manage",
        text:
          "Depending on the business, these may include income tax, provisional tax, VAT, payroll-related taxes and responses to SARS correspondence.",
      },
      {
        heading: "Records your business should organise",
        text:
          "Businesses should keep sales invoices, supplier invoices, bank statements, receipts, payroll records, asset information, previous submissions and SARS correspondence.",
      },
      {
        heading: "A practical tax-preparation checklist",
        text:
          "Keep transactions separate, update bookkeeping regularly, store supporting documents, reconcile bank records, review correspondence and ask for help before deadlines become urgent.",
      },
            {
        heading: "When should you get tax compliance help?",
        text:
          "Professional support may be useful if you are unsure which registrations apply, have fallen behind with records, received SARS correspondence or need help preparing information for a submission.",
      },
    ],
  },
  {
    slug: "payroll-south-africa",
    title:
      "Payroll for Small Businesses in South Africa: Practical Guide | FutureCents",
    description:
      "Learn how payroll administration works for South African small businesses, including payslips, payroll records, PAYE, UIF and monthly payroll processes.",
    heading:
      "Payroll for small businesses in South Africa: a practical guide",
    intro:
      "Understand the basics of payroll administration, the records to keep and when your business may need payroll support.",
    sections: [
      {
        heading: "What does payroll administration involve?",
        text:
          "Payroll administration is the process of calculating employee pay, preparing payslips, recording deductions and keeping the information needed for payroll-related submissions and reports.",
      },
      {
        heading: "Why accurate payroll matters",
        text:
          "Accurate payroll helps employees receive the correct information, gives the business reliable employment records and reduces the risk of problems caused by missing or inconsistent payroll data.",
      },
      {
        heading: "Payroll records a business should organise",
        text:
          "Businesses should keep employee information, employment agreements, salary details, payslips, leave records, deductions, payment records and relevant payroll correspondence.",
      },
      {
        heading: "A practical monthly payroll process",
        text:
          "A consistent monthly process includes reviewing employee changes, confirming salary information, calculating pay, checking deductions, preparing payslips and storing final payroll records.",
      },
      {
        heading: "PAYE and UIF administration",
        text:
          "Businesses with employees may have payroll-related responsibilities such as PAYE and UIF administration. The exact obligations depend on the business and its employees.",
      },
      {
        heading: "When should you get payroll help?",
        text:
          "Professional payroll support may be useful when you employ your first staff members, payroll is taking too much time, records are inconsistent or you need help understanding payroll-related submissions.",
      },
    ],
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

function replaceMetaContent(html, attribute, value) {
  const pattern = new RegExp(
    `(<meta[^>]*${attribute}[^>]*content=")[^"]*(")`,
    "i",
  );

  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

const baseHtml = await readFile(sourceFile, "utf8");

if (!baseHtml.includes('<div id="root"></div>')) {
  throw new Error("Could not find <div id=\"root\"></div> in index.html");
}

for (const guide of guides) {
  let html = baseHtml;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(guide.title)}</title>`,
  );

  html = replaceMetaContent(
    html,
    'name="description"',
    guide.description,
  );

  html = replaceMetaContent(
    html,
    'property="og:title"',
    guide.title,
  );

  html = replaceMetaContent(
    html,
    'property="og:description"',
    guide.description,
  );

  html = replaceMetaContent(
    html,
    'property="og:url"',
    `https://www.futurecents.co.za/guides/${guide.slug}`,
  );

  html = replaceMetaContent(
    html,
    'name="twitter:title"',
    guide.title,
  );

  html = replaceMetaContent(
    html,
    'name="twitter:description"',
    guide.description,
  );

  html = html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
    `$1https://www.futurecents.co.za/guides/${guide.slug}$2`,
  );

  const sectionsHtml = guide.sections
    .map(
      (section) => `
        <section>
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.text)}</p>
        </section>
      `,
    )
    .join("");

  const fallbackHtml = `
    <main>
      <header>
        <p>FutureCents guide</p>
        <h1>${escapeHtml(guide.heading)}</h1>
        <p>${escapeHtml(guide.intro)}</p>
      </header>

      <article>
        ${sectionsHtml}

        <p>
          <a href="/services">View FutureCents services</a>
        </p>

        <p>
          <a href="/#contact">Contact FutureCents</a>
        </p>
      </article>
    </main>
  `;

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.heading,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: "FutureCents",
    },
    publisher: {
      "@type": "Organization",
      name: "FutureCents",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.futurecents.co.za/guides/${guide.slug}`,
    },
  });

  html = html.replace(
    "</head>",
    `<script type="application/ld+json">${schema}</script>\n</head>`,
  );

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${fallbackHtml}</div>`,
  );

  const guideDirectory = path.join(
    outputDirectory,
    "guides",
    guide.slug,
  );

  await mkdir(guideDirectory, { recursive: true });

  await writeFile(
    path.join(guideDirectory, "index.html"),
    html,
    "utf8",
  );

  console.log(`Created /guides/${guide.slug}/index.html`);
}