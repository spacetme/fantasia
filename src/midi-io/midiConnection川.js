
import Rx from 'rx'
import Promise from 'bluebird'

function observeMidiAccess (access) {
  return (
    Rx.Observable.create(observer => {
      for (let port of access.inputs.values()) {
        observer.onNext(port)
      }
      for (let port of access.outputs.values()) {
        observer.onNext(port)
      }
      access.onstatechange = e => {
        observer.onNext(e.port)
      }
    })
    .distinct()
  )
}

function requestMIDIAccess () {
  return navigator.requestMIDIAccess()
}

export const midiConnection川 = (
  Rx.Observable.fromPromise(Promise.try(requestMIDIAccess))
  .flatMap(observeMidiAccess)
)

export default midiConnection川
