<template>
  <section
    id="selected-work"
    class="showcase-roots"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="showcase-title"
  >
    <div ref="sentinelEl" class="showcase-sentinel" aria-hidden="true"></div>

    <header class="showcase-header">
      <h2 id="showcase-title">Selected Work</h2>
      <p>A few things I'm proud of across open source, experiments, and product work.</p>
    </header>

    <div class="showcase-grid">
      <div
        v-for="(row, rowIndex) in rows"
        :key="`row-${rowIndex}`"
        class="showcase-row"
        :class="{ 'has-left': !!row[0], 'has-right': !!row[1] }"
        :style="{ '--row-index': rowIndex }"
      >
        <article
          v-if="row[0]"
          class="showcase-card is-left"
          :data-type="row[0].type"
          :style="{ '--item-index': rowIndex * 2 }"
        >
          <div class="showcase-card-head">
            <Icon class="showcase-card-icon" :name="typeMeta[row[0].type].icon" aria-hidden="true" />
            <span class="showcase-card-type">{{ typeMeta[row[0].type].label }}</span>
          </div>
          <h3>{{ row[0].title }}</h3>
          <p>{{ row[0].description }}</p>
          <span v-if="row[0].placeholder" class="showcase-card-cta is-muted">Coming soon</span>
          <NuxtLink
            v-else
            class="showcase-card-cta"
            :to="row[0].href || '#'"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            View
            <Icon class="showcase-card-cta-icon" name="lucide:arrow-up-right" aria-hidden="true" />
          </NuxtLink>
        </article>

        <div class="showcase-branch-gap" aria-hidden="true"></div>

        <article
          v-if="row[1]"
          class="showcase-card is-right"
          :data-type="row[1].type"
          :style="{ '--item-index': rowIndex * 2 + 1 }"
        >
          <div class="showcase-card-head">
            <Icon class="showcase-card-icon" :name="typeMeta[row[1].type].icon" aria-hidden="true" />
            <span class="showcase-card-type">{{ typeMeta[row[1].type].label }}</span>
          </div>
          <h3>{{ row[1].title }}</h3>
          <p>{{ row[1].description }}</p>
          <span v-if="row[1].placeholder" class="showcase-card-cta is-muted">Coming soon</span>
          <NuxtLink
            v-else
            class="showcase-card-cta"
            :to="row[1].href || '#'"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            View
            <Icon class="showcase-card-cta-icon" name="lucide:arrow-up-right" aria-hidden="true" />
          </NuxtLink>
        </article>

        <span v-if="row[0]" class="showcase-node is-left" aria-hidden="true"></span>
        <span v-if="row[1]" class="showcase-node is-right" aria-hidden="true"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ShowcaseItem } from '~/data/showcase'

const props = defineProps<{
  items: ShowcaseItem[]
  isVisible: boolean
}>()

const sentinelEl = ref<HTMLElement | null>(null)

const typeMeta: Record<ShowcaseItem['type'], { label: string; icon: string }> = {
  repo: { label: 'Repository', icon: 'lucide:github' },
  npm: { label: 'NPM Package', icon: 'lucide:package' },
  codepen: { label: 'CodePen Pen', icon: 'lucide:codepen' },
  webapp: { label: 'Web App', icon: 'lucide:globe' },
  writing: { label: 'Writing', icon: 'lucide:file-text' },
  favorite: { label: 'Favorite', icon: 'lucide:star' },
  vscode: { label: 'VS Code Extension', icon: 'lucide:plug' },
  cli: { label: 'CLI Tool', icon: 'lucide:terminal' },
  workflow: { label: 'Workflow', icon: 'lucide:git-branch' }
}

const rows = computed(() => {
  const chunked: ShowcaseItem[][] = []
  for (let i = 0; i < props.items.length; i += 2) {
    chunked.push(props.items.slice(i, i + 2))
  }
  return chunked
})

defineExpose({
  sentinelEl
})
</script>

<style scoped>
.showcase-roots {
  --root-gap: clamp(120px, 18vw, 200px);
  --branch-inset: 16px;
  --root-line: rgba(18, 19, 22, 0.28);
  position: absolute;
  left: 50%;
  top: calc(50% + (var(--dot-size) / 2) - 10px + var(--showcase-offset));
  transform: translate(-50%, 12px);
  width: min(92ch, 94vw);
  display: grid;
  gap: clamp(1.2rem, 2.5vw, 1.8rem);
  text-align: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 420ms ease, transform 420ms ease;
  z-index: 2;
}

.showcase-roots.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
  pointer-events: auto;
}

.showcase-sentinel {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.showcase-header {
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  color: rgba(18, 19, 22, 0.78);
}

.showcase-header h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
}

.showcase-header p {
  margin: 0;
  max-width: 56ch;
  color: rgba(18, 19, 22, 0.6);
}

.showcase-grid {
  position: relative;
  display: grid;
  gap: clamp(1.4rem, 3.4vw, 2.2rem);
  padding-top: 0.8rem;
}

.showcase-grid::before {
  content: '';
  position: absolute;
  top: 0.2rem;
  bottom: 0.2rem;
  left: 50%;
  width: 2px;
  background: linear-gradient(180deg, rgba(18, 19, 22, 0.08), rgba(18, 19, 22, 0.35));
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 640ms cubic-bezier(0.16, 1, 0.3, 1);
}

.showcase-grid::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -40%);
  border-radius: 50%;
  background: #121316;
  box-shadow: 0 0 0 6px rgba(18, 19, 22, 0.08);
  opacity: 0;
  transition: opacity 320ms ease 180ms;
}

.showcase-roots.is-visible .showcase-grid::before {
  transform: scaleY(1);
}

.showcase-roots.is-visible .showcase-grid::after {
  opacity: 1;
}

.showcase-row {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--root-gap) minmax(0, 1fr);
  gap: 0;
  align-items: center;
}

.showcase-row::before,
.showcase-row::after {
  content: '';
  position: absolute;
  top: 50%;
  height: 1px;
  background: var(--root-line);
  z-index: 1;
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(180ms + (var(--row-index) * 120ms));
}

.showcase-row::before {
  left: 50%;
  width: calc(50% - (var(--root-gap) / 2) - var(--branch-inset));
}

.showcase-row::after {
  right: 50%;
  width: calc(50% - (var(--root-gap) / 2) - var(--branch-inset));
  transform-origin: right;
}

.showcase-row:not(.has-left)::before,
.showcase-row:not(.has-right)::after {
  display: none;
}

.showcase-roots.is-visible .showcase-row::before,
.showcase-roots.is-visible .showcase-row::after {
  transform: scaleX(1);
}

.showcase-node {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #121316;
  box-shadow: 0 0 0 4px rgba(18, 19, 22, 0.08);
  z-index: 3;
  transform: translate(-50%, -50%) scale(0.6);
  opacity: 0;
  transition: opacity 320ms ease, transform 320ms ease;
  transition-delay: calc(220ms + (var(--row-index) * 120ms));
}

.showcase-node.is-left {
  left: calc(50% - (var(--root-gap) / 2) - var(--branch-inset));
}

.showcase-node.is-right {
  left: calc(50% + (var(--root-gap) / 2) + var(--branch-inset));
}

.showcase-roots.is-visible .showcase-node {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.showcase-card {
  position: relative;
  padding: clamp(1.1rem, 2.4vw, 1.6rem) clamp(1.4rem, 2.8vw, 2rem);
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid rgba(18, 19, 22, 0.12);
  box-shadow: 0 16px 36px rgba(18, 19, 22, 0.08);
  display: grid;
  gap: 0.6rem;
  z-index: 2;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 420ms ease, transform 420ms ease;
  transition-delay: calc(220ms + (var(--item-index) * 90ms));
}

.showcase-roots.is-visible .showcase-card {
  opacity: 1;
  transform: translateY(0);
}

.showcase-card::before {
  content: '';
  position: absolute;
  left: 0.7rem;
  top: 0.9rem;
  width: 4px;
  height: calc(100% - 1.8rem);
  border-radius: 999px;
  background: var(--card-accent, rgba(18, 19, 22, 0.4));
  opacity: 0.5;
}

.showcase-card.is-left {
  grid-column: 1;
}

.showcase-card.is-right {
  grid-column: 3;
}

.showcase-branch-gap {
  grid-column: 2;
  height: 100%;
}

.showcase-card-head {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(18, 19, 22, 0.6);
}

.showcase-card-icon {
  width: 16px;
  height: 16px;
  color: var(--card-accent, rgba(18, 19, 22, 0.75));
}

.showcase-card h3 {
  margin: 0;
  font-size: 1.08rem;
  color: #121316;
}

.showcase-card p {
  margin: 0;
  color: rgba(18, 19, 22, 0.68);
}

.showcase-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--card-accent, #121316);
}

.showcase-card-cta.is-muted {
  color: rgba(18, 19, 22, 0.4);
}

.showcase-card-cta-icon {
  width: 14px;
  height: 14px;
}

.showcase-card[data-type='repo'] {
  --card-accent: #1f2937;
}

.showcase-card[data-type='npm'] {
  --card-accent: #c12127;
}

.showcase-card[data-type='codepen'] {
  --card-accent: #111827;
}

.showcase-card[data-type='webapp'] {
  --card-accent: #2563eb;
}

.showcase-card[data-type='writing'] {
  --card-accent: #b45309;
}

.showcase-card[data-type='vscode'] {
  --card-accent: #0284c7;
}

.showcase-card[data-type='cli'] {
  --card-accent: #0f172a;
}

.showcase-card[data-type='workflow'] {
  --card-accent: #16a34a;
}

.showcase-card[data-type='favorite'] {
  --card-accent: #e11d48;
}

@media (max-width: 900px) {
  .showcase-roots {
    text-align: left;
    padding-bottom: clamp(2rem, 8vw, 4rem);
  }

  .showcase-header {
    justify-items: start;
  }

  .showcase-grid {
    gap: clamp(1.4rem, 3vw, 2rem);
  }

  .showcase-grid::before,
  .showcase-grid::after,
  .showcase-row::before,
  .showcase-row::after {
    display: none;
  }

  .showcase-node {
    display: none;
  }

  .showcase-row {
    grid-template-columns: 1fr;
    gap: clamp(1.4rem, 3vw, 2rem);
  }

  .showcase-card.is-left,
  .showcase-card.is-right {
    grid-column: 1;
  }

  .showcase-branch-gap {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .showcase-roots,
  .showcase-grid::before,
  .showcase-grid::after,
  .showcase-row::before,
  .showcase-row::after,
  .showcase-card {
    transition: none;
  }
}
</style>
