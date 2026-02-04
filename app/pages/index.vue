<template>
  <main class="dot-shell" :style="styleVars">
    <div class="camera-layer" :class="{ 'is-bursting': hasBurst }">
      <div class="camera-reveal">
        <DotBurst ref="dotBurst" :is-ready="isReady" :is-bursting="hasBurst" @pulse-end="handlePulseEnd" />

        <TimelineStage
          ref="timelineStage"
          :items="timelineMilestones"
          :is-bursting="hasBurst"
          :layout="timelineLayout"
        />

        <Hero ref="heroBlock" />

        <ShowcaseRoots ref="showcaseStage" :items="showcaseItems" :is-visible="showcaseVisible" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, nextTick, ref } from 'vue'
import { showcaseItems } from '~/data/showcase'

const hasBurst = ref(false)
const isReady = ref(false)
const timelineStage = ref<{ listEl: HTMLOListElement | null } | null>(null)
const heroBlock = ref<{ rootEl: HTMLElement | null } | null>(null)
const dotBurst = ref<{ rootEl: HTMLElement | null } | null>(null)
const showcaseStage = ref<{ sentinelEl: HTMLElement | null } | null>(null)
const showcaseVisible = ref(false)
const timelineLayout: 'badge' | 'angled' | 'watermark' = 'watermark'
let resizeObserver: ResizeObserver | null = null
let measureRaf = 0
let showcaseTimer = 0
const timelineMilestones = [
  {
    year: '2011',
    title: 'Intern Developer',
    summary: 'Built ERP modules for social integrations, gaining first production PHP/SQL experience.',
    company: 'Betalabs',
    logo: '/logos/betalabs.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'jQuery']
  },
  {
    year: '2012',
    title: 'Junior Front-end Developer',
    summary: 'Built Kinect-based games and HTML5/Flash experiences at Centesimo, including a gamified training platform.',
    company: 'Centesimo',
    logo: '/logos/centesimo.png',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'ActionScript', 'PHP', 'Kinect SDK']
  },
  {
    year: '2013',
    title: 'Front-end Developer',
    summary: 'Joined Verios to build investment web apps and D3.js visualizations for Brazil\'s first robo-advisor.',
    company: 'Verios',
    logo: '/logos/verios.png',
    tech: ['SASS', 'JavaScript', 'React', 'D3.js', 'Express', 'Node.js']
  },
  {
    year: '2014',
    title: 'Software Engineer',
    summary: 'Worked on Locaweb\'s drag-and-drop website builder serving a large B2C platform.',
    company: 'Locaweb',
    logo: '/logos/locaweb.png',
    tech: ['HTML5', 'LESS', 'JavaScript', 'Ember.js', 'Ruby on Rails']
  },
  {
    year: '2015',
    title: 'Software Engineer',
    summary: 'Redesigned a major bank site and worked on Fortune 500 client engagements.',
    company: 'Huge',
    logo: '/logos/huge.png',
    tech: ['HTML5', 'SASS', 'JavaScript', 'React', 'Vue.js', 'Webpack']
  },
  {
    year: '2016',
    title: 'Senior Software Engineer',
    summary: 'Set front-end architecture, hired and mentored engineers, and built the team.',
    company: 'Convenia',
    logo: '/logos/convenia.png',
    tech: ['SASS', 'JavaScript', 'PHP', 'Vue.js', 'Laravel']
  },
  {
    year: '2017',
    title: 'Senior Software Engineer',
    summary: 'First and only front-end engineer, built everything from scratch until launch.',
    company: 'NeoPag',
    logo: '/logos/neopag.png',
    tech: ['JavaScript', 'Elixir', 'Vue.js', 'Phoenix']
  },
  {
    year: '2018',
    title: 'Founding Engineer',
    summary: 'Joined a55 to build fintech infrastructure, starting a long-term mission.',
    company: 'a55',
    logo: '/logos/a55.png',
    tech: ['JavaScript', 'TypeScript', 'Python', 'Vue.js', 'Django']
  },
  {
    year: '2021',
    title: 'Senior Software Engineer',
    summary: 'Major business pivot, from SME loans to payment orchestration and infrastructure. Expanded team and tech stack.',
    company: 'a55',
    logo: '/logos/a55.png',
    tech: ['JavaScript', 'TypeScript', 'Python', 'Vue.js', 'Nuxt.js', 'Flask']
  },
  {
    year: '2022',
    title: 'Staff Software Engineer',
    summary: 'Leading technical strategy and development for payment orchestration for global markets.',
    company: 'a55',
    logo: '/logos/a55.png',
    tech: ['LLMs', 'RAG', 'JavaScript', 'TypeScript', 'Python', 'Vue.js', 'Nuxt.js', 'Flask']
  }
]
const lineDuration = Number(Math.max(3.4, timelineMilestones.length * 0.28).toFixed(2))
const revealStart = 0
const revealSpread = lineDuration * 0.58
const revealStep = Number((revealSpread / Math.max(1, timelineMilestones.length - 1)).toFixed(2))
const fallbackLineHeight = timelineMilestones.length * 175 + 300
const fallbackCameraShift = Math.round(fallbackLineHeight * 0.72)
const fallbackShowcaseOffset = Math.round(Math.max(520, fallbackLineHeight * 0.35))
const fallbackPageDepth = Math.round(fallbackShowcaseOffset * 0.65)
const cameraDuration = Number((lineDuration * 1.18).toFixed(2))
const cameraRevealDuration = Number(Math.max(1.6, lineDuration * 0.4).toFixed(2))
const scrollLockClass = 'scroll-locked'
let unlockTimer = 0
let lockedScrollY = 0
const styleVars = ref<Record<string, string>>({
  '--line-duration': `${lineDuration}s`,
  '--line-height': `${fallbackLineHeight}px`,
  '--camera-shift': `${fallbackCameraShift}px`,
  '--camera-reveal': `0px`,
  '--line-tail': `0px`,
  '--showcase-offset': `${fallbackShowcaseOffset}px`,
  '--page-depth': `${fallbackPageDepth}px`,
  '--camera-duration': `${cameraDuration}s`,
  '--camera-reveal-duration': `${cameraRevealDuration}s`,
  '--reveal-start': `${revealStart}s`,
  '--reveal-step': `${revealStep}s`
})

const measureTimeline = () => {
  const listEl = timelineStage.value?.listEl ?? null
  if (!listEl) return

  const viewport = window.innerHeight
  const lineHeight = Math.max(0, listEl.scrollHeight)

  styleVars.value = {
    ...styleVars.value,
    '--line-height': `${lineHeight.toFixed(1)}px`
  }

  nextTick(() => {
    window.requestAnimationFrame(() => {
      const freshListRect = listEl.getBoundingClientRect()
      const targetTop = viewport * 0.18
      let cameraShift = targetTop - freshListRect.top
      let cameraReveal = 0

      const heroEl = heroBlock.value?.rootEl ?? null
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect()
        const targetHeroTop = viewport * 0.16
        cameraReveal = Math.max(0, targetHeroTop - heroRect.top - cameraShift)
      }

      const extraDepth = Math.max(220, viewport * 0.45)
      let lineTail = extraDepth
      const showcaseGap = 72
      const dotEl = dotBurst.value?.rootEl ?? null
      if (dotEl) {
        const lineEl = dotEl.querySelector<HTMLElement>('.sprout-line')
        if (lineEl) {
          const anchorBottom = dotEl.offsetTop + lineEl.offsetTop + lineEl.offsetHeight
          const finalAnchor = anchorBottom + cameraShift + cameraReveal
          lineTail = Math.max(0, viewport - finalAnchor + extraDepth)
        }
      }
      const showcaseOffset = lineTail + showcaseGap
      const pageDepth = showcaseOffset + Math.max(240, viewport * 0.35)

      styleVars.value = {
        ...styleVars.value,
        '--camera-shift': `${cameraShift.toFixed(1)}px`,
        '--camera-reveal': `${cameraReveal.toFixed(1)}px`,
        '--line-tail': `${lineTail.toFixed(1)}px`,
        '--showcase-offset': `${showcaseOffset.toFixed(1)}px`,
        '--page-depth': `${pageDepth.toFixed(1)}px`
      }
    })
  })
}

const scheduleMeasure = () => {
  if (measureRaf) return
  measureRaf = window.requestAnimationFrame(() => {
    measureRaf = 0
    measureTimeline()
  })
}

const handlePulseEnd = () => {
  if (hasBurst.value) return
  hasBurst.value = true
  scheduleUnlock()
  scheduleShowcaseReveal()
}

const lockScroll = () => {
  if (typeof window === 'undefined') return
  if (document.documentElement.classList.contains(scrollLockClass)) return
  lockedScrollY = window.scrollY || window.pageYOffset || 0
  document.documentElement.classList.add(scrollLockClass)
  document.body.classList.add(scrollLockClass)
  document.body.style.top = `-${lockedScrollY}px`
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.documentElement.classList.remove(scrollLockClass)
  document.body.classList.remove(scrollLockClass)
  document.body.style.top = ''
  if (lockedScrollY) {
    window.scrollTo(0, lockedScrollY)
    lockedScrollY = 0
  }
}

const scheduleUnlock = () => {
  if (typeof window === 'undefined') return
  if (unlockTimer) window.clearTimeout(unlockTimer)
  const totalMs = Math.round((cameraDuration + cameraRevealDuration) * 1000)
  unlockTimer = window.setTimeout(() => {
    unlockTimer = 0
    unlockScroll()
  }, totalMs)
}

const scheduleShowcaseReveal = () => {
  if (typeof window === 'undefined') return
  if (showcaseTimer) window.clearTimeout(showcaseTimer)
  const totalMs = Math.round((cameraDuration + cameraRevealDuration) * 1000)
  showcaseTimer = window.setTimeout(() => {
    showcaseTimer = 0
    showcaseVisible.value = true
  }, totalMs)
}

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    isReady.value = true
    hasBurst.value = true
    scheduleMeasure()
    showcaseVisible.value = true
    return
  }

  lockScroll()

  const initializeAnimation = () => {
    // Ensure all refs are ready before starting
    const listEl = timelineStage.value?.listEl ?? null
    const heroEl = heroBlock.value?.rootEl ?? null
    const dotEl = dotBurst.value?.rootEl ?? null

    if (!listEl || !heroEl || !dotEl) {
      // Refs not ready, retry on next frame
      window.requestAnimationFrame(initializeAnimation)
      return
    }

    // Double RAF to ensure paint complete
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scheduleMeasure()
        nextTick(() => {
          // Verify measurements succeeded
          const lineHeight = listEl.scrollHeight
          if (lineHeight === 0) {
            // Measurements failed, retry
            window.requestAnimationFrame(initializeAnimation)
            return
          }

          // All checks passed, start animation
          isReady.value = true

          // Setup observers
          resizeObserver = new ResizeObserver(scheduleMeasure)
          if (listEl) resizeObserver.observe(listEl)
          if (heroEl) resizeObserver.observe(heroEl)
          window.addEventListener('resize', scheduleMeasure)
        })
      })
    })
  }

  initializeAnimation()
})

onBeforeUnmount(() => {
  if (unlockTimer) window.clearTimeout(unlockTimer)
  unlockScroll()
  if (resizeObserver) resizeObserver.disconnect()
  if (showcaseTimer) window.clearTimeout(showcaseTimer)
  window.removeEventListener('resize', scheduleMeasure)
  if (measureRaf) window.cancelAnimationFrame(measureRaf)
})
</script>

<style scoped>
:global(body) {
  background: #f8f5f1;
}

:global(html.scroll-locked),
:global(body.scroll-locked) {
  overflow: hidden;
}

:global(body.scroll-locked) {
  position: fixed;
  width: 100%;
  overscroll-behavior: none;
}

.dot-shell {
  --accent: #ff7a59;
  --accent-soft: rgba(255, 122, 89, 0.25);
  --dot-size: 42px;
  --line-height: min(120vh, 760px);
  --camera-shift: min(38vh, 260px);
  --line-duration: 3.4s;
  --camera-duration: var(--line-duration);
  --line-ease: cubic-bezier(0.23, 1, 0.32, 1);
  --reveal-start: 0s;
  --reveal-step: 0.16s;
  --hero-gap: clamp(120px, 20vh, 220px);
  --timeline-bottom-gap: clamp(24px, 5vh, 60px);

  min-height: calc(100vh + var(--page-depth));
  display: grid;
  place-items: center;
  position: relative;
  background:
    radial-gradient(circle at 20% 20%, #fff1e6 0%, transparent 55%),
    radial-gradient(circle at 80% 10%, #e8f2ff 0%, transparent 45%),
    #f8f5f1;
}

.camera-layer {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
  will-change: transform;
}

.camera-layer.is-bursting {
  animation: cameraFollow var(--camera-duration) var(--line-ease) forwards;
}

.camera-reveal {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.camera-layer.is-bursting .camera-reveal {
  animation: cameraReveal var(--camera-reveal-duration) var(--line-ease) forwards;
  animation-delay: var(--camera-duration);
}

@keyframes cameraFollow {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(var(--camera-shift));
  }
}

@keyframes cameraReveal {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(var(--camera-reveal));
  }
}

@media (prefers-reduced-motion: reduce) {
  .camera-layer.is-bursting {
    animation: none;
    transform: translateY(calc(var(--camera-shift) + var(--camera-reveal)));
  }

  .camera-layer.is-bursting .camera-reveal {
    animation: none;
    transform: none;
  }
}
</style>
