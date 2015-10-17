
import Rx from 'rx'

export function action川ForMidiMessage川 (midiMessage川) {
  const isNoteEvent = a => a >= 0x80 && a < 0xA0
  const isControlChange = a => a >= 0xB0 && a < 0xC0
  const sharedMessage川 = midiMessage川.share()
  const noteEvent川 = sharedMessage川.filter(e => isNoteEvent(e.data[0]))

  const noteOn川 = (
    noteEvent川
    .filter(e => (e.data[0] >= 0x90) && (e.data[2] > 0))
    .map(e => ({ type: 'on', midiNote: e.data[1], velocity: e.data[2] / 127 }))
  )
  const noteOff川 = (
    noteEvent川
    .filter(e => (e.data[0] < 0x90) || (e.data[2] === 0))
    .map(e => ({ type: 'off', midiNote: e.data[1] }))
  )
  const pedal川 = (
    sharedMessage川
    .filter(e => isControlChange(e.data[0]))
    .filter(e => e.data[1] === 0x40)
    .map(e => e.data[2] >= 64)
    .startWith(false)
    .distinctUntilChanged()
    .map(state => ({ type: 'pedal', sustain: state }))
  )

  const action川 = Rx.Observable.merge(noteOn川, noteOff川, pedal川)

  return action川
}

export default action川ForMidiMessage川
