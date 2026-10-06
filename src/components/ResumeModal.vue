<template>
  <Teleport to="body">
    <Transition name="resume-fade">
      <div v-if="isOpen" class="resume-modal-overlay" @click.self="$emit('close')">
        <div class="resume-modal-dialog glass-card">
          <!-- Modal Actions Bar -->
          <div class="resume-modal-bar">
            <div class="bar-left">
              <span class="bar-title text-mono">CURRICULUM VITAE // ABDERRAHMANE_FETHI</span>
              <span class="bar-status-badge">ATS-Optimized</span>
            </div>

            <div class="bar-actions">
              <a :href="personalInfo.resumeUrl" target="_blank" rel="noopener noreferrer" download="Abderrahmane_FETHI_CV.pdf" class="action-btn download-direct-btn" @click="playClick" title="Download External PDF">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download PDF</span>
              </a>
              <button class="action-btn" @click="printResume" title="Print ATS Version">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                <span>Print</span>
              </button>
              <button class="action-btn" @click="copyPlaintext" title="Copy Plaintext for ATS">
                <span v-if="copied">✓ Copied</span>
                <span v-else>Copy Plaintext</span>
              </button>
              <button class="bar-close-btn" @click="$emit('close')" aria-label="Close CV">
                ✕
              </button>
            </div>
          </div>

          <!-- Printable / Viewable Resume Document Sheet -->
          <div class="resume-document-container" id="printable-resume">
            <div class="resume-sheet">
              <!-- Resume Header -->
              <header class="sheet-header">
                <div class="header-name-block">
                  <h1 class="sheet-name">Abderrahmane FETHI</h1>
                  <h2 class="sheet-role">Full Stack & DevOps / Cloud Engineer</h2>
                </div>
                <div class="sheet-contacts text-mono">
                  <div><span>📧</span> <a href="mailto:fethiabderrahmane1@gmail.com">fethiabderrahmane1@gmail.com</a></div>
                  <div><span>📱</span> <a href="tel:+212699873757">+212 699 87 3757</a></div>
                  <div><span>📍</span> Berkane / Fes, Morocco 🇲🇦</div>
                  <div><span>🐙</span> <a href="https://github.com/A-fethi" target="_blank">github.com/A-fethi</a></div>
                  <div><span>💼</span> <a href="https://linkedin.com/in/abderrahmane-fethi" target="_blank">linkedin.com/in/abderrahmane-fethi</a></div>
                </div>
              </header>

              <hr class="sheet-divider" />

              <!-- Professional Summary -->
              <section class="sheet-section">
                <h3 class="sheet-sec-title">Professional Summary</h3>
                <p class="sheet-text">
                  Versatile Full Stack Engineer & DevOps/Cloud Specialist with hands-on expertise building production-grade distributed microservices and declarative cloud infrastructure. Proficient in automating AWS cloud environments with Terraform (IaC), containerizing applications with Docker & multi-node Kubernetes (K3s), orchestrating zero-downtime CI/CD pipelines via GitLab CE and Ansible, and engineering scalable backends using Go and Java Spring Boot.
                </p>
              </section>

              <!-- Technical Competencies -->
              <section class="sheet-section">
                <h3 class="sheet-sec-title">Core Technical Skills</h3>
                <div class="skills-line-grid">
                  <div class="skill-row">
                    <span class="skill-group-name">Cloud & Infrastructure:</span>
                    <span class="skill-group-items">AWS (ECS Fargate, ALB, VPC, CloudWatch, IAM, NAT Gateway), Terraform (IaC), Kubernetes (K3s), Docker & Docker Compose</span>
                  </div>
                  <div class="skill-row">
                    <span class="skill-group-name">CI/CD & DevSecOps:</span>
                    <span class="skill-group-items">GitLab CI/CD, Ansible Automation, GitHub Actions, Trivy Container Scanning, Bandit SAST, Zero-Downtime Rolling Updates</span>
                  </div>
                  <div class="skill-row">
                    <span class="skill-group-name">Back-End & Microservices:</span>
                    <span class="skill-group-items">Go (Golang), Java (Spring Boot, JPA, Security), Python (Flask), Node.js / Express, RabbitMQ Event Broker</span>
                  </div>
                  <div class="skill-row">
                    <span class="skill-group-name">Front-End & Real-Time:</span>
                    <span class="skill-group-items">Vue.js 3, Angular, JavaScript (ES6+), HTML5 / CSS3, WebSockets, RESTful APIs, GraphQL</span>
                  </div>
                  <div class="skill-row">
                    <span class="skill-group-name">Databases & Storage:</span>
                    <span class="skill-group-items">PostgreSQL, SQLite, MongoDB, Docker Volumes, Kubernetes Persistent Volumes (PV/PVC)</span>
                  </div>
                </div>
              </section>

              <!-- Featured DevOps & Cloud Projects -->
              <section class="sheet-section">
                <h3 class="sheet-sec-title">Featured Production & DevOps Projects</h3>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Cloud-Design: Microservices Architecture on AWS ECS Fargate</span>
                    <span class="item-date text-mono">Terraform | AWS | 2024</span>
                  </div>
                  <ul class="item-bullets">
                    <li>Re-architected and provisioned an entire microservices system on AWS declaratively using modular Terraform (IaC).</li>
                    <li>Configured Multi-AZ VPC with public subnets, NAT Gateway, and isolated private subnets for ECS Fargate containers and RDS PostgreSQL.</li>
                    <li>Implemented Application Load Balancer with target-tracking auto-scaling policies based on CPU and memory thresholds.</li>
                  </ul>
                </div>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Code-Keeper: Automated CI/CD & DevSecOps Platform</span>
                    <span class="item-date text-mono">GitLab | Ansible | Trivy</span>
                  </div>
                  <ul class="item-bullets">
                    <li>Automated the deployment and registration of self-hosted GitLab CE and autoscaling Docker-in-Docker runners using Ansible playbooks.</li>
                    <li>Designed end-to-end multi-stage CI/CD pipelines including automated unit testing, linting, Docker builds, and Trivy CVE container vulnerability scans.</li>
                    <li>Integrated zero-downtime rolling deployment workflows to staging and production environments.</li>
                  </ul>
                </div>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Orchestrator: Multi-Node Kubernetes (K3s) Cluster</span>
                    <span class="item-date text-mono">Kubernetes | K3s | Vagrant</span>
                  </div>
                  <ul class="item-bullets">
                    <li>Engineered a resilient multi-node K3s cluster provisioned via Vagrant and Ansible with Traefik Ingress Controller.</li>
                    <li>Configured liveness and readiness health probes for automated pod self-healing, rolling update strategies, and persistent volume claims (PVC).</li>
                  </ul>
                </div>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Play With Containers: Distributed Microservices with RabbitMQ</span>
                    <span class="item-date text-mono">Docker Compose | RabbitMQ</span>
                  </div>
                  <ul class="item-bullets">
                    <li>Architected decoupled microservices with an API Gateway entry point and isolated PostgreSQL databases per service.</li>
                    <li>Implemented asynchronous event-driven order processing via a durable RabbitMQ message broker on custom Docker bridge networks.</li>
                  </ul>
                </div>
              </section>

              <!-- Education & Certifications -->
              <section class="sheet-section">
                <h3 class="sheet-sec-title">Education & Specialization</h3>
                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Cloud Computing & DevOps Specialization</span>
                    <span class="item-date text-mono">2024 — Present</span>
                  </div>
                  <div class="item-sub">Zone01 / 01Talent Curriculum</div>
                  <p class="item-desc">Intensive specialization in AWS Cloud, Terraform, Kubernetes, Docker, CI/CD with GitLab & Ansible, and DevSecOps.</p>
                </div>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Full Stack Software Engineering</span>
                    <span class="item-date text-mono">2023 — 2024</span>
                  </div>
                  <div class="item-sub">Zone01 / 01Talent Curriculum</div>
                  <p class="item-desc">Project-driven software engineering covering algorithms, systems programming, Go, Java, Vue.js, and databases.</p>
                </div>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">ALX Africa Certificate — Frontend Development</span>
                    <span class="item-date text-mono">Jan 2023 — April 2024</span>
                  </div>
                </div>

                <div class="resume-item">
                  <div class="item-head">
                    <span class="item-title">Specialized Technician — Business Management</span>
                    <span class="item-date text-mono">IFMOTICA Fes | 2018 — 2020</span>
                  </div>
                </div>
              </section>

              <!-- Languages -->
              <section class="sheet-section">
                <h3 class="sheet-sec-title">Languages</h3>
                <p class="sheet-text">
                  <strong>Arabic:</strong> Native · <strong>French:</strong> Professional Full Proficiency · <strong>English:</strong> Full Professional Working Proficiency
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { personalInfo } from '../data/portfolio.js'
import { playClick, playModalOpen, playModalClose } from '../utils/audioSystem.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const copied = ref(false)

const printResume = () => {
  playClick()
  window.print()
}

const copyPlaintext = () => {
  playClick()
  const plain = `ABDERRAHMANE FETHI
Full Stack & DevOps / Cloud Engineer
Email: fethiabderrahmane1@gmail.com | Phone: +212 699 87 3757
Location: Morocco | GitHub: https://github.com/A-fethi | LinkedIn: https://linkedin.com/in/abderrahmane-fethi

PROFESSIONAL SUMMARY:
Versatile Full Stack Engineer & DevOps/Cloud Specialist with hands-on expertise building production-grade distributed microservices and declarative cloud infrastructure. Proficient in automating AWS cloud environments with Terraform (IaC), containerizing applications with Docker & multi-node Kubernetes (K3s), orchestrating zero-downtime CI/CD pipelines via GitLab CE and Ansible, and engineering scalable backends using Go and Java Spring Boot.

TECHNICAL SKILLS:
- Cloud & Infrastructure: AWS (ECS Fargate, ALB, VPC, CloudWatch, IAM), Terraform (IaC), Kubernetes (K3s), Docker & Compose
- CI/CD & DevSecOps: GitLab CI/CD, Ansible, GitHub Actions, Trivy Security, Zero-Downtime Deployments
- Back-End: Go (Golang), Java (Spring Boot), Python (Flask), Node.js, RabbitMQ Broker
- Front-End: Vue.js 3, Angular, JavaScript (ES6+), HTML5, CSS3, WebSockets
- Databases: PostgreSQL, SQLite, MongoDB, Docker Volumes, PVCs

FEATURED PROJECTS:
1. Cloud-Design: AWS ECS Fargate & Terraform IaC (Multi-AZ VPC, ALB, Auto-scaling)
2. Code-Keeper: Automated CI/CD Platform (GitLab CE, Ansible Runners, Trivy SAST)
3. Orchestrator: Multi-Node Kubernetes (K3s) Cluster with Traefik Ingress & PVCs
4. Play With Containers: Distributed Microservices & RabbitMQ Message Broker

EDUCATION:
- DevOps & Cloud Computing Specialization — Zone01 / 01Talent (2024 — Present)
- Full Stack Software Engineering — Zone01 / 01Talent (2023 — 2024)
- ALX Africa Frontend Development Certificate (2023 — 2024)
- Specialized Technician in Business Management — IFMOTICA Fes (2018 — 2020)`

  navigator.clipboard?.writeText(plain).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

// Lock body scroll while modal is open
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
)

const onKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.resume-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.resume-modal-dialog {
  width: 100%;
  max-width: 900px;
  max-height: 92vh;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(246, 131, 0, 0.15);
  overflow: hidden;
}

[data-theme="light"] .resume-modal-dialog {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
}

/* Modal Actions Bar */
.resume-modal-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 12px;
}

[data-theme="light"] .resume-modal-bar {
  background: rgba(0, 0, 0, 0.03);
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-title {
  font-size: 0.82rem;
  color: var(--text-primary);
  font-weight: 700;
}

.bar-status-badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  background: rgba(128, 255, 114, 0.12);
  color: #80ff72;
  border: 1px solid rgba(128, 255, 114, 0.25);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.bar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(246, 131, 0, 0.12);
  border: 1px solid rgba(246, 131, 0, 0.3);
  color: var(--accent-primary);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.action-btn:hover {
  background: var(--accent-primary);
  color: #111;
  box-shadow: 0 0 12px rgba(246, 131, 0, 0.3);
}

.bar-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all var(--transition-base);
}

.bar-close-btn:hover {
  color: #ff5f57;
  border-color: #ff5f57;
}

/* Document Container */
.resume-document-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #0a0a0a;
}

[data-theme="light"] .resume-document-container {
  background: #f4f4f4;
}

.resume-sheet {
  max-width: 780px;
  margin: 0 auto;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 40px;
  color: #d8d8d8;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

[data-theme="light"] .resume-sheet {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.1);
  color: #222222;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* Header */
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.sheet-name {
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

[data-theme="light"] .sheet-name {
  color: #111111;
}

.sheet-role {
  font-size: 1.05rem;
  color: var(--accent-primary);
  font-weight: 600;
}

.sheet-contacts {
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sheet-contacts a {
  color: inherit;
  text-decoration: none;
}

.sheet-contacts a:hover {
  color: var(--accent-primary);
}

.sheet-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 20px 0;
}

[data-theme="light"] .sheet-divider {
  border-top-color: rgba(0, 0, 0, 0.1);
}

/* Sections */
.sheet-section {
  margin-bottom: 24px;
}

.sheet-sec-title {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-primary);
  border-bottom: 1.5px solid rgba(246, 131, 0, 0.3);
  padding-bottom: 4px;
  margin-bottom: 12px;
}

.sheet-text {
  font-size: 0.88rem;
  line-height: 1.7;
}

/* Skills Line Grid */
.skills-line-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.85rem;
}

.skill-row {
  line-height: 1.5;
}

.skill-group-name {
  font-weight: 700;
  color: var(--text-primary);
  margin-right: 6px;
}

[data-theme="light"] .skill-group-name {
  color: #111111;
}

.skill-group-items {
  color: var(--text-secondary);
}

[data-theme="light"] .skill-group-items {
  color: #444444;
}

/* Items */
.resume-item {
  margin-bottom: 16px;
}

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}

.item-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-primary);
}

[data-theme="light"] .item-title {
  color: #111111;
}

.item-date {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.item-sub {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 4px;
}

.item-desc {
  font-size: 0.84rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.item-bullets {
  margin: 6px 0 0 18px;
  padding: 0;
  font-size: 0.84rem;
  line-height: 1.6;
}

.item-bullets li {
  margin-bottom: 4px;
}

/* Modal Fade Animation */
.resume-fade-enter-active,
.resume-fade-leave-active {
  transition: opacity 0.3s ease;
}

.resume-fade-enter-from,
.resume-fade-leave-to {
  opacity: 0;
}

.resume-fade-enter-active .resume-modal-dialog {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.resume-fade-enter-from .resume-modal-dialog {
  transform: scale(0.92) translateY(20px);
}

/* Native Print Styles */
@media print {
  body * {
    visibility: hidden;
  }
  #printable-resume, #printable-resume * {
    visibility: visible;
  }
  #printable-resume {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #ffffff !important;
    color: #111111 !important;
  }
  .resume-sheet {
    background: #ffffff !important;
    color: #111111 !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    max-width: 100% !important;
  }
  .sheet-name, .item-title, .skill-group-name {
    color: #111111 !important;
  }
  .sheet-role, .sheet-sec-title, .item-sub {
    color: #c46800 !important;
  }
  .resume-modal-bar, .resume-modal-overlay {
    background: transparent !important;
  }
}

@media (max-width: 768px) {
  .resume-sheet {
    padding: 20px;
  }
  .sheet-header {
    flex-direction: column;
  }
  .sheet-name {
    font-size: 1.5rem;
  }
}
</style>
