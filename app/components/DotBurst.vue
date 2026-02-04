<template>
  <div ref="rootEl" class="dot-center" :class="{ 'is-bursting': isBursting, 'is-ready': isReady }" aria-hidden="true">
    <span class="sprout-line"></span>
    <span class="sprout-tail"></span>
    <span class="dot-core" @animationend="emitPulseEnd"></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  isBursting: boolean
  isReady: boolean
}>()

const emit = defineEmits<{
  'pulse-end': []
}>()

const rootEl = ref<HTMLElement | null>(null)

const emitPulseEnd = () => {
  emit('pulse-end')
}

defineExpose({
  rootEl
})
</script>

<style scoped>
.dot-center {
  --line-anchor: calc(50% + (var(--dot-size) / 2) - 10px);
  position: relative;
  width: calc(var(--dot-size) * 3);
  height: calc(var(--dot-size) * 3);
  pointer-events: none;
  opacity: 0;
  transition: opacity 240ms ease;
  will-change: transform;
}

.dot-center.is-ready {
  opacity: 1;
}

.sprout-line,
.sprout-tail {
  position: absolute;
  left: 50%;
  width: 2px;
  height: 0;
  transform: translateX(-50%);
  box-shadow: 0 0 20px var(--accent-soft);
  border-radius: 999px;
  opacity: 0;
  will-change: height;
}

.sprout-line {
  bottom: var(--line-anchor);
  background: linear-gradient(180deg, rgba(18, 19, 22, 0) 0%, var(--accent) 70%);
}

.sprout-tail {
  top: calc(100% - var(--line-anchor));
  background: linear-gradient(180deg, var(--accent) 0%, rgba(18, 19, 22, 0) 80%);
}

.dot-center.is-bursting .sprout-line {
  opacity: 1;
  animation: lineGrow var(--line-duration) var(--line-ease) forwards;
}

.dot-center.is-bursting .sprout-tail {
  opacity: 1;
  animation: tailGrow var(--line-duration) var(--line-ease) forwards;
}

.dot-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--dot-size);
  height: var(--dot-size);
  transform: translate(-50%, -50%);
  background: var(--accent);
  border-radius: 50%;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.35), 0 0 22px rgba(255, 122, 89, 0.4);
  animation: none;
  transition: transform 520ms ease, opacity 520ms ease;
  transition-delay: 120ms;
}

.dot-center.is-ready .dot-core {
  animation: suspensePulse 6.2s cubic-bezier(0.2, 0.7, 0.1, 1) forwards;
}

.dot-center.is-bursting .dot-core {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.2);
}

@keyframes suspensePulse {
  0% {
    transform: translate(-50%, -50%) scale(0.55);
    border-radius: 50%;
  }
  10% {
    transform: translate(-50%, -50%) scale(1.18);
    border-radius: 68% 32% 54% 46% / 36% 70% 30% 64%;
  }
  20% {
    transform: translate(-50%, -50%) scale(0.72);
    border-radius: 50%;
  }
  38% {
    transform: translate(-50%, -50%) scale(1.22);
    border-radius: 74% 26% 40% 60% / 62% 28% 72% 38%;
  }
  50% {
    transform: translate(-50%, -50%) scale(0.78);
    border-radius: 50%;
  }
  66% {
    transform: translate(-50%, -50%) scale(1.3);
    border-radius: 70% 30% 62% 38% / 58% 34% 66% 42%;
  }
  74% {
    transform: translate(-50%, -50%) scale(0.56);
    border-radius: 50%;
  }
  86% {
    transform: translate(-50%, -50%) scale(0.54);
  }
  88% {
    transform: translate(-50%, -50%) scale(0.52) translate(2px, -2px) rotate(-1deg);
  }
  90% {
    transform: translate(-50%, -50%) scale(0.53) translate(-2px, 1px) rotate(1deg);
  }
  92% {
    transform: translate(-50%, -50%) scale(0.55) translate(3px, 2px) rotate(-2deg);
  }
  94% {
    transform: translate(-50%, -50%) scale(0.54) translate(-3px, -1px) rotate(2deg);
  }
  96% {
    transform: translate(-50%, -50%) scale(0.53) translate(3px, -2px) rotate(-1deg);
  }
  98% {
    transform: translate(-50%, -50%) scale(0.53) translate(-2px, 3px) rotate(1deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(0.54);
    border-radius: 50%;
  }
}

@keyframes lineGrow {
  0% {
    height: 0;
    opacity: 0.1;
  }
  12% {
    opacity: 1;
  }
  100% {
    height: var(--line-height);
    opacity: 1;
  }
}

@keyframes tailGrow {
  0% {
    height: 0;
    opacity: 0.1;
  }
  12% {
    opacity: 1;
  }
  100% {
    height: var(--line-tail);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot-core {
    animation: none;
    transition: none;
  }

  .sprout-line {
    height: var(--line-height);
    opacity: 1;
    animation: none;
  }

  .sprout-tail {
    height: var(--line-tail);
    opacity: 1;
    animation: none;
  }
}
</style>
