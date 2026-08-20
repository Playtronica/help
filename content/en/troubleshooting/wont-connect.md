---
title: "Device will not connect — denied access to MIDI, USB not detected"
slug: wont-connect
section: troubleshooting
summary: "Your computer does not see the device, or the browser shows 'denied access to MIDI'. Work through this checklist."
order: 2
segment: ["music-producer", "gift-recipient"]
deflection_target: 180
status: edited-2026-07
last_edited: 2026-07-11
emoji: 🔌
---

Your computer does not see the device. Work through this checklist in order. This page also covers **"denied access to MIDI"** errors in the browser, browser MIDI-permission resets, and USB-cable / USB-port issues.

## "Denied access to MIDI" in the browser

If the browser says **denied access to MIDI** or asks for permission every time, the site's MIDI permission was rejected once and is now cached. To fix:

1. **Open browser settings** in Chrome.
2. **Go to Privacy and Security → Site Settings → MIDI**.
3. Find `synth.playtronica.com` and `settings.playtronica.com` and change each to **Allow**.
4. **Reload the page.** The device should be detected within two seconds.

If MIDI permission is correctly set to Allow and the device is still not detected, continue below.

## First — is the LED lit when the device is plugged in?

> ℹ️ **Note for Playtron and TouchMe.** These devices do **not** light up an LED when you plug them in. A dark device is normal — skip straight to the platform steps below. Their LED blinks each time you complete the circuit and a note plays, so if you can trigger a note the device is working correctly.

For devices that do have a status LED (Scales, Biotron, Orbita):

- **The LED is on.** The device has power. The problem is in the software or the driver. Go to "No sound" if MIDI is not detected at the app level.
- **The LED is off.** The problem is the USB connection itself. Continue below.

## On macOS

1. **Open Audio MIDI Setup.** Go to Applications → Utilities → Audio MIDI Setup. Click the MIDI Studio button in the top right. Confirm whether your Playtronica device appears in the window.
2. **If the device is not visible, try a different USB port.** For most devices a USB hub causes issues — connect directly. **Older Micro-USB TouchMe (v1) and Playtron are the exception** — on a new Mac they often need a hub added; see "Old Micro-USB device on a new Mac?" below.
3. **Try a different USB cable.** USB cables can fail silently. Use any other data cable of the same type. Charge-only cables will not work.
4. **Restart the Core Audio daemon.** Open Terminal and run `sudo pkill -9 coreaudiod`. Then plug the device back in.

## On Windows

1. **Open Device Manager.** Right-click the Start button and select Device Manager. Look under "Sound, video and game controllers" or "Universal Serial Bus devices".
2. **Check for a yellow warning icon next to the device.** If you see one, right-click the device, select **Update driver**, and then **Search automatically for drivers**. If that does not work, uninstall the device and reconnect it.
3. **Use a USB port directly on the computer.** Avoid USB hubs.
4. **Try a different USB cable.** The cable must be a data cable, not charge-only.

## Old Micro-USB device on a new Mac? Add a USB hub

For the older **Micro-USB TouchMe (v1)** and **Micro-USB Playtron** on a recent Apple-silicon Mac (M1/M2/M3 and later): the device powers on and reacts to touch, but the Mac shows **nothing** in Audio MIDI Setup — even with a good data cable straight into a port.

These devices use an early USB design that new Macs treat very strictly and refuse during setup. The device is fine — a USB hub re-times the connection so the Mac accepts it. Technically, a real hub contains a **Transaction Translator**: a chip that re-clocks the device's slower, full-speed USB signal into clean timing the Mac will accept. A passive adapter has no such chip, so nothing gets re-timed — which is why it never helps.

| Your device | On a new Mac |
|---|---|
| Older **Micro-USB** (TouchMe v1, Playtron) | **Add** a real USB hub between device and Mac |
| Newer **USB-C** (TouchMe v2) | Connect **directly**, no hub |

**Add a hub:**

1. Use a **real USB hub** — a box with its own chip and ports. A plain USB-C-to-USB-A adapter is only a wire and will **not** help.
2. Plug the hub into the Mac, then the device into the hub.
3. Open Audio MIDI Setup and check whether the device appears.

**How to choose the hub** — the details that decide whether it works:

- **A real hub, not an adapter.** It must be a box with its own controller chip and ports. A plain USB-C-to-USB-A dongle is only a wire — it has no Transaction Translator, so it cannot re-time the device.
- **A basic USB 2.0 hub is the safest.** Its Transaction Translator is built exactly for full-speed devices like these, so the timing fix is guaranteed. USB 3.x hubs usually work too (they contain a USB 2.0 stage), but cheap ones can be fussy — when in doubt, pick plain USB 2.0.
- **Its own power adapter beats bus power.** Steady external power helps a marginal old device finish enumeration. A bus-powered hub often works — try it — but a self-powered one is the most reliable.
- **Right ports for your setup.** Regular USB-A ports for the device's cable, and an upstream plug that matches your Mac: a USB-C hub for a USB-C-only Mac, a USB-A hub for an older Mac.

Cheap 4-port hubs from about €8–15 are enough — Anker, UGREEN, Amazon Basics, Sabrent. Examples for USB-C Macs: a [UGREEN USB-C→USB-A hub](https://www.amazon.com/dp/B07PY87TBD) or [Anker USB-C hub](https://www.amazon.com/dp/B0CCDMR66Y). **Avoid passive USB-C-to-USB-A adapters — they are not hubs.** If one hub does not help, it is usually the wrong type; a basic USB 2.0 hub is the safest.

> 💬 **Trying this? Message us on WhatsApp and we'll work it out together:** [chat with us on WhatsApp](https://wa.me/351937910673?text=Hi%20Playtronica%2C%20I%20am%20trying%20the%20USB%20hub%20fix%20for%20my%20old%20Micro-USB%20device%20that%20my%20new%20Mac%20does%20not%20detect.%20My%20setup%3A%20). Tell us your Mac model, the hub you used, and what Audio MIDI Setup shows.

## Related pages

- [No sound](/troubleshooting/no-sound/) — once connected, this is the next-most-common issue.
- [Troubleshooting hub](/troubleshooting/hub/) — interactive walkthrough if you are not sure where to start.
- [Firmware reset](/troubleshooting/firmware-reset/) — last resort for stubborn cases.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Device will not connect #[order number]`. Tell us your operating system, the device, and what you have already tried. We aim for 24 hours, but a reply may take up to 3 business days.
