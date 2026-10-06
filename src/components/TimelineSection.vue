<template>
  <section class="timeline section" id="timeline">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Journey</span>
        <h2 class="section-title">Experience & Education</h2>
        <p class="section-subtitle">My professional journey, academic background, and DevOps/Cloud specialization</p>
      </div>

      <div class="timeline-container">
        <div class="timeline-line" ref="timelineLine">
          <div class="timeline-line-fill" ref="timelineLineFill"></div>
        </div>

        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="timeline-item"
          :class="[index % 2 === 0 ? 'left' : 'right', item.type]"
          ref="timelineItems"
        >
          <div class="timeline-node">
            <span class="timeline-icon">{{ item.icon }}</span>
          </div>

          <div class="timeline-card glass-card gradient-border">
            <div class="timeline-card-header">
              <span class="timeline-type-badge" :class="item.type">
                {{ item.type === 'work' ? '💼 Work' : '🎓 Education' }}
              </span>
              <span class="timeline-period">{{ item.period }}</span>
            </div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-org">{{ item.organization }}</p>
            <p class="timeline-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- Verified Cloud Specializations & Certifications Grid -->
      <div class="certifications-block">
        <div class="cert-header">
          <span class="cert-badge-lead">// Verified Competencies</span>
          <h3 class="cert-title">Certifications & Cloud Specialization Tracks</h3>
          <p class="cert-subtitle">Formal curriculums and verified project-driven competencies across Cloud, DevOps, and Software Engineering</p>
        </div>

        <div class="cert-grid">
          <div
            v-for="cert in certifications"
            :key="cert.title"
            class="cert-card glass-card gradient-border"
          >
            <div class="cert-top-row">
              <span class="cert-icon">{{ cert.icon }}</span>
              <span class="cert-status-pill text-mono">{{ cert.status }}</span>
            </div>
            <h4 class="cert-name">{{ cert.title }}</h4>
            <span class="cert-issuer">{{ cert.issuer }}</span>
            <p class="cert-desc">{{ cert.desc }}</p>
            <div class="cert-tags">
              <span v-for="tag in cert.tags" :key="tag" class="cert-tag text-mono">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { experience, education } from '../data/portfolio.js'

const timelineItems = computed(() => {
  return [...education, ...experience].sort((a, b) => {
    const getYear = (period) => {
      const match = period.match(/\d{4}/)
      return match ? parseInt(match[0]) : 0
    }
    return getYear(b.period) - getYear(a.period)
  })
})

const certifications = [
  {
    icon: '☁️',
    title: 'AWS Cloud Architecture Specialization',
    issuer: 'Zone01 / AWS Architecture Track',
    status: 'VERIFIED TRACK',
    desc: 'Production microservices deployment on ECS Fargate, Multi-AZ VPC design, Application Load Balancers, IAM security, and CloudWatch alarms.',
    tags: ['AWS ECS', 'Fargate', 'VPC Multi-AZ', 'ALB']
  },
  {
    icon: '📜',
    title: 'Infrastructure as Code (Terraform)',
    issuer: 'Zone01 / HashiCorp Track',
    status: 'VERIFIED TRACK',
    desc: '100% declarative cloud automation, modular HCL architectures, state locking, and automated multi-environment deployments.',
    tags: ['Terraform', 'Modular HCL', 'State Locking']
  },
  {
    icon: '☸️',
    title: 'Kubernetes (K3s) Cluster Orchestration',
    issuer: 'Zone01 / Kubernetes Track',
    status: 'VERIFIED TRACK',
    desc: 'Multi-node container clustering, Traefik ingress routing, rolling updates with zero downtime, liveness/readiness probes, and PVC storage.',
    tags: ['Kubernetes', 'K3s', 'Traefik', 'PVC']
  },
  {
    icon: '🛡️',
    title: 'GitLab CI/CD & Ansible Automation',
    issuer: 'DevOps & Security Engineering',
    status: 'VERIFIED TRACK',
    desc: 'Self-hosted GitLab CE and autoscale runners provisioned via Ansible, Trivy SAST container security scans, and automated delivery pipelines.',
    tags: ['GitLab CI', 'Ansible', 'Trivy SAST', 'DevSecOps']
  },
  {
    icon: '💻',
    title: 'Full Stack Software Engineering',
    issuer: 'Zone01 / 01Talent Curriculum',
    status: 'GRADUATED',
    desc: 'Intensive peer-to-peer software engineering program covering Go, Java Spring Boot, Vue.js, algorithms, databases, and microservices.',
    tags: ['Go', 'Spring Boot', 'Vue.js', 'PostgreSQL']
  },
  {
    icon: '🎓',
    title: 'Frontend Development Specialization',
    issuer: 'ALX Africa Certificate',
    status: 'CERTIFIED',
    desc: 'Comprehensive modern frontend engineering curriculum covering JavaScript ES6+, responsive architectures, web vitals, and UX best practices.',
    tags: ['JavaScript', 'Web Vitals', 'Responsive UI']
  }
]

const timelineLine = ref(null)
const timelineLineFill = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item)
  })

  document.querySelectorAll('.cert-card').forEach(card => {
    observer.observe(card)
  })

  const handleScroll = () => {
    if (!timelineLine.value || !timelineLineFill.value) return
    const rect = timelineLine.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const lineHeight = rect.height

    if (rect.top < windowHeight && rect.bottom > 0) {
      const visiblePortion = Math.min(windowHeight - rect.top, lineHeight)
      const progress = Math.max(0, Math.min(1, visiblePortion / lineHeight))
      timelineLineFill.value.style.height = `${progress * 100}%`
    }
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})
</script>

<style scoped>
.timeline-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto 80px;
}

/* Timeline Line */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(-50%);
}

[data-theme="light"] .timeline-line {
  background: rgba(0, 0, 0, 0.08);
}

.timeline-line-fill {
  width: 100%;
  height: 0%;
  background: var(--gradient-primary);
  border-radius: 1px;
  transition: height 0.1s linear;
  box-shadow: 0 0 10px rgba(var(--accent-primary-rgb), 0.3);
}

/* Timeline Item */
.timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  position: relative;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item.left {
  flex-direction: row;
  padding-right: calc(50% + 32px);
  transform: translateX(-40px);
}

.timeline-item.right {
  flex-direction: row-reverse;
  padding-left: calc(50% + 32px);
  transform: translateX(40px);
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

/* Timeline Node */
.timeline-node {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 44px;
  background: var(--bg-secondary);
  border: 2px solid rgba(var(--accent-primary-rgb), 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all var(--transition-base);
}

.timeline-item.animate-in .timeline-node {
  border-color: var(--accent-primary);
  box-shadow: 0 0 15px rgba(var(--accent-primary-rgb), 0.2);
}

.timeline-icon {
  font-size: 1.1rem;
}

/* Timeline Card */
.timeline-card {
  padding: 24px;
  flex: 1;
}

.timeline-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.timeline-type-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.timeline-type-badge.work {
  background: rgba(var(--accent-primary-rgb), 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
}

.timeline-type-badge.education {
  background: rgba(var(--accent-secondary-rgb), 0.1);
  color: var(--accent-secondary);
  border: 1px solid rgba(var(--accent-secondary-rgb), 0.2);
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.timeline-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.timeline-org {
  font-size: 0.9rem;
  color: var(--accent-secondary);
  margin-bottom: 12px;
  font-weight: 600;
}

.timeline-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Certifications Block */
.certifications-block {
  margin-top: 60px;
  padding-top: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

[data-theme="light"] .certifications-block {
  border-top-color: rgba(0, 0, 0, 0.08);
}

.cert-header {
  text-align: center;
  margin-bottom: 40px;
}

.cert-badge-lead {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-primary);
  display: block;
  margin-bottom: 8px;
}

.cert-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.cert-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto;
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.cert-card {
  padding: 24px;
  border-radius: var(--radius-md);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
}

.cert-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.cert-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(246, 131, 0, 0.15);
  border-color: rgba(var(--accent-primary-rgb), 0.4);
}

.cert-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.cert-icon {
  font-size: 1.8rem;
}

.cert-status-pill {
  font-size: 0.68rem;
  font-weight: 700;
  background: rgba(128, 255, 114, 0.12);
  color: #80ff72;
  border: 1px solid rgba(128, 255, 114, 0.25);
  padding: 3px 8px;
  border-radius: var(--radius-full);
}

.cert-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.cert-issuer {
  font-size: 0.8rem;
  color: var(--accent-primary);
  font-weight: 600;
  margin-bottom: 12px;
  display: block;
}

.cert-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
}

.cert-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cert-tag {
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
  padding: 2px 8px;
  border-radius: 4px;
}

[data-theme="light"] .cert-tag {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-node {
    left: 20px;
    width: 36px;
    height: 36px;
  }

  .timeline-item.left,
  .timeline-item.right {
    padding-left: 56px;
    padding-right: 0;
    flex-direction: row;
  }

  .timeline-item.left {
    transform: translateX(-20px);
  }

  .timeline-item.right {
    transform: translateX(-20px);
    flex-direction: row;
  }

  .cert-grid {
    grid-template-columns: 1fr;
  }
}

[data-theme="light"] .timeline-content {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

[data-theme="light"] .timeline-title {
  color: #0f172a;
}

[data-theme="light"] .timeline-desc {
  color: #334155;
  font-weight: 450;
}

[data-theme="light"] .cert-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

[data-theme="light"] .cert-card:hover {
  background: #ffffff;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .cert-name {
  color: #0f172a;
}

[data-theme="light"] .cert-issuer {
  color: var(--text-accent);
  font-weight: 700;
}

[data-theme="light"] .cert-desc {
  color: #334155;
  font-weight: 450;
}

[data-theme="light"] .cert-status-pill {
  background: rgba(22, 163, 74, 0.12);
  color: #15803d;
  border: 1px solid rgba(22, 163, 74, 0.3);
  font-weight: 700;
}

[data-theme="light"] .cert-tag {
  background: #f1f5f9;
  border-color: rgba(15, 23, 42, 0.1);
  color: #334155;
  font-weight: 600;
}

</style>
