
import Piano from './piano'
import performAction from './performAction'
import action川ForMidiMessage川 from './action川ForMidiMessage川'

export function Instrument ({ midiMessage川 }) {
  const piano = new Piano()
  const action川 = action川ForMidiMessage川(midiMessage川).share()
  const play川 = action川.map(action => performAction(action, piano)).share()
  return {
    state川: piano.progress川.map(value => ({ progress: value })),
    action川,
    play川
  }
}

export default Instrument
