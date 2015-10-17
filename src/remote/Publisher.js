
import now from '../now'
import pubnub from './pubnub'

import log from '../rx-log'

export function Publisher ({ midiMessage川, channel川 }) {
  const messages川 = (midiMessage川
    .filter(({ data }) => data[0] !== 254) // skip heartbeat
    .map(withNow)
    .bufferWithTime(1000)
    .do(log('publish'))
  )
  const publish川 = channel川.flatMapLatest(channel =>
    publishMessages川ToChannel(messages川, channel)
  )
  return { publish川 }
}

export function publishMessages川ToChannel (messages川, channel) {
  return messages川.do(messages => {
    const message = { time: now(), messages }
    pubnub.publish({ channel: 'test', message: message })
  })
}

function withNow (midiMessage) {
  return { time: now(), data: midiMessage.data }
}

export default Publisher
