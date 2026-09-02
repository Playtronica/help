---
title: "Firmware recovery — start here"
slug: firmware-reset
section: troubleshooting
summary: "Try the normal update first. Use manual recovery only for a board revision that has been confirmed."
order: 5
segment: ["music-producer"]
deflection_target: 60
status: edited-2026-08
last_edited: 2026-08-26
emoji: ⚡
---

<div class="task-grid" aria-label="Choose a firmware recovery route">
  <a class="task-card" href="#try-the-normal-update"><span class="task-card__icon">↻</span><span><strong>Device still appears</strong><small>Use the normal Settings update first.</small></span></a>
  <a class="task-card" href="#if-rpi-rp2-is-already-visible"><span class="task-card__icon">💾</span><span><strong>RPI-RP2 is visible</strong><small>Finish the verified firmware copy.</small></span></a>
  <a class="task-card" href="#biotron-recovery"><span class="task-card__icon">🌿</span><span><strong>Recover a Biotron</strong><small>Send a board photo before touching contacts.</small></span></a>
  <a class="task-card" href="#touchme-or-playtron-manual-recovery"><span class="task-card__icon">🧰</span><span><strong>TouchMe or Playtron</strong><small>Use manual recovery only on a matching board.</small></span></a>
</div>

Use firmware recovery when a verified update was interrupted or the device
remains an `RPI-RP2` drive. A powered device that is merely missing from a DAW
is **not** proof of damaged firmware. Do not start with exposed contacts if
Settings or Windows can still see the device.

> **Green LEDs mean power only.** First close browsers, DAWs, and MIDI utilities;
> check Windows Device Manager; then reconnect once with a known data cable. If
> the device remains absent, save screenshots and stop. Do not reflash from this
> symptom alone.

> ⚠️ **The board must match the picture.** USB-C alone does not identify a
> hardware revision. If any label, component, or contact position differs,
> stop. Send support a clear photo of both sides instead of probing pads.

## Try the normal update

<ol class="steps">
  <li><strong>Close every DAW and MIDI app.</strong></li>
  <li><strong>Connect one device directly with a USB data cable.</strong></li>
  <li><strong>Open the correct Settings page in desktop Chrome or Edge:</strong> <a href="https://settings.playtronica.com/#/touchme">TouchMe</a>, <a href="https://settings.playtronica.com/#/playtron">Playtron</a>, or <a href="https://settings.playtronica.com/#/biotron">Biotron</a>.</li>
  <li><strong>Select Update Firmware</strong> and follow the on-screen steps. Do not disconnect during a file copy.</li>
  <li><strong>Wait for the automatic restart.</strong> Success means the drive disappears and the device returns as MIDI.</li>
</ol>

## If RPI-RP2 is already visible

The device is in update mode. Use only the firmware file supplied by the
Settings flow or Playtronica support for your exact device. Copy it to
`RPI-RP2`, wait for the copy to finish, and let the device restart.

Do not copy a TouchMe, Playtron, Orbita, or generic Pico file onto Biotron.

## Biotron recovery

Do not bridge Biotron contacts from a general internet image. Sold board
revisions may differ, and the manual position is not verified for every unit.

<a href="/illustrations/biotron/biotron-boot-area.svg" target="_blank" rel="noopener"><img src="/illustrations/biotron/biotron-boot-area.svg" alt="Large review close-up of the possible BOOT area on the pictured USB-C Biotron board; use it to frame a support photo, not as permission to bridge contacts" style="display:block;margin:12px auto 18px;max-width:min(100%,600px);height:auto;background:#fff" /></a>

<ol class="steps">
  <li><strong>Photograph both sides of the full board.</strong> Keep USB disconnected.</li>
  <li><strong>Email the photos to <a href="mailto:support@playtronica.com">support@playtronica.com</a>.</strong> Include the order number and operating system.</li>
  <li><strong>Wait for revision confirmation.</strong> Support will identify the exact contacts and recovery file.</li>
</ol>

The close-up makes the area readable. It is an identification aid, not a
universal procedure.

## TouchMe or Playtron manual recovery

Continue only when the board matches the labelled image for
[TouchMe](/devices/touchme/) or [Playtron](/devices/playtron/). These steps do
**not** apply to an unconfirmed Biotron.

<ol class="steps">
  <li><strong>Disconnect USB.</strong> Prepare a paper clip, tweezers, or a short wire.</li>
  <li><strong>Hold the two labelled BOOT contacts together.</strong></li>
  <li><strong>Connect USB while holding the contacts.</strong></li>
  <li><strong>Release when <code>RPI-RP2</code> appears.</strong> If it does not appear, disconnect and stop after one retry.</li>
  <li><strong>Copy the verified <code>flash_nuke.uf2</code> supplied for this recovery.</strong> Wait for the drive to reappear.</li>
  <li><strong>Return to Settings and install the device firmware.</strong> Wait until it returns as MIDI.</li>
</ol>

> ⚠️ `flash_nuke.uf2` erases the flash. Do not use a file from an unknown mirror
> and do not interrupt either copy.

## On a Mac: "error code 100093" when dragging the file

If you drag a  file onto the  drive and macOS says **"The operation can't be completed because an unexpected error occurred (error code 100093)"** — the file did not copy and the device does not reboot.

**This is not your device and not our firmware.** Since macOS Ventura (13.0), Finder tries to write extended attributes onto firmware drives like this one, and the drive rejects them. It affects every board that updates this way — Raspberry Pi Pico, Adafruit, micro:bit and ours alike.

**The fix — copy from Terminal instead of Finder:**

1. Put the device into update mode so the  drive appears.
2. Open **Terminal** (Applications → Utilities → Terminal).
3. Type  (with a space after ), then **drag the  file into the Terminal window** — the path fills in by itself.
4. Add  at the end and press Enter:

```
cp -X ~/Downloads/flash_nuke.uf2 /Volumes/RPI-RP2
```

The  tells macOS to skip the extended attributes, which is exactly what Finder gets wrong. The drive disappears immediately and the device reboots — that is success, not an error.

> If Terminal says "No such file or directory", the drive is not mounted: put the device back into update mode and check that `RPI-RP2` is visible in Finder first.

## Still stuck

Email [support@playtronica.com](mailto:support@playtronica.com) with the subject
`Firmware recovery #[order number]`. Include:

- the device name;
- clear photos of both sides;
- Windows or macOS version;
- whether `RPI-RP2` appears;
- the exact step that failed.

We aim for 24 hours, but a reply may take up to 3 business days.
