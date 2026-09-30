<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="project" class="architecture-modal-overlay" @click.self="$emit('close')">
        <div class="architecture-modal glass-card">
          <!-- Modal Top Bar -->
          <div class="modal-header">
            <div class="header-left">
              <span class="header-icon">{{ project.icon }}</span>
              <div class="header-info">
                <div class="title-row">
                  <h3 class="modal-title">{{ project.title }}</h3>
                  <span class="arch-badge text-mono">{{ project.categoryLabel || 'System Design' }}</span>
                </div>
                <p class="modal-subtitle">{{ project.subtitle }}</p>
              </div>
            </div>
            <button class="close-btn" @click="$emit('close')" aria-label="Close Architecture Modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- Navigation Tabs -->
          <div class="modal-tabs">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'diagram' }"
              @click="activeTab = 'diagram'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              <span>Topology Diagram</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'decisions' }"
              @click="activeTab = 'decisions'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <span>Design & Security SLAs</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'code' }"
              @click="activeTab = 'code'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span>Production Spec (IaC)</span>
            </button>
          </div>

          <!-- Modal Body Content -->
          <div class="modal-body">
            <!-- TAB 1: VISUAL TOPOLOGY DIAGRAM -->
            <div v-if="activeTab === 'diagram'" class="tab-pane diagram-pane">
              <!-- Visual Cloud Topology Canvas -->
              <div class="diagram-canvas">
                <!-- Diagram Header Indicator -->
                <div class="diagram-badge-row">
                  <span class="live-dot"></span>
                  <span class="text-mono diagram-scope-text">TOPOLOGY // {{ getScopeTitle(project.title) }}</span>
                </div>

                <!-- Custom Visual Topology for Cloud-Design (AWS ECS) -->
                <div v-if="project.title === 'Cloud-Design'" class="topology-grid aws-topology">
                  <div class="cloud-zone internet-zone">
                    <span class="zone-label">Public Internet</span>
                    <div class="node-box client-node">
                      <span class="node-icon-sm">🌐</span>
                      <span class="node-title">End Users</span>
                      <span class="node-sub">HTTPS / TLS 1.3</span>
                    </div>
                  </div>

                  <div class="flow-arrow">
                    <svg width="40" height="20" viewBox="0 0 40 20"><line x1="0" y1="10" x2="32" y2="10" stroke="currentColor" stroke-width="2" stroke-dasharray="4"/><polygon points="32,6 40,10 32,14" fill="currentColor"/></svg>
                  </div>

                  <div class="cloud-zone vpc-zone">
                    <div class="vpc-banner text-mono">
                      <span>AWS VPC: 10.0.0.0/16</span>
                      <span class="vpc-region">Region: eu-west-3 (Paris)</span>
                    </div>

                    <div class="subnets-layout">
                      <!-- Public Subnet -->
                      <div class="subnet-block public-subnet">
                        <span class="subnet-label">Public Subnet (Multi-AZ)</span>
                        <div class="node-box alb-node">
                          <span class="node-icon-sm">⚖️</span>
                          <span class="node-title">Application Load Balancer</span>
                          <span class="node-sub">Ports 80/443 · SSL Termination</span>
                        </div>
                        <div class="node-box nat-node">
                          <span class="node-icon-sm">🛡️</span>
                          <span class="node-title">NAT Gateway</span>
                          <span class="node-sub">Outbound Egress Only</span>
                        </div>
                      </div>

                      <div class="flow-arrow-down">
                        <svg width="20" height="30" viewBox="0 0 20 30"><line x1="10" y1="0" x2="10" y2="24" stroke="currentColor" stroke-width="2" stroke-dasharray="4"/><polygon points="6,24 10,30 14,24" fill="currentColor"/></svg>
                      </div>

                      <!-- Private Subnets (Fargate ECS Tasks) -->
                      <div class="subnet-block private-subnet">
                        <span class="subnet-label">Private Subnet (Zero Direct Internet Ingress)</span>
                        <div class="services-cluster">
                          <div class="node-box micro-node">
                            <span class="node-icon-sm">🚪</span>
                            <span class="node-title">API Gateway</span>
                            <span class="node-sub">ECS Fargate :3000</span>
                          </div>
                          <div class="node-box micro-node">
                            <span class="node-icon-sm">📦</span>
                            <span class="node-title">Inventory App</span>
                            <span class="node-sub">ECS Fargate :3001</span>
                          </div>
                          <div class="node-box micro-node">
                            <span class="node-icon-sm">💳</span>
                            <span class="node-title">Billing App</span>
                            <span class="node-sub">ECS Fargate :3002</span>
                          </div>
                          <div class="node-box micro-node mq-node">
                            <span class="node-icon-sm">🐇</span>
                            <span class="node-title">RabbitMQ Queue</span>
                            <span class="node-sub">Fargate Event Broker</span>
                          </div>
                        </div>

                        <!-- Database Layer -->
                        <div class="db-layer">
                          <div class="node-box db-node">
                            <span class="node-icon-sm">🗄️</span>
                            <span class="node-title">Inventory DB</span>
                            <span class="node-sub">PostgreSQL (Private)</span>
                          </div>
                          <div class="node-box db-node">
                            <span class="node-icon-sm">🗄️</span>
                            <span class="node-title">Billing DB</span>
                            <span class="node-sub">PostgreSQL (Private)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Custom Visual Topology for Code-Keeper (GitLab + Ansible CI/CD) -->
                <div v-else-if="project.title === 'Code-Keeper'" class="topology-grid cicd-topology">
                  <div class="cicd-stages-strip">
                    <div class="cicd-stage-box">
                      <span class="stage-tag">Step 1</span>
                      <div class="node-box">
                        <span class="node-icon-sm">💻</span>
                        <span class="node-title">Git Push</span>
                        <span class="node-sub">Branch Protection</span>
                      </div>
                    </div>
                    <div class="cicd-arrow">➔</div>
                    <div class="cicd-stage-box">
                      <span class="stage-tag">Step 2</span>
                      <div class="node-box">
                        <span class="node-icon-sm">🦊</span>
                        <span class="node-title">GitLab CE</span>
                        <span class="node-sub">Ansible Configured</span>
                      </div>
                    </div>
                    <div class="cicd-arrow">➔</div>
                    <div class="cicd-stage-box">
                      <span class="stage-tag">Step 3</span>
                      <div class="node-box">
                        <span class="node-icon-sm">⚡</span>
                        <span class="node-title">Docker Runner</span>
                        <span class="node-sub">Autoscaled dind</span>
                      </div>
                    </div>
                    <div class="cicd-arrow">➔</div>
                    <div class="cicd-stage-box">
                      <span class="stage-tag">Step 4</span>
                      <div class="node-box">
                        <span class="node-icon-sm">🛡️</span>
                        <span class="node-title">Trivy SAST</span>
                        <span class="node-sub">0 Critical CVEs</span>
                      </div>
                    </div>
                    <div class="cicd-arrow">➔</div>
                    <div class="cicd-stage-box">
                      <span class="stage-tag">Step 5</span>
                      <div class="node-box success-node">
                        <span class="node-icon-sm">🚀</span>
                        <span class="node-title">Zero-Downtime</span>
                        <span class="node-sub">Rolling Deploy</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Custom Visual Topology for Orchestrator (K3s Kubernetes Cluster) -->
                <div v-else-if="project.title === 'Orchestrator'" class="topology-grid k8s-topology">
                  <div class="k8s-cluster-box">
                    <div class="cluster-header text-mono">
                      <span>K3S CLUSTER // MULTI-NODE HIGH AVAILABILITY</span>
                      <span class="k8s-ingress-tag">Traefik Ingress Controller</span>
                    </div>

                    <div class="k8s-nodes-row">
                      <div class="k8s-node-column control-plane">
                        <div class="node-header-pill">Control Plane (Master Node)</div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot"></span>
                          <span>k3s-server (API & Core)</span>
                        </div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot"></span>
                          <span>Traefik Ingress Pod</span>
                        </div>
                      </div>

                      <div class="k8s-node-column worker-node">
                        <div class="node-header-pill">Worker Node 1</div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot green"></span>
                          <span>api-gateway (Pod)</span>
                        </div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot green"></span>
                          <span>inventory-app (Pod)</span>
                        </div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot green"></span>
                          <span>inventory-db (PVC Mount)</span>
                        </div>
                      </div>

                      <div class="k8s-node-column worker-node">
                        <div class="node-header-pill">Worker Node 2</div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot green"></span>
                          <span>billing-app (Pod)</span>
                        </div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot green"></span>
                          <span>rabbitmq-broker (Pod)</span>
                        </div>
                        <div class="k8s-pod-card">
                          <span class="pod-dot green"></span>
                          <span>billing-db (PVC Mount)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Custom Visual Topology for Play With Containers (Microservices & RabbitMQ) -->
                <div v-else-if="project.title === 'Play With Containers'" class="topology-grid docker-topology">
                  <div class="docker-network-box">
                    <div class="network-header text-mono">
                      <span>DOCKER BRIDGE NETWORK // microservices_net</span>
                      <span class="port-tag">Host Exposed Port: 3000</span>
                    </div>

                    <div class="docker-services-grid">
                      <div class="docker-svc-card gateway-svc">
                        <span class="svc-icon">🚪</span>
                        <div class="svc-details">
                          <span class="svc-name">API Gateway</span>
                          <span class="svc-role">Routing & Request Forwarding</span>
                        </div>
                      </div>

                      <div class="docker-svc-card app-svc">
                        <span class="svc-icon">📦</span>
                        <div class="svc-details">
                          <span class="svc-name">Inventory Service</span>
                          <span class="svc-role">Movie Catalog & Queries</span>
                        </div>
                        <div class="svc-db-sub">↳ Dedicated PostgreSQL DB</div>
                      </div>

                      <div class="docker-svc-card queue-svc">
                        <span class="svc-icon">🐇</span>
                        <div class="svc-details">
                          <span class="svc-name">RabbitMQ Broker</span>
                          <span class="svc-role">Asynchronous Message Bus</span>
                        </div>
                      </div>

                      <div class="docker-svc-card app-svc">
                        <span class="svc-icon">💳</span>
                        <div class="svc-details">
                          <span class="svc-name">Billing Service</span>
                          <span class="svc-role">Order Consumer & Invoicing</span>
                        </div>
                        <div class="svc-db-sub">↳ Dedicated PostgreSQL DB</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Generic Full-Stack Topology for Web Apps -->
                <div v-else class="topology-grid generic-topology">
                  <div class="generic-flow">
                    <div class="generic-node">
                      <span class="node-icon-sm">💻</span>
                      <span class="node-title">Client Layer</span>
                      <span class="node-sub">Responsive Web UI</span>
                    </div>
                    <div class="flow-arrow">➔</div>
                    <div class="generic-node">
                      <span class="node-icon-sm">⚙️</span>
                      <span class="node-title">Backend API</span>
                      <span class="node-sub">REST / WebSockets</span>
                    </div>
                    <div class="flow-arrow">➔</div>
                    <div class="generic-node">
                      <span class="node-icon-sm">🗄️</span>
                      <span class="node-title">Database Layer</span>
                      <span class="node-sub">Persistent Relational / Key-Value</span>
                    </div>
                    <div class="flow-arrow">➔</div>
                    <div class="generic-node">
                      <span class="node-icon-sm">📦</span>
                      <span class="node-title">Container Fleet</span>
                      <span class="node-sub">Isolated Dockerized Units</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 2: ARCHITECTURAL DECISIONS & SECURITY -->
            <div v-if="activeTab === 'decisions'" class="tab-pane decisions-pane">
              <div class="decisions-grid">
                <div
                  v-for="(item, idx) in getDecisions(project.title)"
                  :key="idx"
                  class="decision-card glass-card"
                >
                  <div class="decision-header">
                    <span class="decision-icon">{{ item.icon }}</span>
                    <h4 class="decision-title">{{ item.title }}</h4>
                  </div>
                  <p class="decision-desc">{{ item.desc }}</p>
                  <div class="decision-impact">
                    <span class="impact-label">Production Impact:</span>
                    <span class="impact-text">{{ item.impact }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 3: PRODUCTION SPEC / IAC PREVIEW -->
            <div v-if="activeTab === 'code'" class="tab-pane code-pane">
              <div class="code-viewer glass-card">
                <div class="code-viewer-bar">
                  <span class="code-file-name text-mono">{{ getCodeFilename(project.title) }}</span>
                  <button class="copy-code-btn" @click="copySnippet">
                    <span v-if="copied">✓ Copied</span>
                    <span v-else>Copy Spec</span>
                  </button>
                </div>
                <pre><code>{{ getCodeSnippet(project.title) }}</code></pre>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <div class="footer-left">
              <span class="footer-hint text-muted">Architected & Verified for Production Stability</span>
            </div>
            <div class="footer-actions">
              <a :href="project.github" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
                <span>View Full Code on GitHub</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <button class="btn btn-sm btn-outline" @click="$emit('close')">
                Close Diagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const activeTab = ref('diagram')
const copied = ref(false)

const copySnippet = () => {
  if (!props.project) return
  const text = getCodeSnippet(props.project.title)
  navigator.clipboard?.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

const getScopeTitle = (title) => {
  switch (title) {
    case 'Cloud-Design': return 'AWS ECS FARGATE // MULTI-AZ VPC'
    case 'Code-Keeper': return 'GITLAB CE // ANSIBLE RUNNERS // TRIVY SAST'
    case 'Orchestrator': return 'KUBERNETES K3S // MULTI-NODE INGRESS'
    case 'Play With Containers': return 'DOCKER COMPOSE // ASYNC RABBITMQ'
    default: return 'DISTRIBUTED ARCHITECTURE'
  }
}

const getDecisions = (title) => {
  switch (title) {
    case 'Cloud-Design':
      return [
        {
          icon: '🛡️',
          title: 'Private Subnet Isolation & NAT Gateway',
          desc: 'ECS tasks and RDS databases have zero public IP addresses. Ingress is strictly mediated by the ALB, and outbound connectivity (for pulling packages) flows through a NAT Gateway.',
          impact: 'Eliminates public attack vectors; 100% compliance with AWS Well-Architected Security Pillar.'
        },
        {
          icon: '⚖️',
          title: 'Serverless ECS Fargate vs Managed EKS',
          desc: 'Adopted AWS Fargate serverless containers over Kubernetes to remove master node management overhead and achieve pay-per-second compute efficiency.',
          impact: 'Reduces operational maintenance by ~70% while guaranteeing automatic cluster security patches.'
        },
        {
          icon: '📈',
          title: 'Target-Tracking Auto-Scaling Policies',
          desc: 'Configured ECS service auto-scaling targeting 70% CPU and memory utilization with customizable scale-in/scale-out cooldown periods.',
          impact: 'Effortlessly absorbs sudden traffic spikes while reducing idle infrastructure costs during off-peak hours.'
        },
        {
          icon: '📜',
          title: '100% Declarative Terraform Automation',
          desc: 'All VPCs, subnets, route tables, IAM roles, ECS task definitions, and ALB target groups are version-controlled via modular Terraform HCL.',
          impact: 'Zero infrastructure drift; complete multi-environment deployment in minutes.'
        }
      ]
    case 'Code-Keeper':
      return [
        {
          icon: '🤖',
          title: 'Ansible-Driven Self-Hosted Runners',
          desc: 'Provisioned GitLab CE and auto-scaling Docker-in-Docker runners idempotently using Ansible playbooks and encrypted Ansible Vault secrets.',
          impact: 'Guarantees reliable, repeatable runner provisioning without manual configuration drift.'
        },
        {
          icon: '🔍',
          title: 'Shift-Left Automated Security Scanning',
          desc: 'Integrated Trivy container image scanning and Bandit SAST directly into the pull request pipeline to halt builds with critical CVEs.',
          impact: 'Zero vulnerable images reach production registries.'
        },
        {
          icon: '🔄',
          title: 'Zero-Downtime Rolling Deployment Strategy',
          desc: 'Designed deployment pipelines with automated health check probes before terminating preceding container instances.',
          impact: 'Ensures 99.99% service availability during continuous application releases.'
        }
      ]
    case 'Orchestrator':
      return [
        {
          icon: '☸️',
          title: 'Multi-Node K3s Topology & Traefik Ingress',
          desc: 'Constructed an automated multi-node cluster using Vagrant and Ansible, utilizing Traefik as a lightweight Ingress Controller with PathPrefix routing.',
          impact: 'Provides unified ingress routing and automated pod failover across physical/virtual nodes.'
        },
        {
          icon: '💾',
          title: 'Persistent Storage Volumes (PV/PVC)',
          desc: 'Configured persistent volume claims mapped to dedicated local storage to guarantee state persistence across pod restarts.',
          impact: 'Guarantees zero database data loss upon node reboot or rescheduling.'
        },
        {
          icon: '🩺',
          title: 'Liveness & Readiness Health Probes',
          desc: 'Enforced HTTP and TCP health probes on all microservices to trigger automatic container restarts on deadlocks.',
          impact: 'Self-healing cluster operation with zero operator intervention.'
        }
      ]
    case 'Play With Containers':
      return [
        {
          icon: '🐇',
          title: 'Event-Driven Decoupling with RabbitMQ',
          desc: 'Decoupled billing operations from synchronous API gateway requests by pushing events to a durable RabbitMQ queue.',
          impact: 'Guarantees order retention even during downstream database spikes or maintenance.'
        },
        {
          icon: '🗄️',
          title: 'Database-Per-Service Pattern',
          desc: 'Separated inventory and billing databases into isolated PostgreSQL containers on custom Docker bridge networks.',
          impact: 'Strict bounded contexts; prevents tight coupling between independent microservices.'
        }
      ]
    default:
      return [
        {
          icon: '🚀',
          title: 'High-Performance Architecture',
          desc: 'Designed for low-latency communication, modular maintenance, and optimized resource footprint.',
          impact: 'Sub-second response times and predictable scaling.'
        }
      ]
  }
}

const getCodeFilename = (title) => {
  switch (title) {
    case 'Cloud-Design': return 'terraform/modules/ecs_fargate/main.tf'
    case 'Code-Keeper': return '.gitlab-ci.yml (Multi-Stage Pipeline)'
    case 'Orchestrator': return 'k8s/manifests/api-gateway-deployment.yaml'
    case 'Play With Containers': return 'docker-compose.yml'
    default: return 'architecture-spec.yaml'
  }
}

const getCodeSnippet = (title) => {
  switch (title) {
    case 'Cloud-Design':
      return `# AWS ECS Fargate & ALB Task Definition (Terraform)
resource "aws_ecs_task_definition" "microservices" {
  family                   = "production-microservice"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn

  container_definitions = jsonencode([{
    name      = "api-gateway"
    image     = "\${aws_ecr_repository.gateway.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/cloud-design-prod"
        "awslogs-region"        = "eu-west-3"
        "awslogs-stream-prefix" = "api"
      }
    }
  }])
}`
    case 'Code-Keeper':
      return `stages:
  - lint
  - test
  - security
  - build
  - deploy-staging
  - deploy-production

trivy_security_scan:
  stage: security
  image: 
    name: aquasec/trivy:latest
    entrypoint: [""]
  script:
    - trivy image --exit-code 1 --severity CRITICAL \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHA}
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'`
    case 'Orchestrator':
      return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway-app
  namespace: default
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: api-gateway-app
  template:
    metadata:
      labels:
        app: api-gateway-app
    spec:
      containers:
        - name: api-gateway
          image: miourjdil/api-gateway-app:v1
          ports:
            - containerPort: 3000
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 10`
    case 'Play With Containers':
      return `version: '3.8'

services:
  api-gateway:
    build: ./srcs/api-gateway-app
    ports:
      - "3000:3000"
    networks:
      - microservices_net
    depends_on:
      - inventory-app
      - billing-app

  rabbit-queue:
    image: rabbitmq:3-management
    environment:
      - RABBITMQ_DEFAULT_USER=\${RABBIT_USER}
      - RABBITMQ_DEFAULT_PASS=\${RABBIT_PASSWORD}
    networks:
      - microservices_net

networks:
  microservices_net:
    driver: bridge`
    default:
      return `# Full Stack Application Specification
service:
  runtime: modern-container
  networking:
    cors: enabled
    protocol: https`
  }
}

import { watch } from 'vue'

watch(
  () => props.project,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
)

// Handle ESC key to close
const onKeydown = (e) => {
  if (e.key === 'Escape') emit('close')
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
.architecture-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.architecture-modal {
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(246, 131, 0, 0.15);
  overflow: hidden;
}

[data-theme="light"] .architecture-modal {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
}

/* Modal Header */
.modal-header {
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

[data-theme="light"] .modal-header {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  font-size: 2.2rem;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--text-primary);
}

.arch-badge {
  font-size: 0.72rem;
  background: rgba(246, 131, 0, 0.15);
  color: var(--accent-primary);
  border: 1px solid rgba(246, 131, 0, 0.3);
  padding: 2px 10px;
  border-radius: var(--radius-full);
}

.modal-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.close-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.close-btn:hover {
  color: #ff5f57;
  border-color: #ff5f57;
  transform: rotate(90deg);
}

/* Tabs */
.modal-tabs {
  display: flex;
  gap: 10px;
  padding: 12px 28px;
  background: rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

[data-theme="light"] .modal-tabs {
  background: rgba(0, 0, 0, 0.03);
  border-bottom-color: rgba(0, 0, 0, 0.06);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.tab-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
}

.tab-btn.active {
  color: var(--accent-primary);
  background: rgba(246, 131, 0, 0.12);
  border-color: rgba(246, 131, 0, 0.3);
}

/* Modal Body */
.modal-body {
  padding: 24px 28px;
  overflow-y: auto;
  flex: 1;
}

/* Diagram Pane */
.diagram-canvas {
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 24px;
}

[data-theme="light"] .diagram-canvas {
  background: #f7f7f7;
  border-color: rgba(0, 0, 0, 0.1);
}

.diagram-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #80ff72;
  box-shadow: 0 0 10px #80ff72;
}

.diagram-scope-text {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Node Boxes */
.node-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: center;
}

[data-theme="light"] .node-box {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.12);
}

.node-icon-sm {
  font-size: 1.3rem;
  margin-bottom: 2px;
}

.node-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}

.node-sub {
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* AWS Topology Styling */
.aws-topology {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.internet-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.zone-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.flow-arrow {
  color: var(--accent-primary);
  display: flex;
  justify-content: center;
}

.flow-arrow-down {
  color: var(--accent-primary);
  display: flex;
  justify-content: center;
  margin: 8px 0;
}

.vpc-zone {
  width: 100%;
  border: 2px dashed rgba(246, 131, 0, 0.4);
  border-radius: var(--radius-md);
  padding: 16px;
  background: rgba(246, 131, 0, 0.02);
}

.vpc-banner {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--accent-primary);
  font-weight: 700;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(246, 131, 0, 0.2);
}

.subnets-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subnet-block {
  border-radius: var(--radius-sm);
  padding: 16px;
}

.subnet-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.public-subnet {
  background: rgba(128, 255, 114, 0.04);
  border: 1px solid rgba(128, 255, 114, 0.2);
  display: flex;
  gap: 16px;
  justify-content: space-around;
  flex-wrap: wrap;
}

.public-subnet .subnet-label {
  width: 100%;
  color: #80ff72;
}

.private-subnet {
  background: rgba(246, 131, 0, 0.04);
  border: 1px solid rgba(246, 131, 0, 0.2);
}

.private-subnet .subnet-label {
  color: var(--accent-primary);
}

.services-cluster {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.db-layer {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-top: 12px;
  border-top: 1px solid rgba(246, 131, 0, 0.15);
}

/* CI/CD Strip */
.cicd-stages-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  overflow-x: auto;
  padding: 10px 0;
}

.cicd-stage-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 120px;
}

.stage-tag {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
}

.cicd-arrow {
  color: var(--accent-primary);
  font-weight: 800;
  font-size: 1.1rem;
}

.success-node {
  border-color: #80ff72 !important;
  background: rgba(128, 255, 114, 0.08) !important;
}

/* K8s Topology */
.k8s-cluster-box, .docker-network-box {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 18px;
  background: rgba(255, 255, 255, 0.02);
}

.cluster-header, .network-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #80ff72;
  margin-bottom: 16px;
  font-weight: 700;
}

.k8s-nodes-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.k8s-node-column {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-sm);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.node-header-pill {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 6px;
}

.k8s-pod-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.78rem;
  font-family: var(--font-mono);
}

.pod-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
}

.pod-dot.green {
  background: #80ff72;
}

/* Docker Topology */
.docker-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
}

.docker-svc-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.svc-icon { font-size: 1.5rem; }
.svc-name { font-size: 0.88rem; font-weight: 700; color: var(--text-primary); }
.svc-role { font-size: 0.72rem; color: var(--text-muted); }
.svc-db-sub { font-size: 0.7rem; color: #80ff72; font-family: var(--font-mono); margin-top: 4px; }

/* Generic Flow */
.generic-flow {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 16px;
}

.generic-node {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 16px;
  text-align: center;
  min-width: 140px;
}

/* Decisions Pane */
.decisions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 18px;
}

.decision-card {
  padding: 20px;
  border-radius: var(--radius-md);
}

.decision-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.decision-icon {
  font-size: 1.4rem;
}

.decision-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.decision-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.decision-impact {
  font-size: 0.78rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--accent-primary);
}

.impact-label {
  font-weight: 700;
  color: var(--accent-primary);
  margin-right: 6px;
}

.impact-text {
  color: var(--text-primary);
}

/* Code Pane */
.code-viewer {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #0c0c0c;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.code-viewer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.code-file-name {
  font-size: 0.8rem;
  color: var(--accent-primary);
}

.copy-code-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}

.copy-code-btn:hover {
  background: var(--accent-primary);
  color: #111;
  font-weight: 700;
}

.code-viewer pre {
  margin: 0;
  padding: 18px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.6;
  color: #e6e6e6;
  overflow-x: auto;
}

/* Modal Footer */
.modal-footer {
  padding: 18px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 12px;
}

[data-theme="light"] .modal-footer {
  border-top-color: rgba(0, 0, 0, 0.08);
}

.footer-actions {
  display: flex;
  gap: 12px;
}

/* Modal Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .architecture-modal {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-enter-from .architecture-modal {
  transform: scale(0.9) translateY(20px);
}
</style>
