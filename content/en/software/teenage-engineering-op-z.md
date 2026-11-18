---
title: "OP-Z + Playtronica — play OP-Z with a plant, fruit or touch, no computer"
slug: teenage-engineering-op-z
section: software
summary: "Plug TouchMe, Playtron or Biotron straight into the OP-Z USB-C port. OP-Z powers the device and plays its MIDI — no laptop, no adapter box. Tested 18 Nov 2026."
order: 10
segment: ["music-producer", "creator"]
deflection_target: 30
status: new-2026-11
last_edited: 2026-11-18
emoji: 🟠
parent: teenage-engineering
hide_from_nav: true
links_out: ["/software/teenage-engineering/", "/software/hardware/", "/devices/biotron/"]
---

> **Part of:** [Playtronica + Teenage Engineering](/software/teenage-engineering/) — the compatibility table for every TE device.

**Short answer:** yes. OP-Z works as a USB host — TE's guide says you can "connect usb devices directly into the usb-c port" ([TE OP-Z guide: USB](https://teenage.engineering/guides/op-z/usb), checked 18 Nov 2026). Plug [TouchMe](/devices/touchme/), [Playtron](/devices/playtron/), [Biotron](/devices/biotron/) straight into the OP-Z USB-C port with a USB-C data cable. OP-Z powers the device and plays the notes on its own tracks. No computer and no adapter are needed — just update the Playtronica device to the **latest firmware** first.

We tested this on 18 November 2026 with an OP-Z, Biotron, Playtron, TouchMe and TouchMe Love on the latest firmware. All of them powered up, played and kept playing after unplugging and plugging back in. Scales and Orbita should work the same way — we are testing them now.

## What you need

- An **OP-Z**.
- A **USB-C to USB-C data cable**. A charge-only cable lights the device but carries no MIDI.
- A Playtronica device on the **latest firmware** — TouchMe, Playtron or Biotron. [Scales](/devices/scales/) and [Orbita](/devices/orbita/) should work too; we are testing them.

> ⚠️ **Update the firmware first.** Older Playtronica firmware shows up as two MIDI ports. Computers do not mind, but TE's guide says devices that show up as more than one MIDI device are "currently … not supported by the OP-Z". The latest firmware shows up as one port. Update at [settings.playtronica.com](https://settings.playtronica.com).

## Set up OP-Z to receive MIDI

OP-Z keeps its MIDI options under **Tempo + Screen**: each option is one of the white keys 1–8 ([TE OP-Z guide: MIDI](https://teenage.engineering/guides/op-z/midi), checked 18 Nov 2026). For a Playtronica device you only need keys 1 and 2.

<ol class="steps">
  <li><strong>Hold Tempo and press Screen.</strong> You are now in the MIDI settings.</li>
  <li><strong>Turn on incoming MIDI — key 2.</strong> Without it, OP-Z ignores every note from the Playtronica device.</li>
  <li><strong>Optional: turn on "channel one to active" — key 1.</strong> Notes on MIDI channel 1 then play whichever track you have selected, so you can switch sounds by switching tracks.</li>
  <li><strong>Leave the settings screen.</strong></li>
  <li><strong>Plug the Playtronica device into the OP-Z USB-C port.</strong> The device lights up. Touch it — you should hear OP-Z.</li>
</ol>

## Choose which OP-Z track plays

OP-Z routes MIDI by channel. Each track listens on its own channel, and channel 1 can follow the selected track.

- **Change the channel of a track:** hold that track's button and turn the **green** knob (MIDI channel 1–16, per TE's guide).
- **Change the sound on a track:** hold the track button and press a white key to pick a preset.
- **Play whatever track is selected:** turn on "channel one to active" (Tempo + Screen, key 1) and send on channel 1.

### Which channel each Playtronica device sends on

| Device | Default MIDI channel | What it plays on OP-Z by default |
|---|---|---|
| **TouchMe** | 1 | Track 1, or the selected track with "channel one to active" |
| **Playtron** | 1 | Track 1, or the selected track with "channel one to active" |
| **Biotron** | 2 (plant), 3 (light) | Track 2 (plant). Light notes go to track 3 |
| **Scales, Orbita** | See the device's Settings | The track on that channel |

**Biotron tip.** Biotron's plant signal is on channel **2** by default, so out of the box it plays OP-Z track 2. To make the plant follow the selected track, set the plant channel to **1** in [Biotron Settings](https://settings.playtronica.com/#/biotron) and turn on "channel one to active". To keep channel 2, set the track you want to MIDI channel 2 instead (hold the track button, turn the green knob).

## Worked example — a plant plays OP-Z

1. Biotron on the latest firmware, plant channel set to 1.
2. On OP-Z: Tempo + Screen → key 2 (MIDI in) and key 1 (channel one to active).
3. Biotron → USB-C data cable → OP-Z.
4. Select the Lead track. The plant plays the lead sound. Select another track and the plant switches to that sound.

## Known issues

- **TouchMe notes sometimes hang on OP-Z.** In our test a TouchMe note occasionally kept sounding until the next touch. On a computer the same TouchMe sends every note-off correctly, so we are still looking into it. If you see this, email us your TouchMe firmware version — it helps us find the cause.
- **Through a USB hub.** In our test Biotron was not detected through one unpowered USB 2.0 hub — connect directly. TE says OP-Z "should work with any high quality powered usb-c hub" and warns that hubs with network or HDMI ports may draw too much power.
- **Power limit.** OP-Z supplies at most 100 mA over USB (TE guide). Biotron and TouchMe ask for exactly 100 mA, so they run directly. If something does not light up, use a powered USB-C hub.

## Tips from other OP-Z users

These come from OP-Z owners on public forums, not from Playtronica or TE. We have not verified them. Links checked 18 Nov 2026.

- **Try the other power-up order.** In our test, plugging into a running OP-Z worked every time. For other controllers, owners report it the other way round too: one connected only when plugged in before switching OP-Z on, another only the opposite way ([op-forums, 2019](https://op-forums.com/t/compatible-midi-keyboards-that-work-direct-from-the-op-z/13428), [op-forums, 2021](https://op-forums.com/t/still-cant-connect-nanokey-studio-to-op-z/8083)). If it does not connect, try both.
- **Hungry controllers drain the OP-Z battery.** Owners report that bigger keyboards work but empty the battery noticeably faster ([op-forums, 2019](https://op-forums.com/t/compatible-midi-keyboards-that-work-direct-from-the-op-z/13428)).
- **Two controllers on one fixed channel play the same track.** Through a hub, two devices on the same channel reach only one track; owners change one device's channel ([op-forums, 2019](https://op-forums.com/t/are-there-changing-midi-channel-devices/16218)). With Playtronica, set a different channel per device in [Settings](https://settings.playtronica.com).
- **Silence after it worked before?** A track muted for MIDI (track key pressed in the MIDI settings) stays silent ([op-forums MIDI thread](https://op-forums.com/t/op-z-midi-thread/7733)). TE's guide confirms track keys there "mute all midi on the corresponding track".
- **Not every USB-C adapter passes MIDI.** One owner found a video adapter carried no MIDI ([op-forums MIDI thread](https://op-forums.com/t/op-z-midi-thread/7733)). Use a plain USB-C data cable.

## Frequently asked questions

<details>
<summary><strong>Can I plug TouchMe, Playtron or Biotron straight into OP-Z without a computer?</strong></summary>

Yes. OP-Z is a USB host: plug the device into the OP-Z USB-C port with a data cable. OP-Z powers it and plays its MIDI. Update the device to the latest firmware first. We tested TouchMe, Playtron and Biotron with OP-Z on 18 November 2026; Scales and Orbita should work too, we are testing them.
</details>

<details>
<summary><strong>Do I need an adapter or a USB host box for OP-Z?</strong></summary>

No. A USB-C to USB-C data cable is enough. OP-Z provides the power and reads the MIDI itself. A USB host box such as the CME H4MIDI WC is only needed for synths without a USB host port.
</details>

<details>
<summary><strong>OP-Z does not react to my Playtronica device. What should I check?</strong></summary>

Check three things. First, the firmware: update to the latest — OP-Z ignores older Playtronica firmware. Second, incoming MIDI must be on (hold Tempo, press Screen, key 2). Third, the cable must carry data, not only charge. Also check that the track you are listening to is on the channel the device sends on.
</details>

<details>
<summary><strong>Why does Biotron play the second OP-Z track?</strong></summary>

Biotron sends the plant signal on MIDI channel 2 by default (and the light sensor on channel 3). OP-Z plays channel 2 on track 2. Set the plant channel to 1 in Biotron Settings and turn on "channel one to active" if you want the plant to play the selected track.
</details>

<details>
<summary><strong>How do I make the Playtronica device play the selected OP-Z track?</strong></summary>

Hold Tempo, press Screen, and turn on key 1 ("channel one to active"). Then send on MIDI channel 1. TouchMe and Playtron already send on channel 1; Biotron needs its plant channel set to 1.
</details>

<details>
<summary><strong>Will OP-Z drain its battery faster with a Playtronica device plugged in?</strong></summary>

OP-Z powers the device from its own battery, so expect shorter playing time. Biotron and TouchMe ask OP-Z for 100 mA over USB — the maximum OP-Z supplies, according to TE. We have not measured battery life yet.
</details>

<details>
<summary><strong>OP-Z not recognizing USB MIDI controller — what are the common causes?</strong></summary>

From TE's guide: the device needs more than the 100 mA OP-Z supplies, or it shows up as more than one MIDI port. From our test: update the Playtronica device to the latest firmware. From other owners (not verified by us): try plugging in before and after switching OP-Z on, and use a plain data cable rather than an adapter with video or network ports.
</details>

<details>
<summary><strong>Can OP-Z power a USB MIDI device?</strong></summary>

Yes, up to 100 mA according to TE. That is enough for TouchMe, Playtron and Biotron in our test. Devices that need more require a powered USB-C hub.
</details>

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `OP-Z setup`, your Playtronica device, its firmware version (shown in [Settings](https://settings.playtronica.com)) and what OP-Z does. We aim for 24 hours, but a reply may take up to 3 business days.

## See also

- [Playtronica + Teenage Engineering — all TE devices](/software/teenage-engineering/)
- [OP-XY + Playtronica](/software/teenage-engineering-op-xy/)
- [Biotron — complete guide](/devices/biotron/) · [TouchMe](/devices/touchme/) · [Playtron](/devices/playtron/)
- [Hardware synths and USB host boxes](/software/hardware/)

*Teenage Engineering and OP-Z are trademarks of Teenage Engineering. Playtronica is not affiliated with Teenage Engineering.*
