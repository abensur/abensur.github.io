export type ShowcaseItem = {
  id: string
  type:
    | 'repo'
    | 'npm'
    | 'codepen'
    | 'webapp'
    | 'writing'
    | 'favorite'
    | 'vscode'
    | 'cli'
    | 'workflow'
  title: string
  description: string
  href?: string
  placeholder?: boolean
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'br-tax-id-generator',
    type: 'vscode',
    title: 'BR Tax ID Generator',
    description: 'VS Code extension to generate Brazilian tax IDs on demand.',
    href: 'https://marketplace.visualstudio.com/items?itemName=abensur.br-tax-id-generator'
  },
  {
    id: 'github-activity-digest',
    type: 'workflow',
    title: 'AI GitHub Activity Digest',
    description: 'An AI + GitHub workflow that summarizes activity into a digest.',
    href: 'https://github.com/abensur/github-activity-digest'
  },
  {
    id: 'zod-br-tax-id',
    type: 'npm',
    title: 'zod-br-tax-id',
    description: 'NPM package with type-safe helpers for Brazilian tax IDs.',
    href: 'https://www.npmjs.com/package/zod-br-tax-id'
  },
  {
    id: 'etiquette-cli',
    type: 'cli',
    title: 'Etiquette CLI',
    description: 'CLI that stars your dependencies repositories on GitHub.',
    href: 'https://github.com/abensur/etiquette'
  },
  {
    id: 'pen-ngkdZm',
    type: 'codepen',
    title: 'Deviation Chart',
    description: 'Wallet deviation chart experiment using D3.js.',
    href: 'https://codepen.io/abensur/pen/NGKdZm'
  },
  {
    id: 'pen-orpjbk',
    type: 'codepen',
    title: 'Pocker Mortys dataviz',
    description: 'Interactive data visualization playground.',
    href: 'https://codepen.io/abensur/pen/ORPJBK'
  },
  {
    id: 'pen-wjrbmv',
    type: 'codepen',
    title: 'Polar Agenda',
    description: 'A circular calendar experiment made with pure Javascript',
    href: 'https://codepen.io/abensur/pen/WjRbmv'
  },
  {
    id: 'supermon-cardgame',
    type: 'webapp',
    title: 'Supermon Cardgame',
    description: 'A card creator based on Top Trump.',
    href: 'https://supermon-cardgame.netlify.app/'
  },
  {
    id: 'tera-raid-companion',
    type: 'webapp',
    title: 'Tera Raid Companion',
    description: 'A companion web app for a video game.',
    href: 'https://tera-raid-companion.netlify.app/'
  },
  {
    id: 'pantalogos-heraclito',
    type: 'writing',
    title: 'O Pantalogos de Heraclito',
    description: 'Academic writing on Heraclitus and the meaning of logos.',
    href: 'https://www.academia.edu/4799878/O_Pantalogos_de_Her%C3%A1clito'
  },
  {
    id: 'favorite-learning-to-see',
    type: 'favorite',
    title: 'Learning to See',
    description: 'A love letter to our profession.',
    href: 'https://ia.net/topics/learning-to-see'
  },
  {
    id: 'favorite-youtube-fthhbt23sgm',
    type: 'favorite',
    title: 'Design is a Search Problem',
    description: 'Great talk about design by Mike Bostock',
    href: 'https://www.youtube.com/watch?v=fThhbt23SGM'
  },
  {
    id: 'favorite-youtube-8ptembeenf4',
    type: 'favorite',
    title: 'The Future of Programming',
    description: 'Bret Victor talks about dogmas, authority and tradition in programming.',
    href: 'https://www.youtube.com/watch?v=8pTEmbeENF4'
  },
  {
    id: 'favorite-youtube-gd5uj7nlvvo',
    type: 'favorite',
    title: 'Plain Text',
    description: 'Dylan Beattie on the power of plain text.',
    href: 'https://www.youtube.com/watch?v=gd5uJ7Nlvvo'
  }
]
