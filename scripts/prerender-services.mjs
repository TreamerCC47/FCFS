import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "dist", "public");
const sourceFile = path.join(outputDirectory, "index.html");
const servicesDirectory = path.join(outputDirectory, "services");
const outputFile = path.join(servicesDirectory, "index.html");

const pageTitle =
  "Accounting, Tax & Bookkeeping Services in South Africa | FutureCents";

const pageDescription =
  "Bookkeeping, tax compliance, payroll, financial statements and business support for South African small businesses and owner-managed companies.";

const services = [
  {
    title: "Monthly Bookkeeping",
    description:
      "Accurate financial records, reconciliations and monthly reporting for South African small businesses.",
  },
  {
    title: "Tax and SARS Compliance",
    description:
      "Practical support with tax returns, VAT, provisional tax and SARS compliance deadlines.",
  },
  {
    title: "Payroll Administration",
    description:
      "Monthly payroll processing, payslips, PAYE, UIF and employee record support.",
  },
  {
    title: "Annual Financial Statements",
    description:
      "Clear financial statements for compliance, funding applications, tenders and decision-making.",
  },
  {
    title: "Company Registration and Setup",
    description:
      "Support with company registration and establishing a practical financial foundation.",
  },
  {
    title: "Compliance Certificates and Registrations",
    description:
      "Support with tax clearance, VAT registration, PAYE registration and CIPC amendments.",
  },
  {
    title: "Business Advisory",
    description:
      "Cash-flow forecasting, budgeting, profitability reviews and practical financial guidance.",
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

const servicesHtml = services
  .map(
    (service) => `
      <article>
        <h2>${escapeHtml(service.title)}</h2>
        <p>${escapeHtml(service.description)}</p>
      </article>
    `,
  )
  .join("\n");

const fallbackHtml = `
  <main>
    <header>
      <p>FutureCents services</p>
      <h1>Accounting and tax services for South African small businesses</h1>
      <p>
        FutureCents helps owner-managed businesses stay organised,
        understand their numbers and keep their financial work moving in the
        right direction.
      </p>
      <p>
        <a href="/#contact">Request a quote</a>
        <a href="https://wa.me/27816733268">Chat with FutureCents on WhatsApp</a>
      </p>
    </header>

    <section aria-labelledby="services-heading">
      <h2 id="services-heading">
        Practical support for every stage of your business
      </h2>
      ${servicesHtml}
    </section>

    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">Tell us what your business needs</h2>
      <p>
        We can help you understand your current position and recommend the
        right next step.
      </p>
      <p>
        <a href="/#contact">Send an enquiry</a>
      </p>
    </section>
  </main>
`;

const servicesSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FutureCents accounting and tax services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    description: service.description,
  })),
});

let html = await readFile(sourceFile, "utf8");

if (!html.includes('<div id="root"></div>')) {
  throw new Error("Could not find the empty React root in dist/public/index.html");
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
  "https://www.futurecents.co.za/services",
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
  `$1https://www.futurecents.co.za/services$2`,
);

html = html.replace(
  "</head>",
  `<script type="application/ld+json">${servicesSchema}</script>\n</head>`,
);

html = html.replace(
  '<div id="root"></div>',
  `<div id="root">${fallbackHtml}</div>`,
);

await mkdir(servicesDirectory, { recursive: true });
await writeFile(outputFile, html, "utf8");

console.log(`Created ${path.relative(projectRoot, outputFile)}`);