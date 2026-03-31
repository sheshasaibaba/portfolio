/**
 * Source-of-truth profile content. Mapped in `data.ts` / `experience.ts`.
 */

export const personalInfo = {
  name: "Sheshasaibaba Gujjari",
  title: "Senior Full Stack Software Engineer",
  location: "Canada (Remote-ready)",
  phone: "306-880-5568",
  email: "sheshasaibabagujjari@gmail.com",
  github: "https://github.com/sheshasaibaba",
  linkedin: "https://www.linkedin.com/in/sheshasaibaba-gujjari-05716b2a5/",
  resumeUrl: "/resume.pdf",
  bio: "Senior Software Engineer with 7 years of experience bridging enterprise stability and modern AI automation. Specialized in transforming manual, data-intensive bottlenecks into scalable, cloud-native architectures through custom RAG pipelines and CI/CD automation.",
} as const;

/** Rich About section (hero uses `bio`; this is the full narrative). */
export const aboutContent = {
  lead:
    "Senior Software Engineer with 7 years of experience bridging enterprise stability and modern AI automation. Specialized in transforming manual, data-intensive bottlenecks into scalable, cloud-native architectures through custom RAG pipelines and CI/CD automation.",
  pillars: [
    {
      title: "Efficiency architect",
      body: "I specialize in finding data-intensive bottlenecks and reducing operational overhead, historically by as much as 70%, through custom automation tools and cloud-native architectures.",
    },
    {
      title: "Full-spectrum engineering",
      body: "From provisioning automated pre-production environments on Azure/AWS to delivering WCAG-compliant, accessible UIs for institutional clients like the Washington State Board (SBCTC).",
    },
    {
      title: "AI integration",
      body: "I don’t just call APIs, I build data processing pipelines. Hands-on with training NLP workflows, manually structuring vector datasets for RAG, and deploying local LLMs for unstructured data problems.",
    },
  ],
} as const;

/** Stack logos: `lib/tech-stack-icons.tsx` (react-icons). Only Zustand uses `public/icons/zustand.svg`. */
export const techStackSource = [
  {
    category: "Languages",
    emoji: "💬",
    items: [
      { label: "TypeScript", emoji: "📘" },
      { label: "JavaScript (ES6+)", emoji: "🟨" },
      { label: "Java", emoji: "☕" },
      { label: "Python", emoji: "🐍" },
      { label: "SQL", emoji: "🗃️" },
      { label: "PHP", emoji: "🐘" },
      { label: "Solidity", emoji: "⛓️" },
    ],
  },
  {
    category: "Frontend",
    emoji: "🖥️",
    items: [
      { label: "React", emoji: "⚛️" },
      { label: "Next.js 16", emoji: "▲" },
      { label: "Angular (v8–14)", emoji: "🅰️" },
      { label: "React Native", emoji: "📱" },
      { label: "Zustand", emoji: "🐻" },
      { label: "TanStack Query", emoji: "🔁" },
      { label: "Tailwind CSS", emoji: "🎨" },
      { label: "Highcharts", emoji: "📊" },
      { label: "Shadcn UI", emoji: "🧩" },
      { label: "Material UI", emoji: "🎯" },
      { label: "HTML5 / CSS3", emoji: "📝" },
    ],
  },
  {
    category: "Backend & security",
    emoji: "🔐",
    items: [
      { label: "Node.js", emoji: "🟢" },
      { label: "Express.js", emoji: "🚂" },
      { label: "FastAPI", emoji: "⚡" },
      { label: "Spring Boot / Security", emoji: "🍃" },
      { label: "JWT / OAuth 2.0 (Okta/OIDC)", emoji: "🪪" },
      { label: "Hibernate", emoji: "🧱" },
      { label: "RabbitMQ", emoji: "🐰" },
      { label: "Spring Batch", emoji: "📦" },
      { label: "REST API design", emoji: "🔌" },
    ],
  },
  {
    category: "AI & data",
    emoji: "🧠",
    items: [
      { label: "LangChain", emoji: "⛓️" },
      { label: "RAG", emoji: "🔎" },
      { label: "FAISS", emoji: "🧮" },
      { label: "Ollama", emoji: "🦙" },
      { label: "NLP / OCR", emoji: "📄" },
      { label: "InsightFace / DeepFace", emoji: "👤" },
      { label: "Scikit-learn", emoji: "📐" },
      { label: "Pandas / NumPy", emoji: "📈" },
      { label: "PostgreSQL", emoji: "🐘" },
      { label: "MongoDB", emoji: "🍃" },
    ],
  },
  {
    category: "Cloud & DevOps",
    emoji: "☁️",
    items: [
      { label: "AWS", emoji: "🟠" },
      { label: "Azure", emoji: "🔷" },
      { label: "Google Cloud Run", emoji: "🏃" },
      { label: "Cloudflare", emoji: "🛡️" },
      { label: "Docker", emoji: "🐳" },
      { label: "Jenkins", emoji: "🤵" },
      { label: "GitHub Actions", emoji: "🚀" },
      { label: "Git", emoji: "📎" },
      { label: "Maven / Linux", emoji: "🛠️" },
      { label: "Vite / Vitest / Playwright", emoji: "✅" },
      { label: "Alembic / uv", emoji: "🔧" },
    ],
  },
] as const;

export const projectsSource = [
  {
    id: "taxbynav",
    title: "TaxByNav",
    technicalHighlight:
      "Zero-cost architecture, Cloud Run + Cloudflare, tuned for a true $0 ops footprint (cost optimization at the core).",
    description:
      "Live production SaaS for tax filing and appointments: zero recurring infra spend while staying secure and scalable.",
    tags: ["FastAPI", "Next.js 16", "PostgreSQL", "Google SSO", "Cloud Run"],
    link: "https://taxbynav.com",
    github: "https://github.com/sheshasaibaba/taxbynav",
    image: "/projects/taxbynav.svg",
    details:
      "JWT + refresh, Google SSO, async appointment engine, Gmail SMTP, real clients, ~$0/mo server overhead.",
    narrative: {
      problem:
        "A tax filing client needed a robust, secure platform with appointment booking under a strict zero recurring monthly infrastructure budget.",
      solution:
        "I architected a “zero-cost” cloud shape: FastAPI on Google Cloud Run (free-tier scaling) and a Next.js frontend on Cloudflare Pages.",
      technicalDeepDive: [
        "JWT authentication with refresh tokens and Google SSO for a smooth login path.",
        "Custom asynchronous appointment engine (SQLModel + SQLAlchemy): 30-minute slots with automatic cleanup of stale data.",
        "Gmail SMTP for automated admin alerts and client confirmations.",
      ],
      impact:
        "Delivered a real-world business tool that processes actual clients with nearly $0/month in server overhead.",
    },
  },
  {
    id: "sgi-chatbot",
    title: "SGI Handbook RAG Chatbot",
    technicalHighlight:
      "Hybrid retrieval with dense + sparse vectors, math-aware grounding, not just API glue.",
    description:
      "High-precision QA over the SGI Driver’s Handbook, using hybrid retrieval to cut hallucinations and retrieval latency.",
    tags: ["Python", "LangChain", "FAISS", "Llama-3.1", "FastAPI", "RRF"],
    link: "https://github.com/sheshasaibaba/sgi-rag-chatbot",
    github: "https://github.com/sheshasaibaba/sgi-rag-chatbot",
    image: "/projects/sgi-rag.svg",
    details:
      "Manual PDF structuring for vectors, FAISS + TF-IDF with RRF, Cross-Encoder re-ranking, sub-2s responses.",
    narrative: {
      mission: "Remove friction from searching dense driver handbooks with a context-aware, high-precision QA system.",
      innovation:
        "Avoided the classic LLM hallucination trap with a hybrid retrieval pipeline instead of “chat the PDF” only.",
      technicalDeepDive: [
        "Manually curated and indexed the handbook PDF into structured text for better vector search.",
        "Retrieval: FAISS dense search + TF-IDF sparse search combined with Reciprocal Rank Fusion (RRF).",
        "Re-ranking: Cross-Encoder on top-k chunks, cutting manual lookup time by about 60%.",
        "Stack: Python, LangChain, Llama-3.1, FastAPI.",
      ],
    },
  },
  {
    id: "blockveritas",
    title: "BlockVeritas",
    technicalHighlight: "Hybrid on-chain + IPFS, ~95% lower storage cost vs naive all-on-chain metadata.",
    description:
      "Community-driven news verification dApp: Proof-of-Reputation voting and Sybil-resistant jury mechanics.",
    tags: ["Solidity", "Ethereum", "IPFS", "Pinata"],
    link: "#",
    github: "#",
    image: "/projects/blockveritas.svg",
    details:
      "PoR voting, weighted jury in Solidity, metadata on IPFS (Pinata) with hashes anchored on-chain.",
    narrative: {
      mission: "Combat centralized media bias with a transparent, community-driven verification platform.",
      technicalDeepDive: [
        "Proof-of-Reputation (PoR): users vote on content veracity with reputation-weighted outcomes.",
        "~95% storage cost reduction: hybrid model with metadata on IPFS via Pinata and cryptographic hashes on Ethereum.",
        "Weighted jury mechanism in Solidity to mitigate Sybil-style attacks.",
      ],
    },
  },
] as const;

export const experienceSource = [
  {
    id: "exp-clode",
    timelineLabel: "2025–26",
    role: "Frontend Developer",
    company: "Clode",
    companyShort: "Clode",
    period: "Nov 2025 – Mar 2026",
    tenureLabel: "~5 months",
    description:
      "Built optimized front-end interfaces for AI agents focused on high performance and minimal API overhead.",
    color: "#A855F7",
    highlights: [
      "Requested and implemented Socket integration to replace API polling for real-time agent feedback.",
      "Architected complex Canvas logic in React Flow using Dagre layouts for service visualization.",
      "Delivered complex form-building solutions with TanStack optimizations and virtualization for performance.",
      "Managed application state using Zustand stores and maintained best practices to minimize Git conflicts.",
      "Suggested architectural improvements for Go and OpenClaw backends to enhance AI agent interaction.",
    ],
  },
  {
    id: "exp-ktech-nlp",
    timelineLabel: "2021–25",
    role: "Machine Learning Engineer",
    company: "Ktech Products",
    companyShort: "Ktech",
    period: "May 2021 – Sep 2025",
    tenureLabel: "4 years",
    description:
      "Completed 40 full production pipelines to extract and parse scores from transcripts across various templates.",
    color: "#C026D3",
    highlights: [
      "Developed custom logic using PyOCR and PaddleOCR to handle hard-to-read PDFs and dual-column page splits.",
      "Managed a one-man team for manual data engineering and NLP training across multiple high-priority projects.",
      "Implemented data cleaning using custom prompts via Ollama models to remove document noise.",
      "Established a cross-verification cycle using secondary LLM models to validate extracted data accuracy.",
      "Serialized complex transcript data into structured JSON objects for storage in SQL databases.",
    ],
  },
  {
    id: "exp-ktech-sbctc",
    timelineLabel: "2021–25",
    role: "Software Engineer (Full Stack)",
    company: "Ktech Products",
    companyShort: "Ktech",
    period: "May 2021 – Sep 2025",
    tenureLabel: "4 years",
    description:
      "Managed two full MEAN stack projects and supported additional MERN/React Native projects with SQL backends.",
    color: "#3B82F6",
    stackBadges: [
      "Angular",
      "Node.js",
      "MongoDB",
      "React Native",
      "OKTA/OIDC",
      "JWT",
      "Swagger",
      "WCAG",
      "Zoho",
    ],
    highlights: [
      "Trained and mentored 6 new hires on technical workflows, coding standards, and internal professional practices.",
      "Design and build security features including manual JWT creation, OKTA integration, and Swagger documentation.",
      "Designed and developed a custom MongoDB Query Builder using Angular and Node.js to enable client-side data fetching.",
      "Resolved critical production issues and server crashes through proactive log monitoring and bug fixes.",
      "Led task management and sprint planning in Zoho, assigning user stories and conducting peer reviews.",
      "Engineered end-to-end features including WCAG compliance from UI design to deployment.",
    ],
  },
  {
    id: "exp-vara",
    timelineLabel: "2019–21",
    role: "Java Developer",
    company: "Vara Technologies",
    companyShort: "Vara",
    period: "Feb 2019 – Mar 2021",
    tenureLabel: "~2 years",
    description:
      "Created Hibernate entities for database mapping and wrote optimized SQL and HQL queries.",
    color: "#10B981",
    highlights: [
      "Developed front-end UI elements and handled AJAX calls using JSP, HTML, and JavaScript.",
      "Integrated Google Maps API for real-time mobile device tracking within the web application.",
      "Provided direct technical support to clients to resolve production issues and maintain stability.",
    ],
  },
] as const;
