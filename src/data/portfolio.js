export const personalInfo = {
  name: 'Abderrahmane',
  lastName: 'FETHI',
  title: 'Full Stack Developer',
  email: 'fethiabderrahmane1@gmail.com',
  phone: '+212 699 87 3757',
  linkedin: 'https://linkedin.com/in/abderrahmane-fethi',
  github: 'https://github.com/A-fethi',
  bio: `Motivated Junior Full Stack Developer specializing in designing modern, scalable web applications from front-end to back-end. Strong foundations in JavaScript, Go, and Java, along with modern frameworks. Experienced with databases, REST APIs, GraphQL, and deployment environments. Passionate about clean code, optimization, and problem-solving.`,
  resumeUrl: '#',
  stats: [
    { label: 'Projects Built', value: 10, suffix: '+' },
    { label: 'Technologies', value: 15, suffix: '+' },
    { label: 'Lines of Code', value: 50, suffix: 'K+' },
    { label: 'Cups of Coffee', value: 999, suffix: '+' }
  ]
}

export const skills = [
  {
    category: 'Front-End',
    icon: '🎨',
    color: '#F68300', // Orange (Primary)
    items: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'Vue.js', level: 88 },
      { name: 'Angular', level: 80 }
    ]
  },
  {
    category: 'Back-End',
    icon: '⚙️',
    color: '#616808', // Olive (Secondary)
    items: [
      { name: 'Go', level: 88 },
      { name: 'Node.js', level: 82 },
      { name: 'Java (Spring Boot)', level: 85 },
      { name: 'Rust', level: 65 }
    ]
  },
  {
    category: 'Databases',
    icon: '🗄️',
    color: '#d9740a', // Warm secondary orange
    items: [
      { name: 'SQLite', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 75 }
    ]
  },
  {
    category: 'APIs & Services',
    icon: '🔗',
    color: '#6d7a0a', // Lighter olive
    items: [
      { name: 'RESTful APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
      { name: 'WebSockets', level: 85 }
    ]
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    color: '#8a4b00', // Darker orange
    items: [
      { name: 'Docker', level: 80 },
      { name: 'Google Cloud', level: 70 },
      { name: 'Git & GitHub', level: 92 }
    ]
  },
  {
    category: 'Tools',
    icon: '🛠️',
    color: '#4d5206', // Darker olive
    items: [
      { name: 'Postman', level: 88 },
      { name: 'Cisco Packet Tracer', level: 70 }
    ]
  }
]

export const projects = [
  {
    title: '01Blog',
    subtitle: 'Social Blogging Platform',
    description: 'A full-featured blogging platform with JWT authentication, role-based access control, and a responsive Angular Material UI. Features include CRUD for posts, comments, likes, subscriptions, and media management.',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'JPA', 'JWT', 'Spring Security'],
    color: '#616808', // Olive
    icon: '📝',
    github: 'https://github.com/A-fethi'
  },
  {
    title: 'Social Network',
    subtitle: 'Complete Social Platform',
    description: 'A full social network with profiles, posts, followers, groups, notifications, and real-time chat. Built with Vue.js frontend, Go backend, WebSocket messaging, SQLite database, and Docker containerization.',
    tech: ['Vue.js', 'Go', 'WebSockets', 'SQLite', 'Docker', 'bcrypt'],
    color: '#F68300', // Orange
    icon: '🌐',
    github: 'https://github.com/A-fethi'
  },
  {
    title: 'Bombermandom',
    subtitle: 'Multiplayer Browser Game',
    description: 'A real-time multiplayer Bomberman-style browser game with pure DOM manipulation (no Canvas/WebGL). Optimized game loop running at 60fps with real-time interactions and smooth gameplay mechanics.',
    tech: ['JavaScript', 'HTML', 'CSS', 'DOM API'],
    color: '#d9740a', // Warm secondary orange
    icon: '💣',
    github: 'https://github.com/A-fethi'
  },
  {
    title: 'Java Local Server',
    subtitle: 'HTTP Server Implementation',
    description: 'A local HTTP server built from scratch in Java handling client-server communication via sockets. Implements routing, GET/POST request processing, modular architecture, and robust error handling.',
    tech: ['Java', 'Sockets', 'HTTP', 'Postman'],
    color: '#6d7a0a', // Lighter olive
    icon: '🖥️',
    github: 'https://github.com/A-fethi'
  }
]

export const experience = [
  {
    type: 'work',
    title: 'Accounting Assistant',
    organization: 'Fidus FETHI, Berkane, MA',
    period: 'Oct 2020 — Sept 2021',
    description: 'Prepared accounting reports, managed data entry and financial records. Developed strong precision, organization, and rigor skills transferable to data management and IT projects.',
    icon: '💼'
  },
  {
    type: 'work',
    title: 'Door-to-Door Sales Representative',
    organization: 'Forever Living Products, Fes, MA',
    period: 'Jan 2017 — Sept 2018',
    description: 'Organized home sales and direct product promotion. Strengthened communication, client relations, persuasion, and activity planning skills.',
    icon: '📊'
  }
]

export const education = [
  {
    type: 'education',
    title: 'ALX Africa Certificate',
    organization: 'Frontend Development',
    period: 'Jan 2023 — April 2024',
    description: 'Comprehensive frontend development certification covering modern web technologies and best practices.',
    icon: '🎓'
  },
  {
    type: 'education',
    title: 'Specialized Technician',
    organization: 'Business Management — IFMOTICA Fes',
    period: 'Sept 2018 — Sept 2020',
    description: 'Specialized technician diploma in business management.',
    icon: '📜'
  },
  {
    type: 'education',
    title: 'Baccalaureate',
    organization: 'Economic Sciences & Management',
    period: 'June 2015',
    description: 'High school diploma in Economic Sciences and Management.',
    icon: '🏫'
  }
]

export const softSkills = [
  'Kindness & Empathy',
  'Planning & Organization',
  'Relationship Management',
  'Problem Solving',
  'Continuous Learning',
  'Team Collaboration'
]

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'Professional' },
  { name: 'English', level: 'Intermediate' }
]
