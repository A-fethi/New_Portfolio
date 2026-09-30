<template>
  <section class="pipeline-section section" id="architecture">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Cloud Architecture & CI/CD</span>
        <h2 class="section-title">Interactive DevOps Pipeline</h2>
        <p class="section-subtitle">
          Live visualization of my automated microservices delivery pipeline — from code commit to AWS ECS production.
        </p>
      </div>

      <!-- Pipeline Control Deck -->
      <div class="pipeline-deck glass-card gradient-border">
        <!-- Status Bar -->
        <div class="deck-status-bar">
          <div class="status-left">
            <span class="pulse-indicator"></span>
            <span class="status-title text-mono">INFRA_ORCHESTRATOR // AWS_EU_WEST_3</span>
          </div>
          <div class="status-right">
            <button class="btn btn-sm btn-accent" @click="runSimulation" :disabled="isSimulating">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'spin-anim': isSimulating }"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>{{ isSimulating ? 'Deploying...' : 'Trigger Live Deployment' }}</span>
            </button>
          </div>
        </div>

        <!-- 3D Holographic Pipeline Rail -->
        <div class="pipeline-flow-container">
          <div class="pipeline-track">
            <!-- Animated Flow Energy Line -->
            <div class="energy-beam" :style="{ width: `${simulatedProgress}%` }"></div>

            <div
              v-for="(stage, index) in stages"
              :key="stage.id"
              class="pipeline-node-card"
              :class="{
                active: activeStageIndex === index,
                completed: simulatedProgress >= stage.threshold,
                pulsing: isSimulating && currentSimStage === index
              }"
              @click="activeStageIndex = index"
            >
              <div class="node-icon-wrapper">
                <span class="node-icon">{{ stage.icon }}</span>
                <span class="node-step-badge text-mono">0{{ index + 1 }}</span>
              </div>
              <h4 class="node-name">{{ stage.name }}</h4>
              <p class="node-role">{{ stage.subtitle }}</p>
              
              <div class="node-status-chip" :class="stage.statusClass">
                <span class="chip-dot"></span>
                <span>{{ stage.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Terminal / Telemetry Screen -->
        <div class="pipeline-telemetry">
          <div class="telemetry-header">
            <div class="terminal-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="telemetry-tab-title text-mono">
              {{ currentStage.specFile }} // [{{ currentStage.tech }}]
            </span>
            <div class="telemetry-tags">
              <span v-for="tag in currentStage.badges" :key="tag" class="telemetry-badge">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="telemetry-body">
            <div class="telemetry-meta-grid">
              <div class="meta-item">
                <span class="meta-label">Primary Technology:</span>
                <span class="meta-val text-accent">{{ currentStage.tech }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Architecture Role:</span>
                <span class="meta-val">{{ currentStage.role }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Key Metric / SLA:</span>
                <span class="meta-val text-green">{{ currentStage.metric }}</span>
              </div>
            </div>

            <!-- Code / Log Snippet -->
            <div class="telemetry-code-block">
              <div class="code-banner text-mono">
                <span>{{ currentStage.codeTitle }}</span>
                <span class="copy-hint">PROD_VERIFIED</span>
              </div>
              <pre><code>{{ currentStage.codeSnippet }}</code></pre>
            </div>
          </div>
        </div>

        <!-- Live Metrics Strip -->
        <div class="pipeline-metrics-strip">
          <div class="metric-box">
            <span class="metric-num text-accent">100%</span>
            <span class="metric-desc">Automated IaC</span>
          </div>
          <div class="metric-box">
            <span class="metric-num text-accent">0s</span>
            <span class="metric-desc">Deployment Downtime</span>
          </div>
          <div class="metric-box">
            <span class="metric-num text-accent">0</span>
            <span class="metric-desc">Critical CVEs (Trivy)</span>
          </div>
          <div class="metric-box">
            <span class="metric-num text-accent">3 AZ</span>
            <span class="metric-desc">AWS High Availability</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeStageIndex = ref(0)
const isSimulating = ref(false)
const simulatedProgress = ref(100)
const currentSimStage = ref(-1)

const stages = [
  {
    id: 'git',
    name: 'Source & GitOps',
    subtitle: 'Version Control',
    icon: '🐙',
    tech: 'Git & GitLab CE',
    status: 'SYNCED',
    statusClass: 'status-ok',
    threshold: 20,
    role: 'Centralized repository management, branch protection rules & webhook triggers',
    metric: 'Instant Webhook Triggers',
    specFile: 'gitlab-ci.yml',
    badges: ['Trunk-Based', 'Signed Commits', 'Branch Rules'],
    codeTitle: '// .gitlab-ci.yml — Automated Trigger Definition',
    codeSnippet: `stages:
  - lint
  - test
  - security
  - containerize
  - deploy-fargate

workflow:
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      when: always`
  },
  {
    id: 'ci',
    name: 'Ansible & CI',
    subtitle: 'Automated Testing',
    icon: '⚡',
    tech: 'Ansible & GitLab Runners',
    status: 'CONFIGURED',
    statusClass: 'status-ok',
    threshold: 40,
    role: 'Automated runner configuration, declarative system setup, linting and unit test execution',
    metric: '100% Idempotent Runbooks',
    specFile: 'deploy-runner.yml',
    badges: ['Self-Hosted Runners', 'Ansible Vault', 'Idempotency'],
    codeTitle: '// ansible-playbook.yml — GitLab Runner Provisioning',
    codeSnippet: `- name: Configure Autoscale GitLab Runners
  hosts: ci_runners
  become: true
  tasks:
    - name: Register Docker Executor Runner
      command: gitlab-runner register --non-interactive \
        --url "https://gitlab.internal" \
        --executor "docker" \
        --docker-image "docker:24-dind"`
  },
  {
    id: 'docker',
    name: 'Containers & SAST',
    subtitle: 'Build & Security',
    icon: '🛡️',
    tech: 'Docker & Trivy SAST',
    status: 'SECURE',
    statusClass: 'status-ok',
    threshold: 60,
    role: 'Multi-stage Docker builds creating lightweight scratch images, scanned against CVE database via Trivy',
    metric: '0 Critical Vulnerabilities',
    specFile: 'Dockerfile.production',
    badges: ['Multi-Stage', 'Non-Root User', 'Trivy Scanned'],
    codeTitle: '// Dockerfile — Production Multi-Stage Build & Security',
    codeSnippet: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o microservice .

FROM alpine:3.20
RUN adduser -D -u 10001 appuser
USER appuser
COPY --from=builder /app/microservice /usr/local/bin/`
  },
  {
    id: 'k8s',
    name: 'Kubernetes (K3s)',
    subtitle: 'Container Orchestration',
    icon: '☸️',
    tech: 'K3s Cluster & Traefik',
    status: 'HEALTHY',
    statusClass: 'status-ok',
    threshold: 80,
    role: 'Multi-node cluster handling pod auto-healing, rolling updates, ConfigMaps, and Traefik ingress routing',
    metric: '3 Nodes Ready / 0 Pod Restarts',
    specFile: 'deployment.yaml',
    badges: ['Self-Healing', 'Liveness Probes', 'Traefik Ingress'],
    codeTitle: '// k8s-deployment.yaml — Zero-Downtime Rollout Strategy',
    codeSnippet: `spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: api-service
        livenessProbe:
          httpGet:
            path: /healthz`
  },
  {
    id: 'aws',
    name: 'AWS Cloud (ECS)',
    subtitle: 'Production Infrastructure',
    icon: '☁️',
    tech: 'Terraform & AWS ECS Fargate',
    status: 'LIVE PROD',
    statusClass: 'status-live',
    threshold: 100,
    role: 'Serverless container execution on ECS Fargate behind Multi-AZ Application Load Balancers with CloudWatch alarms',
    metric: '99.9% Uptime / Target-Tracking Scaling',
    specFile: 'main.tf',
    badges: ['ECS Fargate', 'Multi-AZ ALB', 'CloudWatch Alarms'],
    codeTitle: '// main.tf — AWS ECS Fargate & ALB Provisioning',
    codeSnippet: `resource "aws_ecs_service" "app" {
  name            = "production-microservice"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "api"
    container_port   = 8080
  }
}`
  }
]

const currentStage = computed(() => stages[activeStageIndex.value])

const runSimulation = () => {
  if (isSimulating.value) return
  isSimulating.value = true
  simulatedProgress.value = 0
  currentSimStage.value = 0
  activeStageIndex.value = 0

  const interval = setInterval(() => {
    simulatedProgress.value += 5

    const stageIdx = Math.floor(simulatedProgress.value / 20)
    if (stageIdx < stages.length) {
      currentSimStage.value = stageIdx
      activeStageIndex.value = stageIdx
    }

    if (simulatedProgress.value >= 100) {
      clearInterval(interval)
      simulatedProgress.value = 100
      currentSimStage.value = -1
      setTimeout(() => {
        isSimulating.value = false
      }, 500)
    }
  }, 120)
}
</script>

<style scoped>
.pipeline-deck {
  padding: 32px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.deck-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

[data-theme="light"] .deck-status-bar {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.status-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pulse-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #80ff72;
  box-shadow: 0 0 12px #80ff72;
  animation: pulseGreen 1.5s ease-in-out infinite;
}

@keyframes pulseGreen {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}

.status-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 1px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-anim {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 3D Flow Track */
.pipeline-flow-container {
  margin-bottom: 32px;
  overflow-x: auto;
  padding: 10px 4px 20px;
}

.pipeline-track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  position: relative;
  min-width: 800px;
}

.energy-beam {
  position: absolute;
  top: 36px;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #F68300, #80ff72, #F68300);
  box-shadow: 0 0 12px rgba(246, 131, 0, 0.8);
  transition: width 0.15s ease-out;
  z-index: 0;
}

.pipeline-node-card {
  position: relative;
  z-index: 1;
  background: rgba(25, 25, 25, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  user-select: none;
}

[data-theme="light"] .pipeline-node-card {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.1);
}

.pipeline-node-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: var(--accent-primary);
  box-shadow: 0 10px 24px rgba(246, 131, 0, 0.2);
}

.pipeline-node-card.active {
  border-color: var(--accent-primary);
  background: rgba(246, 131, 0, 0.08);
  box-shadow: 0 0 20px rgba(246, 131, 0, 0.25);
}

.pipeline-node-card.pulsing {
  border-color: #80ff72;
  box-shadow: 0 0 24px rgba(128, 255, 114, 0.4);
  transform: translateY(-8px) scale(1.04);
}

.node-icon-wrapper {
  position: relative;
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.node-icon {
  font-size: 1.5rem;
}

.node-step-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent-primary);
  color: #111;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: var(--radius-full);
}

.node-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.node-role {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.node-status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.node-status-chip.status-ok {
  background: rgba(128, 255, 114, 0.1);
  color: #80ff72;
  border: 1px solid rgba(128, 255, 114, 0.2);
}

.node-status-chip.status-live {
  background: rgba(246, 131, 0, 0.12);
  color: var(--accent-primary);
  border: 1px solid rgba(246, 131, 0, 0.3);
}

.chip-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

/* Telemetry Screen */
.pipeline-telemetry {
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 24px;
}

.telemetry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 12px;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.telemetry-tab-title {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.telemetry-tags {
  display: flex;
  gap: 8px;
}

.telemetry-badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  background: rgba(246, 131, 0, 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(246, 131, 0, 0.2);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.telemetry-body {
  padding: 20px;
}

.telemetry-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.meta-val {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.text-green {
  color: #80ff72 !important;
}

.telemetry-code-block {
  background: #0a0a0a;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.code-banner {
  display: flex;
  justify-content: space-between;
  padding: 8px 14px;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.copy-hint {
  color: #80ff72;
}

.telemetry-code-block pre {
  margin: 0;
  padding: 16px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.6;
  color: #e6e6e6;
  overflow-x: auto;
}

/* Metrics Strip */
.pipeline-metrics-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

[data-theme="light"] .pipeline-metrics-strip {
  border-top-color: rgba(0, 0, 0, 0.08);
}

.metric-box {
  text-align: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

[data-theme="light"] .metric-box {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.06);
}

.metric-num {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  font-family: var(--font-mono);
  margin-bottom: 4px;
}

.metric-desc {
  font-size: 0.78rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .pipeline-deck {
    padding: 20px;
  }
}
</style>
