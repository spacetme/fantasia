/* global describe, it */

import assert from 'power-assert'
import MessageStreamUnpacker from '../../src/remote/MessageStreamUnpacker'

describe('MessageStreamUnpacker', function () {
  it('should be able to return correct time', function () {
    let p = new MessageStreamUnpacker({ project: 5000, delay: 3000 })
    p.receiveMessage(2000, { time: 30000 })
    assert(p.getStreamTime(2000) === 27000)
    assert(p.getStreamTime(3000) === 28000)
    assert(p.getStreamTime(4000) === 29000)
    assert(p.getStreamTime(5000) === 30000)
    assert(p.getStreamTime(6000) === 30000)
    p.receiveMessage(7000, { time: 53000 })
    assert(p.getStreamTime(8000) === 35000)
  })
  it('should be able to pull messages', function () {
    let p = new MessageStreamUnpacker({ project: 5000, delay: 3000 })
    p.receiveMessage(2000, { time: 30000, messages: [ { time: 29000, data: [1] } ] })
    assert(p.pull(2000).length === 0)
    assert(p.pull(3000).length === 0)
    assert(p.pull(4000).length === 1)
  })
})
