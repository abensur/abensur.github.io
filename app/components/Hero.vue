<template>
  <section ref="rootEl" class="hero" aria-labelledby="hero-title">
    <div class="hero-card">
      <h1 id="hero-title">Rafael Abensur</h1>
      <p class="hero-tagline">Full-stack engineer and AI enthusiast</p>
      <p class="hero-summary">
        Software Engineer with 12+ years of experience building scalable web applications and payment systems.
        <br/>
        Passionate about leveraging technology to solve complex problems and drive innovation in the fintech space.
      </p>
      <ul class="hero-meta" aria-label="Location and languages">
        <li>Sao Paulo, Brazil</li>
        <li>Portuguese, English, Spanish</li>
      </ul>
      <nav class="hero-links" aria-label="Primary links">
        <NuxtLink
          class="hero-link"
          :to="cvUrl"
          external
          download="CV-Rafael-Abensur-2025.pdf"
          aria-label="Download CV"
        >
          <span>CV</span>
          <Icon class="hero-link-icon" name="lucide:download" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink class="hero-link" :to="`mailto:${email}`" external>
          Email
          <Icon class="hero-link-icon" name="lucide:mail" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink class="hero-link" :to="githubUrl" external target="_blank" rel="noopener noreferrer">
          GitHub
          <Icon class="hero-link-icon" name="lucide:external-link" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink class="hero-link" :to="linkedinUrl" external target="_blank" rel="noopener noreferrer">
          LinkedIn
          <Icon class="hero-link-icon" name="lucide:external-link" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink class="hero-link" :to="codepenUrl" external target="_blank" rel="noopener noreferrer">
          CodePen
          <Icon class="hero-link-icon" name="lucide:external-link" aria-hidden="true" />
        </NuxtLink>
      </nav>
      <button @click="scrollToWork" class="hero-scroll-link" aria-label="Scroll to selected work">
        <span>View My Work</span>
        <Icon class="hero-scroll-icon" name="lucide:arrow-down" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = 'rafael@abensur.me'
const cvUrl = '/CV-Rafael-Abensur-2025.pdf'
const githubUrl = 'https://github.com/abensur'
const linkedinUrl = 'https://www.linkedin.com/in/rafaelabensur/'
const codepenUrl = 'https://codepen.io/abensur'
const rootEl = ref<HTMLElement | null>(null)

const scrollToWork = () => {
  const element = document.getElementById('selected-work')
  if (element) {
    const yOffset = -100
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

defineExpose({
  rootEl
})
</script>

<style scoped>
.hero {
  position: absolute;
  left: 50%;
  bottom: calc(50% + (var(--dot-size) / 2) - 10px + var(--line-height) + var(--hero-gap));
  transform: translateX(-50%);
  width: min(76ch, 94vw);
  color: #121316;
  text-align: center;
  pointer-events: auto;
}

.hero-card {
  display: grid;
  gap: 0.85rem;
  padding: clamp(1.8rem, 4vw, 2.6rem);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(18, 19, 22, 0.12);
  box-shadow: 0 22px 50px rgba(18, 19, 22, 0.12);
}

.hero h1 {
  font-size: clamp(2.6rem, 5vw, 4rem);
  margin: 0;
}

.hero-tagline {
  font-size: clamp(1.15rem, 2.6vw, 1.7rem);
  font-weight: 500;
  color: rgba(18, 19, 22, 0.78);
  margin: 0;
}

.hero-summary {
  margin: 0 auto;
  color: rgba(18, 19, 22, 0.68);
  max-width: 60ch;
}

.hero-meta {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 1.2rem;
  margin: 0.25rem 0 0;
  padding: 0;
  font-size: 0.85rem;
  color: rgba(18, 19, 22, 0.58);
}

.hero-meta li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.hero-meta li + li::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: rgba(18, 19, 22, 0.35);
}

.hero-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  margin-top: 0.35rem;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1;
  text-decoration: none;
  color: var(--accent);
  position: relative;
}

.hero-link::after {
  content: '|';
  margin-left: 0.9rem;
  color: rgba(18, 19, 22, 0.35);
}

.hero-link:last-child::after {
  content: '';
  margin: 0;
}

.hero-link:focus-visible {
  outline: 2px solid rgba(18, 19, 22, 0.45);
  outline-offset: 3px;
}

.hero-link-icon {
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.hero-scroll-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.8rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  background: transparent;
  border: 1px solid rgba(18, 19, 22, 0.18);
  color: rgba(18, 19, 22, 0.68);
  font-weight: 500;
  font-size: 0.88rem;
  line-height: 1;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  font-family: inherit;
}

.hero-scroll-link:hover {
  border-color: rgba(18, 19, 22, 0.32);
  color: rgba(18, 19, 22, 0.85);
}

.hero-scroll-link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.hero-scroll-icon {
  display: block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

@media (max-width: 560px) {
  .hero-card {
    text-align: left;
    gap: 1.1rem;
    padding: clamp(1.4rem, 5vw, 1.8rem);
  }

  .hero h1 {
    font-size: clamp(2rem, 8vw, 2.6rem);
    line-height: 1.15;
  }

  .hero-tagline {
    font-size: clamp(1rem, 4.5vw, 1.25rem);
    line-height: 1.4;
  }

  .hero-summary {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .hero-meta {
    font-size: 0.88rem;
    gap: 0.6rem 1rem;
    margin-top: 0.5rem;
  }

  .hero-links {
    justify-content: flex-start;
    gap: 0.5rem;
    margin-top: 0.8rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .hero-link {
    display: flex;
    font-size: 0.85rem;
    line-height: 1;
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    background: rgba(255, 122, 89, 0.08);
    border: 1px solid rgba(255, 122, 89, 0.2);
    justify-content: space-between;
    align-items: center;
    min-height: 44px;
  }

  .hero-link::after {
    display: none;
  }

  .hero-scroll-link {
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
