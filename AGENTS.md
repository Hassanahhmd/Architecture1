# Engineering rules for this repository

Copied from the owner's rebuild brief (section 10). They are non-negotiable.

## Performance and re-render discipline
- Measure before memoizing: never add `useMemo`, `useCallback` or `React.memo` blindly. Verify wasted re-renders with react-scan first, and memoize only expensive computations or referentially sensitive props.
- Derive state during render: never use `useEffect` to sync derived state or respond to user interactions. Compute derived values inline and keep interaction logic in event handlers.
- Eliminate waterfalls and bloat: parallelize independent async calls (`Promise.all`), avoid barrel-file imports, and lazy-load heavy routes or charts.
- Virtualize large datasets: any list or grid above about 50 to 100 items must use `@tanstack/react-virtual`. Not needed at the current scale.

## State management
- Granular selectors only: subscribe to narrow slices, never the whole store.
- Transient updates: for high-frequency values (scroll position, pointer coordinates, drag offsets, 60 fps canvas values) use refs or motion values, not React state.

## UI architecture and design system
- Reuse before building: check `src/components/ui/` before creating a primitive.
- Extend shadcn/ui and Radix components through wrappers and `cva()` variants instead of modifying base primitives or writing custom modals and popovers.
- Styling and tokens: Tailwind utilities merged with `cn()`. No inline style for static styling and no hard-coded hex colours; use semantic CSS variables.
- Accessibility by default: keep the keyboard navigation, focus trapping and ARIA that Radix provides. Never suppress focus rings without a visible `:focus-visible` alternative.

## Motion and 3D
- GPU-composited properties only: animate `transform` and `opacity`. Never animate `width`, `height`, `top`, `left` or `margin`.
- Wrap conditional unmounts in `<AnimatePresence>` with unique keys; respect `prefers-reduced-motion`.
- Three.js: never call `setState` inside `useFrame`. Mutate refs directly each frame, and dispose geometries, materials and textures on unmount.

## Next.js specifics
- Server Components by default. Use `'use client'` only on interactive leaves.
- Dynamically import heavy client features. `next/image` and `next/font` everywhere.
- No third-party embed loads without a click-to-load facade.

## Verification before finishing any task
- Run `npm run typecheck && npm run lint && npm test && npm run build`.
- Confirm no new `useEffect` was added for derived state or event handling.
- Confirm every new UI component uses existing design tokens and `cn()`.
