export type CaseStudy = {
  facts: { label: string; value: string }[];
  overview: string[];
  challenge: string;
  stats: { value: string; label: string }[];
  diagrams: { src?: string; alt: string; caption: string }[];
  decisions: { title: string; body: string; instead?: string }[];
  deployment: {
    intro: string;
    pipeline: { step: string; detail: string }[];
    rollback: string;
    groups: { title: string; items: string[] }[];
  };
  scope: { title: string; items: string[] }[];
  tradeoffs: { issue: string; next: string }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "prism-store": {
    facts: [
      { label: "Role", value: "Solo: API, storefront, and infrastructure" },
      {
        label: "Repositories",
        value: "Two: NestJS API and Next.js storefront",
      },
      { label: "Status", value: "Deployed on a hardened VPS" },
    ],
    overview: [
      "Prism is a full-stack e-commerce platform for smart gadgets and everyday tech essentials. It covers the whole shopping cycle: catalog discovery, cart, Stripe checkout, order tracking, and an admin panel to manage products, orders, users, and refunds.",
      "It is split into two independent repositories: a RESTful NestJS API with PostgreSQL and Prisma, and a Next.js storefront that consumes it through a single typed client. Both run in production behind Nginx on a VPS I provisioned and hardened myself.",
    ],
    challenge:
      "The catalog is the easy part. The hard part of a store is the moments where money and inventory change: a payment reported twice, a refund that has to put stock back exactly once, a customer who retries checkout. Prism is built so those moments stay correct.",
    stats: [
      { value: "192", label: "API unit tests · 70.6% line coverage" },
      { value: "97", label: "frontend tests across 10 files" },
      {
        value: "CI/CD",
        label: "tests, build, and deploy to a VPS with automatic rollback",
      },
      { value: "3", label: "integrations: Stripe, Cloudinary, Resend" },
    ],
    diagrams: [
      {
        src: "/architecture.svg",
        alt: "Prism API architecture diagram",
        caption:
          "API architecture: requests pass through rate limiting, CORS, and validation, then JWT and role guards, before reaching the domain modules.",
      },
      {
        src: "/payment-flow.svg",
        alt: "Prism payment flow sequence diagram",
        caption:
          "Payment flow: the order is created with a PaymentIntent, the client confirms with Stripe, and a signed webhook updates the order.",
      },
    ],
    decisions: [
      {
        title: "Payment state driven by signed, idempotent webhooks",
        body: "The browser confirms the payment with Stripe Elements, but the order status only changes when the API receives a webhook from Stripe and verifies its signature. Stripe delivers events at least once, so the handler is idempotent: the webhook and the client confirmation converge on a single finalize step that checks the payment's status inside a database transaction. A replayed event leaves the stock, the order, and the confirmation email unchanged.",
        instead:
          "Marking an order as paid because the browser says it succeeded.",
      },
      {
        title: "Refunds that touch stock only after Stripe confirms",
        body: "The API calls Stripe first. Only when the refund succeeds does a short database transaction mark the payment refunded, cancel the order, and restore stock. A slow response from Stripe can't hold database locks, and a refund started from the Stripe dashboard arrives through the webhook and ends in the same state. Refund handlers check the payment's status first, so a repeated event doesn't restore stock again.",
        instead:
          "Holding a database transaction open across a call to a third-party API.",
      },
      {
        title: "Checkout retries reuse the pending payment",
        body: "When a customer retries, the API returns the existing PaymentIntent while it is still usable. A stale one is marked as failed before a new one is created, and an order that is already paid is rejected. Retrying checkout doesn't pile up PaymentIntents for the same order.",
        instead: "Creating a new PaymentIntent on every attempt.",
      },
      {
        title: "A layered request pipeline",
        body: "Rate limiting, CORS, and input validation run first. JWT and role guards come next, and only then do requests reach the domain modules. Each concern lives in one place, so adding a module doesn't mean re-implementing security.",
        instead:
          "Re-checking authentication and validation inside each controller.",
      },
      {
        title: "One typed API client with transparent token refresh",
        body: "The API issues short-lived access tokens and refresh tokens. On the frontend, every call goes through a single typed client that retries an unauthorized request once after refreshing the token, so components never deal with expired sessions or call fetch directly.",
        instead:
          "Calling fetch from components and handling expired sessions in each one.",
      },
    ],
    deployment: {
      intro:
        "Both repositories deploy to a VPS I provisioned and hardened myself. Nothing reaches production without passing its test suite, and a release that doesn't come up healthy reverts on its own.",
      pipeline: [
        {
          step: "Push to main",
          detail:
            "Each repository's GitHub Actions pipeline starts on every push.",
        },
        {
          step: "Test",
          detail:
            "192 tests for the API, 97 for the storefront. A failure stops the pipeline here.",
        },
        {
          step: "Build",
          detail:
            "Versioned container images. The storefront uses Next.js standalone output with a three-stage Dockerfile, so the final image only contains what runs in production, as a non-root user.",
        },
        {
          step: "Deploy",
          detail: "Over SSH, with Docker Compose on the VPS.",
        },
        {
          step: "Verify",
          detail: "Healthchecks decide whether the release stays up.",
        },
      ],
      rollback:
        "If the new containers don't pass their healthchecks, the deploy returns to the previous image on its own.",
      groups: [
        {
          title: "Access",
          items: [
            "Key-only SSH, root login disabled, non-default port",
            "Dedicated non-root deploy user",
          ],
        },
        {
          title: "Network and edge",
          items: [
            "Firewall allowing only 80, 443, and SSH, plus fail2ban",
            "Nginx terminates TLS with Certbot certificates, auto-renewed",
            "HTTP redirects to HTTPS, HSTS, TLS 1.2 and 1.3 only",
          ],
        },
        {
          title: "Runtime",
          items: [
            "Docker Compose with healthchecks, restart policies, and resource limits",
            "Internal networks, so Nginx is the only public entry point",
          ],
        },
        {
          title: "System",
          items: [
            "Automatic security updates",
            "Secrets live on the server, never in the repository",
          ],
        },
      ],
    },
    scope: [
      {
        title: "API",
        items: [
          "JWT authentication with role-based access control",
          "Product and category management",
          "Cart, checkout, and orders with inventory updates",
          "Stripe PaymentIntents, webhooks, and refunds",
          "Cloudinary image uploads and Resend order emails",
          "Swagger/OpenAPI docs, validation, and rate limiting",
        ],
      },
      {
        title: "Storefront and admin",
        items: [
          "Catalog with search, category filters, and pagination",
          "Accounts: profile, password, and order history",
          "Cart and Stripe checkout with order confirmation",
          "Admin panel for products, categories, orders, and users",
          "Image uploads and refund workflows",
          "Responsive UI with accessible controls",
        ],
      },
    ],
    tradeoffs: [
      {
        issue:
          "Access tokens are persisted in localStorage, which is simple but exposed to XSS.",
        next: "Move them to httpOnly cookies.",
      },
      {
        issue:
          "Rollback restores the previous images, not the database, so a release can't assume its schema change is reversible.",
        next: "Write migrations so the previous release still works against the new schema.",
      },
      {
        issue:
          "Production runs on a single VPS. That keeps operations simple and cheap, but there is no redundancy.",
        next: "Managed container orchestration if real scale demands it.",
      },
      {
        issue:
          "The tests target business logic and critical interactions instead of blanket coverage, which leaves the API at about 70% line coverage.",
        next: "Extend coverage around payment edge cases first.",
      },
    ],
  },
  "mediaflow-ai": {
    facts: [
      { label: "Role", value: "Solo: backend, frontend, and infrastructure" },
      { label: "Status", value: "Live at mediaflow.emersonic.dev" },
      {
        label: "Runs on",
        value: "A OVHcloud VPS, five services behind one Nginx",
      },
    ],
    overview: [
      "MediaFlow AI turns audio and video files, or YouTube links, into searchable transcripts, summaries, and keywords. Uploads can reach about 500 MB, so the system is built so that heavy work never blocks a request: files go straight to object storage and processing happens asynchronously.",
      "It is a distributed system of independent services connected by RabbitMQ: a NestJS API gateway that authenticates and rate-limits every request, an ingestion service that registers uploads and starts the pipeline, a Python processing worker, and a real-time notification service, all behind a single Nginx entry point.",
    ],
    challenge:
      "Processing a 500 MB recording takes minutes and relies on slow external AI providers. The challenge was keeping the product responsive and recoverable: uploads that don't tie up the API, work that survives failures, progress users can see, and a production setup one person can operate.",
    stats: [
      {
        value: "Live",
        label: "deployed on a self-hardened VPS at mediaflow.emersonic.dev",
      },
      {
        value: "500 MB",
        label: "uploads go straight to storage, not through the API",
      },
      { value: "59", label: "tests (23 gateway, 36 worker) gate every deploy" },
      { value: "5", label: "container images, tagged by commit SHA" },
    ],
    diagrams: [
      {
        src: "/mediaflow-arch.svg",
        alt: "MediaFlow AI architecture diagram",
        caption:
          "Architecture: Nginx is the single entry point, the gateway authenticates, authorizes, and rate-limits requests before proxying them, the ingestion service handles uploads, and RabbitMQ decouples it from the worker and the notification service.",
      },
      {
        src: "/mediaflow-events.svg",
        alt: "MediaFlow AI event flow sequence diagram",
        caption:
          "Event flow: direct upload with a presigned URL, a media.uploaded event, asynchronous processing, and live progress pushed to the browser.",
      },
    ],
    decisions: [
      {
        title: "A gateway that only authenticates, authorizes, and routes",
        body: "The gateway is a thin proxy in front of the services. It validates the JWT, checks permissions, applies rate limiting, and forwards the request. It holds no business logic, so protecting the system and doing the work stay separate concerns, and each can change without touching the other.",
        instead: "Mixing authentication and business logic in a single API.",
      },
      {
        title: "A dedicated ingestion service with direct-to-storage uploads",
        body: "The ingestion service owns everything about getting media into the system. It generates a presigned URL, the browser uploads straight to object storage, and the service only registers the media. The file never touches the gateway or the ingestion service, so files of hundreds of megabytes don't consume their memory, bandwidth, or request time.",
        instead: "Proxying large files through the API.",
      },
      {
        title: "An event-driven pipeline with RabbitMQ",
        body: "After an upload, the ingestion service publishes a media.uploaded event and responds immediately. The worker consumes it when it has capacity, so slow processing never blocks users. Failed jobs are retried and, when they keep failing, land in a dead-letter queue instead of disappearing. RabbitMQ delivers at least once, so the worker is designed to tolerate redelivery, which makes retries safe. The worker can be scaled without touching the API.",
        instead: "Processing the media inside the HTTP request.",
      },
      {
        title: "The right runtime for each service",
        body: "NestJS handles the gateway and the ingestion service, Python handles the processing (FFmpeg for audio extraction, then transcription, summary, and keywords with Whisper and Gemini), and a small Node service with Socket.io handles real-time delivery. Each service uses the ecosystem that fits its job.",
        instead: "Forcing the AI pipeline into the API's runtime.",
      },
      {
        title: "Metrics that show a stuck pipeline",
        body: "Prometheus and Grafana track CPU, memory, latency, and RabbitMQ queue depth across the gateway, the ingestion service, the worker, and the broker. A stuck pipeline shows up on a dashboard as a queue that keeps growing.",
        instead: "Finding out about stuck jobs from users.",
      },
    ],
    deployment: {
      intro:
        "MediaFlow is live at mediaflow.emersonic.dev on a OVHcloud VPS that I provisioned and hardened myself. Every release is an immutable image tied to a commit, tested before it ships, and able to roll back on its own.",
      pipeline: [
        {
          step: "Push to main",
          detail: "GitHub Actions starts on every push.",
        },
        {
          step: "Test",
          detail:
            "23 gateway tests and 36 worker tests. A failure stops the pipeline here.",
        },
        {
          step: "Build",
          detail:
            "Five service images, each tagged with its commit SHA, never latest.",
        },
        {
          step: "Publish",
          detail: "Images go to GitHub Container Registry (GHCR).",
        },
        {
          step: "Deploy",
          detail:
            "Over SSH: the VPS pulls the new tags and Docker Compose restarts the services.",
        },
        {
          step: "Verify",
          detail: "Healthchecks decide whether the release stays up.",
        },
      ],
      rollback:
        "If the new containers don't pass their healthchecks, the deploy returns to the previously running image tag. Because releases are immutable images, a rollback is a tag change, not a rebuild.",
      groups: [
        {
          title: "Access",
          items: [
            "Key-only SSH, root login disabled, non-default port",
            "Dedicated non-root deploy user",
          ],
        },
        {
          title: "Network and edge",
          items: [
            "Firewall allowing only 80, 443, and SSH",
            "Nginx is the only public service: it serves the React app and proxies the API and WebSocket traffic",
            "TLS from Certbot, auto-renewed, with HTTP redirected to HTTPS, HSTS, and TLS 1.2 and 1.3 only",
          ],
        },
        {
          title: "Runtime",
          items: [
            "Docker Compose with healthchecks, restart policies, and resource limits",
            "Internal networks between services",
          ],
        },
        {
          title: "System",
          items: [
            "Automatic security updates",
            "Secrets live on the server, never in the repository",
          ],
        },
      ],
    },
    scope: [
      {
        title: "Pipeline",
        items: [
          "Upload audio or video files, or submit YouTube links",
          "Audio extraction with FFmpeg",
          "Transcript with timestamped segments, summary, and keywords",
          "Retries and dead-letter queues",
          "Live per-job progress in the dashboard",
          "In-browser playback through presigned URLs",
        ],
      },
      {
        title: "Platform",
        items: [
          "JWT authentication and rate limiting at the gateway",
          "React, Vite, and Tailwind dashboard",
          "Gateway and worker unit tests",
          "Prometheus and Grafana dashboards for the gateway, worker, and RabbitMQ",
        ],
      },
    ],
    tradeoffs: [
      {
        issue:
          "Production runs on a single VPS with Docker Compose. That keeps operations simple and cheap, but there is no redundancy.",
        next: "Managed orchestration for real scale.",
      },
      {
        issue:
          "Rollback restores the previous images, not the data, so message formats and the schema have to stay compatible with the release before them.",
        next: "Version message formats and make schema changes backward compatible.",
      },
      {
        issue:
          "Transcription and summaries depend on external AI providers, so latency and cost follow theirs.",
        next: "Put a provider abstraction in front of them to make them swappable.",
      },
    ],
  },
};
