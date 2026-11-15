/* ──────────────────────────────────────────────────────────────
   TOOLKIT
   status:  'use'       → tools & languages I build with
            'learning'  → actively studying and applying
            'exploring' → early curiosity, just getting started
   Update statuses as you grow — no percentages, no fake ratings.
   ────────────────────────────────────────────────────────────── */

export const skillGroups = [
  {
    id: 'languages',
    code: 'A',
    title: 'Languages',
    note: 'What I write code in.',
    items: [
      { name: 'Java', status: 'use' },
      { name: 'Python', status: 'use' },
      { name: 'C', status: 'use' },
      { name: 'JavaScript', status: 'use' },
      { name: 'SQL', status: 'use' },
    ],
  },
  {
    id: 'frontend',
    code: 'B',
    title: 'Frontend',
    note: 'How ideas reach the screen.',
    items: [
      { name: 'HTML5', status: 'use' },
      { name: 'CSS3', status: 'use' },
      { name: 'JavaScript', status: 'use' },
      { name: 'Responsive Design', status: 'use' },
    ],
  },
  {
    id: 'cs',
    code: 'C',
    title: 'Computer Science',
    note: 'The foundations underneath.',
    items: [
      { name: 'Data Structures & Algorithms', status: 'use' },
      { name: 'Object-Oriented Programming', status: 'use' },
      { name: 'Problem Solving', status: 'use' },
      { name: 'Programming Fundamentals', status: 'use' },
    ],
  },
  {
    id: 'ai',
    code: 'D',
    title: 'AI / ML',
    note: 'Where my curiosity is pulling me.',
    items: [
      { name: 'Artificial Intelligence', status: 'learning' },
      { name: 'Machine Learning Fundamentals', status: 'learning' },
      { name: 'Natural Language Processing', status: 'learning' },
      { name: 'AI-powered Applications', status: 'learning' },
    ],
  },
  {
    id: 'tools',
    code: 'E',
    title: 'Tools',
    note: 'The workbench.',
    items: [
      { name: 'Git', status: 'use' },
      { name: 'GitHub', status: 'use' },
      { name: 'VS Code', status: 'use' },
      { name: 'Streamlit', status: 'use' },
      { name: 'Chart.js', status: 'use' },
    ],
  },
  {
    id: 'next',
    code: 'F',
    title: 'On the horizon',
    note: 'Early curiosity.',
    items: [{ name: 'Cybersecurity', status: 'exploring' }],
  },
]

export const statusLabels = {
  use: 'Build with',
  learning: 'Learning & applying',
  exploring: 'Exploring',
}
