/**
 * Source-of-truth profile content. Mapped in `data.ts` / `experience.ts`.
 */

export const personalInfo = {
  name: "Sheshasaibaba Gujjari",
  title: "Senior Full Stack Engineer & AI Specialist",
  email: "sheshasaibabagujjari@gmail.com",
  github: "https://github.com/sheshasaibaba",
  linkedin: "https://www.linkedin.com/in/sheshasaibaba-gujjari-05716b2a5/",
  resumeUrl: "/resume.pdf",
  bio: "Senior Full Stack Engineer with 7 years of experience at the intersection of enterprise-grade stability and AI automation — from Java/Spring ecosystems to TypeScript frontends and RAG pipelines.",
} as const;

/** Rich About section (hero uses `bio`; this is the full narrative). */
export const aboutContent = {
  lead:
    "I am a Senior Full Stack Engineer with 7 years of experience situated at the intersection of enterprise-grade stability and cutting-edge AI automation. My career has been defined by a transition from building high-concurrency Java/Spring Boot ecosystems to architecting modern, high-performance TypeScript frontends and RAG-integrated AI pipelines.",
  pillars: [
    {
      title: "Efficiency architect",
      body: "I specialize in finding data-intensive bottlenecks and reducing operational overhead — historically by as much as 70% — through custom automation tools and cloud-native architectures.",
    },
    {
      title: "Full-spectrum engineering",
      body: "From provisioning automated pre-production environments on Azure/AWS to delivering WCAG-compliant, accessible UIs for institutional clients like the Washington State Board (SBCTC).",
    },
    {
      title: "AI integration",
      body: "I don’t just call APIs — I build data processing pipelines. Hands-on with training NLP workflows, manually structuring vector datasets for RAG, and deploying local LLMs for unstructured data problems.",
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
      "Zero-cost architecture — Cloud Run + Cloudflare, tuned for a true $0 ops footprint (cost optimization at the core).",
    description:
      "Live production SaaS for tax filing and appointments: zero recurring infra spend while staying secure and scalable.",
    tags: ["FastAPI", "Next.js 16", "PostgreSQL", "Google SSO", "Cloud Run"],
    link: "https://taxbynav.com",
    github: "https://github.com/sheshasaibaba/taxbynav",
    image: "/projects/taxbynav.svg",
    details:
      "JWT + refresh, Google SSO, async appointment engine, Gmail SMTP — real clients, ~$0/mo server overhead.",
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
      "Hybrid retrieval — dense + sparse vectors; math-aware grounding, not just API glue.",
    description:
      "High-precision QA over the SGI Driver’s Handbook — hybrid retrieval to cut hallucinations and retrieval latency.",
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
        "Re-ranking: Cross-Encoder on top-k chunks — cutting manual lookup time by about 60%.",
        "Stack: Python, LangChain, Llama-3.1, FastAPI.",
      ],
    },
  },
  {
    id: "blockveritas",
    title: "BlockVeritas",
    technicalHighlight: "Hybrid on-chain + IPFS — ~95% lower storage cost vs naive all-on-chain metadata.",
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
        "~95% storage cost reduction: hybrid model — metadata on IPFS via Pinata, cryptographic hashes on Ethereum.",
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
    company: "Clode (UK / Remote)",
    companyShort: "Clode",
    period: "Nov 2025 – March 2026",
    tenureLabel: "~5 months",
    description:
      "Modernized a legacy React monolith into Vite micro-frontends; cut API overhead with TanStack Query and virtualization.",
    details:
      "Led UI architecture, performance, and strict TypeScript discipline for production reliability.",
    color: "#A855F7",
    highlights: [
      "Spearheaded migration from a legacy React monolith to a Vite-based micro-frontend architecture.",
      "Zustand + TanStack Query + virtualization: **~40%** less API chatter; UI comfortably supports **10k+** concurrent users.",
      "Centralized UI library with strict TypeScript — fewer production state regressions (**~85%** reduction in reported issues).",
    ],
  },
  {
    id: "exp-ktech-nlp",
    timelineLabel: "2025",
    role: "AI & NLP Engineer (Internal Pivot)",
    company: "Ktech Products (USA / Remote)",
    companyShort: "Ktech",
    period: "May 2025 – Sept 2025",
    tenureLabel: "~5 months",
    description:
      "Internal pivot to production-grade AI: local LLMs, RAG with FAISS, and OCR-to-structure pipelines for legacy documents.",
    details:
      "Focused on unstructured data extraction, model training, and sub-second retrieval for internal document search.",
    color: "#C026D3",
    cardVariant: "nlp" as const,
    highlights: [
      "**AI & RAG pipeline:** Architected a local LLM pipeline using Ollama and a RAG system using FAISS that automated data extraction for **70%** of legacy physical documents, reducing manual information retrieval time by **60%**.",
      "**NLP model training:** Manually labeled custom datasets and trained models to identify and extract entities from raw OCR text, feeding them into structured **SQL-ready** formats.",
      "**Automated processing:** Designed the end-to-end pipeline to handle unstructured data at scale, significantly lowering the barrier for data entry and processing.",
    ],
  },
  {
    id: "exp-ktech-sbctc",
    timelineLabel: "2021–25",
    role: "Senior Full Stack Developer (SBCTC Project)",
    company: "Ktech Products (USA / Remote)",
    companyShort: "Ktech",
    period: "June 2021 – May 2025",
    tenureLabel: "4 years",
    clientSubtitle: "Client: Washington State Board (SBCTC)",
    description:
      "Core engineer for SBCTC: SSO at scale, Mongo query tooling, RBAC on **500k+** records, AWS/Azure pipelines, and React Native parity.",
    details:
      "Enterprise delivery for Washington State higher-ed applications — accessibility, security, and stakeholder dashboards.",
    color: "#3B82F6",
    stackBadges: [
      "Angular",
      "Node.js",
      "MongoDB",
      "React Native",
      "Okta",
      "Azure",
      "Highcharts",
      "WCAG",
    ],
    highlightsPreviewCount: 4,
    highlights: [
      "**Educational ecosystem (SBCTC):** Core engineer for the Washington State Board (SBCTC), integrating **15** new colleges and increasing application success rates by **30%** through WCAG 2.1 compliant UI engineering and OKTA/OIDC SSO security.",
      "**Query automation:** Designed and developed a custom MongoDB Query Builder in Angular, eliminating **90%** of manual reporting overhead by allowing non-technical clients to fetch filtered data independently.",
      "**System optimization:** Refactored Role-Based Access Control (RBAC) and dynamic filtering logic for an administrative portal handling **500k+** records, optimizing query latency by **40%** on a high-concurrency SQL backend.",
      "**DevOps & CI/CD:** Engineered automated pipelines in **AWS** and provisioned **Azure** pre-production environments, reducing manual deployment cycles and ensuring strict environment consistency.",
      "**Mobile parity:** Built a **React Native** replica of the core web ecosystem to provide a seamless cross-platform experience for students and faculty.",
      "**Data visualization:** Built dynamic dashboards using **Highcharts** to track real-time application metrics for state-level stakeholders.",
    ],
  },
  {
    id: "exp-vara",
    timelineLabel: "2019–21",
    role: "Java Developer",
    company: "Vara Technologies (India / Remote)",
    companyShort: "Vara",
    period: "February 2019 – March 2021",
    tenureLabel: "~2 years",
    description:
      "High-throughput Spring Boot APIs for MNP (mobile number portability) — **50k+** MAU and carrier-grade consistency.",
    details:
      "Focused on messaging orchestration, batch reconciliation, and regulatory alignment.",
    color: "#10B981",
    highlights: [
      "Shipped **12+** high-throughput REST APIs for MNP services at scale (**50k+** monthly active users).",
      "RabbitMQ orchestration refactors for **~99.9%** consistency during subscriber porting events.",
      "Spring Batch jobs to cross-verify porting logs vs regulatory data — resolved mismatches on **~25%** of flagged records.",
    ],
  },
] as const;
