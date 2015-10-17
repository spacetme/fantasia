
import Rx from 'rx'
import log from '../rx-log'
import midiMessage川ForPubNubMessage川 from './midiMessage川ForPubNubMessage川'
import pubnub from './pubnub'

export function Subscriber ({ channel川 }) {
  const channelEvent川 = (channel川
    .flatMapLatest(channelEvent川ForChannel)
    .share()
  )
  const pubNubMessage川 = (
    channelEvent川
    .filter(({ type }) => type === 'message')
    .map(({ message }) => message)
  )
  const status川 = (
    channelEvent川
    .filter(({ type }) => type === 'status')
    .map(({ status }) => status)
    .shareValue('pending')
  )
  const midiMessage川 = midiMessage川ForPubNubMessage川(pubNubMessage川).do(log('midi message'))
  const eventCount川 = counter川For川(channelEvent川)
  const midiMessageCount川 = counter川For川(midiMessage川)
  return { midiMessage川, status川, eventCount川, midiMessageCount川 }
}

function counter川For川 (川) {
  return 川.map(() => 1).startWith(0).scan((a, b) => a + b)
}

function channelEvent川ForChannel (channel) {
  return Rx.Observable.create(observer => {
    observer.onNext({ type: 'status', status: 'connecting' })
    pubnub.subscribe({
      channel,
      message (message) {
        observer.onNext({ type: 'message', message })
      },
      connect () {
        observer.onNext({ type: 'status', status: 'connected' })
      },
      disconnect () {
        observer.onNext({ type: 'status', status: 'disconnected' })
      },
      reconnect () {
        observer.onNext({ type: 'status', status: 'reconnected' })
      },
      error (e) {
        observer.onError(e)
      }
    })
  }).do(log('message'))
}

function message川ForChannel (channel) {
}

export default Subscriber
