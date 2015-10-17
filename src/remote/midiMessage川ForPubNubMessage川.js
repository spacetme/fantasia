
import Rx from 'rx'
import MessageStreamUnpacker from './MessageStreamUnpacker'
import now from '../now'
import log from '../rx-log'

function midiMessage川ForPubNubMessage川 (message川) {
  return Rx.Observable.create(observer => {
    let unpacker = new MessageStreamUnpacker()
    let interval川 = Rx.Observable.interval(16)
    let action川 = (interval川
      .flatMap(() => {
        return Rx.Observable.from(unpacker.pull(now()))
      })
      .do(log('action'))
    )
    let actionSubscription = action川.subscribe(observer)
    let messageSubscription = message川.subscribe({
      onNext: message => unpacker.receiveMessage(now(), message),
      onError: error => observer.onError(error),
      onCompleted: () => observer.onCompleted()
    })
    return new Rx.CompositeDisposable(actionSubscription, messageSubscription)
  })
}

export default midiMessage川ForPubNubMessage川
