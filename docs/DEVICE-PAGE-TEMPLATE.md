# Device page template

H5 documentation, 11 November 2026. Use this order for future device-page edits.
This document does not change existing articles. Follow [VOICE.md](VOICE.md) for wording.

## Section order

1. **Quick start — first sound.** Give short, numbered steps to the first sound.
   Put the browser link immediately below this heading, before the steps, when the device has its own site:
   `Prefer to play in your browser? Open [<Device> online](<device-home-url>).`
2. **What is in the box.** List only confirmed contents for the product being described.
3. **Settings and firmware.** Link to the device's settings and documented firmware instructions.
   Keep model limits explicit. Link to recovery instructions rather than inventing reset steps.
4. **If it does not work.** Link to that device's “not recognized” or “no sound” page.
   Keep the next checks concrete: cable, MIDI permission, device selection, and the device-specific instructions.
5. **Accessories and bundles.** Link to relevant shop cards; do not imply an accessory is included.
6. **Need help?** Use the support contact from [the contact page](../content/en/site/contact.md).

Include a link to the device's shop card near the introduction, as TouchMe and Playtron currently do.
The page title comes from frontmatter; do not repeat it as an H1 in the body.

## What the current pages share, and where they differ

Both [TouchMe](../content/en/devices/touchme.md) and [Playtron](../content/en/devices/playtron.md)
have an introduction, a shop link, Quick start, firmware and reset instructions, a MIDI monitor section,
accessories and bundles, related pages, community help, and a “Still stuck” support footer.

- TouchMe introduces the two-person demo and three ways to play before Quick start.
  Its browser link is immediately below Quick start. It has a separate “What is in the box” section.
- Playtron explains grounding before Quick start. Quick start already leads to Play.
  Its box contents appear in the shop callout rather than a separate section.
  “If Playtron is not playing” currently comes before firmware; reset comes after the MIDI monitor.
- TouchMe puts reset before the MIDI monitor. Both currently call the accessories section “Works great with <Device>”.
- “Need help?” is the template's closing purpose; both current pages use “Ask the community” followed by “Still stuck”.
  Keep existing support routes when applying the template.

Use [TouchMe not recognized](../content/en/troubleshooting/touchme-not-recognized.md) and
[Playtron FAQ](../content/en/troubleshooting/playtron-faq.md) for their respective troubleshooting links.
Do not restructure either page as part of this documentation change.

## Evidence rules — H3 and H6

- Box contents on the help page must match the corresponding shop card.
  If the sources disagree, record **Question: what is included in the current box?**
  Preserve both source references and request confirmation; do not choose one account as the physical fact.
  The 11 November Scales shop snapshot lists a USB-C cable, while the help page says it is not included.
  This remains an open question, not permission to change the contents list.
- Percentages and frequency claims require a dated source. Without one, omit the number and keep the useful action.
  Playtron's current “98%” and “70%” statements are not sources for repeating those claims.

## Device routes — 11 November 2026

“Home” is the agreed starting address. A settings link does not establish that its browser workflow has been tested.

| Device | Home | Settings | Shop card | Help page |
|---|---|---|---|---|
| TouchMe | [TouchMe online](https://touchme.playtronica.com/) | [TouchMe settings](https://settings.playtronica.com/#/touchme) | [TouchMe](https://shop.playtronica.com/products/touchme) | [TouchMe guide](https://help.playtronica.com/devices/touchme/) |
| Playtron | [Play](https://play.playtronica.com/) | [Playtron settings](https://settings.playtronica.com/#/playtron) | [Playtron](https://shop.playtronica.com/products/playtron) | [Playtron guide](https://help.playtronica.com/devices/playtron/) |
| Biotron | [Biotron settings](https://settings.playtronica.com/#/biotron) | [Biotron settings](https://settings.playtronica.com/#/biotron) | [Biotron](https://shop.playtronica.com/products/biotron) | [Biotron guide](https://help.playtronica.com/devices/biotron/) |
| Orbita | [Orbita guide](https://help.playtronica.com/devices/orbita/) | [Orbita settings](https://settings.playtronica.com/#/orbita), route awaiting confirmation | [Orbita](https://shop.playtronica.com/products/orbita) | [Orbita guide](https://help.playtronica.com/devices/orbita/) |
| Scales | [Scales guide](https://help.playtronica.com/devices/scales/) | [Scales settings](https://settings.playtronica.com/#/scales) | [Scales](https://shop.playtronica.com/products/scales) | [Scales guide](https://help.playtronica.com/devices/scales/) |
| MIDI Marshmellow | Help page, if M1 is adopted | No settings tool documented in the shop snapshot | [MIDI Marshmellow](https://shop.playtronica.com/products/midi-marshmellow%E2%84%A2) | Conditional: [MIDI Marshmellow guide](https://help.playtronica.com/devices/marshmellow/) |

- **B1:** Biotron's home changes to `https://biotron.playtronica.com/` only after the Biotron release and Sergey's approval.
  Until then, keep the settings address as its home; settings remains the firmware route afterwards.
- **O1:** Orbita and Scales use their help pages as home. Orbita also links to
  [WebMidiOrbita](https://playtronica.github.io/WebMidiOrbita/); the working settings route needs Sergey's confirmation.
- **M1:** Merge the Marshmellow page only if the packaging QR does not lead to working instructions.
  The QR destination and product availability have not been verified here.

Sources: the English device and contact pages in this repository; canonical shop-card URLs in the
11 November 2026 HTML snapshots (`shop.playtronica.com_products_{touchme,playtron,biotron,orbita,scales}.html`
and `shop.playtronica.com_products_midi-marshmellow_E2_84_A2.html`). The snapshots are stored outside git
under `~/ProjectData/Playtronica/aiplay/sites-integration/_snap/2026-11-11/pages/`.
