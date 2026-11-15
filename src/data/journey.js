/* ──────────────────────────────────────────────────────────────
   LEARNING JOURNEY — add internships, hackathons, certifications
   and achievements here as they happen. Newest milestones can go
   anywhere in the list; `when` is free text (e.g. '2026', 'Summer 2026').
   Entries with `open: true` render as an empty "slot" waiting to be filled.
   ────────────────────────────────────────────────────────────── */

export const journey = [
  {
    when: 'Foundation',
    title: 'Computer Science Engineering (AI/ML)',
    body: 'Pursuing a B.E. in Computer Science with a specialisation in Artificial Intelligence and Machine Learning — the base everything else is built on.',
    tags: ['B.E. CSE', 'AI/ML'],
  },
  {
    when: 'Languages',
    title: 'Learning to speak to machines',
    body: 'Building fluency across Java, Python, C, JavaScript and SQL — each one teaching a different way to think about problems.',
    tags: ['Java', 'Python', 'C', 'JavaScript', 'SQL'],
  },
  {
    when: 'Exploration',
    title: 'Exploring software development',
    body: 'Moving from single-file programs to real applications: version control, the web platform, front-end design and back-end services.',
    tags: ['Git', 'Web', 'APIs'],
  },
  {
    when: 'Building',
    title: 'Shipping practical projects',
    body: 'Putting it together in projects like Chiktsa, StockSphereS, MIME.ai, EventVerse and EcoTrack — each one a lesson in scope, design and finishing things.',
    tags: ['Chiktsa', 'StockSphereS', 'MIME.ai', 'EventVerse', 'EcoTrack'],
  },
  {
    when: 'Community',
    title: 'Coding & development activities',
    body: 'Taking part in coding and development activities to practise problem-solving and learn alongside other builders.',
    tags: ['DSA', 'Practice'],
  },
  {
    when: 'Hackathon',
    title: 'HackHelix — Helix 2026, Thapar Institute',
    body: 'Competed in HackHelix during Helix 2026 at Thapar Institute of Engineering & Technology with my team, Code Creators — and built MIME.ai there, turning text, audio and video into ASL gloss against the clock.',
    tags: ['Helix 2026', 'Team Code Creators', 'MIME.ai'],
    link: { label: 'View participation certificate', href: './certificates/hackhelix-2026.pdf' },
  },
  {
    when: 'Certified',
    title: 'Microsoft Certified — Azure Fundamentals',
    body: 'Two Microsoft certifications earned alongside my degree: one on AI concepts and Azure AI services, one on core data concepts and data services in the cloud.',
    // Each certificate can be checked at verify.certiport.com with its code.
    certs: [
      { name: 'Azure AI Fundamentals', date: 'Nov 2025', code: 'CPGd-uTCL' },
      { name: 'Azure Data Fundamentals', date: 'Sep 2026', code: 'w98WU-Fah8' },
    ],
  },
  {
    when: 'Next',
    title: 'The next chapter',
    body: 'Internships, hackathons, certifications — this space is reserved for what comes next.',
    open: true,
  },
]
