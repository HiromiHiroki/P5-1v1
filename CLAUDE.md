# P5-1v1 — Hiromi Hiroki's Biblioteca

Persona 5 menu-styled personal site. Originally a portfolio template by
Meraj Rahman (github.com/Omicron69, instagram.com/meraz.rah) — same
interface/fonts/animations, repurposed as a personal library of legal
documents (Carabineros de Chile regulations) plus a Top Anime page and
contact info, all belonging to Hiromi Hiroki (a lawyer in Chile, not a
programmer — explain changes in plain language, in Spanish).

Live site: https://hiromihiroki.github.io/P5-1v1/
Deploys from the `main` branch via GitHub Pages (no build step, plain
static files). Work happens on branch `claude/persona5-portfolio-customize-paad7p`,
then fast-forward-merge into `main` once verified.

## Adding a new document to the Biblioteca

1. Save the PDF into `assets/documentos/` with a short kebab-case name
   (e.g. `circular-1905.pdf`).
2. Add an entry to the matching group in `Model.library` (js/model.js):
   `{ title: "...", desc: "...", file: "assets/documentos/xxx.pdf" }`.
3. **Title**: usually the document type + number, e.g. `"REGLAMENTO 11"`,
   `"CIRCULAR N° 1.905"`, `"LEY N° 18.961"`. CSS uppercases card titles
   automatically, so casing in the source doesn't matter visually.
4. **Description**: read the PDF (use the `pages` param on Read for long
   ones — it errors without it past ~10 pages) and write a short
   paraphrase: the date, who issued it, and what it does/changes, in
   plain Spanish. Follow the style of existing entries in model.js for
   tone — factual, 1-3 sentences, no legal jargon the user wouldn't use
   verbatim.
5. Bump the cache-busting version query in `index.html` on the three
   `<script src="js/....js?v=N">` tags (`N` → `N+1`) — browsers cache
   these hard, and skipping this has caused real "my changes aren't
   showing up" confusion before.
6. Test locally before pushing: `python3 -m http.server <port>` from the
   repo root, then drive it with Playwright (chromium is preinstalled;
   launch with `require('/opt/node22/lib/node_modules/playwright')`,
   `PLAYWRIGHT_BROWSERS_PATH` is already set) — click into Biblioteca,
   confirm the new card renders, links to the right file, and there are
   no console errors.
7. Commit, push to `claude/persona5-portfolio-customize-paad7p`, then
   fast-forward merge into `main` and push `main` too — the live site
   only updates from `main`.

## Document groups (in `Model.library`, js/model.js)

Render top to bottom in this order:

- **Leyes** — `sortNumeric: true`
- **Reglamentos** — `featured: true` (dark card style), manual order
- **Órdenes generales** — `sortNumeric: true`
- **Circulares** — `sortNumeric: true`
- **Instrucciones** — manual insertion order
- **DOE** — manual insertion order (Documento Electrónico Ordinario —
  internal decisions/instructions, identified by N.C.U. number)
- **Documentos varios** — manual insertion order, catch-all for anything
  that doesn't fit the other categories

An item can set `encrypted: true` to show "ENCRIPTADO" instead of
"DISPONIBLE" in its card (still a working link — used for source PDFs
that are password-protected). If the user gives you a password to open
one for reading/summarizing, that's for your use only — do not put the
password in the description or anywhere else on the public site unless
the user explicitly asks you to publish it.

`sortNumeric: true` groups auto-sort ascending by the first number found
in each item's title (see `View.orderNumber` in js/view.js) — e.g.
Reglamento 1, 11, 14, 15 in that order regardless of upload order. Only
apply this flag to groups the user has asked for it on (Leyes, Órdenes
generales, Circulares) — Instrucciones and Documentos varios are
deliberately manual/insertion-order per the user's explicit preference.

An item with no `file` set renders as a non-clickable "PRÓXIMAMENTE"
card instead of a link — used for documents mentioned but not yet
uploaded (e.g. don't invent a description/file for something the user
hasn't sent yet).

## Top Anime screen (formerly "Skills")

`Model.animeList` in js/model.js: completed-only anime from the user's
MyAnimeList export (myanimelist.net/animelist/HiromiHiroki), sorted by
score descending (ties broken alphabetically), score scale 1-10.
Paginated 20 per page (`Model.animePageSize`) via Anterior/Siguiente
buttons in `View.renderTopAnime` / `Controller.changeAnimePage` — do not
render the full list unpaginated, it was tested at 302 items and made
the page ~16,600px of scroll with a broken-looking staggered fill
animation (60ms per row × 302 rows ≈ 18s).

To add newly-finished anime: get an updated MAL export (or the specific
title + score) from the user, insert into the sorted array, no other
code changes needed.

## Content already removed from the original template

The old owner's photo, CV, bio, and unrelated contact links (GitHub,
YouTube, BSL Game project) were deliberately removed as part of the
rebrand — don't re-add them. The About section ("Sobre mí") keeps an
explicit credit paragraph to Meraj Rahman with links to his Instagram
and GitHub; leave that credit in place unless the user asks to remove
it.

## Known gotchas

- `.gitattributes` marks `*.pdf/*.png/*.jpg/*.jpeg/*.mp3` as `binary` —
  don't remove that, it was added after a PDF got committed with git
  treating it as text (numstat showed thousands of "line insertions"
  for a single binary file, a sign the rule regressed).
- Ransom-lettering (`data-ransom` spans) needs **separate `<span
  class="ransom">` elements per word**, not one span with a space in
  the title string — the jitter/rotation per letter otherwise eats the
  word gap and two-word labels read as one merged word. See
  `.ransom + .ransom{margin-left:.3em}` in css/style.css and how
  "SOBRE MÍ" / "TOP ANIME" are split into two spans in index.html.
- `#screen-home` centers its content vertically; on short viewports a
  long tagline can overflow above the visible area and become
  genuinely unreachable, not just scrolled past (a flexbox
  centering+overflow quirk). Fixed via `justify-content:safe center` —
  keep that if editing the home tagline further.
