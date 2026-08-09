let audioCtx: AudioContext | null = null

/** A short, synthesized two-tone chirp — no audio asset to ship or host.
 *  Fails silently if the browser blocks audio without a prior user gesture
 *  (the toast still shows visually either way). */
export function playAlertSound(): void {
  try {
    audioCtx ??= new AudioContext()
    if (audioCtx.state === 'suspended') void audioCtx.resume()

    const ctx = audioCtx
    const now = ctx.currentTime

    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(720, now)
    oscillator.frequency.setValueAtTime(540, now + 0.12)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)

    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start(now)
    oscillator.stop(now + 0.35)
  } catch {
    // AudioContext unavailable/blocked — nothing to do, visual toast still shows.
  }
}
