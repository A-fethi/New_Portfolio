<template>
  <div class="cloud-shell-wrapper">
    <!-- Floating Launcher Pill -->
    <button
      v-if="!isOpen"
      class="shell-launcher-btn"
      @click="toggleShell"
      aria-label="Open Cloud Shell Terminal"
    >
      <span class="shell-ping-dot"></span>
      <span class="shell-icon-prompt">&gt;_</span>
      <span class="shell-btn-text">Cloud Shell</span>
      <span class="shell-hotkey-badge text-mono">~</span>
    </button>

    <!-- Interactive Terminal Drawer -->
    <Transition name="terminal-slide">
      <div v-if="isOpen" class="terminal-drawer glass-card" ref="terminalDrawerRef">
        <!-- Terminal Title Bar -->
        <div class="terminal-top-bar" @dblclick="toggleMaximize">
          <div class="window-controls">
            <button class="win-btn close" @click="toggleShell" title="Close Terminal"></button>
            <button class="win-btn minimize" @click="toggleShell" title="Minimize"></button>
            <button class="win-btn maximize" @click="toggleMaximize" title="Maximize"></button>
          </div>

          <div class="terminal-session-title text-mono">
            <span class="user-part">afethi@cloud-controller</span>:<span class="path-part">~</span>
            <span class="env-badge">(aws:eu-west-3 | k3s:prod)</span>
          </div>

          <div class="terminal-actions">
            <button class="term-action-btn" @click="clearTerminal" title="Clear screen (Ctrl+L)">
              Clear
            </button>
            <button class="term-action-btn close-x" @click="toggleShell" title="Close">
              ✕
            </button>
          </div>
        </div>

        <!-- Quick Interactive Chips for Instant Execution -->
        <div class="terminal-chips-bar">
          <span class="chips-label text-mono">QUICK RUN:</span>
          <button
            v-for="chip in quickChips"
            :key="chip"
            class="cmd-chip text-mono"
            @click="executeCommand(chip)"
          >
            {{ chip }}
          </button>
        </div>

        <!-- Terminal Output Screen -->
        <div class="terminal-screen" ref="screenRef" @click="focusInput">
          <!-- Welcome Banner -->
          <div class="term-welcome text-mono">
            <pre class="ascii-art">{{ asciiLogo }}</pre>
            <p class="welcome-lead">
              Welcome to <span class="text-accent">Abderrahmane Fethi's Cloud Shell</span> [v2.1.2].
            </p>
            <p class="welcome-sub text-muted">
              Live interactive CLI connected to simulated AWS ECS, K3s, and Docker telemetry.
            </p>
            <p class="welcome-help text-muted">
              Type <span class="highlight-cmd">help</span> for commands, click the chips above, or use Up/Down arrows for history.
            </p>
            <div class="term-divider"></div>
          </div>

          <!-- History Entries -->
          <div v-for="(entry, idx) in history" :key="idx" class="term-entry text-mono">
            <div class="term-prompt-line">
              <span class="prompt-user">afethi@aws-cloud</span>:<span class="prompt-dir">~</span><span class="prompt-sym">$</span>
              <span class="prompt-cmd">{{ entry.cmd }}</span>
            </div>
            <div class="term-output" :class="entry.type">
              <pre v-if="entry.isPre">{{ entry.output }}</pre>
              <div v-else v-html="entry.output"></div>
            </div>
          </div>

          <!-- Active Input Line -->
          <div class="term-input-line text-mono">
            <span class="prompt-user">afethi@aws-cloud</span>:<span class="prompt-dir">~</span><span class="prompt-sym">$</span>
            <input
              ref="inputRef"
              v-model="currentInput"
              type="text"
              class="terminal-input"
              autofocus
              spellcheck="false"
              autocomplete="off"
              @input="playKeystroke"
              @keydown.enter="handleEnter"
              @keydown.up.prevent="navigateHistory(-1)"
              @keydown.down.prevent="navigateHistory(1)"
              @keydown.tab.prevent="handleTab"
              @keydown.ctrl.l.prevent="clearTerminal"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { playKeystroke, playCommandTransmit, playClick, playModalOpen, playModalClose } from '../utils/audioSystem.js'

const isOpen = ref(false)
const isMaximized = ref(false)
const currentInput = ref('')
const history = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)

const screenRef = ref(null)
const inputRef = ref(null)
const terminalDrawerRef = ref(null)

const quickChips = [
  'terraform plan',
  'kubectl get pods',
  'docker ps',
  'curl /healthz',
  'cat resume',
  'help'
]

const asciiLogo = `   ___  _                 _   ____  _          _ _ 
  / __|| | ___  _   _  __| | / ___|| |__   ___| | |
 | |   | |/ _ \| | | |/ _\` | \___ \| '_ \ / _ \ | |
 | |___| | (_) | |_| | (_| |  ___) | | | |  __/ | |
  \____|_|\___/ \__,_|\__,_| |____/|_| |_|\___|_|_|`

const toggleShell = () => {
  if (!isOpen.value) {
    playModalOpen()
  } else {
    playModalClose()
  }
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      focusInput()
      scrollToBottom()
    })
  }
}

const toggleMaximize = () => {
  playClick()
  isMaximized.value = !isMaximized.value
}

const focusInput = () => {
  inputRef.value?.focus()
}

const clearTerminal = () => {
  playClick()
  history.value = []
  currentInput.value = ''
  nextTick(focusInput)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (screenRef.value) {
      screenRef.value.scrollTop = screenRef.value.scrollHeight
    }
  })
}

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return

  if (direction === -1) {
    // Up arrow
    if (historyIndex.value === -1) {
      historyIndex.value = commandHistory.value.length - 1
    } else if (historyIndex.value > 0) {
      historyIndex.value--
    }
  } else {
    // Down arrow
    if (historyIndex.value !== -1) {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++
      } else {
        historyIndex.value = -1
        currentInput.value = ''
        return
      }
    }
  }

  if (historyIndex.value !== -1) {
    currentInput.value = commandHistory.value[historyIndex.value]
  }
}

const handleTab = () => {
  const input = currentInput.value.trim().toLowerCase()
  if (!input) return
  const match = quickChips.find(cmd => cmd.startsWith(input))
  if (match) {
    currentInput.value = match
  }
}

const executeCommand = (cmd) => {
  currentInput.value = cmd
  handleEnter()
}

const handleEnter = () => {
  playCommandTransmit()
  const raw = currentInput.value.trim()
  if (!raw) return

  // Add to command history
  commandHistory.value.push(raw)
  historyIndex.value = -1
  currentInput.value = ''

  const cmd = raw.toLowerCase()

  if (cmd === 'clear' || cmd === 'cls') {
    clearTerminal()
    return
  }

  if (cmd === 'exit' || cmd === 'quit') {
    isOpen.value = false
    return
  }

  let output = ''
  let isPre = true
  let type = 'output-normal'

  switch (cmd) {
    case 'help':
      isPre = false
      output = `
<div class="help-grid">
  <div><span class="cmd-term">terraform plan</span> - Simulate AWS ECS Fargate Infrastructure as Code</div>
  <div><span class="cmd-term">kubectl get pods</span> - Query K3s Multi-Node Cluster running workloads</div>
  <div><span class="cmd-term">docker ps</span> - Inspect containerized microservices fleet</div>
  <div><span class="cmd-term">curl /healthz</span> - Probe API Gateway & SLA latency metrics</div>
  <div><span class="cmd-term">cat resume</span> - View credentials, education & contact details</div>
  <div><span class="cmd-term">skills</span> - Dump full stack & cloud technical matrix</div>
  <div><span class="cmd-term">projects</span> - List all 8 production applications</div>
  <div><span class="cmd-term">whoami</span> - Display current engineer identity</div>
  <div><span class="cmd-term">clear</span> - Flush terminal screen</div>
  <div><span class="cmd-term">exit</span> - Close cloud shell</div>
</div>`
      break

    case 'terraform plan':
      output = `Refreshing Terraform state in AWS eu-west-3...
[aws_vpc.production]: Refreshing state... [id=vpc-0a81f349]
[aws_subnet.public_a]: Refreshing state... [id=subnet-019e]
[aws_subnet.private_a]: Refreshing state... [id=subnet-082b]
[aws_lb.production_alb]: Refreshing state... [id=arn:aws:elasticloadbalancing]
[aws_ecs_cluster.main]: Refreshing state... [id=arn:aws:ecs:eu-west-3:fargate]

Terraform will perform the following actions:

  # aws_ecs_service.api_gateway will be updated in-place
  ~ desired_count = 2 -> 4 (Auto-scaling Target: 70% CPU)
  
  # aws_cloudwatch_metric_alarm.high_cpu will be created
  + resource "aws_cloudwatch_metric_alarm" "high_cpu" {
      + alarm_name          = "ecs-fargate-cpu-utilization-high"
      + comparison_operator = "GreaterThanOrEqualToThreshold"
      + evaluation_periods  = 2
      + metric_name         = "CPUUtilization"
      + namespace           = "AWS/ECS"
      + period              = 60
      + threshold           = 70
    }

Plan: 1 to add, 1 to change, 0 to destroy.
─────────────────────────────────────────────────────────────────
✔ Terraform State Lock acquired. Infrastructure is compliant with desired state.`
      type = 'output-success'
      break

    case 'kubectl get pods':
    case 'kubectl get pods -a':
    case 'kubectl get pods -A':
      output = `NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE     IP
production    api-gateway-7b9c6f894-x2v8z        1/1     Running   0          42d     10.42.1.18
production    inventory-app-5d8f6d78b-9pq2k      1/1     Running   0          42d     10.42.2.14
production    billing-app-6c9b5d44f-8ml7w        1/1     Running   0          42d     10.42.2.15
production    rabbitmq-broker-0                  1/1     Running   0          42d     10.42.1.22
kube-system   traefik-ingress-controller-4f89    1/1     Running   0          42d     10.42.0.8
monitoring    prometheus-server-84f9b8c9d-x1     1/1     Running   0          42d     10.42.3.11

All 3 Nodes (1 Control Plane + 2 Workers) are in Ready state. 0 crashloops.`
      type = 'output-success'
      break

    case 'docker ps':
      output = `CONTAINER ID   IMAGE                        COMMAND                  CREATED        STATUS        PORTS                    NAMES
a8f1b239c4d1   cloud-design/api-gateway:v2  "./api-gateway"          2 hours ago    Up 2 hours    0.0.0.0:3000->3000/tcp   api-gateway-prod
c9e2d348b5e2   cloud-design/inventory:v2    "python app.py"          2 hours ago    Up 2 hours    0.0.0.0:3001->3001/tcp   inventory-prod
f4b5a679c8d3   cloud-design/billing:v2      "python app.py"          2 hours ago    Up 2 hours    0.0.0.0:3002->3002/tcp   billing-prod
d7e8f910a2b4   rabbitmq:3-management        "docker-entrypoint.s…"   2 hours ago    Up 2 hours    0.0.0.0:5672->5672/tcp   billing-queue
b1a2c3d4e5f6   postgres:15-alpine           "docker-entrypoint.s…"   2 hours ago    Up 2 hours    5432/tcp                 inventory-db`
      break

    case 'curl /healthz':
    case 'curl healthz':
    case 'curl http://localhost:3000/healthz':
      output = `HTTP/1.1 200 OK
Date: Wed, 30 Sep 2026 11:32:00 GMT
Server: AWS ECS Fargate (eu-west-3)
Content-Type: application/json
X-Response-Time: 18ms

{
  "status": "UP",
  "version": "v2.1.3",
  "orchestration": {
    "engine": "Kubernetes K3s / AWS ECS",
    "nodes_ready": 3,
    "active_replicas": 4,
    "uptime": "99.98%"
  },
  "database": {
    "postgres_inventory": "CONNECTED (latency: 1.2ms)",
    "postgres_billing": "CONNECTED (latency: 1.4ms)"
  },
  "message_broker": {
    "rabbitmq": "CONNECTED (queue_depth: 0)"
  }
}`
      type = 'output-success'
      break

    case 'cat resume':
    case 'resume':
      output = `===================================================================
ABDERRAHMANE FETHI — Full Stack & DevOps / Cloud Engineer
Location: Morocco 🇲🇦 | Email: fethiabderrahmane1@gmail.com
Phone: +212 699 87 3757 | GitHub: https://github.com/A-fethi
===================================================================
SPECIALIZATION:
- DevOps & Cloud Computing (Zone01 / 01Talent Curriculum)
  [AWS ECS, Terraform, Kubernetes (K3s), Docker, GitLab CI/CD, Ansible]
- Full Stack Software Engineering (Zone01 / 01Talent Curriculum)
  [Go, Java Spring Boot, Vue.js, Angular, PostgreSQL, WebSockets]

FEATURED PRODUCTION INFRASTRUCTURE:
1. Cloud-Design: AWS ECS Fargate Microservices via Terraform IaC
2. Code-Keeper: Enterprise GitLab CI/CD & Ansible Runner Automation
3. Orchestrator: Multi-Node Kubernetes Container Orchestration Cluster
4. Play With Containers: Distributed Microservices & RabbitMQ Broker
===================================================================`
      break

    case 'whoami':
      output = `Abderrahmane FETHI <fethiabderrahmane1@gmail.com>
Role: Full Stack & DevOps / Cloud Engineer
Core: AWS | Terraform | Kubernetes | Docker | Go | Vue.js`
      break

    case 'skills':
      output = `CLOUD & INFRASTRUCTURE: AWS (ECS, ALB, VPC, CloudWatch), Terraform, Kubernetes (K3s), Docker
DEVOPS & AUTOMATION:    GitLab CI/CD, Ansible, GitHub Actions, Trivy SAST, Bash
BACK-END & SYSTEMS:     Go (Golang), Java (Spring Boot), Python (Flask), Node.js, RabbitMQ
FRONT-END:              Vue.js 3, Angular, JavaScript (ES6+), Modern CSS3, WebSockets
DATABASES & PERSISTENCE: PostgreSQL, SQLite, MongoDB, Docker Volumes & PVC`
      break

    case 'projects':
      output = `[1] Cloud-Design       -> AWS ECS Fargate & Terraform Multi-AZ Infrastructure
[2] Code-Keeper        -> Automated CI/CD & DevSecOps Platform (GitLab + Ansible)
[3] Orchestrator       -> Multi-Node Kubernetes (K3s) Cluster with Traefik Ingress
[4] Play With Containers -> Event-Driven Microservices with RabbitMQ & PostgreSQL
[5] Social Network     -> Real-Time Full Stack Social Platform (Go + Vue.js)
[6] 01Blog             -> Enterprise Role-Based Blogging Engine (Spring Boot + Angular)
[7] Bombermandom       -> Multiplayer 60FPS DOM Engine Browser Game
[8] Java Local Server  -> Custom Socket-Level RFC HTTP/1.1 Server`
      break

    case 'date':
      output = new Date().toUTCString()
      break

    case 'uname -a':
      output = `Linux cloud-controller 6.8.0-aws #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`
      break

    default:
      output = `bash: command not found: ${raw}. Type 'help' to see available commands.`
      type = 'output-error'
      break
  }

  history.value.push({
    cmd: raw,
    output,
    isPre,
    type
  })

  scrollToBottom()
  nextTick(focusInput)
}

// Global hotkey handler for backtick/tilde
const onGlobalKeydown = (e) => {
  if (e.key === '`' || e.key === '~') {
    // Only toggle if not actively typing in an input elsewhere
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
      toggleShell()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
})
</script>

<style scoped>
/* Floating Launcher Button */
.shell-launcher-btn {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 998;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 18px;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(var(--accent-primary-rgb), 0.4);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-primary-rgb), 0.15);
  transition: all var(--transition-base);
}

[data-theme="light"] .shell-launcher-btn {
  background: #ffffff;
  border: 1.5px solid rgba(var(--accent-primary-rgb), 0.4);
  color: #0f172a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(var(--accent-primary-rgb), 0.15);
}

[data-theme="light"] .shell-ping-dot {
  background: #16a34a;
  box-shadow: 0 0 6px #16a34a;
}

.shell-launcher-btn:hover {
  transform: translateY(-3px) scale(1.03);
  border-color: var(--accent-primary);
  box-shadow: 0 14px 35px rgba(var(--accent-primary-rgb), 0.25);
}

.shell-ping-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #80ff72;
  box-shadow: 0 0 8px #80ff72;
  animation: pingGlow 1.8s ease-in-out infinite;
}

@keyframes pingGlow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.shell-icon-prompt {
  color: var(--accent-primary);
}

.shell-hotkey-badge {
  font-size: 0.72rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--text-muted);
}

/* Terminal Drawer */
.terminal-drawer {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 680px;
  max-width: calc(100vw - 48px);
  height: 480px;
  max-height: 80vh;
  z-index: 1001;
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(246, 131, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

[data-theme="light"] .terminal-drawer {
  background: #141414; /* Keep terminal dark even in light mode for developer feel */
  border-color: rgba(var(--accent-primary-rgb), 0.4);
}

.terminal-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
  cursor: grab;
}

.window-controls {
  display: flex;
  gap: 7px;
}

.win-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
}

.win-btn:hover { transform: scale(1.15); }
.win-btn.close { background: #ff5f57; }
.win-btn.minimize { background: #febc2e; }
.win-btn.maximize { background: #28c840; }

.terminal-session-title {
  font-size: 0.78rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-part { color: #80ff72; font-weight: 700; }
.path-part { color: var(--accent-primary); font-weight: 700; }
.env-badge { font-size: 0.68rem; color: var(--text-muted); }

.terminal-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.term-action-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  font-size: 0.72rem;
  font-family: var(--font-mono);
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-base);
}

.term-action-btn:hover {
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.3);
}

.term-action-btn.close-x:hover {
  color: #ff5f57;
  border-color: #ff5f57;
}

/* Quick Chips Bar */
.terminal-chips-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow-x: auto;
}

.chips-label {
  font-size: 0.65rem;
  color: var(--accent-primary);
  font-weight: 700;
  white-space: nowrap;
}

.cmd-chip {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.cmd-chip:hover {
  background: rgba(246, 131, 0, 0.15);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* Terminal Screen */
.terminal-screen {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #d4d4d4;
  background: #080808;
}

.ascii-art {
  font-size: 0.58rem;
  line-height: 1.15;
  color: var(--accent-primary);
  margin-bottom: 12px;
}

.welcome-lead {
  font-weight: 700;
  margin-bottom: 4px;
  color: #ffffff;
}

.welcome-sub {
  font-size: 0.76rem;
  margin-bottom: 4px;
}

.welcome-help {
  font-size: 0.76rem;
}

.highlight-cmd {
  color: #80ff72;
  font-weight: 700;
}

.term-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 14px 0;
}

/* Prompt Line */
.term-prompt-line {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
}

.prompt-user { color: #80ff72; font-weight: 700; }
.prompt-dir { color: var(--accent-primary); }
.prompt-sym { color: #ffffff; }
.prompt-cmd { color: #ffffff; font-weight: 600; }

.term-output {
  margin-top: 4px;
  padding-left: 4px;
  font-size: 0.8rem;
}

.term-output pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.output-success {
  color: #80ff72;
}

.output-error {
  color: #ff5f57;
}

/* Active Input Line */
.term-input-line {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: #ffffff;
}

/* Deep Help Grid */
:deep(.help-grid) {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

:deep(.cmd-term) {
  color: var(--accent-primary);
  font-weight: 700;
}

/* Animations */
.terminal-slide-enter-active,
.terminal-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.terminal-slide-enter-from,
.terminal-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

@media (max-width: 768px) {
  .terminal-drawer {
    left: 12px;
    right: 12px;
    bottom: 12px;
    width: auto;
    height: 420px;
  }

  .ascii-art {
    display: none;
  }

  .shell-launcher-btn {
    left: 16px;
    bottom: 16px;
    padding: 8px 14px;
    font-size: 0.8rem;
  }
}
</style>
