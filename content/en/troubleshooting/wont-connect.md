---
title: "Device will not connect — denied access to MIDI, USB not detected"
slug: wont-connect
section: troubleshooting
summary: "Your computer does not see the device, or the browser shows 'denied access to MIDI'. Work through this checklist."
order: 2
segment: ["music-producer", "gift-recipient"]
deflection_target: 180
status: edited-2026-07
last_edited: 2026-10-31
emoji: 🔌
---

Your computer does not see the device. Work through this checklist in order. This page also covers **"denied access to MIDI"** errors in the browser, browser MIDI-permission resets, and USB-cable / USB-port issues.

## "Denied access to MIDI" in the browser

If the browser says **denied access to MIDI** or asks for permission every time, the site's MIDI permission was rejected once and is now cached. To fix:

1. **Open browser settings** in Chrome.
2. **Go to Privacy and Security → Site Settings → MIDI**.
3. Find `play.playtronica.com`, `synth.playtronica.com` and `settings.playtronica.com` and change each to **Allow**.
4. **Reload the page.** The device should be detected within two seconds.

If MIDI permission is correctly set to Allow and the device is still not detected, continue below.

## First — is the LED lit when the device is plugged in?

> ℹ️ **Note for Playtron and TouchMe.** These devices do **not** light up an LED when you plug them in. A dark device is normal — continue to the platform steps below. LED behaviour alone does not confirm USB MIDI recognition or rule out a hardware fault.

For devices that do have a status LED (Scales, Biotron, Orbita):

- **The LED is on.** The device has power. Continue below to check whether the computer recognizes it.
- **The LED is off.** Record this behaviour, then check the data cable and USB port below.

## On macOS

1. **Open Audio MIDI Setup.** Go to Applications → Utilities → Audio MIDI Setup. Click the MIDI Studio button in the top right. Confirm whether your Playtronica device appears in the window.
2. **If the device is not visible, try a different USB port and a direct connection.** For older Micro-USB TouchMe or Playtron, see the [Mac connection comparison](/troubleshooting/wont-connect/#mac-connection-comparison) below.
3. **Try a different USB cable.** USB cables can fail silently. Use any other data cable of the same type. Charge-only cables will not work.
4. **Restart the Core Audio daemon.** Open Terminal and run `sudo pkill -9 coreaudiod`. Then plug the device back in.

## On Windows

1. **Open Device Manager.** Right-click the Start button and select Device Manager. Look under "Sound, video and game controllers" or "Universal Serial Bus devices".
2. **Check for a yellow warning icon next to the device.** If you see one, right-click the device, select **Update driver**, and then **Search automatically for drivers**. If that does not work, uninstall the device and reconnect it.
3. **Use a USB port directly on the computer.** Avoid USB hubs.
4. **Try a different USB cable.** The cable must be a data cable, not charge-only.

<a id="old-micro-usb-device-on-a-new-mac-add-a-usb-hub"></a>

## Mac connection comparison

If your older **Micro-USB TouchMe (v1)** or **Micro-USB Playtron** is absent from Audio MIDI Setup, compare these connections. This is a diagnostic check on your Mac, without a guaranteed result.

1. Use a confirmed data cable. Plug the device directly into the Mac and check Audio MIDI Setup.
2. **If you already have a USB hub that carries data**, repeat the check through that hub with the same device and cable.
3. Record whether the device appears with either connection.

If neither connection appears, tell support your Mac model, device, cable, hub and the results. This does not establish that the hub is the wrong type or that you need to buy another.

These checks do not establish compatibility with a standalone MIDI host, identify a firmware issue, or rule out a hardware fault.

## Related pages

- [No sound](/troubleshooting/no-sound/) — once connected, this is the next-most-common issue.
- [Troubleshooting hub](/troubleshooting/hub/) — interactive walkthrough if you are not sure where to start.
- [Firmware reset](/troubleshooting/firmware-reset/) — last resort for stubborn cases.

## Ask the community

> 🤝 **Other Playtronica users have probably hit this before.** The [Playtronica Friends Facebook group](https://www.facebook.com/groups/playtronica) has 4,400 members and is the fastest source of creative and technical help. Search the group's history first (use the magnifying glass at the top — try `playtron mobile no sound`, `all leds lit`, `touchme biotron no sound`, `koala sampler midi`, or whatever fits your problem). If your question is not already answered, post a new one with a `[Device]` prefix in the title. See [the community page](/site/community/) for what to ask there and what to email instead.

## Still stuck

[Email support@playtronica.com](mailto:support@playtronica.com) with the subject `Device will not connect #[order number]`. Tell us your operating system, the device, and what you have already tried. We aim for 24 hours, but a reply may take up to 3 business days.
