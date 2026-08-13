# Device illustration method

Use this method for every labelled hardware image in the Help Center. It combines the existing visual tokens with the support team's proven requirement: simple, IKEA-like pictures that still work when a reader scans the page instead of reading every sentence.

## Source hierarchy

1. Start from a verified top-down product photo or an engineering render of the exact hardware revision.
2. Confirm every anchor against the physical device, PCB render, or board file. Never place a callout from memory.
3. Use `docs/DESIGN-TOKENS.md` for colour, type, line, spacing, and accessibility rules.
4. Use support history to decide which parts deserve emphasis. A frequent or dangerous confusion becomes a numbered step, not merely a label.

## Existing repository workflow

The current TouchMe, Playtron, and Biotron assets in
`public/illustrations/` are self-contained SVG wrappers around a verified
raster render, with SVG leader lines and text on top. Reuse that structure
when the exact source render exists. Do not redraw a board from memory and do
not treat the embedded raster as an editable board file.

The previously used verification workflow is:

1. Resolve the exact hardware revision from the unit, order, PCB filename, or
   engineering record.
2. Locate the contacts in the board file or approved render.
3. Check the anchor against the rendered pixels (the TouchMe BOOT correction
   used colour detection as a second check).
4. Record the source/revision and reviewer in the PR. The public Help repo does
   not currently contain the original board files, so the SVG alone is not
   sufficient provenance.
5. Keep the raster and SVG annotation together in one self-contained asset so
   the Help page has no external image dependency.

## One image, one job

- The overview image identifies controls and connectors.
- A procedure image explains one action as a short sequence.
- Do not make one diagram teach anatomy, setup, troubleshooting, and firmware recovery at once.
- Keep labels outside the device silhouette and keep leader lines from crossing.

## Visual grammar

- Transparent background; no decorative gradient, glow, or shadow beyond the shared subtle device shadow.
- Hardware stays photographic or diagrammatically faithful. Annotation is schematic.
- Callout marker: accent circle `#5c6bc0`, white monospace number, thin ink leader, anchor dot.
- Main label: 13 px bold monospace and supporting line: 11 px regular
  monospace are the existing 1200-unit overview-asset tokens. They are not a
  mobile readability guarantee. A safety-critical procedure needs its own
  crop/sequence with text sized for its rendered width.
- Use only the shared `pcb`, `gold`, `gold-stroke`, `ink`, `accent`, and white swatches.
- Never introduce a one-off warning colour inside a single device asset. Urgency comes from hierarchy, sequence, and wording.

## Procedure grammar

Show actions in the order the hands perform them. Each frame has one verb and one visible state change.

Example for BOOT:

1. **Bridge** the two marked contacts.
2. **Plug in USB** while the bridge is held.
3. **Release immediately** when `RPI-RP2` appears.
4. **Copy firmware** only after the bridge is removed.

The release step is mandatory once the boot drive appears. This sequence must
still be verified on the exact hardware revision. If the contacts or connector
do not match the approved image, stop and ask support rather than probing pads.

## Copy rules

- Name the visible object, then state the action: `BOOT CONTACTS — bridge → plug in USB → release immediately`.
- Avoid ambiguous verbs such as “lock the pins”. Use `bridge` or `short the two contacts`.
- Do not rely on colour, the image, or a marker number alone. Repeat the
  location and full action sequence in adjacent prose. Alt text describes the
  image; it does not replace the instructions.
- Keep the diagram language in English; translations explain the same marker numbers in article text.

## QA and Definition of Done

- Anchor positions verified against a physical unit, PCB file, or approved engineering render.
- Overview remains understandable at article width. For a safety-critical
  detail, test a dedicated crop at 360 CSS px; do not claim that a full
  1200-unit board overview with 11–13 px source labels is readable when shrunk.
- Greyscale and colour-blind-safe: marker number and geometry carry the meaning.
- SVG has a useful `<title>`, `<desc>`, and article alt text.
- The procedure and stop condition remain complete if images are disabled or
  printed in monochrome.
- At 200% browser zoom and in print preview, no instruction is clipped and the
  BOOT contacts can still be distinguished as a pair.
- No label overlaps, clipped text, crossed leaders, or raster blur at 200% zoom.
- A person unfamiliar with the device can point to the right part without reading the article.
- A procedure tester can complete the action from image plus adjacent prose and
  state when to stop bridging the contacts. Never make a destructive recovery
  depend on image-only instructions.
- Production build passes and the changed article is visually checked in-browser.

## Rollout order

1. Biotron BOOT recovery — create a revision-verified procedure crop; the
   current overview is orientation help, not proof for every sold revision.
2. TouchMe BOOT recovery — retain its already board-verified anchors; add the explicit release frame.
3. Playtron BOOT recovery.
4. Complete Orbita and Scales overview assets, which are currently missing from `public/illustrations/`.
5. Recheck all overview labels against current hardware revisions.
