/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: the Biblioteca document groups, skills, image overrides.
   ===================================================================== */

const Model = {

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "esegueldelafuente@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    libraryBuilt: false,
    skillsBuilt: false,
  },

  // ---- Biblioteca: legal document library, grouped by category ----
  // Groups render top to bottom in this order. Each item needs a `title`;
  // `desc` and `file` can stay empty while a document is still pending —
  // it then shows a "Próximamente" card instead of a link. Once a PDF is
  // ready, drop it in assets/documentos/ and point `file` at it.
  library: [
    {
      label: "Leyes",
      items: [],
    },
    {
      label: "Reglamentos",
      featured: true,
      items: [
        { title: "REGLAMENTO 11", desc: "Reglamento de disciplina de Carabineros de Chile Nº 11", file: "assets/documentos/reglamento-11.pdf" },
        { title: "REGLAMENTO 15", desc: "Reglamento de sumario administrativo de Carabineros de Chile Nº 15", file: "assets/documentos/reglamento-15.pdf" },
      ],
    },
    {
      label: "Circulares",
      items: [],
    },
    {
      label: "Instrucciones",
      items: [
        {
          title: "Instructivo Dijuscar N° 1 (análisis artículo 86° Reglamento N° 15)",
          desc: "Instructivo de la Dirección de Justicia de Carabineros que analiza la jurisprudencia de la Contraloría General de la República sobre el artículo 86° del Reglamento de Sumarios N° 15, e instruye que la baja por conducta mala con efectos inmediatos y la resolución del sumario corresponden al mando directo del funcionario involucrado, no al mando territorial del lugar del hecho.",
          file: "assets/documentos/instructivo-dijuscar-1.pdf",
        },
      ],
    },
    {
      label: "Documentos varios",
      items: [],
    },
  ],

  // ---- Skills screen ----
  skills: [
    { group: "AI · ML · Data Science", items: [
      ["Python · pandas · NumPy", 92], ["TensorFlow / Keras · PyTorch", 88],
      ["scikit-learn · XGBoost", 86], ["CNNs & Transfer Learning", 85],
      ["NLP & Transformers", 82], ["Computer Vision · MediaPipe", 86],
    ]},
    { group: "Web & Full-Stack", items: [
      ["JavaScript / TypeScript", 86], ["React · React Native · Next.js", 84],
      ["Node.js · REST APIs", 80], ["TensorFlow.js (in-browser ML)", 84],
      ["PHP · SQL · PostgreSQL", 74], ["UX Design · Figma · Adobe XD", 82],
    ]},
    { group: "Cloud & Engineering", items: [
      ["Git & GitHub", 88], ["AWS · Azure · GCP", 74],
      ["Docker · Firebase", 76], ["Agile · PRINCE2 Agile", 80],
      ["Tableau · Power BI", 72], ["Bash · PowerShell", 75],
    ]},
    { group: "Spoken Languages", items: [
      ["English · Bengali · Hindi · Urdu", 100], ["Japanese (JLPT N4)", 62], ["Mandarin", 30],
    ]},
  ],
};
