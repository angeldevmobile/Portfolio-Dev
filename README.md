# Portfolio — Angel Zapata

Personal portfolio site. Full Stack Developer and AI Engineer.

**Live:** https://portfolio-angel-dev.onrender.com

## What is here

A single-page React site with the sections that matter when someone is deciding
whether to keep reading: what I have built, what I work with, where I have
worked, and how to reach me.

| Section | Component |
| --- | --- |
| Hero | `src/components/HeroSection.tsx` |
| Projects | `src/components/Projects.tsx` |
| Skills | `src/components/Habilities.tsx` |
| Experience | `src/components/Experience.tsx` |
| Education | `src/components/Study.tsx` |
| Contact | `src/components/Contact.tsx` |

The contact form is not a `mailto:` link. It posts to a small Express server
(`server.js`) that sends the message through Nodemailer, so the address never
ships in the client bundle and bots cannot scrape it.

## Stack

React 18 · TypeScript · Tailwind CSS · Framer Motion · Express · Nodemailer

## Running it locally

```bash
npm install
npm start            # front-end on http://localhost:3000
```

The contact form also needs the server:

```bash
node server.js       # API on http://localhost:3001
```

It reads its configuration from a `.env` file. Copy the template and fill it in:

```bash
cp .env.example .env
```

`EMAIL_PASS` is an **app password**, not your account password. Gmail and most
providers require one for SMTP and let you revoke it on its own, without
touching the account.

`.env` is gitignored. Do not commit it.

## Building for production

```bash
npm run build        # outputs to build/
node server.js       # serves build/ and exposes the contact endpoint
```

The same Express process serves the static build and the API, which is why the
deploy is a single service instead of two.

## Featured project

The one I would point at first is [**Orion**](https://github.com/angeldevmobile/Orion):
a programming language for backend work and automation, written in Rust end to
end. It compiles to bytecode with three execution backends sharing one frontend
— a VM, a Cranelift JIT, and AOT compilation to a native binary — and ships as a
single executable with 58 standard library modules, a VS Code extension and a
browser playground.

Docs and playground: https://docs-orion.onrender.com
