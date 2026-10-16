export type Project = {
  slug: string;
  title: string;
  tagline: string;
  highlights: string[];
  image?: { src: string; alt: string };
  video?: string; // .webm/.mp4 opcional; image se usa como poster
  stack: string[];
  repos?: { label: string; href: string }[];
  live?: string;
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "mediaflow-ai",
    title: "MediaFlow AI",
    tagline:
      "Async pipeline that turns uploads and YouTube links into transcripts and summaries.",
    stack: [
      "NestJS",
      "Python",
      "RabbitMQ",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Nginx",
      "AWS S3",
      "Prometheus",
      "Grafana",
    ],
    repos: [
      {
        label: "GitHub",
        href: "https://github.com/emerson-creator/mediaflow-ai",
      },
    ],
    live: "https://mediaflow.emersonic.dev",
    highlights: [
      "RabbitMQ + Python workers with retries and dead-letter queues",
      "500 MB uploads go straight to S3, never through the API",
      "Tests gate each deploy; automatic rollback on a self-hardened VPS",
    ],
    image: {
      src: "/mediaflow-demo.gif",
      alt: "MediaFlow AI dashboard",
    },
    // video: "/mediaflow-demo.gif",
  },
  {
    slug: "prism-store",
    title: "Prism Store",
    tagline:
      "Full-stack e-commerce with Stripe payments, refunds, and an admin panel.",
    stack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Stripe",
      "Docker",
      "GitHub Actions",
      "Prisma",
      "Nginx",
      "TypeScript",
      "Jest",
      "Vitest",
    ],
    repos: [
      {
        label: "API repository",
        href: "https://github.com/emerson-creator/prism_api",
      },
      {
        label: "Frontend repository",
        href: "https://github.com/emerson-creator/prism_web",
      },
    ],
    live: "https://prism.emersonic.dev",
    highlights: [
      "Signed, idempotent Stripe webhooks drive order state",
      "192 API and 97 frontend tests run in CI before every deploy",
      "Auto-rollback deploys on a hardened VPS with Nginx and TLS",
    ],
    image: { src: "/prism-admin.gif", alt: "Prism Store storefront" },
    // video: "/projects/prism/demo.webm",
  },
];
