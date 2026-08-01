const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  BorderStyle, LevelFormat, PositionalTab, PositionalTabAlignment,
  PositionalTabLeader, convertInchesToTwip,
} = require('docx');
const fs = require('fs');

const FONT = 'Calibri';
const BODY = 20;   // 10pt
const NAME = 32;   // 16pt
const BLUE = '1155CC';

// ---------- helpers ----------

// Inline text with **bold** markers -> TextRun[]
function runs(text, base = {}) {
  const out = [];
  for (const part of text.split(/(\*\*[^*]+\*\*)/g)) {
    if (!part) continue;
    if (part.startsWith('**') && part.endsWith('**')) {
      out.push(new TextRun({ text: part.slice(2, -2), bold: true, font: FONT, size: BODY, ...base }));
    } else {
      out.push(new TextRun({ text: part, font: FONT, size: BODY, ...base }));
    }
  }
  return out;
}

function link(text, url, opts = {}) {
  return new ExternalHyperlink({
    children: [new TextRun({
      text, font: FONT, size: opts.size || BODY, color: BLUE, underline: {}, ...opts,
    })],
    link: url,
  });
}

// Section heading: bold caps + full-width rule underneath
function section(text) {
  return new Paragraph({
    spacing: { before: 240, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 } },
    children: [new TextRun({ text, bold: true, font: FONT, size: BODY })],
  });
}

// "Company – Location"
function org(name, location) {
  return new Paragraph({
    spacing: { before: 200, after: 0 },
    children: [
      new TextRun({ text: name, bold: true, font: FONT, size: BODY }),
      new TextRun({ text: ` – ${location}`, font: FONT, size: BODY }),
    ],
  });
}

// "Role | Dates"
function role(title, dates) {
  return new Paragraph({
    spacing: { before: 0, after: 100 },
    children: [
      new TextRun({ text: title, bold: true, font: FONT, size: BODY }),
      new TextRun({ text: ` | ${dates}`, font: FONT, size: BODY }),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'cv-bullets', level: 0 },
    spacing: { before: 0, after: 60 },
    children: runs(text),
  });
}

function subhead(text) {
  return new Paragraph({
    spacing: { before: 160, after: 100 },
    children: [new TextRun({ text, bold: true, font: FONT, size: BODY })],
  });
}

function bullets(list) { return list.map(bullet); }

// ---------- document body ----------

const body = [];

// Header
body.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 120 },
  children: [new TextRun({ text: 'Muhammad Muchson Attoyibi', bold: true, font: FONT, size: NAME })],
}));
body.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 0 },
  children: [
    link('muhammadmuchson@gmail.com', 'mailto:muhammadmuchson@gmail.com'),
    new TextRun({ text: ' | +6289679165530', font: FONT, size: BODY }),
  ],
}));
body.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 0 },
  children: [link('https://www.linkedin.com/in/muhammad-muchson-attoyibi/', 'https://www.linkedin.com/in/muhammad-muchson-attoyibi/')],
}));
body.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [link('https://github.com/attoyibi', 'https://github.com/attoyibi')],
}));

// Summary
body.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: 'SUMMARY', bold: true, font: FONT, size: BODY })],
}));
body.push(new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 120 },
  children: runs(
    '**Full Stack Engineer and AI Builder** with **6+ years** shipping production web, mobile, and AI-driven systems end to end — from scoping the problem with the customer to designing the architecture, building it, and improving it from real usage. Deep hands-on experience with **LLM products in production**: RAG pipelines, multi-tool agent loops, document understanding, and evaluation harnesses (**RAGAS**, LLM-as-a-judge) — not notebook POCs. Comfortable across **JavaScript, TypeScript, React, Next.js, Vue, Node.js, Express.js, GraphQL, REST API, MongoDB, PostgreSQL, MySQL, Docker, Flutter, React Native, n8n, Make.com**. Operates with high agency: chooses what to build, ships a working draft fast, then makes it production-grade. Fluent in English for customer-facing discovery, stakeholder communication, and technical training.'
  ),
}));

// Core skills
body.push(section('CORE SKILLS'));
body.push(...bullets([
  '**Languages** → JavaScript, TypeScript, PHP, Dart, SQL',
  '**Frontend Development** → React, Next.js, Vue, Angular, Tailwind CSS, Accessible & Responsive UI',
  '**Backend Development** → Node.js, Express.js, Laravel, REST APIs, GraphQL, Socket.IO',
  '**Mobile Development** → Flutter, React Native, Android, iOS, Cross-platform Apps',
  '**Database Management** → MongoDB, PostgreSQL, MySQL, Vector Databases (ChromaDB, Pinecone)',
  '**AI / LLM** → OpenAI (GPT-4), Anthropic Claude, Google Gemini & Vertex AI, Llama 3 / Mistral via Ollama, RAG, Agent Loops, Tool/Function Calling, OCR & Document Understanding',
  '**Prompting** → Chain-of-Thought, Few-Shot, Zero-Shot, System Prompting, Role Prompting',
  '**AI Evaluation & Safety** → RAGAS, DeepEval, LLM-as-a-judge, Accuracy Benchmarking, Adversarial Testing, Hallucination Mitigation, Prompt Versioning',
  '**Automation & Orchestration** → n8n, Make.com, Webhook & Event-driven Workflows, Third-party API Integration',
  '**Cloud & DevOps** → Docker, Google Cloud (Vertex AI), Firebase, Vercel, Netlify, CI/CD',
  '**Engineering Practices** → System Architecture Design, Clean Code, Testing, Code Review, Observability, Agile/Scrum',
  '**Leadership & Communication** → Customer Discovery, Cross-functional Team Leadership, Technical Mentoring, Stakeholder Communication, Fluent English',
]));

// Experience
body.push(section('EXPERIENCE'));

body.push(org('SanggaBiz', 'Remote, Indonesia'));
body.push(role('AI & EdTech Consultant / LMS Engineer', 'Jun 2025 – Present'));
body.push(...bullets([
  '**Own AI enablement engagements end to end** — customer discovery, solution scoping, platform build, curriculum design, delivery, and post-program iteration — rather than executing a handed-down spec.',
  '**Designed, built, and maintained the company’s Learning Management System**, covering course and cohort management, participant onboarding, assessment flows, progress tracking, and reporting for corporate and certification clients.',
  '**Integrated LLM-powered features** into the LMS and training workflows (content generation, assisted assessment, automated participant support) using Google Vertex AI with n8n and Make.com orchestration.',
  'Developed SanggaBiz’s **AI training vertical from scratch**: defined the curriculum framework, built the hands-on lab material, and shipped it as a repeatable, sellable program.',
  '**Worked directly with corporate clients and certification bodies** to translate messy, non-technical business requirements into a working platform and a delivery plan with clear outcomes.',
  'Automated recurring operational work (participant data handling, reporting, certification prep), cutting manual coordination effort per program cycle.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  'Delivered **IDR 110M+ (~USD 7K) in client project value within a 2-month window**, including a **IDR 70M** corporate AI enablement engagement (Amarta) and a **IDR 40M** BNSP-certified training program.',
  'Shipped the **LMS as the delivery backbone** for those programs — the platform and the curriculum were built by the same person who scoped and ran the engagement.',
  'Established the AI training offering as a **productized, repeatable revenue line** rather than one-off consulting.',
]));

body.push(org('Freelance', 'Remote'));
body.push(role('AI Automation Specialist', 'Jan 2025 – Present'));
body.push(...bullets([
  'Built and shipped **Customer Service & Sales AI Agents** on n8n, integrated with Telegram for real-time customer engagement in production.',
  'Designed **intelligent workflows** that handle inbound inquiries, process orders, and drive sales conversion end to end, with human handoff on low-confidence paths.',
  'Engineered the systems for **scalability and reliability** under high-volume customer interaction, including retry handling, rate limiting, and failure alerting.',
  '**Cut operational time and cost significantly** for clients by automating repetitive, high-frequency manual work.',
  'Tuned agent responses for latency, personalization, and consistency; iterated on prompts and tool definitions based on real conversation logs.',
  'Partnered with stakeholders to continuously expand agent capability against real usage data, not a fixed roadmap.',
]));

body.push(org('Freelance', 'Remote'));
body.push(role('AI Engineer (LLM / RAG Systems)', 'Seasonal'));
body.push(...bullets([
  'Built a **secure, cost-controlled RAG system** for a Pegadaian (state pawnshop) chatbot using n8n, Vector Databases (ChromaDB / Pinecone), and locally hosted LLMs via **Ollama**, containerized with **Docker** and delivered on Telegram — chosen for data-residency and cost constraints the client could not meet with hosted APIs.',
  'Engineered **prompt strategies** (Zero-Shot, Few-Shot, Chain-of-Thought) to convert ambiguous government business requirements into high-accuracy, auditable LLM output.',
  'Built **evaluation harnesses** with **RAGAS** and **DeepEval** measuring faithfulness, answer relevance, and correctness — turning subjective quality complaints into a metric that could be regression-tested.',
  'Implemented **system-level guardrails and adversarial testing** to mitigate bias and prevent hallucination in sensitive financial and government contexts.',
  'Integrated **LLM APIs with backend services and third-party tools** (e.g. Google Maps API) to build functional multi-tool AI agents.',
  'Authored **versioned prompt libraries and evaluation reports** documenting patterns, failure modes, and tuning decisions for handover.',
  'Hands-on across **OpenAI Playground, Google Vertex AI**, and self-hosted **Ollama** deployments.',
]));

body.push(org('Digital Talent Indonesia', 'Remote'));
body.push(role('IT Trainer', 'Jan 2025 – Jul 2025'));
body.push(...bullets([
  '**Designed and delivered an end-to-end front-end curriculum**, from JavaScript fundamentals to React development and production deployment, kept aligned to current industry practice.',
  'Built an **AI-powered chatbot** product by orchestrating **Make.com** automation workflows with **Google Vertex AI**.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  '**Built and deployed** an AI-powered chatbot into live use, streamlining automated user interactions for the program.',
]));

body.push(org('Alterra Academy', 'Remote'));
body.push(role('Academic Project Coordinator', 'Jul 2022 – Dec 2024'));
body.push(...bullets([
  'Ran the **Learning Management System (LMS)** end to end: content pipeline, account provisioning, technical troubleshooting, and progress analytics reporting.',
  'Implemented **multi-platform API integration**, including government-provided face verification services, to validate participant identity securely.',
  '**Gathered field data and feedback** to drive decisions on program and product improvements.',
  'Supported **proposal preparation** and partnership development to expand program reach and impact.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  'Operated an LMS serving **1,000+ active users** at a **4.5/5** satisfaction rating.',
  'Managed **400+ students and 20+ mentors** in the Kampus Merdeka program with a **97% graduation rate** and **4.9/5** average satisfaction.',
]));

body.push(role('Academic Instructor', 'Jul 2021 – Dec 2024'));
body.push(...bullets([
  'Taught **full stack development** (React, Vue, Angular, Node.js, Laravel, Flutter, GraphQL, Socket.IO) from beginner to intermediate level.',
  'Mentored **end-to-end capstone teams** across UI/UX, FE, BE, QA, mobile integration, and cloud deployment — the full delivery path, not isolated exercises.',
  'Mentored students in practical and theoretical concepts, boosting employability; recognized as **Best Mentor for React Front-End**.',
  '**Introduced AI API integration** (ChatGPT, Google Vertex AI, Gemini) into student projects for chatbots, recommendation systems, and automation features.',
  '**Applied Agile/Scrum methodology** so projects mirrored real production workflows, including code review and iteration on feedback.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  'Delivered **200+ hours** of technical and soft-skill training.',
  'Achieved a **100% graduation rate** in several of six mentored batches, demonstrating effective coaching and learner engagement.',
  'Integrated AI tools into the learning process, both for teaching AI-assisted programming and for practical integration into front-end and back-end projects.',
  '**Increased learning efficiency** by redesigning the capstone workflow to complete UX design before FE, BE, and QA handover, resulting in smoother project execution.',
]));

body.push(org('Freelance', 'Remote'));
body.push(role('Software Developer', 'Seasonal'));
body.push(...bullets([
  'Designed and developed **custom mobile applications using Flutter**, delivering end-to-end from requirement gathering to deployment.',
  'Built and maintained **web applications** for various clients using JavaScript, PHP, Node.js, and Laravel, ensuring scalability and strong user experience.',
  'Integrated **RESTful APIs and GraphQL**, and optimized database performance to enhance application responsiveness.',
  'Collaborated closely with clients to translate business needs into tailored technical solutions and scope tradeoffs.',
  'Provided technical support, updates, and maintenance to ensure system reliability and security.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  'Successfully delivered **3+ custom applications** for SMEs and individual clients.',
  'Integrated **AI-assisted features**, including an early ChatGPT-based prototype.',
  'Leveraged AI tools for coding, testing, and analysis to increase development efficiency and maintain consistent delivery quality.',
]));

body.push(org('Freelance', 'Remote'));
body.push(role('Technical Trainer & Curriculum Architect', 'Seasonal'));
body.push(...bullets([
  'Designed and delivered a **Flutter mobile development curriculum** for vocational high school students (SMKN 8 Malang); participants shipped fully functional apps within the training period.',
  'Led **AI-powered branding and productivity workshops** for IWAPI members, introducing ChatGPT, Canva AI, and Make.com to enhance marketing impact and workflow efficiency.',
  'Developed **end-to-end academic programs** for a new university study program — curriculum framework, syllabus, vision & mission, and per-course lesson plans (RPS).',
  'Conducted hands-on edtech and productivity tool training for diverse audiences, ensuring immediate real-world application.',
  'Collaborated with institutions to align training modules with industry and academic standards, improving graduate readiness.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  'Designed and facilitated **20+ training programs** across universities and industry partners, reaching **1,500+ participants**.',
  'Launched AI-integrated training in **Graphic Design with AI, AI for HR, and AI for Project Management**.',
  'Designed a complete **university-level Informatics curriculum**, approved and operational, now serving **50+ active students**.',
]));

body.push(org('Flashcom Indonesia', 'Surabaya'));
body.push(role('Junior Software Engineer', 'Jan 2015 – Apr 2015'));
body.push(...bullets([
  'Assisted in developing web applications and managing databases, ensuring system reliability and performance.',
  'Collaborated with senior developers to deliver native website projects using PHP.',
  'Performed troubleshooting, bug fixes, and feature enhancements to meet client requirements.',
]));
body.push(subhead('Key Achievements'));
body.push(...bullets([
  'Contributed to the successful delivery of multiple PHP-based web projects.',
  'Strengthened backend efficiency through optimized database queries.',
]));

// Education
body.push(section('EDUCATION'));
function degree(name, dates, school) {
  return [
    new Paragraph({
      spacing: { before: 120, after: 0 },
      children: [
        new TextRun({ text: name, bold: true, font: FONT, size: BODY }),
        new TextRun({
          font: FONT, size: BODY,
          children: [new PositionalTab({
            alignment: PositionalTabAlignment.RIGHT,
            relativeTo: 'margin',
            leader: PositionalTabLeader.NONE,
          })],
        }),
        new TextRun({ text: dates, font: FONT, size: BODY }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({ text: school, italics: true, font: FONT, size: BODY })],
    }),
  ];
}
body.push(...degree('Master in Vocational Education', 'Aug 2018 – Dec 2020', 'Universitas Negeri Malang'));
body.push(...degree('Bachelor in Informatics Education', 'May 2012 – Jan 2017', 'Universitas Negeri Malang'));

// Portfolio
body.push(section('PORTFOLIO'));

function portfolioGroup(title, items) {
  const out = [new Paragraph({
    spacing: { before: 140, after: 40 },
    children: [new TextRun({ text: title, bold: true, font: FONT, size: BODY })],
  })];
  for (const [label, url] of items) {
    out.push(new Paragraph({
      numbering: { reference: 'cv-bullets', level: 0 },
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({ text: `${label} — `, font: FONT, size: BODY }),
        link(url.length > 60 ? 'Link' : url, url),
      ],
    }));
  }
  return out;
}

body.push(...portfolioGroup('AI & Automation', [
  ['Chatbot for gold-based Islamic financial education (Indonesia)', 'https://drive.google.com/file/d/1RxaUVrJYFtsUn0jDEIOhiDo5EbBM73k1/view'],
  ['Telegram chatbot with Make.com + Gemini', 'https://www.youtube.com/watch?v=IKk5Y8vMB8U&t=511s'],
  ['Manus AI agent tutorial', 'https://www.youtube.com/watch?v=eSHOqb5aCnI'],
]));
body.push(...portfolioGroup('Web Development', [
  ['AI chat interface built with Next.js', 'https://github.com/attoyibi/chatAI/tree/main'],
  ['ChatGPT clone', 'https://github.com/attoyibi/curhat-ai'],
]));
body.push(...portfolioGroup('Mobile Development', [
  ['TIU CPNS 2023 (Flutter)', 'https://github.com/attoyibi/asn-center/tree/main/asn_center'],
]));
body.push(...portfolioGroup('Product & Delivery', [
  ['AITF company profile', 'https://aitalent.id/home/'],
  ['CWS x Alterra Academy dashboard', 'https://cobalt-bike-c9e.notion.site/Dashboard-CWS-X-Alterra-Academy-583e9804f6ca4caab9155f847942ef78?source=copy_link'],
  ['Kampus Merdeka Batch 7 dashboard', 'https://cobalt-bike-c9e.notion.site/Batch-7-Dashboard-Kampus-Merdeka-9a5bfb30c41e4dc0a5ddde85d271ce77?pvs=74'],
]));

// ---------- assemble ----------

const doc = new Document({
  creator: 'Muhammad Muchson Attoyibi',
  title: 'Muhammad Muchson Attoyibi — Full Stack Engineer, AI Builder',
  numbering: {
    config: [{
      reference: 'cv-bullets',
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: '●',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.2) } },
          run: { font: FONT, size: 16 },
        },
      }],
    }],
  },
  styles: { default: { document: { run: { font: FONT, size: BODY } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 }, // US Letter
        margin: {
          top: convertInchesToTwip(0.6), bottom: convertInchesToTwip(0.6),
          left: convertInchesToTwip(0.8), right: convertInchesToTwip(0.8),
        },
      },
    },
    children: body,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[2], buf);
  console.log('written:', process.argv[2]);
});
