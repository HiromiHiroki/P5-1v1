# Persona-Style Portfolio — Meraj Rahman

A Persona 5 menu-inspired portfolio, structured as Model–View–Controller.

## Structure

```
├── index.html            View skeleton — markup only, no logic or styles
├── css/
│   └── style.css         All styling (theme colors in :root at the top)
├── js/
│   ├── model.js          DATA — document library (Biblioteca), skills, app state
│   ├── view.js           DOM — rendering, ransom lettering, wipe, cursor, sound
│   └── controller.js     EVENTS — keyboard/mouse input, navigation logic
└── assets/
    ├── sfx/select.mp3    Menu sound (plays on select/confirm)
    ├── cursors/          Animated cursor sprite strips (30 frames each)
    ├── menus/            per-screen backgrounds: home.jpg, skills.jpg, about.jpg,
    │                     contact.jpg (included) — add biblioteca.jpg to complete the set
    ├── cv/               your downloadable CV (linked from About + Contact)
    ├── hero.png          ← optional: extra art layered on the home screen
    ├── me.jpg            ← add: your photo for the About polaroid
    └── documentos/       ← add: your PDF files, referenced from model.js `library`
```

Missing images hide themselves — no broken icons.

## Editing content

Everything you'd normally want to change lives in **js/model.js**:
the Biblioteca's document groups (Leyes, Reglamentos, Circulares,
Instrucciones, Documentos varios) and skill bars. Each document item takes
a `title`, an optional `desc`, and a `file` path under `assets/documentos/`
— leave `file` empty and the card shows "Próximamente" instead of a link.
Bio and contact links are plain HTML in **index.html**.
Colors are CSS variables at the top of **css/style.css**.

## Run locally

```
python3 -m http.server
```
then open http://localhost:8000 — opening index.html directly (file://)
blocks the audio fetch in most browsers.

## Deploy

Push the whole folder to a GitHub repo, enable Pages
(Settings → Pages → Deploy from branch → main → / root). Done.

## Controls

↑ / ↓ select · Enter confirm · Esc back · click the name to go home
