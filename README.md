# Portfolio · Angel Zapata

Software Developer at BBVA Perú and creator of Orion Language and Flux.

**Live:** https://portfolio-angel-dev.onrender.com

## What is here

A single-page React site built around the questions someone asks when deciding
whether to keep reading: what I have built, where I have worked, what I work
with, and how to reach me.

| Section | What it shows | Component |
| --- | --- | --- |
| Home | Intro, current roles, key numbers, journey timeline and flagship projects | `src/components/HeroSection.tsx` |
| Skills | Technical and soft skills | `src/components/Habilities.tsx` |
| Experience | A timeline of parallel tracks plus tabs per role (BBVA and open source) | `src/components/Experience.tsx` |
| Projects | Filterable project cards with previews, a detail view and Product Hunt badges | `src/components/Projects.tsx` |
| Education | Degree and certifications | `src/components/Study.tsx` |
| Contact | Contact form | `src/components/Contact.tsx` |

The contact form is not a `mailto:` link. It posts to a small Express server
(`server.js`) that sends the message through Nodemailer, so the address never
ships in the client bundle and bots cannot scrape it. The email icon in the
footer goes to that form for the same reason.

## Featured work

- **[Orion Language](https://github.com/angeldevmobile/Orion)**: a programming
  language for backend work, automation and high-performance computing (HPC),
  written in Rust end to end. Three execution backends share one frontend: a
  bytecode VM, a Cranelift JIT and AOT compilation to a native binary. Its
  columnar data engine loads and aggregates 500k CSV rows about 2× faster than
  Python's `csv` module (about 6× with the binary `.odf` format). Ships as a
  single executable with 58 standard library modules, a VS Code extension and a
  browser playground. [Docs and playground](https://docs-orion.onrender.com).
- **[Flux](https://fluxapi.dev/)**: an open-source desktop API client built with
  Tauri and Rust. HTTP, WebSocket, SSE, gRPC and GraphQL in one app, with
  AI-generated tests, in under 30 MB of RAM.
- **[Seam](https://github.com/angeldevmobile/Seam)**: one schema file that
  Python, Node and the browser agree on. Published on crates.io, PyPI and npm.

All three launched on Product Hunt:
[Orion](https://www.producthunt.com/products/orion-language) ·
[Flux](https://www.producthunt.com/products/flux-modern-api-client) ·
[Seam](https://www.producthunt.com/products/seam-4).

## Stack

React 18 · TypeScript · Tailwind CSS · Framer Motion · Express · Nodemailer

## Running it locally

Requires Node 18 or newer.

```bash
npm install
npm start            # front-end on http://localhost:3000
```

The contact form also needs the server. It reads `EMAIL_USER`, `EMAIL_PASS`
and `PORT` from the environment. Locally, copy the template, fill it in, and
start the server with `dotenv` preloaded so it picks up the file:

```bash
cp .env.example .env
node -r dotenv/config server.js    # API on http://localhost:3001
```

`EMAIL_PASS` is an **app password**, not your account password. Gmail and most
providers require one for SMTP and let you revoke it on its own, without
touching the account.

`.env` is gitignored. Do not commit it.

## Building for production

```bash
npm run build        # outputs to build/
node server.js       # serves build/ and exposes POST /api/send-email
```

The same Express process serves the static build and the API, which is why the
deploy is a single service instead of two. On Render, set `EMAIL_USER` and
`EMAIL_PASS` as environment variables in the dashboard.

## Editing content

Most content lives in plain arrays at the top of each component, so updating
the site rarely means touching layout code:

| To change | Edit |
| --- | --- |
| A project, its screenshots, links or Product Hunt badge | `projects` in `src/components/Projects.tsx` |
| A role, its dates or achievements | `roles` in `src/components/Experience.tsx` |
| The journey timeline on the home page | `milestones` in `src/components/HeroSection.tsx` |
| The key numbers under the intro | `heroStats` in `src/components/HeroSection.tsx` |

Experience dates use `YYYY-MM` (or just `YYYY` when the month doesn't matter).
Durations such as "1 yr 11 mos" and the timeline bars are computed from them,
so a role with no `end` keeps growing on its own.

Project screenshots go in `src/assets/projects/`. The portfolio's own preview
is `src/assets/web.png`.
