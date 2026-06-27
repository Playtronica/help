---
title: "Device will not connect — denied access to MIDI, USB not detected"
slug: wont-connect
section: troubleshooting
summary: "Your computer does not see the device, or the browser shows 'denied access to MIDI'. Work through this checklist."
order: 2
segment: ["music-producer", "gift-recipient"]
deflection_target: 180
status: edited-2026-05
last_edited: 2026-05-26
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
2. **If the device is not visible, try a different USB port.** USB hubs can cause connection issues. Connect the device directly to a USB port on the Mac.
3. **Try a different USB cable.** USB cables can fail silently. Use any other data cable of the same type. Charge-only cables will not work.
4. **Restart the Core Audio daemon.** Open Terminal and run `sudo pkill -9 coreaudiod`. Then plug the device back in.

## On Windows

1. **Open Device Manager.** Right-click the Start button and select Device Manager. Look under "Sound, video and game controllers" or "Universal Serial Bus devices".
2. **Check for a yellow warning icon next to the device.** If you see one, right-click the device, select **Update driver**, and then **Search automatically for drivers**. If that does not work, uninstall the device and reconnect it.
3. **Use a USB port directly on the computer.** Avoid USB hubs.
4. **Try a different USB cable.** The cable must be a data cable, not charge-only.

## Related pages

- [No sound](/troubleshooting/no-sound/) — once connected, this is the next-most-common issue.
- [Troubleshooting hub](/troubleshooting/hub/) — interactive walkthrough if you are not sure where to start.
- [Firmware reset](/troubleshooting/firmware-reset/) — last resort for stubborn cases.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Device will not connect #[order number]`. Tell us your operating system, the device, and what you have already tried. We aim for 24 hours, but a reply may take up to 3 business days.
