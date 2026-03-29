import type { IconType } from "react-icons";
import Image from "next/image";
import { FaJava } from "react-icons/fa";
import { FaCss3Alt, FaFaceSmile } from "react-icons/fa6";
import {
  SiAngular,
  SiApachemaven,
  SiCloudflare,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithubactions,
  SiGit,
  SiGooglecloud,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJsonwebtokens,
  SiLangchain,
  SiLinux,
  SiMeta,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOkta,
  SiOllama,
  SiOpenid,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiRadixui,
  SiRabbitmq,
  SiReact,
  SiReactquery,
  SiRobotframework,
  SiScikitlearn,
  SiSolidity,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
} from "react-icons/si";
import {
  TbBolt,
  TbBrandAws,
  TbBrandAzure,
  TbBrandReactNative,
  TbChartDots3,
  TbTestPipe2,
  TbTextScan2,
} from "react-icons/tb";

import { cn } from "@/lib/utils";

/** Brand mark: one or more react-icons with official hex colors. */
export type TechStackMarkPart = { Icon: IconType; color: string };

export type TechStackMarkDef =
  | { kind: "icons"; parts: TechStackMarkPart[] }
  /** Zustand has no Simple Icon in react-icons; use bundled SVG. */
  | { kind: "image"; src: string; alt?: string };

const ICON_LG = 24;
const ICON_MD = 19;
const ICON_SM = 16;

function needsDarkInvert(hex: string): boolean {
  const h = hex.trim().toLowerCase();
  return h === "#000000" || h === "#363636";
}

export function TechStackBrandIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const def = TECH_STACK_MARK_BY_NAME[name];
  if (!def) return null;
  if (def.kind === "image") {
    return (
      <Image
        src={def.src}
        alt={def.alt ?? ""}
        width={ICON_LG}
        height={ICON_LG}
        className={cn("size-6 shrink-0 object-contain", className)}
      />
    );
  }

  const { parts } = def;
  const size =
    parts.length >= 4 ? ICON_SM : parts.length >= 3 ? ICON_MD : ICON_LG;

  return (
    <span className={cn("flex shrink-0 items-center justify-center gap-px", className)} aria-hidden>
      {parts.map(({ Icon, color }, i) => (
        <Icon
          key={i}
          className={cn(needsDarkInvert(color) && "dark:invert")}
          style={{ color }}
          size={size}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function hasTechStackBrandIcon(name: string): boolean {
  return name in TECH_STACK_MARK_BY_NAME;
}

/**
 * Keys = `TechStackItemData.name` from `techStackSource`.
 * Icons: Simple Icons (`si`) where available; `fa` / `fa6` / `tb` per research.
 * SiHighcharts, SiZustand, SiPlaywright are not shipped in this react-icons build — see fallbacks in comments below.
 */
export const TECH_STACK_MARK_BY_NAME: Record<string, TechStackMarkDef> = {
  TypeScript: { kind: "icons", parts: [{ Icon: SiTypescript, color: "#3178C6" }] },
  "JavaScript (ES6+)": { kind: "icons", parts: [{ Icon: SiJavascript, color: "#F7DF1E" }] },
  Java: { kind: "icons", parts: [{ Icon: FaJava, color: "#007396" }] },
  Python: { kind: "icons", parts: [{ Icon: SiPython, color: "#3776AB" }] },
  SQL: { kind: "icons", parts: [{ Icon: SiPostgresql, color: "#4169E1" }] },
  PHP: { kind: "icons", parts: [{ Icon: SiPhp, color: "#777BB4" }] },
  Solidity: { kind: "icons", parts: [{ Icon: SiSolidity, color: "#363636" }] },

  React: { kind: "icons", parts: [{ Icon: SiReact, color: "#61DAFB" }] },
  "Next.js 16": { kind: "icons", parts: [{ Icon: SiNextdotjs, color: "#000000" }] },
  "Angular (v8–14)": { kind: "icons", parts: [{ Icon: SiAngular, color: "#DD0031" }] },
  "React Native": { kind: "icons", parts: [{ Icon: TbBrandReactNative, color: "#61DAFB" }] },
  /** No Zustand in react-icons — sole SVG under `public/icons/` */
  Zustand: { kind: "image", src: "/icons/zustand.svg" },
  "TanStack Query": { kind: "icons", parts: [{ Icon: SiReactquery, color: "#FF4154" }] },
  "Tailwind CSS": { kind: "icons", parts: [{ Icon: SiTailwindcss, color: "#06B6D4" }] },
  /** SiHighcharts not shipped in this react-icons build — generic chart mark + brand tint */
  Highcharts: { kind: "icons", parts: [{ Icon: TbChartDots3, color: "#8085E9" }] },
  "Shadcn UI": { kind: "icons", parts: [{ Icon: SiRadixui, color: "#000000" }] },
  "Material UI": { kind: "icons", parts: [{ Icon: SiMui, color: "#007FFF" }] },
  "HTML5 / CSS3": {
    kind: "icons",
    parts: [
      { Icon: SiHtml5, color: "#E34F26" },
      { Icon: FaCss3Alt, color: "#1572B6" },
    ],
  },

  "Node.js": { kind: "icons", parts: [{ Icon: SiNodedotjs, color: "#339933" }] },
  "Express.js": { kind: "icons", parts: [{ Icon: SiExpress, color: "#000000" }] },
  FastAPI: { kind: "icons", parts: [{ Icon: SiFastapi, color: "#05998B" }] },
  "Spring Boot / Security": {
    kind: "icons",
    parts: [
      { Icon: SiSpringboot, color: "#6DB33F" },
      { Icon: SiSpringsecurity, color: "#6DB33F" },
    ],
  },
  "JWT / OAuth 2.0 (Okta/OIDC)": {
    kind: "icons",
    parts: [
      { Icon: SiJsonwebtokens, color: "#000000" },
      { Icon: SiOkta, color: "#007DC1" },
      { Icon: SiOpenid, color: "#F78C40" },
    ],
  },
  Hibernate: { kind: "icons", parts: [{ Icon: SiHibernate, color: "#59666C" }] },
  RabbitMQ: { kind: "icons", parts: [{ Icon: SiRabbitmq, color: "#FF6600" }] },
  "Spring Batch": { kind: "icons", parts: [{ Icon: SiSpring, color: "#6DB33F" }] },
  "REST API design": { kind: "icons", parts: [{ Icon: SiPostman, color: "#FF6C37" }] },

  LangChain: { kind: "icons", parts: [{ Icon: SiLangchain, color: "#1389D2" }] },
  RAG: { kind: "icons", parts: [{ Icon: SiRobotframework, color: "#000000" }] },
  FAISS: { kind: "icons", parts: [{ Icon: SiMeta, color: "#0467DF" }] },
  Ollama: { kind: "icons", parts: [{ Icon: SiOllama, color: "#000000" }] },
  "NLP / OCR": { kind: "icons", parts: [{ Icon: TbTextScan2, color: "#4F46E5" }] },
  "InsightFace / DeepFace": {
    kind: "icons",
    parts: [
      { Icon: FaFaceSmile, color: "#FCD34D" },
      { Icon: SiPython, color: "#3776AB" },
    ],
  },
  "Scikit-learn": { kind: "icons", parts: [{ Icon: SiScikitlearn, color: "#F7931E" }] },
  "Pandas / NumPy": {
    kind: "icons",
    parts: [
      { Icon: SiPandas, color: "#150458" },
      { Icon: SiNumpy, color: "#013243" },
    ],
  },
  PostgreSQL: { kind: "icons", parts: [{ Icon: SiPostgresql, color: "#4169E1" }] },
  MongoDB: { kind: "icons", parts: [{ Icon: SiMongodb, color: "#47A248" }] },

  /** SiAmazonaws not in this react-icons build */
  AWS: { kind: "icons", parts: [{ Icon: TbBrandAws, color: "#FF9900" }] },
  /** SiMicrosoftazure not in this react-icons build */
  Azure: { kind: "icons", parts: [{ Icon: TbBrandAzure, color: "#0078D4" }] },
  "Google Cloud Run": { kind: "icons", parts: [{ Icon: SiGooglecloud, color: "#4285F4" }] },
  Cloudflare: { kind: "icons", parts: [{ Icon: SiCloudflare, color: "#F38020" }] },
  Docker: { kind: "icons", parts: [{ Icon: SiDocker, color: "#2496ED" }] },
  Jenkins: { kind: "icons", parts: [{ Icon: SiJenkins, color: "#D24939" }] },
  "GitHub Actions": { kind: "icons", parts: [{ Icon: SiGithubactions, color: "#2088FF" }] },
  Git: { kind: "icons", parts: [{ Icon: SiGit, color: "#F05032" }] },
  "Maven / Linux": {
    kind: "icons",
    parts: [
      { Icon: SiApachemaven, color: "#C71A36" },
      { Icon: SiLinux, color: "#FCC624" },
    ],
  },
  "Vite / Vitest / Playwright": {
    kind: "icons",
    parts: [
      { Icon: SiVite, color: "#646CFF" },
      { Icon: SiVitest, color: "#729B1B" },
      /** SiPlaywright not in bundle */
      { Icon: TbTestPipe2, color: "#2EAD33" },
    ],
  },
  "Alembic / uv": {
    kind: "icons",
    parts: [
      { Icon: SiPython, color: "#3776AB" },
      /** Note 3: TbBolt; #E3E3E3 is too low-contrast on chips — slate for readability */
      { Icon: TbBolt, color: "#64748B" },
    ],
  },
};
