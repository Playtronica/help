---
title: "OP-XY + Playtronica — connect TouchMe, Playtron or Biotron over USB-C"
slug: teenage-engineering-op-xy
section: software
summary: "OP-XY is a USB MIDI host, so a Playtronica device should plug straight in. How to connect, which firmware to use, and where to set channels. Not tested by Playtronica yet."
order: 11
segment: ["music-producer", "creator"]
deflection_target: 20
status: new-2026-11
last_edited: 2026-11-18
emoji: 🎹
parent: teenage-engineering
hide_from_nav: true
links_out: ["/software/teenage-engineering/", "/software/teenage-engineering-op-z/", "/software/hardware/"]
---

> **Part of:** [Playtronica + Teenage Engineering](/software/teenage-engineering/) — the compatibility table for every TE device.

**Short answer:** it should work, but **we have not tested OP-XY yet**. TE lists the OP-XY USB-C port as "usb type-c audio/midi host & device" ([OP-XY hardware overview](https://teenage.engineering/guides/op-xy/hardware-overview), checked 18 Nov 2026), and its how-to plugs a MIDI keyboard straight into that port. A Playtronica device is a class-compliant USB MIDI controller, so the same connection applies.

## What you need

- An **OP-XY**.
- A **USB-C data cable** (a charge-only cable carries no MIDI).
- A Playtronica device on the **latest firmware** — update at [settings.playtronica.com](https://settings.playtronica.com).

## Connect

<ol class="steps">
  <li><strong>Connect the Playtronica device to the OP-XY USB-C port</strong> with the data cable. TE's guide says a controller "should almost immediately connect".</li>
  <li><strong>Open the devices view: press COM, then M3.</strong> Here you can turn clock, notes, other (CC), timestamp and velocity on or off per connected device (<a href="https://teenage.engineering/guides/op-xy/how-to">OP-XY how-to</a>, checked 18 Nov 2026). Make sure <strong>notes</strong> is on.</li>
  <li><strong>Touch the Playtronica device.</strong> You should hear the OP-XY.</li>
</ol>

**Not detected or not lighting up?** TE says "some devices may require extra power" and suggests a powered USB hub. TE does not publish how much current the OP-XY port supplies.

## What we do not know yet

- **Which track plays incoming notes.** TE's guide does not say which track incoming MIDI notes from a controller play on. Check what plays when you touch the device, and tell us.
- **How many MIDI ports OP-XY accepts.** OP-Z accepts a device with only one MIDI port. TE does not state a limit for OP-XY. If an older Playtronica firmware is not detected, update to the latest.
- **Current limit of the USB port.** Not published by TE.

## Scales and TRS

OP-XY's multi-out 3.5 mm jack can be set to MIDI and used with a Type A TRS-to-DIN cable — this is a MIDI **output**, for driving other synths from OP-XY. To play OP-XY from Scales, use the USB-C connection above.

## Tips from other OP-XY users

From OP-XY owners on public forums, not verified by Playtronica or TE. Links checked 18 Nov 2026.

- **Controller drops after a few seconds?** One owner fixed a USB-C controller that kept disconnecting by plugging it in switched off, while the OP-XY was on, and then powering it up ([op-forums, July 2026](https://op-forums.com/t/op-xy-and-hichord-midi-connection-not-working/31733)).
- **Hubs are hit and miss.** An owner reports that with one small hub the COM screen flashed "HOST", and with a 4-port hub only the device nearest the plug connected ([Elektronauts, Nov 2026](https://www.elektronauts.com/t/op-xy-z-user-thread/224028/7876)). Connect the Playtronica device directly first.

## Frequently asked questions

<details>
<summary><strong>Can OP-XY power and play a USB MIDI controller without a computer?</strong></summary>

Yes, according to Teenage Engineering: the OP-XY USB-C port is a MIDI host and device, and a USB MIDI keyboard can plug straight in. Some devices may need a powered USB hub. Playtronica has not tested OP-XY with TouchMe, Playtron or Biotron yet.
</details>

<details>
<summary><strong>OP-XY does not see my Playtronica device. What should I try?</strong></summary>

Use a data cable, check COM → M3 (devices view) that notes are enabled for the device, and try a powered USB hub. Update the Playtronica device to the latest firmware.
</details>

<details>
<summary><strong>Which MIDI channel should I use with OP-XY?</strong></summary>

TouchMe and Playtron send on channel 1. Biotron sends the plant on channel 2 and the light sensor on channel 3. TE's guide does not describe how OP-XY assigns incoming channels to tracks, so start with the default and check which track responds.
</details>

<details>
<summary><strong>OP-XY USB MIDI keyboard not recognized — what can I try?</strong></summary>

Check COM → M3 that the device and its notes are enabled. Try a powered USB hub (TE suggests one for devices that need extra power). Other owners suggest connecting the controller switched off and powering it up after the OP-XY is on (not verified by us).
</details>

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `OP-XY setup`, your Playtronica device and its firmware version. If you get it working, tell us — we will add your result to this page.

## See also

- [Playtronica + Teenage Engineering — all TE devices](/software/teenage-engineering/)
- [OP-Z + Playtronica — tested setup](/software/teenage-engineering-op-z/)
- [Hardware synths and USB host boxes](/software/hardware/)

*Teenage Engineering and OP-XY are trademarks of Teenage Engineering. Playtronica is not affiliated with Teenage Engineering.*
