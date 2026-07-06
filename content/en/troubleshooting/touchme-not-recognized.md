---
title: "TouchMe not recognized on Mac or Windows"
slug: touchme-not-recognized
section: troubleshooting
summary: "TouchMe is plugged in but your computer doesn't detect it as a MIDI device. This covers the four fixes that resolve almost every case: data cable, plug-in order, Web MIDI browser, and macOS permission."
segment: ["music-producer", "creator"]
deflection_target: 40
status: new-2026-06
last_edited: 2026-07-06
emoji: 🔌
---

# TouchMe not recognized on Mac or Windows

The device powers on — the arpeggiator moves — but your computer sees nothing. This is the most common setup question we receive. Work through the steps below in order. Most people are sorted by step 1 or 2.

---

## Step 1 — Use the included cable, or a confirmed data cable

This is the single most common cause. Many USB cables only carry power; they do not carry data.

**Do this:** Plug in using the white cable that came in the box. If you lost it, use a cable you have confirmed transfers files (for example, one that works for syncing photos to a phone). A cable from a phone charger or a power bank is very likely charge-only.

> "Shame on me — I was sure I was using the USB cable that came with the TouchMe, and it was not the case! My other cables were not transmitting digital signals." — customer, 2026

**TouchMe v1** has a Micro-USB port. **TouchMe v2** (2024 onward) has USB-C. Make sure the cable matches the port on your device.

---

## Step 2 — Plug in the device before opening the browser

Web MIDI has to detect the device at startup. If you open Chrome first and then plug in TouchMe, the browser often misses it.

**Do this:**

1. Unplug TouchMe.
2. Close Chrome completely (Quit, not just close the tab).
3. Plug in TouchMe. The LED stays dark until you touch a pad — that is normal, it is not a sign the device is off.
4. Open Chrome.
5. Navigate to your synth or the settings page.

---

## Step 3 — Use Chrome (not Safari, not Firefox)

TouchMe uses Web MIDI. Web MIDI is supported in **Chrome** only. Safari does not support it. Firefox does not support it.

If you are on Safari or Firefox, nothing will work regardless of your cable or connection.

**Also check:** some browsers prompt for MIDI permission the first time a site requests access. If you dismissed that prompt, the browser remembers "deny." Clear the permission:

**Chrome:** Address bar → click the lock icon → Site settings → MIDI → Allow.


After changing the permission, refresh the page with the device already plugged in.

---

## Step 4 — Mac: check that the device appears in Audio MIDI Setup

This confirms whether the problem is the cable/connection or the browser.

**Do this:**

1. Plug in TouchMe.
2. Open **Finder → Applications → Utilities → Audio MIDI Setup**.
3. In the Audio MIDI Setup window, go to **Window → Show MIDI Studio**.
4. Look for "TouchMe" or an unrecognized USB MIDI device in the list.

**If TouchMe appears here but not in your browser:** the issue is browser permissions (see Step 3).

**If TouchMe does not appear here at all:** the Mac is not seeing the device at the hardware level. Try a different USB cable (Step 1) and a different USB port. On the **newer USB-C TouchMe**, remove any hub or adapter and connect directly. The **older Micro-USB TouchMe (v1)** on a new Mac is the opposite — it often needs a hub added; see "Old Micro-USB TouchMe not seen at all on a new Mac" below.

---

## Mac-specific: USB adapter issues

**If your Mac only has USB-C ports** and you are using an adapter, the adapter must support data transfer, not just charging. Many small white USB-C adapters are power-only. The adapter included in some bundles is a confirmed data adapter. Third-party adapters vary — test with a known-good one.

Customers with new MacBook Pros (M1, M2, M5, running Sequoia or Sonoma) using the **USB-C TouchMe (v2)** have reported that cheap multiport hubs drop the MIDI connection — for that device, connect directly to a USB-C port with a USB-C to USB-C cable, or use Apple's own USB-C adapter. **The older Micro-USB TouchMe (v1) is the exception:** on a new Mac it often needs a hub to be seen at all (see the section below).

**Older TouchMe (Micro-USB) on a USB-C Mac:** You need a Micro-USB to USB-C adapter or cable that carries data. Standard phone charging adapters often do not.

---

## Old Micro-USB TouchMe not seen at all on a new Mac

If your **Micro-USB TouchMe (v1)** shows **nothing** in Audio MIDI Setup on a recent Apple-silicon Mac even with a good data cable, it usually needs a **real USB hub** between the device and the Mac (not a passive adapter). This is the opposite of removing the hub — which is right for the newer USB-C TouchMe (v2).

Full steps, hub models and the decision table: **[Device will not connect → Old Micro-USB device on a new Mac](/troubleshooting/wont-connect/)**.

---

## Windows: device visible in Device Manager but no MIDI

Windows users sometimes see the TouchMe in Device Manager under "Sound, video and game controllers" or "Universal Serial Bus devices" but it does not appear as a MIDI device in their DAW.

**Do this:**

1. Open Chrome (not Edge, not Internet Explorer).
2. Go to [settings.playtronica.com](https://settings.playtronica.com/#/touchme).
3. If the page connects to your device, the hardware is working. The issue is DAW recognition — check your DAW's MIDI input list and enable the TouchMe port there.
4. If the settings page also cannot connect, try a different USB cable first, then a different USB port.

---

## Still not working after all four steps

Before contacting support, send us a short video showing:
- The device plugged in, and the LED blinking when you touch a pad.
- The Audio MIDI Setup window (Mac) or Device Manager (Windows).
- Your browser attempting to connect.

This lets us confirm whether it is a hardware fault or a configuration issue and speeds up the response significantly.

Contact: [support@playtronica.com](mailto:support@playtronica.com)

---

## Quick reference

| Symptom | First thing to check |
|---|---|
| No LED even when you touch a pad | USB cable is charge-only or not delivering power — try the included cable or a different port |
| LED blinks on touch, nothing in browser | Plug in before opening browser; check MIDI permission in browser |
| LED blinks on touch, not in Audio MIDI Setup | Cable is charge-only; try the included cable |
| Works in Audio MIDI Setup, not in DAW | Enable TouchMe MIDI input inside your DAW settings |
| Only works on Windows, not Mac | Adapter is charge-only; use a data adapter directly into a USB-C port |
| Worked before, stopped after macOS update (newer USB-C TouchMe) | Open Audio MIDI Setup → MIDI Studio and rescan; try direct USB connection without hub |
| Older Micro-USB TouchMe, invisible on a new Mac even with a good cable | Add a real USB hub between the device and the Mac (not a passive adapter) |

---

*Related: [Firmware update and factory reset](https://help.playtronica.com/troubleshooting/firmware-reset) · [TouchMe with Ableton Live](https://help.playtronica.com/software/ableton) · [Supported browsers](https://help.playtronica.com/getting-started/browsers)*
