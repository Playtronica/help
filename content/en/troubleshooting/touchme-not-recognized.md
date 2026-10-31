---
title: "TouchMe not recognized on Mac or Windows"
slug: touchme-not-recognized
section: troubleshooting
summary: "Four checks when a Mac or Windows computer does not detect TouchMe: cable, plug-in order, Web MIDI browser, and permissions."
segment: ["music-producer", "creator"]
deflection_target: 40
status: new-2026-06
last_edited: 2026-10-31
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

This checks whether macOS lists the device before you check the browser.

**Do this:**

1. Plug in TouchMe.
2. Open **Finder → Applications → Utilities → Audio MIDI Setup**.
3. In the Audio MIDI Setup window, go to **Window → Show MIDI Studio**.
4. Look for "TouchMe" or an unrecognized USB MIDI device in the list.

**If TouchMe appears here but not in your browser:** check browser permissions (Step 3).

**If TouchMe does not appear here at all:** try a confirmed data cable (Step 1), a different USB port and a direct connection. For an older Micro-USB TouchMe, follow the [Mac connection comparison](/troubleshooting/wont-connect/#mac-connection-comparison).

---

## Mac-specific: USB adapter issues

**If your Mac only has USB-C ports**, use a cable or adapter that supports data transfer and matches your TouchMe connector. Check it with a known-good data connection.

**Older TouchMe (Micro-USB) on a USB-C Mac:** use a Micro-USB cable or adapter that carries data and matches your Mac.

---

## Old Micro-USB TouchMe not seen at all on a new Mac

For Audio MIDI Setup checks using a direct connection and a data hub you already have, follow the **[Mac connection comparison](/troubleshooting/wont-connect/#mac-connection-comparison)**. A hub is not a guaranteed fix.

---

## Windows: device visible in Device Manager but no MIDI

Windows users sometimes see the TouchMe in Device Manager under "Sound, video and game controllers" or "Universal Serial Bus devices" but it does not appear as a MIDI device in their DAW.

**Do this:**

1. Open Chrome (not Edge, not Internet Explorer).
2. Go to [settings.playtronica.com](https://settings.playtronica.com/#/touchme).
3. If the page connects to your device, check your DAW's MIDI input list and enable the TouchMe port there. This connection alone does not rule out a hardware fault.
4. If the settings page also cannot connect, try a different USB cable first, then a different USB port.

---

## Still not working after all four steps

Before contacting support, send us a short video showing:
- The device plugged in, and the LED blinking when you touch a pad.
- The Audio MIDI Setup window (Mac) or Device Manager (Windows).
- Your browser attempting to connect.

This helps support review what your computer detects and choose the next check.

Contact: [support@playtronica.com](mailto:support@playtronica.com)

---

## Quick reference

| Symptom | First thing to check |
|---|---|
| No LED even when you touch a pad | Try a confirmed data cable and a different port; record the LED behaviour |
| LED blinks on touch, nothing in browser | Plug in before opening browser; check MIDI permission in browser |
| LED blinks on touch, not in Audio MIDI Setup | Try a confirmed data cable and a different port |
| Works in Audio MIDI Setup, not in DAW | Enable TouchMe MIDI input inside your DAW settings |
| Only works on Windows, not Mac | Check Audio MIDI Setup and the data cable or adapter |
| Worked before, stopped after macOS update | Open Audio MIDI Setup → MIDI Studio and rescan; try a direct USB connection |
| Older Micro-USB TouchMe, invisible on a new Mac even with a good cable | Follow the [Mac connection comparison](/troubleshooting/wont-connect/#mac-connection-comparison) with a hub you already have |

---

*Related: [Firmware update and factory reset](https://help.playtronica.com/troubleshooting/firmware-reset) · [TouchMe with Ableton Live](https://help.playtronica.com/software/ableton) · [Supported browsers](https://help.playtronica.com/getting-started/browsers)*
