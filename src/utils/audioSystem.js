import { ref } from 'vue'

const STORAGE_KEY = 'portfolio_audio_sfx'

// Audio state: default disabled (opt-in) unless user previously enabled it
export const isAudioEnabled = ref(localStorage.getItem(STORAGE_KEY) === 'true')

let audioCtx = null

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export const toggleAudio = () => {
  isAudioEnabled.value = !isAudioEnabled.value
  localStorage.setItem(STORAGE_KEY, isAudioEnabled.value ? 'true' : 'false')
  
  if (isAudioEnabled.value) {
    // Play activation chime
    playActivationChime()
  }
  return isAudioEnabled.value
}

// 1. Activation Chime (Two-tone futuristic ascending chord)
export const playActivationChime = () => {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()

  osc1.type = 'sine'
  osc2.type = 'triangle'

  osc1.frequency.setValueAtTime(523.25, now) // C5
  osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.12) // G5

  osc2.frequency.setValueAtTime(659.25, now) // E5
  osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.12) // C6

  gain.gain.setValueAtTime(0.08, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

  osc1.connect(gain)
  osc2.connect(gain)
  gain.connect(ctx.destination)

  osc1.start(now)
  osc2.start(now)
  osc1.stop(now + 0.3)
  osc2.stop(now + 0.3)
}

// 2. Micro Click / UI Tap
export const playClick = () => {
  if (!isAudioEnabled.value) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, now)
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.04)

  gain.gain.setValueAtTime(0.06, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.05)
}

// 3. Subtle Hover Tone (Ultra quiet, smooth micro-tick)
export const playHover = () => {
  if (!isAudioEnabled.value) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(440, now)
  osc.frequency.exponentialRampToValueAtTime(550, now + 0.03)

  gain.gain.setValueAtTime(0.02, now) // Very low volume so it never fatigues
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.04)
}

// 4. Terminal Keystroke (Slightly pitched variation like tactile switches)
export const playKeystroke = () => {
  if (!isAudioEnabled.value) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  const freq = 1100 + Math.random() * 300 // Pitch jitter for natural typing feel
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(freq, now)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.025)

  gain.gain.setValueAtTime(0.04, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.03)
}

// 5. Terminal Command Executed / Transmitted
export const playCommandTransmit = () => {
  if (!isAudioEnabled.value) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(600, now)
  osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08)

  gain.gain.setValueAtTime(0.05, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.11)
}

// 6. Modal Open (Futuristic digital sweep)
export const playModalOpen = () => {
  if (!isAudioEnabled.value) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(320, now)
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.15)

  gain.gain.setValueAtTime(0.06, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.23)
}

// 7. Modal Close
export const playModalClose = () => {
  if (!isAudioEnabled.value) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(660, now)
  osc.frequency.exponentialRampToValueAtTime(260, now + 0.1)

  gain.gain.setValueAtTime(0.05, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.13)
}
