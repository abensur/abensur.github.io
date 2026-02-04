# Personal Site Timeline - Spec (Draft)

## Goal
Build a minimalist personal site centered on a pulsing anchor dot that grows into a vertical career timeline as the user scrolls. Content will be sourced from `content/timeline-final.md`.

## Experience
- A single, fixed dot sits at the visual center of the viewport.
- The dot pulses subtly and has an initial burst on load.
- As the user scrolls, a line sprouts upward from the dot, revealing milestones.
- Timeline entries alternate left/right on larger screens and stack on mobile.

## Phases
1. **Anchor & Sprout (current)**
   - Pulsing dot + burst animation.
   - Sprout line growth tied to scroll.
   - Placeholder milestones only.
2. **Timeline Layout**
   - Replace placeholders with real data from `content/timeline-final.md`.
   - Refine spacing, rhythm, and visual hierarchy.
3. **Reveal Motion**
   - Staggered milestone reveal.
   - Optional parallax or easing on sprout line.
4. **Polish**
   - Accessibility pass.
   - Reduced motion adjustments.
   - Performance tuning.

## Constraints
- Keep the layout clean and content-first.
- Respect reduced motion preferences.
- Ensure the experience works on mobile and desktop.
