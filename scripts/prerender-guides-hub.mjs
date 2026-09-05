import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputDirectory = path.join(projectRoot, "dist", "public");
const sourceFile = path.join(outputDirectory, "index.html");
const guidesDirectory = path.join(outputDirectory, "guides");
const outputFile = path.join(guidesDirectory, "index.html");

const pageTitle =
  "Small Business Accounting Guides in South Africa | FutureCents";

const pageDescription =
  "Practical bookkeeping, tax compliance and payroll guides for South African small businesses and owner-managed companies.";

const guides = [
  {
    title: "Small business bookkeeping in South Africa",
    description:
      "Learn how bookkeeping works, which records to keep and why accurate financial information matters.",
    href: "/guides/bookkeeping-south-africa",
  },
  {
    title: "Small business tax compliance in South Africa",
    description:
      "Understand the records, processes and communication habits that support better tax compliance.",
    href: "/guides/tax-compliance-south-africa",
  },
  {
    title: "Payroll for small businesses in South Africa",
    description:
      "Understand payroll administration, payslips, payroll records, PAYE, UIF and monthly payroll processes.",
    href: "/guides/payroll-south-africa",
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

const guideLinks = guides
  .map(
    (guide) => `
      <article>
        <h2>${escapeHtml(guide.title)}</h2>
        <p>${escapeHtml(guide.description)}</p>
        <p>
          <a href="${guide.href}">Read the guide</a>
        </p>
      </article>
    `,
  )
  .join("");

const fallbackHtml = `
  <main>
    <header>
      <p>FutureCents guides</p>
      <h1>Practical accounting guides for South African small businesses</h1>
      <p>
        Clear, practical information to help you understand bookkeeping,
        tax compliance, payroll and the financial side of running a business.
      </p>
    </header>

    <section aria-labelledby="guides-heading">
      <h2 id="guides-heading">Small business finance guides</h2>
      ${guideLinks}
    </section>

    <p>
      <a href="/services">View FutureCents services</a>
    </p>

    <p>
      <a href="/#contact">Contact FutureCents</a>
    </p>
  </main>
`;

const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle,
  description: pageDescription,
  url: "https://www.futurecents.co.za/guides",
  hasPart: guides.map((guide) => ({
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: `https://www.futurecents.co.za${guide.href}`,
  })),
});

let html = await readFile(sourceFile, "utf8");

if (!html.includes('<div id="root"></div>')) {
  throw new Error("Could not find <div id=\"root\"></div> in index.html");
}

html = html.replace(
  /<title>[\s\S]*?<\/title>/i,
  `<title>${escapeHtml(pageTitle)}</title>`,
);

html = replaceMetaContent(
  html,
  'name="description"',
  pageDescription,
);

html = replaceMetaContent(
  html,
  'property="og:title"',
  pageTitle,
);

html = replaceMetaContent(
  html,
  'property="og:description"',
  pageDescription,
);

html = replaceMetaContent(
  html,
  'property="og:url"',
  "https://www.futurecents.co.za/guides",
);

html = replaceMetaContent(
  html,
  'name="twitter:title"',
  pageTitle,
);

html = replaceMetaContent(
  html,
  'name="twitter:description"',
  pageDescription,
);

html = html.replace(
  /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
  "$1https://www.futurecents.co.za/guides$2",
);

html = html.replace(
  "</head>",
  `<script type="application/ld+json">${schema}</script>\n</head>`,
);

html = html.replace(
  '<div id="root"></div>',
  `<div id="root">${fallbackHtml}</div>`,
);

await mkdir(guidesDirectory, { recursive: true });
await writeFile(outputFile, html, "utf8");

console.log("Created /guides/index.html");