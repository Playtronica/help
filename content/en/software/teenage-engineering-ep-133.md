---
title: "EP-133 K.O. II + Playtronica — TouchMe, Playtron, Biotron"
slug: teenage-engineering-ep-133
section: software
summary: "EP-133 K.O. II, EP-1320 and EP-40 are not USB hosts. Play them from a Playtronica device via a computer or a USB MIDI host box to TRS MIDI."
order: 13
segment: ["music-producer", "creator"]
deflection_target: 20
status: new-2026-11
last_edited: 2026-11-18
emoji: 🥁
parent: teenage-engineering
hide_from_nav: true
links_out: ["/software/teenage-engineering/", "/software/hardware/", "/devices/scales/"]
---

> **Part of:** [Playtronica + Teenage Engineering](/software/teenage-engineering/) — the compatibility table for every TE device.

**Short answer:** not directly over USB. EP-133 K.O. II is a USB MIDI **device**, not a host. TE's guide says "for usb midi keyboards you will need a midi host" — a computer or a dedicated MIDI host box ([EP-133 how-to](https://teenage.engineering/guides/ep-133/how-to), checked 18 Nov 2026). EP-1320 medieval and EP-40 riddim have the same note in their guides ([EP-1320](https://teenage.engineering/guides/ep-1320/how-to), [EP-40](https://teenage.engineering/guides/ep-40/how-to)). All three have **MIDI in and out on 3.5 mm TRS** jacks.

We have not tested these devices with Playtronica yet. The routes below follow TE's own instructions for MIDI keyboards.

## Route 1 — through a computer

Playtronica device → USB → computer → USB → EP-133.

<ol class="steps">
  <li><strong>Connect both the Playtronica device and the EP-133 to the computer.</strong> Both appear as MIDI devices.</li>
  <li><strong>Route MIDI from the Playtronica device to the EP-133</strong> in your DAW (a MIDI track with the Playtronica device as input and EP-133 as output) or a MIDI routing app.</li>
  <li><strong>Touch the device.</strong> The EP-133 lights its USB icon when it detects incoming notes.</li>
</ol>

## Route 2 — no computer: USB MIDI host box + TRS

Playtronica device → USB → USB MIDI host box → MIDI DIN → TRS-to-DIN cable → EP-133 MIDI in.

- A USB MIDI host box powers the Playtronica device and turns its USB MIDI into DIN MIDI — for example the CME H4MIDI WC described on our [hardware page](/software/hardware/).
- From the box's DIN output, use a **3.5 mm TRS to MIDI DIN** cable into the EP-133 MIDI in. TE says this cable may be needed "depending on your midi keyboard".
- **TRS Type A or B:** TE's EP-133 guide does not state the TRS type. Check before you buy the cable.
- The EP-133 lights its MIDI icon when it detects incoming notes.

**Scales has its own TRS MIDI output.** Scales can go straight into the EP-133 MIDI in with a 3.5 mm TRS cable, no host box — as long as both use the same TRS type. We have not tested it yet.

## Which pads play

From TE's MIDI implementation for EP-133 ([EP-133 system](https://teenage.engineering/guides/ep-133/system), checked 18 Nov 2026):

- The EP-133 receives on its basic channel, **1** by default (changeable 1–16). A setting lets it receive on all channels.
- Notes **36–47** play group A, **48–59** group B, **60–71** group C, **72–83** group D.
- TouchMe and Playtron send on channel 1. Biotron sends the plant on channel **2** and the light on channel **3** — set the EP-133 to receive all channels, or set Biotron's plant channel to 1 in [Biotron Settings](https://settings.playtronica.com/#/biotron).
- If the wrong group plays, change the device's notes or octave in [Playtronica Settings](https://settings.playtronica.com), where your device offers it, so the notes land in the group you want.
- To play one sound across many notes, TE describes a **keys** mode that plays one pad across the keyboard.

## Tips from other K.O. II users

From EP-133 owners and press, not verified by Playtronica or TE. Links checked 18 Nov 2026.

- **TRS Type A.** A detailed owner's write-up says the EP-133 MIDI jacks are Type A ([djjondent blog, Dec 2023](https://djjondent.blogspot.com/2023/12/connecting-ko-ii-to-external-gear.html)). TE's guide does not state the type.
- **"MIDI in not working" is often a Type B cable.** Owners fixed it with a Type A cable or an A/B converter (Reddit thread "KOII MIDI in not working", 2025 — we could only see a summary).
- **Sync jack ≠ MIDI.** The 3.5 mm sync jack sends pulses, not MIDI. Use the MIDI in jack for notes ([djjondent blog](https://djjondent.blogspot.com/2023/12/connecting-ko-ii-to-external-gear.html)).
- **No USB host.** [Sound On Sound's review](https://www.soundonsound.com/reviews/teenage-engineering-ep-133-ko-ii) also notes that the USB-C port works with a computer but does not host a controller.

## Frequently asked questions

<details>
<summary><strong>Can I plug a USB MIDI controller straight into EP-133 K.O. II?</strong></summary>

No. EP-133 K.O. II is not a USB host. Teenage Engineering says USB MIDI keyboards need a MIDI host — a computer or a dedicated MIDI host box. Use a host box with the EP-133's 3.5 mm TRS MIDI input, or route through a computer.
</details>

<details>
<summary><strong>How do I connect TouchMe or Playtron to EP-133 without a computer?</strong></summary>

Use a USB MIDI host box: plug the Playtronica device into its USB host port, then a TRS-to-DIN MIDI cable from the box's DIN output into the EP-133 MIDI in. Check the TRS type (A or B) of your cable. We have not tested this chain yet.
</details>

<details>
<summary><strong>Why does Biotron not play my EP-133?</strong></summary>

Biotron sends the plant on MIDI channel 2 and the light sensor on channel 3, while EP-133 listens on channel 1 by default. Set EP-133 to receive all channels, or set Biotron's plant channel to 1 in Biotron Settings.
</details>

<details>
<summary><strong>Does the same work for EP-1320 medieval and EP-40 riddim?</strong></summary>

Yes, the same routes apply: TE's guides for EP-1320 and EP-40 also say USB MIDI keyboards need a MIDI host, and both have TRS MIDI in and out. Their pad note maps may differ — check each device's guide.
</details>

<details>
<summary><strong>KO II MIDI in not working — what should I check?</strong></summary>

Make sure the cable goes into the MIDI in jack, not the sync jack, and that the TRS cable type matches. Owners report that the EP-133 uses Type A and that a Type B cable is a common cause (TE's guide does not state the type). Also check the MIDI channel: EP-133 listens on channel 1 by default; Biotron sends on channel 2.
</details>

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `EP-133 setup`, your Playtronica device and how it is connected. We aim for 24 hours, but a reply may take up to 3 business days.

## See also

- [Playtronica + Teenage Engineering — all TE devices](/software/teenage-engineering/)
- [Hardware synths, USB host boxes and TRS MIDI](/software/hardware/)
- [Scales — TRS MIDI output](/devices/scales/)
- [Biotron MIDI and CC](/software/biotron-midi-cc/)

*Teenage Engineering, K.O. II and EP-133 are trademarks of Teenage Engineering. Playtronica is not affiliated with Teenage Engineering.*
