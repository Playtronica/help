---
title: "Playtronica + Teenage Engineering — OP-Z, OP-XY, OP-1 field, EP-133 K.O. II"
slug: teenage-engineering
section: software
summary: "Which Teenage Engineering devices TouchMe, Playtron, Biotron, Scales and Orbita can play — with or without a computer, which cable or adapter, which firmware. OP-Z tested 18 Nov 2026."
order: 9
segment: ["music-producer", "creator"]
deflection_target: 30
status: new-2026-11
last_edited: 2026-11-18
emoji: 🟠
links_out: ["/software/teenage-engineering-op-z/", "/software/teenage-engineering-op-xy/", "/software/teenage-engineering-op-1-field/", "/software/teenage-engineering-ep-133/", "/software/hardware/"]
---

Every Playtronica device is a class-compliant USB MIDI controller. Some Teenage Engineering (TE) devices can take it **directly** — they power it and play its notes, no laptop. Others have no USB host port and need a computer or a small USB MIDI host box in between.

<div class="task-grid" aria-label="Choose your Teenage Engineering device">
  <a class="task-card" href="/software/teenage-engineering-op-z/"><span class="task-card__icon">🟠</span><span><strong>OP-Z</strong><small>Direct over USB-C. Tested 18 Nov 2026.</small></span></a>
  <a class="task-card" href="/software/teenage-engineering-op-xy/"><span class="task-card__icon">🎹</span><span><strong>OP-XY</strong><small>USB host per TE. Not tested by us yet.</small></span></a>
  <a class="task-card" href="/software/teenage-engineering-op-1-field/"><span class="task-card__icon">🎛</span><span><strong>OP-1 field</strong><small>USB host per TE. Not tested by us yet.</small></span></a>
  <a class="task-card" href="/software/teenage-engineering-ep-133/"><span class="task-card__icon">🥁</span><span><strong>EP-133 K.O. II · EP-1320 · EP-40</strong><small>No USB host. Computer or host box + TRS MIDI.</small></span></a>
</div>

## Compatibility at a glance

**Legend:** ✅ works, latest firmware · 🟡 should work according to TE's guide, not tested by us yet · 🔌 works through a computer or a USB MIDI host box · ❔ unknown · ❌ not possible.

| TE device | TouchMe | Playtron | Biotron | Scales | Orbita | Computer needed? |
|---|---|---|---|---|---|---|
| **[OP-Z](/software/teenage-engineering-op-z/)** | ✅ | ✅ | ✅ | ✅ | ✅ | No — USB-C data cable only |
| **[OP-XY](/software/teenage-engineering-op-xy/)** | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | No — USB-C data cable |
| **[OP-1 field](/software/teenage-engineering-op-1-field/)** | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | No — USB-C data cable |
| **[EP-133 K.O. II](/software/teenage-engineering-ep-133/)** | 🔌 | 🔌 | 🔌 | 🔌 or TRS cable | 🔌 | Yes, or a USB MIDI host box |
| **[EP-1320 medieval, EP-40 riddim](/software/teenage-engineering-ep-133/)** | 🔌 | 🔌 | 🔌 | 🔌 or TRS cable | 🔌 | Yes, or a USB MIDI host box |
| **TX-6** | ❔ | ❔ | ❔ | ❔ | ❔ | Unknown — see below |
| **OP-1 (original)** | ❔ | ❔ | ❔ | ❔ | ❔ | Unknown — see below |
| **Pocket Operators (PO-12, PO-33 …)** | ❌ | ❌ | ❌ | ❌ | ❌ | Pocket Operators have no MIDI input |

### Update to the latest firmware

Before you connect to a TE device, update your Playtronica device to the latest firmware at [settings.playtronica.com](https://settings.playtronica.com). TE devices that work as a USB host accept a device with **one** MIDI port — OP-Z's guide says devices that "present themselves as more than one midi device" are not supported ([TE OP-Z guide, USB](https://teenage.engineering/guides/op-z/usb), checked 18 Nov 2026). Older Playtronica firmware shows up as two ports; the latest shows up as one.

## What each TE device offers for an external MIDI controller

| TE device | USB host (plug a controller in directly) | Power to the controller | TRS MIDI | Source (checked 18 Nov 2026) |
|---|---|---|---|---|
| OP-Z | Yes, USB-C | Up to 100 mA; use a powered USB-C hub for more | No TRS jack | [OP-Z guide: USB](https://teenage.engineering/guides/op-z/usb) |
| OP-XY | Yes — "usb type-c audio/midi host & device" | Not stated; TE suggests a powered hub if a device needs more | Multi-out 3.5 mm jack can send MIDI (Type A) | [OP-XY hardware overview](https://teenage.engineering/guides/op-xy/hardware-overview), [OP-XY how-to](https://teenage.engineering/guides/op-xy/how-to) |
| OP-1 field | Yes — "usb midi host & device" | Not stated | No TRS jack (Bluetooth LE MIDI instead) | [OP-1 field guide, PDF](https://assets.teenage.engineering/_img/69f248938d433104c4dd1846_original.pdf) |
| EP-133 K.O. II | No — "for usb midi keyboards you will need a midi host" | — | MIDI in and out on 3.5 mm TRS | [EP-133 how-to](https://teenage.engineering/guides/ep-133/how-to) |
| EP-1320 medieval | No — same as EP-133 | — | MIDI in and out on 3.5 mm TRS | [EP-1320 how-to](https://teenage.engineering/guides/ep-1320/how-to) |
| EP-40 riddim | No — same as EP-133 | — | MIDI in and out on 3.5 mm TRS | [EP-40 how-to](https://teenage.engineering/guides/ep-40/how-to) |
| TX-6 | Not confirmed | Not stated | Not confirmed | [TX-6 guide](https://teenage.engineering/guides/tx-6) |
| OP-1 (original) | Not stated in TE's guide | — | Not stated | [OP-1 guide](https://teenage.engineering/guides/op-1/original/hardware-overview) |
| Pocket Operators | No USB or MIDI — 3.5 mm sync only | — | No | [PO-33 guide](https://teenage.engineering/guides/po-33/en) |

**TX-6 and OP-1 (original).** We could not confirm from TE's own guides whether these accept a class-compliant USB MIDI controller. Until we test them, connect through a computer. If you have tried it, [tell us](mailto:support@playtronica.com?subject=TE%20compatibility) and we will add your result.

**Pocket Operators.** Pocket Operators have no MIDI input, so a Playtronica device cannot play them directly. Use another synth or app as the sound source.

## Good to know for every TE device

- **Use a USB data cable.** A charge-only cable lights the device but carries no MIDI.
- **Turn on incoming MIDI on the TE device.** OP-Z ignores incoming notes until you enable it (Tempo + Screen, key 2).
- **Match MIDI channels.** TouchMe and Playtron send on channel 1. Biotron sends the plant on channel 2 and the light sensor on channel 3. Each device's page shows how to set the TE track channel.
- **Not detected? Try a powered USB hub.** TE's OP-Z guide says the port gives a maximum of 100 mA and recommends a good-quality powered USB-C hub for hungrier devices.

## Frequently asked questions

<details>
<summary><strong>Which Teenage Engineering devices can I play with a Playtronica device without a computer?</strong></summary>

OP-Z, OP-XY and OP-1 field have a USB host port, so a Playtronica device can plug straight in. OP-Z works with TouchMe, Playtron, Biotron, Scales and Orbita on the latest firmware (we tested it on 18 November 2026). OP-XY and OP-1 field are USB hosts according to TE, but we have not tested them yet. EP-133 K.O. II, EP-1320 and EP-40 need a computer or a USB MIDI host box.
</details>

<details>
<summary><strong>Why does my OP-Z not recognize my USB MIDI controller?</strong></summary>

OP-Z does not support devices that show up as more than one MIDI port, and it supplies at most 100 mA. OP-Z ignores older Playtronica firmware — update to the latest. Also turn on incoming MIDI (Tempo + Screen, key 2) and use a data cable.
</details>

<details>
<summary><strong>Can I connect TouchMe, Playtron or Biotron to EP-133 K.O. II?</strong></summary>

Not directly over USB — EP-133 is not a USB host. Connect the Playtronica device to a computer or a USB MIDI host box, then send MIDI to EP-133 over USB or its 3.5 mm TRS MIDI input. Our [EP-133 page](/software/teenage-engineering-ep-133/) shows both routes.
</details>

<details>
<summary><strong>Do I need an adapter to connect a Playtronica device to OP-Z or OP-XY?</strong></summary>

No adapter box is needed for OP-Z: a USB-C to USB-C data cable is enough. OP-XY is also a USB host, so the same cable should work, but we have not tested it yet. Older advice that OP-Z needs an adapter is out of date.
</details>

<details>
<summary><strong>Can a Pocket Operator be played by a MIDI controller?</strong></summary>

No. Pocket Operators have no MIDI input — only a 3.5 mm sync input. A Playtronica device cannot play them directly.
</details>

<details>
<summary><strong>Which Playtronica firmware do I need for Teenage Engineering gear?</strong></summary>

The latest firmware for your device, from settings.playtronica.com. OP-Z does not see older Playtronica firmware.
</details>

## See also

- [OP-Z + Playtronica — tested setup](/software/teenage-engineering-op-z/)
- [OP-XY + Playtronica](/software/teenage-engineering-op-xy/)
- [OP-1 field + Playtronica](/software/teenage-engineering-op-1-field/)
- [EP-133 K.O. II, EP-1320, EP-40 + Playtronica](/software/teenage-engineering-ep-133/)
- [Hardware synths, USB host boxes and TRS MIDI](/software/hardware/)
- [Biotron MIDI and CC](/software/biotron-midi-cc/)

*Teenage Engineering, OP-Z, OP-XY, OP-1 and K.O. II are trademarks of Teenage Engineering. Playtronica is not affiliated with Teenage Engineering. Facts about TE devices come from TE's official guides, linked above, checked 18 November 2026.*

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Teenage Engineering setup`, your TE device, your Playtronica device and its firmware version. We aim for 24 hours, but a reply may take up to 3 business days.
