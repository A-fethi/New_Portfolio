<template>
  <div class="cloud-status-widget" ref="widgetRef">
    <!-- Status Trigger Pill -->
    <button
      class="status-pill"
      :class="{ open: isOpen }"
      @click="togglePopover"
      aria-label="Cloud Infrastructure Status"
      title="View Real-Time Cloud Telemetry"
    >
      <span class="live-pulse-dot"></span>
      <span class="status-summary text-mono">SLA 99.9%</span>
      <svg class="chevron-icon" :class="{ rotated: isOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </button>

    <!-- Telemetry Popover Dropdown -->
    <Transition name="popover-drop">
      <div v-if="isOpen" class="status-popover glass-card">
        <div class="popover-header">
          <div class="header-status-lead">
            <span class="live-dot-lg"></span>
            <div class="header-titles">
              <span class="popover-title">Cloud Infrastructure Status</span>
              <span class="popover-region text-mono">AWS eu-west-3 (Paris) · Latency: {{ simulatedPing }}ms</span>
            </div>
          </div>
          <span class="sla-badge text-mono">HEALTHY</span>
        </div>

        <!-- Telemetry Items -->
        <div class="services-telemetry-list">
          <div class="telemetry-row">
            <div class="service-meta">
              <span class="svc-bullet">☁️</span>
              <span class="svc-name">AWS ECS Fargate Cluster</span>
            </div>
            <span class="svc-metric text-mono text-green">4/4 Tasks Active</span>
          </div>

          <div class="telemetry-row">
            <div class="service-meta">
              <span class="svc-bullet">☸️</span>
              <span class="svc-name">K3s Kubernetes Cluster</span>
            </div>
            <span class="svc-metric text-mono text-green">3 Nodes Ready</span>
          </div>

          <div class="telemetry-row">
            <div class="service-meta">
              <span class="svc-bullet">⚡</span>
              <span class="svc-name">GitLab CI/CD Runners</span>
            </div>
            <span class="svc-metric text-mono text-green">Docker dind Idle</span>
          </div>

          <div class="telemetry-row">
            <div class="service-meta">
              <span class="svc-bullet">🗄️</span>
              <span class="svc-name">PostgreSQL Database</span>
            </div>
            <span class="svc-metric text-mono text-green">Connected (1.2ms)</span>
          </div>

          <div class="telemetry-row">
            <div class="service-meta">
              <span class="svc-bullet">🐇</span>
              <span class="svc-name">RabbitMQ Event Broker</span>
            </div>
            <span class="svc-metric text-mono text-green">0 Queued Messages</span>
          </div>

          <div class="telemetry-row">
            <div class="service-meta">
              <span class="svc-bullet">🔒</span>
              <span class="svc-name">Security & Encryption</span>
            </div>
            <span class="svc-metric text-mono text-green">TLS 1.3 / KMS Valid</span>
          </div>
        </div>

        <div class="popover-footer text-mono">
          <span>Continuous Health Probing Active</span>
          <span class="text-accent">Zero Downtime</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { playClick } from '../utils/audioSystem.js'

const isOpen = ref(false)
const widgetRef = ref(null)
const simulatedPing = ref(18)

let pingInterval = null

const togglePopover = () => {
  playClick()
  isOpen.value = !isOpen.value
}

const handleClickOutside = (e) => {
  if (widgetRef.value && !widgetRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Realistic micro-fluctuations in network ping
  pingInterval = setInterval(() => {
    simulatedPing.value = 16 + Math.floor(Math.random() * 6)
  }, 4000)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (pingInterval) clearInterval(pingInterval)
})
</script>

<style scoped>
.cloud-status-widget {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  background: rgba(128, 255, 114, 0.08);
  border: 1px solid rgba(128, 255, 114, 0.25);
  border-radius: var(--radius-full);
  color: #80ff72;
  cursor: pointer;
  transition: all var(--transition-base);
  user-select: none;
}

[data-theme="light"] .status-pill {
  background: rgba(128, 255, 114, 0.15);
  border-color: rgba(60, 160, 50, 0.4);
  color: #1f7d1f;
}

.status-pill:hover, .status-pill.open {
  background: rgba(128, 255, 114, 0.15);
  border-color: #80ff72;
  box-shadow: 0 0 12px rgba(128, 255, 114, 0.25);
  transform: translateY(-1px);
}

.live-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #80ff72;
  box-shadow: 0 0 8px #80ff72;
  animation: pulseDot 2s infinite ease-in-out;
}

[data-theme="light"] .live-pulse-dot {
  background: #1f7d1f;
  box-shadow: 0 0 6px #1f7d1f;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.status-summary {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.chevron-icon {
  transition: transform var(--transition-fast);
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* Popover Dropdown */
.status-popover {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 340px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(128, 255, 114, 0.15);
  padding: 16px;
  z-index: 1050;
}

[data-theme="light"] .status-popover {
  background: #ffffff;
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
}

.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 12px;
}

[data-theme="light"] .popover-header {
  border-bottom-color: rgba(0, 0, 0, 0.08);
}

.header-status-lead {
  display: flex;
  align-items: center;
  gap: 10px;
}

.live-dot-lg {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #80ff72;
  box-shadow: 0 0 10px #80ff72;
}

.header-titles {
  display: flex;
  flex-direction: column;
}

.popover-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}

.popover-region {
  font-size: 0.68rem;
  color: var(--text-muted);
}

.sla-badge {
  font-size: 0.68rem;
  background: rgba(128, 255, 114, 0.15);
  color: #80ff72;
  border: 1px solid rgba(128, 255, 114, 0.3);
  padding: 2px 7px;
  border-radius: var(--radius-full);
  font-weight: 700;
}

/* Services Telemetry List */
.services-telemetry-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 14px;
}

.telemetry-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
}

.service-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.svc-bullet {
  font-size: 0.95rem;
}

.svc-name {
  color: var(--text-secondary);
  font-weight: 500;
}

.svc-metric {
  font-size: 0.72rem;
  font-weight: 600;
}

.text-green {
  color: #80ff72 !important;
}

[data-theme="light"] .text-green {
  color: #1f7d1f !important;
}

.popover-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.68rem;
  color: var(--text-muted);
}

[data-theme="light"] .popover-footer {
  border-top-color: rgba(0, 0, 0, 0.08);
}

/* Transition */
.popover-drop-enter-active,
.popover-drop-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.popover-drop-enter-from,
.popover-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}

@media (max-width: 600px) {
  .status-popover {
    right: -70px;
    width: 300px;
  }
}

[data-theme="light"] .status-pill {
  background: rgba(22, 163, 74, 0.1);
  border-color: rgba(22, 163, 74, 0.35);
  color: #15803d;
  font-weight: 700;
}

[data-theme="light"] .live-pulse-dot {
  background: #16a34a;
  box-shadow: 0 0 6px #16a34a;
}

[data-theme="light"] .sla-badge {
  background: rgba(22, 163, 74, 0.12);
  color: #15803d;
  border-color: rgba(22, 163, 74, 0.3);
}

[data-theme="light"] .popover-title {
  color: #0f172a;
}

[data-theme="light"] .popover-region {
  color: #64748b;
}

[data-theme="light"] .svc-name {
  color: #334155;
  font-weight: 600;
}

[data-theme="light"] .text-green {
  color: #15803d !important;
}

[data-theme="light"] .popover-footer {
  color: #64748b;
}

</style>
