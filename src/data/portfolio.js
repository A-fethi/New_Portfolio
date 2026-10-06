export const personalInfo = {
  name: 'Abderrahmane',
  lastName: 'FETHI',
  title: 'Full Stack & DevOps / Cloud Engineer',
  email: 'fethiabderrahmane1@gmail.com',
  phone: '+212 699 87 3757',
  linkedin: 'https://linkedin.com/in/abderrahmane-fethi',
  github: 'https://github.com/A-fethi',
  bio: `Results-driven Full Stack Engineer & Cloud/DevOps Specialist with proven expertise in building modern distributed web applications and production-grade cloud infrastructure. Proficient in designing scalable microservices (Go, Java Spring Boot, Vue.js), provisioning automated multi-cloud architectures with Terraform & AWS (ECS Fargate, ALB, VPC), containerizing with Docker & Kubernetes (K3s), and engineering resilient CI/CD pipelines with GitLab & Ansible. Committed to high performance, reliability, and clean engineering.`,
  resumeUrl: 'https://raw.githubusercontent.com/A-fethi/New_Portfolio/main/public/Fethi_Abderrahmane_DevOps.pdf', // External CV download URL
  resumeDownloadName: 'Fethi_Abderrahmane_DevOps.pdf',
  stats: [
    { label: 'Projects Engineered', value: 12, suffix: '+' },
    { label: 'Tech & Cloud Tools', value: 22, suffix: '+' },
    { label: 'Automated Pipelines', value: 100, suffix: '+' },
    { label: 'Cloud Uptime Mindset', value: 99, suffix: '.9%' }
  ]
}

export const skills = [
  {
    category: 'Cloud & Infrastructure',
    icon: '☁️',
    color: 'var(--accent-primary)', // Dynamic Primary
    items: [
      { name: 'AWS (ECS Fargate, ALB, VPC, CloudWatch)', level: 88 },
      { name: 'Terraform (IaC Automation)', level: 90 },
      { name: 'Kubernetes & K3s Orchestration', level: 85 },
      { name: 'Docker & Docker Compose', level: 92 },
      { name: 'Linux Systems & Bash Scripting', level: 90 }
    ]
  },
  {
    category: 'CI/CD & DevSecOps',
    icon: '🛡️',
    color: 'var(--accent-warm)', // Dynamic Warm
    items: [
      { name: 'GitLab CI/CD & Runners', level: 90 },
      { name: 'Ansible (Infrastructure Automation)', level: 88 },
      { name: 'GitHub Actions & Workflows', level: 85 },
      { name: 'DevSecOps & Security (Trivy, SonarQube)', level: 82 },
      { name: 'GitOps & Zero-Downtime Deployments', level: 86 }
    ]
  },
  {
    category: 'Back-End & Microservices',
    icon: '⚙️',
    color: 'var(--accent-secondary)', // Dynamic Secondary
    items: [
      { name: 'Go (Golang)', level: 88 },
      { name: 'Java (Spring Boot)', level: 85 },
      { name: 'Python (Flask Microservices)', level: 82 },
      { name: 'Node.js & Express', level: 82 },
      { name: 'RabbitMQ (Event Broker)', level: 84 }
    ]
  },
  {
    category: 'Front-End Engineering',
    icon: '🎨',
    color: 'var(--accent-primary)', // Dynamic Primary
    items: [
      { name: 'Vue.js 3', level: 88 },
      { name: 'Angular & Angular Material', level: 80 },
      { name: 'JavaScript (ES6+) & TypeScript', level: 92 },
      { name: 'HTML5 & Modern CSS3 / Glassmorphism', level: 95 },
      { name: 'WebSockets & Real-Time UI', level: 85 }
    ]
  },
  {
    category: 'Databases & Storage',
    icon: '🗄️',
    color: 'var(--accent-emerald)', // Dynamic Emerald
    items: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'SQLite', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Docker Volumes & Persistent Volumes (PVC)', level: 86 }
    ]
  },
  {
    category: 'Networking & Gateways',
    icon: '🔗',
    color: 'var(--accent-secondary)', // Dynamic Secondary
    items: [
      { name: 'RESTful APIs & GraphQL', level: 90 },
      { name: 'API Gateway Architecture', level: 86 },
      { name: 'Nginx & Traefik Ingress', level: 84 },
      { name: 'Postman & Integration Testing', level: 88 }
    ]
  }
]

export const projects = [
  {
    title: 'Cloud-Design',
    category: 'devops',
    categoryLabel: 'AWS & Cloud Architecture',
    subtitle: 'Microservices Architecture on AWS ECS Fargate',
    description: 'Production microservices infrastructure deployed on AWS, provisioned entirely via Terraform. Features ECS Fargate serverless containers, Application Load Balancers, multi-AZ VPC with public/private subnets, dynamic auto-scaling policies, and structured CloudWatch monitoring.',
    tech: ['AWS ECS', 'Terraform', 'ALB', 'VPC', 'CloudWatch', 'Auto-Scaling'],
    highlights: ['100% Terraform IaC', 'Serverless Fargate', 'Zero-Downtime Rolling Updates'],
    color: '#F68300',
    icon: '☁️',
    github: 'https://github.com/A-fethi/cloud-design'
  },
  {
    title: 'Code-Keeper',
    category: 'devops',
    categoryLabel: 'CI/CD & DevSecOps',
    subtitle: 'Automated CI/CD Platform & Security Scanning',
    description: 'Enterprise-grade DevOps automation platform featuring self-hosted GitLab CE and autoscaling GitLab Runners deployed via Ansible. Multi-stage pipelines automate testing, linting, Docker builds, Trivy container security scans, and Terraform cloud provisioning.',
    tech: ['GitLab CI/CD', 'Ansible', 'Docker', 'Trivy', 'Terraform', 'DevSecOps'],
    highlights: ['Ansible Configuration', 'Multi-Stage Pipelines', 'Automated Vulnerability Scanning'],
    color: '#d9740a',
    icon: '🛡️',
    github: 'https://github.com/A-fethi/code-keeper'
  },
  {
    title: 'Orchestrator',
    category: 'devops',
    categoryLabel: 'Kubernetes & Clustering',
    subtitle: 'Multi-Node Kubernetes (K3s) Cluster',
    description: 'Resilient multi-node Kubernetes container orchestration cluster provisioned via Vagrant and Ansible. Deploys containerized microservices with declarative manifests, Traefik ingress routing, automated self-healing, liveness/readiness probes, and persistent volumes.',
    tech: ['Kubernetes (K3s)', 'Ansible', 'Vagrant', 'Traefik', 'Helm', 'YAML'],
    highlights: ['Multi-Node Cluster', 'Self-Healing Pods', 'Persistent Storage & Ingress'],
    color: '#616808',
    icon: '☸️',
    github: 'https://github.com/A-fethi/orchestrator'
  },
  {
    title: 'Play With Containers',
    category: 'devops',
    categoryLabel: 'Microservices & Event Broker',
    subtitle: 'Distributed Microservices with RabbitMQ',
    description: 'Decoupled microservices architecture utilizing an API Gateway single entry point, isolated database-per-service pattern with PostgreSQL, and asynchronous message brokering via RabbitMQ for resilient order billing and inventory processing.',
    tech: ['Docker Compose', 'RabbitMQ', 'Python (Flask)', 'PostgreSQL', 'API Gateway'],
    highlights: ['Event-Driven (RabbitMQ)', 'Database-Per-Service', 'Docker Bridge Networking'],
    color: '#8a4b00',
    icon: '📦',
    github: 'https://github.com/A-fethi/play-with-containers'
  },
  {
    title: 'Social Network',
    category: 'fullstack',
    categoryLabel: 'Full Stack & WebSockets',
    subtitle: 'Real-Time Full Stack Social Platform',
    description: 'Comprehensive social networking web application with live private & group chat, profiles, followers, post feeds, and notifications. Built with Vue.js frontend, high-performance Go backend, WebSockets, SQLite, and Dockerized deployment.',
    tech: ['Vue.js', 'Go', 'WebSockets', 'SQLite', 'Docker', 'bcrypt'],
    highlights: ['Real-Time WebSockets', 'Concurrent Go Handlers', 'Docker Containerized'],
    color: '#F68300',
    icon: '🌐',
    github: 'https://github.com/A-fethi'
  },
  {
    title: '01Blog',
    category: 'fullstack',
    categoryLabel: 'Full Stack Enterprise',
    subtitle: 'Social Blogging & Content Management',
    description: 'Full-featured enterprise blogging platform engineered with Spring Boot backend and Angular Material frontend. Features JWT authentication, granular Role-Based Access Control (RBAC), PostgreSQL persistence via JPA, and rich interactive engagement.',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'JPA', 'JWT', 'Spring Security'],
    highlights: ['JWT Security & RBAC', 'Angular Material UI', 'JPA Data Architecture'],
    color: '#616808',
    icon: '📝',
    github: 'https://github.com/A-fethi'
  },
  {
    title: 'Bombermandom',
    category: 'fullstack',
    categoryLabel: 'Frontend & Game Engine',
    subtitle: 'Multiplayer 60FPS Browser Game Engine',
    description: 'Real-time multiplayer Bomberman arcade engine developed with pure vanilla JavaScript and DOM manipulation without canvas or WebGL dependencies. Optimized 60fps tick-based game loop with synchronized multi-player state and collision physics.',
    tech: ['JavaScript (ES6)', 'HTML5', 'CSS3', 'DOM API', 'Game Loop'],
    highlights: ['Vanilla DOM Engine', '60 FPS Physics Loop', 'Zero External Dependencies'],
    color: '#d9740a',
    icon: '💣',
    github: 'https://github.com/A-fethi'
  },
  {
    title: 'Java Local Server',
    category: 'fullstack',
    categoryLabel: 'Systems & Networking',
    subtitle: 'Custom HTTP & Socket Server Implementation',
    description: 'Lightweight HTTP web server built from scratch in Java using raw network sockets. Handles HTTP/1.1 protocol parsing, request routing, GET/POST payload processing, multi-threaded client handling, and robust error management.',
    tech: ['Java', 'Sockets', 'HTTP/1.1 RFC', 'Concurrency', 'Postman'],
    highlights: ['Low-Level Sockets', 'RFC Protocol Parser', 'Multi-Threaded Pool'],
    color: '#6d7a0a',
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
    description: 'Prepared accounting reports, managed data entry and financial records. Developed strong precision, organization, and rigor skills transferable to cloud infrastructure budgeting, cost optimization, and systems auditing.',
    icon: '💼'
  },
  {
    type: 'work',
    title: 'Sales & Client Relations Representative',
    organization: 'Forever Living Products, Fes, MA',
    period: 'Jan 2017 — Sept 2018',
    description: 'Organized direct product promotion and client relation management. Strengthened communication, active listening, persuasion, and project planning skills.',
    icon: '📊'
  }
]

export const education = [
  {
    type: 'education',
    title: 'Cloud Computing & DevOps Specialization',
    organization: 'Zone01 / 01Talent Curriculum',
    period: '2024 — Present',
    description: 'Intensive specialization focusing on Production Cloud Architecture (AWS), Infrastructure as Code (Terraform), Container Orchestration (Kubernetes & K3s), Docker, CI/CD Automation (GitLab & Ansible), and DevSecOps security auditing.',
    icon: '☁️'
  },
  {
    type: 'education',
    title: 'Full Stack Software Engineering',
    organization: 'Zone01 / 01Talent Curriculum',
    period: '2023 — 2024',
    description: 'Intensive peer-learning software engineering curriculum. Mastered algorithmic problem solving, modern web frameworks (Vue.js, Angular), backend languages (Go, Java Spring Boot), REST/GraphQL APIs, and database design.',
    icon: '💻'
  },
  {
    type: 'education',
    title: 'ALX Africa Certificate',
    organization: 'Frontend Development Specialization',
    period: 'Jan 2023 — April 2024',
    description: 'Comprehensive modern frontend engineering certification covering JavaScript, web performance, responsive UI design, and collaborative development.',
    icon: '🎓'
  },
  {
    type: 'education',
    title: 'Specialized Technician',
    organization: 'Business Management — IFMOTICA Fes',
    period: 'Sept 2018 — Sept 2020',
    description: 'Specialized technician diploma in business management, organizational administration, and financial accounting.',
    icon: '📜'
  },
  {
    type: 'education',
    title: 'Baccalaureate',
    organization: 'Economic Sciences & Management',
    period: 'June 2015',
    description: 'High school diploma with specialization in Economic Sciences and Management.',
    icon: '🏫'
  }
]

export const softSkills = [
  'Cloud Architecture Design',
  'Problem Solving & Debugging',
  'Automation Mindset',
  'Planning & Rigor',
  'Continuous Learning',
  'Team Collaboration & Empathy'
]

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'Professional' },
  { name: 'English', level: 'Full Professional' }
]
