# Playtronica Help Center — Design Tokens

*The single source of truth for the visual system. Read this once, reuse forever.*

Updated 2026-05-12. If a token gets changed here, update both `tailwind.config.ts` and any SVG that uses the old value. Don't fork tokens locally.

---

## 1 — Colour

### Brand neutrals

| Token | Value | Tailwind | Where it shows up |
|---|---|---|---|
| `ink` | `#1a1a2e` | `text-ink`, `border-ink` | All body copy, headings, SVG outlines, chip fills, callout numbers, schematic ink |
| `accent` | `#5c6bc0` | `bg-accent`, `text-accent` | Links, hero gradient start, marker callouts, status LED, primary button |
| `accent-dark` | `#3949ab` | `bg-ink2` | Hero gradient end, button hover, focused outline |
| `soft` | `#f7f8fb` | `bg-soft` | Page background, sidebar links hover background, search box rest state |
| `rule` | `#e8eaf6` | `border-rule` | All dividers, card borders, feedback widget border |

### Hardware / schematic palette

These show up on device SVGs only. Keep them consistent across the 5 device illustrations so the system reads as one family.

| Token | Value | Where |
|---|---|---|
| `pcb` | `#f6f2e7` | PCB substrate fill (the cream-white of every device base) |
| `gold` | `#c9a878` | Gold-pad fill (TouchMe pads, Playtron alligator pins) |
| `gold-stroke` | `#6f4f1e` | Stroke for gold traces / coil patterns. Darker than `gold` for legibility on top of `gold` fill |
| `chip` | `#1a1a2e` | Microcontroller chips (same value as `ink` — by design) |
| `smd` | `#b8a079` | Surface-mount passive components — slightly desaturated gold |
| `silk-tiny` | `#4a3a20` | Microscopic silkscreen text (component IDs, "v2.1", "THINGS SHOULD SOUND") |

### Status / feedback colors

For the feedback widget, alerts, success/error states. Use sparingly.

| Token | Value | Where |
|---|---|---|
| `success` | `#2e7d32` | "Was this helpful → Yes" confirmation |
| `warning` | `#ed6c02` | Holiday-delay callout, BF advisory |
| `danger` | `#c62828` | Critical bugs only (e.g. broken-URL audit findings) |

---

## 2 — Typography

### Stacks

```css
/* Body, headings, navigation, callouts */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, system-ui, sans-serif;

/* Hardware references, schematic labels, code, inline tech terms */
font-family: "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
```

Both stacks are already in `tailwind.config.ts` (`font-sans` and an inferred mono). Don't introduce a third font without a reason.

### Sizes

For HTML body / Markdown content — Tailwind defaults are fine:

| Use | Class | Size |
|---|---|---|
| H1 (page title) | `text-2xl font-extrabold` | 24 px / 700 |
| H2 (section) | `text-lg font-bold` | 18 px / 700 |
| H3 (sub-section) | `text-base font-bold` | 16 px / 700 |
| Body | `text-base` | 15 px / 1.65 line-height |
| Sub / meta | `text-sm text-gray-600` | 14 px |
| Small / nav | `text-xs` | 12 px |
| Tiny / labels | `text-[11px]` | 11 px |

For SVG schematic content — these are the working sizes in the TouchMe schematic and should propagate:

| SVG class | Size | Use |
|---|---|---|
| `.silk` | 26 px / mono / 700 | Big device silkscreen ("TOUCH ME") |
| `.silk-mid` | 14 px / mono / 700 | Brand wordmark on the board ("PLAYTRONICA") |
| `.silk-tiny` | 9 px / mono / 400 | Component IDs, revision numbers, taglines |
| `.label` | 13 px / mono / 400 | Callout label main text |
| `.label-sub` | 10 px / mono / 400 | Callout label sub text |
| `.marker-text` | 11 px / mono / 700 | Number inside the marker circle |

### Voice + tone constraints

See [`docs/VOICE.md`](VOICE.md). Typography supports the voice — don't fight it.

- Body in Inter (warm, friendly).
- Hardware/specs in JetBrains Mono (precise, engineer-honest).
- Never use a third font for "decorative" purposes.

---

## 3 — Spacing & layout

Tailwind's default 4px scale. Most spacing in the app uses these multiples:

| Value | Tailwind | Use |
|---|---|---|
| 4 px | `p-1` / `gap-1` | Inline icon-and-text gaps |
| 8 px | `p-2` / `gap-2` | Tight callout padding, chip padding |
| 12 px | `p-3` / `gap-3` | Card padding (medium) |
| 16 px | `p-4` / `gap-4` | Card padding (default), sidebar item padding |
| 20 px | `p-5` / `gap-5` | Section padding |
| 24 px | `p-6` / `gap-6` | Hero padding, large card padding |
| 32 px | `p-8` / `gap-8` | Large hero padding |

### Reading widths

| Token | Value | Use |
|---|---|---|
| `max-w-reading` | 62ch | Article body — about 62 characters per line |
| `max-w-6xl` | 1152 px | Header + footer + main shell |

Defined in `tailwind.config.ts`. Use `max-w-reading` for any long-form prose; `max-w-6xl` for the page chrome.

### Radii

| Token | Value | Use |
|---|---|---|
| `rounded` | 4 px | Small chips, code blocks |
| `rounded-md` | 6 px | Buttons, input fields, sidebar pills |
| `rounded-lg` | 8 px | Cards, callouts |
| `rounded-xl` | 12 px | Bigger panels (the troubleshooting walker) |
| `rounded-2xl` | 16 px | Homepage hero |
| `rounded-full` | 9999 px | Quick-link pills, marker circles |

---

## 4 — Repeatable components

These are the building blocks already used across the help center. Keep them consistent; add more only when a real pattern emerges.

### Numbered callout marker (SVG schematics)

Pattern used in every device illustration — a circle, an accent fill, a white monospace numeral, a thin leader line to the anchor.

```xml
<circle cx="X" cy="Y" r="13" fill="#5c6bc0"/>
<text x="X" y="Y+4" text-anchor="middle"
      font-family="JetBrains Mono" font-size="11"
      fill="#fff" font-weight="700">1</text>
<path d="M X+12 Y+8 L anchorX anchorY" stroke="#1a1a2e" stroke-width="0.6" opacity="0.72" fill="none"/>
<circle cx="anchorX" cy="anchorY" r="2" fill="#1a1a2e"/>
```

### Card (homepage / section root)

```tsx
<Link
  href={p.href}
  className="block rounded-lg border border-rule bg-white p-4 transition hover:border-accent hover:shadow"
>
  <div className="text-xl">{emoji}</div>
  <div className="mt-1 font-semibold">{title}</div>
  <div className="text-sm text-gray-500">{desc}</div>
</Link>
```

### Quick-link pill (hero)

```tsx
<Link
  href={href}
  className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white hover:bg-white/25"
>
  {label}
</Link>
```

### Callout in prose (Markdown blockquote)

Render as a soft panel. Used for "warning" / "tip" / "note" via the leading emoji + bold:

```markdown
> ⚠️ **Handle only the contacts shown in this guide.** …
> 🛠️ **Want to go deeper?** …
> 💡 **Why a specific browser?** …
```

The CSS already styles `blockquote` with rule-left + white bg + rounded right. Don't introduce custom callout components when this is enough.

### Marker badge (sidebar volume indicator)

For "1189/yr" style traffic hints in the sidebar. Use existing pattern:

```tsx
<span className="lbadge lb-hot">1189/yr</span>
```

`.lb-hot` = soft red background; `.lb-new` = soft green. Defined in the prototype's CSS, port to `globals.css` when we use this in the new build.

---

## 5 — Schematic standards (TouchMe is the canonical reference)

Apply these to the four remaining device illustrations (Playtron, Biotron, Orbita, Scales).

### Geometry

- **viewBox** wide enough to fit the device + callouts on three sides. TouchMe uses `0 0 1200 520`. Pick per-device but keep aspect ratio < 3:1 for readability.
- **Device silhouette** = a single outlined path. For TouchMe: a true **stadium** (long rectangle with semicircular end caps), uniform height — no narrowing between pads.
- **Stroke** weight 1.6 px for the device outline. Thinner (1.0 px) for internal subdivisions.
- **Gold conductive areas** drawn as a single `<circle>` with the `pad-gold` fill, with the coil pattern drawn over it inside a `clipPath`.

### The serpentine coil pattern (TouchMe / Playtron pads)

7 nested U-loops per pad. Each loop:

```xml
<path d="M outerEdge yN H innerBendStart{i}
         A 11 11 0 0 1 innerBendStart{i} yN+22
         H outerEdge" />
```

`innerBendStart` moves toward the centre by 12 px on each successive loop. This is the recognizable Playtronica capacitive-coil look — keep it consistent across device pages.

### Labels

- Labels live OUTSIDE the device silhouette, never overlapping.
- Each label has a numbered marker (see component above) connected to an anchor dot inside the device by a thin leader line.
- Two-line labels: bold-ish main label + a thin sub-line below (10 px, `#555`).

### Colour discipline

- The schematic uses **at most** 5 swatches: `pcb`, `gold`, `gold-stroke`, `ink`, `accent`. Plus white for hole fills. That's it.
- No gradients. No drop shadows. No inner glow.

### Background

- Transparent. Always. The SVG inherits the page background.
- If the schematic is exported to PNG, the PNG keeps the transparent background.

---

## 6 — Don't list

- **No emoji ladders.** Each page has at most one emoji per heading. Sidebar entries can carry one emoji prefix. Don't put 3 emojis next to each other in body copy.
- **No custom shadows.** The only shadow allowed on a card is `hover:shadow` (Tailwind default, very subtle).
- **No animations on first load** beyond the default page transition. The troubleshooting walker animates between steps; the homepage doesn't.
- **No third-party SDKs that bring their own styles.** Plausible script weights ≤1 KB and ships no CSS. Algolia, if added later, gets re-themed.

---

## 7 — Where these tokens live in code

| Asset | File | Status |
|---|---|---|
| Tailwind config | `tailwind.config.ts` | ✅ Up to date |
| Global CSS (prose, callouts) | `app/globals.css` | ✅ Up to date |
| SVG common styles | Inline `<style>` in each device SVG | ⚠️ Repeated per file. Could extract to a shared `<defs>` partial — not urgent. |
| Component examples | `components/*` | Sidebar, SearchBar, FeedbackWidget, TroubleshootingWalker — all conform |
| Voice constraints | `docs/VOICE.md` | ✅ Up to date |

Audit cadence: when adding a new device illustration or a new page type, re-read this file and confirm the new asset uses tokens not novel values. If a new token genuinely needs to exist (a new sensor color, a new mode), add it here BEFORE using it.

---

*Last revised: 2026-05. Keep this document living — when you change a token value, update the table above in the same commit.*
