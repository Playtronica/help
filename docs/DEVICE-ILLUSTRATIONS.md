# Device illustration method

Use this method for every labelled hardware image in the Help Center. It combines the existing visual tokens with the support team's proven requirement: simple, IKEA-like pictures that still work when a reader scans the page instead of reading every sentence.

## Source hierarchy

1. Start from a verified top-down product photo or an engineering render of the exact hardware revision.
2. Confirm every anchor against the physical device, PCB render, or board file. Never place a callout from memory.
3. Use `docs/DESIGN-TOKENS.md` for colour, type, line, spacing, and accessibility rules.
4. Use support history to decide which parts deserve emphasis. A frequent or dangerous confusion becomes a numbered step, not merely a label.

## One image, one job

- The overview image identifies controls and connectors.
- A procedure image explains one action as a short sequence.
- Do not make one diagram teach anatomy, setup, troubleshooting, and firmware recovery at once.
- Keep labels outside the device silhouette and keep leader lines from crossing.

## Visual grammar

- Transparent background; no decorative gradient, glow, or shadow beyond the shared subtle device shadow.
- Hardware stays photographic or diagrammatically faithful. Annotation is schematic.
- Callout marker: accent circle `#5c6bc0`, white monospace number, thin ink leader, anchor dot.
- Main label: 13 px bold monospace. Supporting line: 11 px regular monospace.
- Use only the shared `pcb`, `gold`, `gold-stroke`, `ink`, `accent`, and white swatches.
- Never introduce a one-off warning colour inside a single device asset. Urgency comes from hierarchy, sequence, and wording.

## Procedure grammar

Show actions in the order the hands perform them. Each frame has one verb and one visible state change.

Example for BOOT:

1. **Bridge** the two marked contacts.
2. **Plug in USB** while the bridge is held.
3. **Release immediately** when `RPI-RP2` appears.
4. **Copy firmware** only after the bridge is removed.

The release step is mandatory. Support history shows that users otherwise leave BOOT bridged, return straight to boot mode after copying, and reasonably conclude that flashing failed.

## Copy rules

- Name the visible object, then state the action: `BOOT CONTACTS — bridge → plug in USB → release immediately`.
- Avoid ambiguous verbs such as “lock the pins”. Use `bridge` or `short the two contacts`.
- Do not rely on colour alone. Repeat the marker number in the prose and in alt text.
- Keep the diagram language in English; translations explain the same marker numbers in article text.

## QA and Definition of Done

- Anchor positions verified against a physical unit, PCB file, or approved engineering render.
- Readable at the actual article width on desktop and at 360 px mobile width.
- Greyscale and colour-blind-safe: marker number and geometry carry the meaning.
- SVG has a useful `<title>`, `<desc>`, and article alt text.
- No label overlaps, clipped text, crossed leaders, or raster blur at 200% zoom.
- A person unfamiliar with the device can point to the right part without reading the article.
- A procedure tester can complete the action from the image alone and state when to stop holding or touching each contact.
- Production build passes and the changed article is visually checked in-browser.

## Rollout order

1. Biotron BOOT recovery — highest current support and return risk.
2. TouchMe BOOT recovery — retain its already board-verified anchors; add the explicit release frame.
3. Playtron BOOT recovery.
4. Complete Orbita and Scales overview assets, which are currently missing from `public/illustrations/`.
5. Recheck all overview labels against current hardware revisions.
