<template>
  <section class="contact section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// Let's Connect</span>
        <h2 class="section-title">Get In Touch</h2>
        <p class="section-subtitle">Have a project in mind or just want to chat? I'd love to hear from you!</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-card glass-card gradient-border">
            <h3 class="contact-card-title">Let's work together</h3>
            <p class="contact-card-text">
              I'm currently open to new opportunities as a Full Stack Developer.
              Whether you have a project, job opportunity, or just want to say hi — feel free to reach out!
            </p>

            <div class="contact-links">
              <a href="mailto:fethiabderrahmane1@gmail.com" class="contact-link-item">
                <div class="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div class="contact-link-text">
                  <span class="contact-link-label">Email</span>
                  <span class="contact-link-value">fethiabderrahmane1@gmail.com</span>
                </div>
              </a>

              <a href="tel:+212699873757" class="contact-link-item">
                <div class="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div class="contact-link-text">
                  <span class="contact-link-label">Phone</span>
                  <span class="contact-link-value">+212 699 87 3757</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/abderrahmane-fethi" target="_blank" rel="noopener" class="contact-link-item">
                <div class="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
                <div class="contact-link-text">
                  <span class="contact-link-label">LinkedIn</span>
                  <span class="contact-link-value">abderrahmane-fethi</span>
                </div>
              </a>

              <a href="https://github.com/A-fethi" target="_blank" rel="noopener" class="contact-link-item">
                <div class="contact-link-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <div class="contact-link-text">
                  <span class="contact-link-label">GitHub</span>
                  <span class="contact-link-value">A-fethi</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <form class="contact-form glass-card gradient-border" @submit.prevent="handleSubmit">
            <template v-if="!showOTP">
              <div class="form-group">
                <label for="contact-name" class="form-label">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  class="form-input"
                  placeholder="Your name"
                  v-model="form.name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  class="form-input"
                  placeholder="your@email.com"
                  v-model="form.email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="contact-message" class="form-label">Message</label>
                <textarea
                  id="contact-message"
                  class="form-input form-textarea"
                  placeholder="Tell me about your project..."
                  rows="5"
                  v-model="form.message"
                  required
                ></textarea>
              </div>
            </template>

            <template v-else>
              <div class="form-group otp-group">
                <label for="contact-otp" class="form-label">Verification Code</label>
                <p class="otp-instruction">We sent a 6-digit code to <br/><strong>{{ form.email }}</strong></p>
                <input
                  id="contact-otp"
                  type="text"
                  class="form-input text-center text-mono otp-input"
                  placeholder="------"
                  maxlength="6"
                  v-model="userOTPInput"
                  required
                />
                <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
              </div>
            </template>

            <p v-if="errorMessage && !showOTP" class="error-text general-error">{{ errorMessage }}</p>

            <button type="submit" class="btn btn-primary btn-submit" :class="{ sent: isSent }" :disabled="isLoading">
              <span v-if="isLoading">Processing...</span>
              <span v-else-if="!isSent && !showOTP">Send Message</span>
              <span v-else-if="!isSent && showOTP">Verify & Send</span>
              <span v-else>✓ Message Sent!</span>
              <svg v-if="!isSent && !isLoading && !showOTP" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>

            <button v-if="showOTP && !isSent" type="button" class="btn btn-outline btn-cancel" @click="cancelOTP" :disabled="isLoading">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSent = ref(false)
const isLoading = ref(false)
const showOTP = ref(false)
const generatedOTP = ref('')
const userOTPInput = ref('')
const errorMessage = ref('')

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const handleSubmit = async () => {
  if (!showOTP.value) {
    await requestVerification()
  } else {
    await verifyAndSend()
  }
}

const requestVerification = async () => {
  isLoading.value = true
  errorMessage.value = ''
  generatedOTP.value = generateOTP()
  
  try {
    // 1. SEND OTP TO CLIENT
    await emailjs.send(
      'service_4wxx649',
      'template_nsvy176',
      {
        email: form.value.email,
        passcode: generatedOTP.value,
        time: new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      'tEjDE9eTwRZAQpdy-'
    )
    
    showOTP.value = true
  } catch (error) {
    console.error('FAILED...', error)
    errorMessage.value = 'Failed to send verification code. Please check console & your EmailJS config.'
  } finally {
    isLoading.value = false
  }
}

const verifyAndSend = async () => {
  if (userOTPInput.value !== generatedOTP.value) {
    errorMessage.value = 'Invalid verification code.'
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    // 2. SEND MESSAGE TO OWNER
    await emailjs.send(
      'service_4wxx649',
      'template_28qxag4',
      {
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        time: new Date().toLocaleString()
      },
      'tEjDE9eTwRZAQpdy-'
    )

    isSent.value = true
    setTimeout(() => {
      form.value = { name: '', email: '', message: '' }
      showOTP.value = false
      userOTPInput.value = ''
      isSent.value = false
    }, 4000)
  } catch (error) {
    console.error('FAILED...', error)
    errorMessage.value = 'Failed to send message.'
  } finally {
    isLoading.value = false
  }
}

const cancelOTP = () => {
  showOTP.value = false
  userOTPInput.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.contact-card {
  padding: 32px;
}

.contact-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-card-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-link-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-base);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

[data-theme="light"] .contact-link-item {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.contact-link-item:hover {
  background: rgba(var(--accent-primary-rgb), 0.05);
  border-color: rgba(var(--accent-primary-rgb), 0.15);
  transform: translateX(8px);
}

.contact-link-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: rgba(var(--accent-primary-rgb), 0.08);
  color: var(--accent-primary);
  flex-shrink: 0;
}

[data-theme="light"] .contact-link-icon {
  background: rgba(var(--accent-primary-rgb), 0.15);
}

.contact-link-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 2px;
}

.contact-link-value {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 600;
}

/* Form */
.contact-form {
  padding: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  outline: none;
}

[data-theme="light"] .form-input {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: var(--accent-primary);
  background: rgba(var(--accent-primary-rgb), 0.03);
  box-shadow: 0 0 0 3px rgba(var(--accent-primary-rgb), 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  justify-content: center;
  padding: 16px;
  font-size: 1rem;
}

.btn-submit.sent {
  background: linear-gradient(135deg, #4d5206, #616808);
}

.otp-instruction {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
}

.otp-instruction strong {
  color: var(--accent-primary);
}

.otp-input {
  letter-spacing: 8px;
  font-size: 1.5rem;
  padding: 16px;
  height: 60px;
}

.error-text {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 8px;
}

.general-error {
  margin-bottom: 16px;
  text-align: center;
}

.btn-cancel {
  width: 100%;
  margin-top: 12px;
  padding: 14px;
  justify-content: center;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
