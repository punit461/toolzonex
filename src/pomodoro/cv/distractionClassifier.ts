import type { DetectionSample } from './detectionTypes'
import type { DistractionEvent } from '../types/session'

export interface ClassifierState {
  awayStreakSamples: number
  awayEventEmitted: boolean
  lookingAwaySec: number
  lookingAwayEventEmitted: boolean
  phoneEpisodeActive: boolean
  phoneEpisodeSamples: number
}

export function createClassifierState(): ClassifierState {
  return {
    awayStreakSamples: 0,
    awayEventEmitted: false,
    lookingAwaySec: 0,
    lookingAwayEventEmitted: false,
    phoneEpisodeActive: false,
    phoneEpisodeSamples: 0,
  }
}

/** Consecutive no-face samples before flagging "away from screen" — requires
 *  two misses in a row (not one) so a single bad frame doesn't false-positive. */
const AWAY_STREAK_THRESHOLD_SAMPLES = 2
const LOOKING_AWAY_THRESHOLD_SEC = 10
// Lowered from 0.6 — combined with the hand/gaze requirement below, a lower
// bar here trades a little false-positive risk for far fewer missed phones,
// which was the bigger real-world problem (0.6 was letting real phone use
// pass through as unflagged too often).
const PHONE_CONFIDENCE_THRESHOLD = 0.5

function makeEvent(type: DistractionEvent['type'], durationSec: number, confidence: number): DistractionEvent {
  return { id: crypto.randomUUID(), type, timestamp: new Date().toISOString(), durationSec, confidence }
}

/** Processes one detection sample against the running classifier state and
 *  returns the (possibly empty) list of distraction events it produced. Each
 *  event type fires once per episode (crossing a threshold, or the episode
 *  ending), not once per sample, so a single sustained distraction doesn't
 *  spam the scoring engine with repeated penalties. */
export function classifyDetectionSample(
  state: ClassifierState,
  sample: DetectionSample,
  sampleIntervalSec: number,
): { state: ClassifierState; events: DistractionEvent[] } {
  const next: ClassifierState = { ...state }
  const events: DistractionEvent[] = []

  if (!sample.face.faceDetected) {
    next.awayStreakSamples += 1
    next.lookingAwaySec = 0
    next.lookingAwayEventEmitted = false

    if (next.awayStreakSamples === AWAY_STREAK_THRESHOLD_SAMPLES && !next.awayEventEmitted) {
      events.push(makeEvent('away-from-screen', next.awayStreakSamples * sampleIntervalSec, 1))
      next.awayEventEmitted = true
    }
  } else {
    next.awayStreakSamples = 0
    next.awayEventEmitted = false

    if (sample.face.lookingAway) {
      next.lookingAwaySec += sampleIntervalSec
      if (next.lookingAwaySec > LOOKING_AWAY_THRESHOLD_SEC && !next.lookingAwayEventEmitted) {
        events.push(makeEvent('looking-away', next.lookingAwaySec, 1))
        next.lookingAwayEventEmitted = true
      }
    } else {
      next.lookingAwaySec = 0
      next.lookingAwayEventEmitted = false
    }
  }

  // Phone usage: phone alone visible on the desk must NOT count — only flag
  // when it's actively being engaged with (a hand near it, or gaze toward it).
  const phoneBeingUsed =
    sample.phone.phoneVisible &&
    sample.phone.confidence >= PHONE_CONFIDENCE_THRESHOLD &&
    (sample.hand?.handNearPhone === true || sample.face.lookingAway)

  if (phoneBeingUsed) {
    next.phoneEpisodeActive = true
    next.phoneEpisodeSamples += 1
  } else if (next.phoneEpisodeActive) {
    events.push(makeEvent('phone-usage', next.phoneEpisodeSamples * sampleIntervalSec, sample.phone.confidence))
    next.phoneEpisodeActive = false
    next.phoneEpisodeSamples = 0
  }

  return { state: next, events }
}

/** Closes out any distraction episode still open when monitoring stops
 *  (session ends, camera turned off) so it isn't silently dropped. */
export function flushClassifier(state: ClassifierState, sampleIntervalSec: number): DistractionEvent[] {
  const events: DistractionEvent[] = []
  if (state.phoneEpisodeActive && state.phoneEpisodeSamples > 0) {
    events.push(makeEvent('phone-usage', state.phoneEpisodeSamples * sampleIntervalSec, 1))
  }
  return events
}
