# Docs are software: design principles for docs.mirantis.com

## Core premise

Documentation that lives in Markdown files checked into git, built by a tool with a programmable pipeline, and deployed like any other software artifact — that is software. It has the same properties you want from software: version control, CI/CD, testability, composability, and automation hooks.

The choice of tooling matters because it determines how much of the docs pipeline you can own, extend, and automate versus how much you are at the mercy of someone else's product decisions.

## AI discoverability and usability

### The crawlability prerequisite

Any documentation site must be built as a **static site (SSG)** — not a JavaScript SPA. Static site generation means the build tool runs once at build time and produces a folder of pre-rendered HTML files, one per page. Every URL returns complete, readable HTML without requiring JavaScript execution.

This is non-negotiable for AI discoverability. A crawler or AI agent fetching a page URL must receive real content. A SPA returns an empty shell; the content exists only after JavaScript runs in a browser. AI crawlers (ClaudeBot, GPTBot, etc.) and RAG pipeline crawlers do not execute JavaScript.

### llms.txt

Place a file at `/llms.txt` on the root domain. This is a markdown document — not machine-parseable structured data, but prose and links — that tells AI assistants what the site is, how it's organized, and where to start for different user intents.

For docs.mirantis.com this is especially valuable because the IA is non-obvious: the same products appear in multiple navigational contexts (product docs, platform universe, solution guides, compatibility). Without explicit guidance, an AI assistant is likely to conflate these contexts or route users to the wrong one.

`llms.txt` is the place to encode the menus-as-projections reasoning explicitly — for AI consumption, before it reads anything else.

A companion `llms-full.txt` can contain a more comprehensive listing of all pages.

### Standard metadata

Every page should carry:

- A specific, accurate `<title>`
- A `<meta name="description">` that reflects actual page content
- A `<link rel="canonical">` — especially important given URL aliasing (`/mke` → `/mke/latest`)
- A `sitemap.xml` generated automatically from page data

### Page-type metadata

Each page should declare what kind of answer it provides:

```html
<meta name="doc-type" content="product-latest">
<meta name="doc-product" content="mke">
<meta name="doc-version" content="4.1.3">
<meta name="doc-status" content="current">
```

Without this, an AI retrieving both `/mke/latest` and `/platforms/enterprise-kubernetes` has no reliable way to distinguish "product how-to docs" from "platform-universe narrative docs" — they both mention MKE extensively.

### Compatibility data as tables, not prose

Compatibility matrices must be structured HTML tables with meaningful headers and cell values. An AI asked "what version of MSR works with MKE 4.1.3?" needs a table it can read directly. Prose that describes compatibility ("MKE 4.1.1 includes k0rdent Platform as a services manager") requires natural-language parsing and is unreliable for precise version questions.

### What is genuinely AI-specific vs. just good documentation practice

Most of what makes documentation AI-usable is the same as what makes it good documentation: clear page titles, accurate descriptions, well-structured headings, pages that answer one question well, and explicit disambiguation when product names are ambiguous.

The things that are specifically AI-oriented:
- `llms.txt` (AI navigation guide)
- Page-type metadata (lets AI retrieval distinguish page roles)
- Machine-readable compatibility data (tables, not prose)
- Version currency signals (`doc-status: current` vs. `archived`)

JSON-LD structured data (Schema.org) adds further value but is downstream of getting the above right.

## Tool selection criteria

### Community size is no longer the dominant factor

The traditional reason community size mattered was that you would hit an obscure problem and need a human who had seen it before — Stack Overflow, GitHub issues, Slack communities. These were social workarounds for inadequate documentation and the inherent limits of one person's knowledge.

That reason is largely gone. An AI assistant can reason from a tool's own source code and official documentation. A smaller, well-documented, well-structured tool is now more useful than a larger, messier one.

### Criteria that survive

- **Active maintenance** — the tool must keep pace with security and ecosystem changes
- **Legible codebase and documentation** — AI reasons from what it can read; clean, well-documented tools are more usable than large but messy ones
- **Clean primitives over magic** — tools that expose what they do are easier to extend and debug than tools that hide their operation behind abstractions
- **Programmable pipeline** — the ability to generate sitemaps, inject per-page metadata, emit a JSON manifest of the IA, and run custom build steps is more valuable than a large ecosystem of pre-built plugins

### Specific to this project

The prototype is built on Vite + React. For the production site, **VitePress** (documentation-focused SSG, Vite-based, Markdown-driven) or **Astro** (framework-agnostic SSG, Vite-based, excellent for content sites) are natural candidates. Both satisfy the SSG requirement and the programmable pipeline requirement.

Docusaurus (the most widely-used technical docs tool) uses Webpack rather than Vite, but would also be a valid choice — the ecosystem-familiarity argument for Vite is a convenience, not a strong technical constraint.

## Relationship to the IA prototype

The click-through prototype at `/proto-toc` models the IA as data: a `pages` array and a `menus` object that together constitute a knowledge graph of the documentation structure. Every page has a canonical URL, aliases, a typed menu assignment, a title, and a rich description.

This data model transfers directly to a production static site. The `pages` array becomes the source of truth for sitemap generation, `llms.txt` generation, and per-page metadata injection. The `menus` object becomes the source of truth for navigation components.

The work done in the prototype is not throwaway — it is a specification for the production site's content model.
