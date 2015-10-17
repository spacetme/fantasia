import context from 'audio-context'

export function playSound ({ audioBuffer, offset, duration }, velocity) {
  let node = context.createBufferSource()
  let gain = context.createGain()
  let destination = context.destination
  gain.gain.value = velocity * velocity
  node.buffer = audioBuffer
  node.connect(gain)
  gain.connect(destination)
  node.start(0, offset, duration)
  node.onended = function () {
    gain.disconnect(destination)
  }
  return {
    stop () {
      gain.gain.setTargetAtTime(0, context.currentTime, 0.08)
      node.stop(context.currentTime + 1)
    }
  }
}

export default playSound
