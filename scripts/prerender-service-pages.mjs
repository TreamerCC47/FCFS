import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "dist", "public");
const sourceFile = path.join(outputDirectory, "index.html");

const pages = [
  {
    slug: "bookkeeping",
    title: "Bookkeeping Services for Small Businesses | FutureCents",
    description:
      "Professional bookkeeping support for South African small businesses, freelancers and owner-managed companies.",
    heading: "Reliable bookkeeping for South African small businesses",
    intro:
      "Keep your business records accurate, organised and ready for better decisions.",
  },
  {
    slug: "tax-compliance",
    title: "Tax and SARS Compliance Services | FutureCents",
    description:
      "Tax and SARS compliance support for South African small businesses, including provisional tax, income tax and VAT guidance.",
    heading: "Tax compliance support for South African businesses",
    intro:
      "Stay prepared for SARS deadlines with practical tax support built around your business.",
  },
  {
    slug: "payroll",
    title: "Payroll Services for Small Businesses | FutureCents",
    description:
      "Payroll administration for South African small businesses, including payslips, PAYE, UIF, EMP201 and EMP501 support.",
    heading: "Payroll administration for growing businesses",
    intro:
      "Make monthly payroll simpler with accurate records, payslips and submission support.",
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
  throw new Error("Could not find <div id=\"root\"></div> in dist/public/index.html");
}

for (const page of pages) {
  let html = baseHtml;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
  );

  html = replaceMetaContent(
    html,
    'name="description"',
    page.description,
  );

  html = replaceMetaContent(
    html,
    'property="og:title"',
    page.title,
  );

  html = replaceMetaContent(
    html,
    'property="og:description"',
    page.description,
  );

  html = replaceMetaContent(
    html,
    'property="og:url"',
    `https://www.futurecents.co.za/services/${page.slug}`,
  );

  html = replaceMetaContent(
    html,
    'name="twitter:title"',
    page.title,
  );

  html = replaceMetaContent(
    html,
    'name="twitter:description"',
    page.description,
  );

  html = html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
    `$1https://www.futurecents.co.za/services/${page.slug}$2`,
  );

  const fallbackHtml = `
    <main>
      <header>
        <p>FutureCents services</p>
        <h1>${escapeHtml(page.heading)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <p>
          <a href="/#contact">Request a quote</a>
          <a href="https://wa.me/27816733268">
            Chat with FutureCents on WhatsApp
          </a>
        </p>
      </header>

      <section>
        <h2>How FutureCents can help</h2>
        <p>
          FutureCents provides practical financial support for South African
          small businesses, freelancers and owner-managed companies.
        </p>
        <p>
          <a href="/services">View all FutureCents services</a>
        </p>
      </section>
    </main>
  `;

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${fallbackHtml}</div>`,
  );

  const pageDirectory = path.join(
    outputDirectory,
    "services",
    page.slug,
  );

  await mkdir(pageDirectory, { recursive: true });

  await writeFile(
    path.join(pageDirectory, "index.html"),
    html,
    "utf8",
  );

  console.log(`Created /services/${page.slug}/index.html`);
}