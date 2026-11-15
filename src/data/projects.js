/* ──────────────────────────────────────────────────────────────
   PROJECTS — edit freely.
   `shot`   a real screenshot in /public/shots (shown in a browser frame)
   `mockup` fallback illustrated visual when there's no screenshot:
            'stock' | 'mime' | 'eventverse' | 'placeholder'
   `theme`  picks the section colour: 'ink' | 'paper' | 'signal'
   Set `placeholder: true` for projects whose details are not written yet.
   ────────────────────────────────────────────────────────────── */

const GH = 'https://github.com/ShrutiGautam27'

export const projects = [
  {
    id: 'chiktsa',
    index: '01',
    name: 'Chiktsa',
    kicker: 'Elderly-care coordination · Full-stack · Newest',
    theme: 'paper',
    mockup: 'placeholder',
    shot: './shots/chiktsa.jpg',
    shotUrl: 'carehub-ai-gamma.vercel.app',
    scribble: 'my biggest build yet',
    status: 'Live demo',
    description:
      'A multi-household elderly-care platform that brings seniors, families and caregivers into one secure space — and quietly spots the care responsibilities nobody has picked up yet.',
    problem:
      'When several relatives and carers look after an elderly person, things slip through the cracks: an appointment with no escort, a prescription nobody verified, a caregiver away with no backup. Chiktsa makes those gaps visible before they become problems.',
    features: [
      'Many households and elderly profiles, with fine-grained roles, per-profile permissions and strict data isolation',
      'Care Continuity engine — care-gap detector, caregiver handover passport, absence cover',
      'Medication Safety engine — prescription checks, dose tracking in the senior’s local time, refill alerts',
      'Family Coordination engine — task sharing, workload balancing, senior-controlled consent',
      'Simplified Senior Mode with large type, read-aloud and high-contrast options',
      'Tested end to end with pytest, Vitest and Playwright on desktop and mobile',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python', 'Firebase', 'Firestore', 'Gemini API'],
    note: 'Live demo uses sample households and resets periodically. AI features are built and switch on once an API key is connected.',
    links: {
      live: 'https://carehub-ai-gamma.vercel.app',
      github: `${GH}/chiktsa`,
    },
  },
  {
    id: 'stocksphere',
    index: '02',
    name: 'StockSphereS',
    kicker: 'AI-powered trading education & simulation',
    theme: 'ink',
    mockup: 'stock',
    shot: './shots/stocksphere.jpg',
    shotUrl: 'shrutigautam27.github.io/StockSphereS',
    scribble: 'it’s live — go try it!',
    description:
      'An AI-powered trading education and simulation platform designed to help users understand market concepts, practice virtual trading, and build better risk-management and trading discipline.',
    problem:
      'Beginners often learn about markets by risking real money. StockSphereS gives them a space to learn the concepts and practise decisions without that risk.',
    features: [
      'Virtual trading in a simulated, risk-free environment',
      'Learning modules on core market concepts',
      'Risk-management and trading-discipline practice',
      'Behavioural analysis of trading decisions',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    links: {
      live: 'https://shrutigautam27.github.io/StockSphereS/',
      github: `${GH}/StockSphereS`,
    },
  },
  {
    id: 'mime',
    index: '03',
    name: 'MIME.ai',
    kicker: 'Accessibility · Text, audio & video → ASL gloss',
    theme: 'paper',
    mockup: 'mime',
    shot: './shots/mime-output.jpg',
    shotUrl: 'mime-ai-7vxu.vercel.app',
    shotNote: 'text → 3D sign viewer',
    scribble: 'type a word, watch it sign',
    status: 'Live',
    badge: 'Built at HackHelix 2026 · Thapar',
    description:
      'An accessibility-focused web app that aims to bridge communication between hearing individuals and deaf or hard-of-hearing communities by converting text, audio and video into ASL gloss — with a 3D hand viewer that visualises the signs.',
    problem:
      'Most digital content assumes its audience can hear. MIME.ai explores how language technology could help close that gap for people who communicate in American Sign Language.',
    features: [
      'Text → ASL gloss with synonym mapping and stop-word filtering',
      'Audio and video uploads transcribed with AssemblyAI (ffmpeg for video)',
      'Any-language input translated to English before glossing',
      'In-browser speech-to-text for live conversations',
      '3D sign-language viewer built with Three.js',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Three.js',
      'Python',
      'Django REST Framework',
      'AssemblyAI',
      'NLP tools',
    ],
    links: {
      live: 'https://mime-ai-7vxu.vercel.app/',
      github: `${GH}/MIME.ai`,
    },
  },
  {
    id: 'eventverse',
    index: '04',
    name: 'EventVerse',
    kicker: 'Event discovery & booking · Chandigarh Tricity',
    theme: 'signal',
    mockup: 'eventverse',
    shot: './shots/eventverse.jpg',
    shotUrl: 'EventVerse — Discover',
    shotNote: 'running locally',
    scribble: 'pick a seat, any seat!',
    description:
      'An event discovery and booking web app for the Chandigarh Tricity — find concerts, college fests, workshops and food festivals nearby, pick your seats and get a digital pass. Rebuilt from a vanilla HTML/CSS/JS version into a React app.',
    problem:
      'Events around Chandigarh, Panchkula and Mohali are scattered across posters and social feeds. EventVerse brings them into one place where you can search, plan around the weather and book in a few taps.',
    features: [
      'Search and filter events by category, location and date',
      'Seat selection with digital event passes and a personal dashboard',
      'Calendar with live Open-Meteo weather forecasts',
      'Interactive Tricity map of venues built with Leaflet',
      '“Eve” — a keyword-based helper chatbot, plus dark mode',
      'Covered by 34 automated tests (Vitest + Testing Library)',
    ],
    stack: ['React', 'Vite', 'React Router', 'Redux Toolkit', 'Leaflet', 'Open-Meteo API', 'Vitest'],
    note: 'Front-end demo — sign-in and bookings are saved in the browser; a real backend is the next step.',
    links: {
      github: `${GH}/EventVerse`,
    },
  },
  {
    id: 'ecotrack',
    index: '05',
    name: 'EcoTrack',
    kicker: 'Personal carbon tracking · India edition',
    theme: 'ink',
    mockup: 'placeholder',
    shot: './shots/ecotrack.jpg',
    shotUrl: 'EcoTrack — Analytics',
    shotNote: 'running locally with sample data',
    scribble: 'small choices, big impact',
    description:
      'A client-side environmental impact platform that helps people in India track their daily carbon footprint across transport, electricity, water, food and waste — using India-specific emission factors instead of generic global guesses.',
    problem:
      'Most carbon calculators use Western averages that don’t match Indian life — scooters, CNG autos, metro rides, a dal-roti thali. EcoTrack uses Indian data (CEA grid mix, ARAI vehicle figures) and shows the exact formula behind every number.',
    features: [
      'Log activities across 5 sectors with a live, transparent formula preview',
      'Analytics with sector breakdowns, trend lines and Indian baselines',
      'Impact simulator — compare scenarios like petrol car vs metro',
      'Eco-missions with streaks, XP levels and achievement badges',
      'Methodology page citing the source of every emission factor',
      'Private by design — data stays in the browser, with CSV export',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js', 'Canvas API', 'localStorage'],
    links: {},
  },
]

/* Future projects / experiments — shown in the expandable archive.
   Add an entry here and it appears automatically. */
export const archive = [
  {
    name: 'Development experiments',
    year: '—',
    type: 'Ongoing',
    description:
      'Smaller builds, practice problems and experiments live on GitHub while they grow into full projects.',
    stack: [],
    link: GH,
  },
]
