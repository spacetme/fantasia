
import midiConnection川 from './midiConnection川'
import Rx from 'rx'

function listen (port) {
  if (port.type !== 'input') return Rx.Observable.empty()
  return Rx.Observable.fromEvent(port, 'midimessage')
}

const midiMessage川 = (midiConnection川
  .flatMap(listen)
)

export default midiMessage川
