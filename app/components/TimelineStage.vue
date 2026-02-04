<template>
  <section
    class="timeline-stage"
    :class="{ 'is-bursting': isBursting }"
    :data-layout="layout"
    aria-label="Timeline preview"
  >
    <div class="timeline-track">
      <ol ref="listEl" class="timeline-list">
        <li
          v-for="(item, index) in items"
          :key="`${item.year}-${item.title}`"
          class="timeline-row"
          :class="index % 2 === 0 ? 'is-left' : 'is-right'"
          :style="{ '--item-index': index }"
        >
          <div class="timeline-item">
            <span class="timeline-year-watermark" aria-hidden="true">{{ item.year }}</span>
            <div class="timeline-meta">
              <span class="timeline-year">{{ item.year }}</span>
              <div v-if="item.company || item.logo" class="timeline-company">
                <img
                  v-if="item.logo"
                  class="timeline-logo"
                  :src="item.logo"
                  :alt="item.company ? `${item.company} logo` : 'Company logo'"
                  loading="lazy"
                  decoding="async"
                />
                <span v-if="item.company" class="timeline-company-name">{{ item.company }}</span>
              </div>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <div v-if="item.tech?.length" class="timeline-tech">
              <span class="timeline-tech-label">Main tech</span>
              <ul class="timeline-tech-list">
                <li v-for="tech in item.tech" :key="tech">{{ tech }}</li>
              </ul>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { layout = 'badge' } = defineProps<{
  items: Array<{
    year: string
    title: string
    summary: string
    company?: string
    logo?: string
    tech?: string[]
  }>
  isBursting: boolean
  layout?: 'badge' | 'angled' | 'watermark'
}>()

const listEl = ref<HTMLOListElement | null>(null)

defineExpose({
  listEl
})
</script>

<style scoped>
.timeline-stage {
  position: absolute;
  left: 50%;
  bottom: calc(50% + (var(--dot-size) / 2) - 10px);
  width: min(84ch, 94vw);
  transform: translateX(-50%);
  pointer-events: none;
}

.timeline-track {
  will-change: transform;
  width: 100%;
}

.timeline-list {
  --track-gap: clamp(6rem, 13vw, 8.8rem);
  display: flex;
  flex-direction: column-reverse;
  gap: clamp(1.9rem, 3.4vw, 3rem);
  align-items: stretch;
  width: 100%;
  padding-bottom: var(--timeline-bottom-gap, 0px);
}

.timeline-row {
  display: grid;
  grid-template-columns: 1fr var(--track-gap) 1fr;
  align-items: center;
  width: 100%;
}

.timeline-item {
  --connector-length: calc(var(--track-gap) / 2);
  --connector-size: 10px;
  width: min(68ch, 98%);
  padding: clamp(1.25rem, 2.6vw, 1.7rem) clamp(1.75rem, 3.2vw, 2.3rem);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(18, 19, 22, 0.12);
  box-shadow: 0 16px 40px rgba(18, 19, 22, 0.08);
  opacity: 0;
  position: relative;
  transform: translateY(14px) scale(0.98);
}

.timeline-item > * {
  position: relative;
  z-index: 1;
}

.timeline-year-watermark {
  display: none;
  position: absolute;
  top: 0.9rem;
  right: 1.45rem;
  font-size: clamp(2.1rem, 5vw, 3.2rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(18, 19, 22, 0.07);
  line-height: 1;
  pointer-events: none;
  z-index: 0;
}

.timeline-row.is-left .timeline-item {
  grid-column: 1;
  justify-self: end;
}

.timeline-row.is-right .timeline-item {
  grid-column: 3;
  justify-self: start;
}

.timeline-item::before,
.timeline-item::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-item::before {
  width: var(--connector-length);
  height: 1px;
  background: rgba(18, 19, 22, 0.35);
}

.timeline-item::after {
  width: var(--connector-size);
  height: var(--connector-size);
  border-radius: 50%;
  background: #121316;
  box-shadow: 0 0 0 4px rgba(18, 19, 22, 0.08);
}

.timeline-row.is-left .timeline-item::before {
  right: calc(-1 * var(--connector-length));
}

.timeline-row.is-left .timeline-item::after {
  right: calc(-1 * (var(--connector-length) + (var(--connector-size) / 2)));
}

.timeline-row.is-right .timeline-item::before {
  left: calc(-1 * var(--connector-length));
}

.timeline-row.is-right .timeline-item::after {
  left: calc(-1 * (var(--connector-length) + (var(--connector-size) / 2)));
}

.timeline-stage.is-bursting .timeline-item {
  animation: itemReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--reveal-start) + (var(--item-index) * var(--reveal-step)));
}

.timeline-year {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(18, 19, 22, 0.55);
}

.timeline-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  width: 100%;
}

.timeline-company {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(18, 19, 22, 0.78);
}

.timeline-company-name {
  letter-spacing: 0.01em;
}

.timeline-stage[data-layout='badge'] .timeline-year {
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: rgba(18, 19, 22, 0.04);
  border: 1px solid rgba(18, 19, 22, 0.12);
}

.timeline-stage[data-layout='angled'] .timeline-item {
  padding-top: clamp(1.6rem, 3vw, 2rem);
}

.timeline-stage[data-layout='angled'] .timeline-year {
  position: absolute;
  top: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid rgba(18, 19, 22, 0.12);
  box-shadow: 0 8px 18px rgba(18, 19, 22, 0.08);
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  color: rgba(18, 19, 22, 0.55);
  transform: rotate(-45deg);
}

.timeline-stage[data-layout='angled'] .timeline-row.is-left .timeline-year {
  left: 1.1rem;
  transform-origin: left top;
}

.timeline-stage[data-layout='angled'] .timeline-row.is-right .timeline-year {
  right: 1.1rem;
  transform-origin: right top;
}

.timeline-stage[data-layout='watermark'] .timeline-year {
  display: none;
}

.timeline-stage[data-layout='watermark'] .timeline-year-watermark {
  display: block;
}

.timeline-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  border: 1px solid rgba(18, 19, 22, 0.12);
  padding: 4px;
  box-shadow: 0 8px 18px rgba(18, 19, 22, 0.08);
  flex: 0 0 auto;
}

.timeline-item h3 {
  margin: 0.25rem 0 0.35rem;
  font-size: 1.08rem;
}

.timeline-item p {
  margin: 0;
  color: rgba(18, 19, 22, 0.7);
}

.timeline-tech {
  margin-top: 0.85rem;
  padding-top: 0.75rem;
  border-top: 1px dashed rgba(18, 19, 22, 0.16);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.timeline-tech-label {
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(18, 19, 22, 0.5);
  font-weight: 600;
}

.timeline-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: rgba(18, 19, 22, 0.75);
}

.timeline-tech-list li {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(18, 19, 22, 0.16);
  background: rgba(18, 19, 22, 0.05);
}

@keyframes itemReveal {
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 900px) {
  .timeline-row {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    width: min(76ch, 90vw);
    grid-column: 1;
    justify-self: center;
  }

  .timeline-row.is-left .timeline-item,
  .timeline-row.is-right .timeline-item {
    grid-column: 1;
    justify-self: center;
    margin-left: auto;
    margin-right: auto;
  }

  .timeline-item::before,
  .timeline-item::after {
    display: none;
  }

  .timeline-stage[data-layout='angled'] .timeline-row.is-left .timeline-year,
  .timeline-stage[data-layout='angled'] .timeline-row.is-right .timeline-year {
    left: 1.1rem;
    right: auto;
    transform-origin: left top;
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-item {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
