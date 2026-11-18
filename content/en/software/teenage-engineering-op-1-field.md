---
title: "OP-1 field + Playtronica — play OP-1 field with TouchMe, Playtron or Biotron"
slug: teenage-engineering-op-1-field
section: software
summary: "OP-1 field is a USB MIDI host and accepts class-compliant controllers. How to connect a Playtronica device, check it in the MIDI monitor, and what is not confirmed yet. Not tested by Playtronica yet."
order: 12
segment: ["music-producer", "creator"]
deflection_target: 20
status: new-2026-11
last_edited: 2026-11-18
emoji: 🎛
parent: teenage-engineering
hide_from_nav: true
links_out: ["/software/teenage-engineering/", "/software/teenage-engineering-op-z/", "/software/hardware/"]
---

> **Part of:** [Playtronica + Teenage Engineering](/software/teenage-engineering/) — the compatibility table for every TE device.

**Short answer:** it should work, but **we have not tested OP-1 field yet**. TE's guide lists the USB-C port as "usb midi host & device", and its MIDI monitor lets you "connect a class-compliant usb midi device" ([OP-1 field guide, PDF, firmware 1.7.0](https://assets.teenage.engineering/_img/69f248938d433104c4dd1846_original.pdf), checked 18 Nov 2026). Every Playtronica device is a class-compliant USB MIDI device.

## What you need

- An **OP-1 field**.
- A **USB-C data cable**.
- A Playtronica device on the **latest firmware** — update at [settings.playtronica.com](https://settings.playtronica.com).

## Connect and check

<ol class="steps">
  <li><strong>Connect the Playtronica device to the OP-1 field USB-C port.</strong></li>
  <li><strong>Open the COM screen.</strong> TE's guide says it can "list and control any connected usb / ble midi devices". Your Playtronica device should appear there.</li>
  <li><strong>Open the MIDI monitor</strong> and touch the device. You should see notes arrive.</li>
  <li><strong>Pick a synth or drum engine and play.</strong></li>
</ol>

**Hearing noise?** TE's COM screen has a setting to turn USB charging on or off, which TE suggests to remove noise.

## What we do not know yet

- **Power.** TE does not publish how much current the OP-1 field USB port supplies to a connected device. If the Playtronica device does not light up, try a powered USB hub.
- **Number of MIDI ports.** TE does not state a port limit for OP-1 field. The latest Playtronica firmware is the safe choice.
- **Channels.** TE describes outgoing MIDI channel and filters, but not how incoming channels map to engines. TouchMe and Playtron send on channel 1; Biotron on channel 2 (plant) and 3 (light).

There is no TRS MIDI jack on OP-1 field — MIDI goes over USB-C or Bluetooth LE.

## Tips from other OP-1 field users

From OP-1 field owners on public forums, not verified by Playtronica or TE. Links checked 18 Nov 2026.

- **Power is limited.** An owner reports a power-hungry device shutting down under load when powered from the OP-1 field; a powered hub or power bank solved it ([Polyend forum, Nov 2024](https://backstage.polyend.com/t/play-with-op-1-field-and-widi-jack/8310)).
- **Charging and USB MIDI at the same time is tricky** — there is only one USB-C port. Owners use a powered hub or a two-port power bank ([op-forums, 2024](https://op-forums.com/t/op-1-field-both-power-and-midi-over-usb-c/25896)).
- **Connect in this order:** controller off, OP-1 field on, then switch the controller on — reported to help with flaky connections ([op-forums, July 2026](https://op-forums.com/t/op-xy-and-hichord-midi-connection-not-working/31733)).

## Frequently asked questions

<details>
<summary><strong>Is OP-1 field a USB MIDI host?</strong></summary>

Yes. Teenage Engineering lists the OP-1 field USB-C port as a USB MIDI host and device, and its MIDI monitor accepts class-compliant USB MIDI devices. Playtronica devices are class-compliant, so they should work. We have not tested this combination yet.
</details>

<details>
<summary><strong>OP-1 field does not show my Playtronica device. What should I try?</strong></summary>

Use a USB-C data cable, check the COM screen for the device, and try a powered USB hub. Update the Playtronica device to the latest firmware.
</details>

<details>
<summary><strong>Can I play OP-1 field with a plant?</strong></summary>

Yes, with Biotron: Biotron turns the plant's signal into MIDI notes. Connect Biotron to the OP-1 field USB-C port. Biotron sends the plant on MIDI channel 2 by default. We have not tested OP-1 field with Biotron yet — tell us how it goes.
</details>

<details>
<summary><strong>Can I charge OP-1 field and use a USB MIDI controller at the same time?</strong></summary>

OP-1 field has one USB-C port. Owners on public forums use a powered USB hub or a power bank with two outputs (not verified by us). TE's COM screen also lets you turn USB charging on or off.
</details>

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `OP-1 field setup`, your Playtronica device and its firmware version.

## See also

- [Playtronica + Teenage Engineering — all TE devices](/software/teenage-engineering/)
- [OP-Z + Playtronica — tested setup](/software/teenage-engineering-op-z/)
- [Hardware synths and USB host boxes](/software/hardware/)

*Teenage Engineering and OP-1 are trademarks of Teenage Engineering. Playtronica is not affiliated with Teenage Engineering.*
