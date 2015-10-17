import _ from 'lodash'

export function MessageStreamUnpacker (options = { }) {
  let project = options.project || 5000
  let delay = options.delay || 3000
  let t1, s1, t2, s2, sC
  let queue = [ ]
  return {
    receiveMessage (time, message) {
      if (t1 == null) {
        t1 = time
        t2 = time + project
        s1 = message.time - delay
      } else {
        let sS = this.getStreamTime(time)
        t1 = time
        t2 = time + project
        s1 = sS
      }
      s2 = message.time + project - delay
      sC = message.time
      queue.push(...(message.messages || [ ]))
    },
    pull (time) {
      let streamTime = this.getStreamTime(time)
      let items = _.takeWhile(queue, item => streamTime >= item.time)
      if (items.length > 0) queue = queue.slice(items.length)
      return items
    },
    getStreamTime (time) {
      if (t1 == null) {
        return 0
      }
      let fraction = (time - t1) / (t2 - t1)
      return Math.min(sC, s1 + (s2 - s1) * fraction)
    }
  }
}

export default MessageStreamUnpacker
