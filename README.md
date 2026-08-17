# FutureCents

FutureCents is a standalone React + Vite marketing website for an accounting
and compliance partner serving South African small businesses.

This folder is intentionally self-contained. It does not require Replit
packages, workspace aliases, a database, an API server, or environment
secrets.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The other useful commands are:

```bash
npm run typecheck
npm run build
npm run preview
```

The production files are generated in `dist/public`.

## Publish with GitHub Pages

The repository includes a GitHub Actions workflow at
`.github/workflows/futurecents-pages.yml`. Enable GitHub Pages for the
repository and choose **GitHub Actions** as the source. Every push to
`main` will build and publish the site.

For a project-page URL such as `https://your-name.github.io/your-repo/`, the
workflow passes the repository path to Vite automatically. Local development
continues to use `/` as its base path.

## Contact form

The enquiry form currently validates the fields and shows a success state in
the browser. It does not send email or save submissions because this is a
static site. Connect it to a form provider or your own backend when you are
ready to receive enquiries.