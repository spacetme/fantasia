
export function performAction (action, instrument) {
  switch (action.type) {
    case 'on':
      instrument.noteOn(action.midiNote, action.velocity)
      break
    case 'off':
      instrument.noteOff(action.midiNote)
      break
    case 'pedal':
      if (action.sustain) {
        instrument.sustainOn()
      } else {
        instrument.sustainOff()
      }
  }
}

export default performAction
