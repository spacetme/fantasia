
import getSoundData from './soundData'
import playSound from './playSound'
import _ from 'lodash'

export function Piano () {
  let soundData = getSoundData()
  let progress川 = soundData.progress川
  let instances = [ ]
  let sustained
  let loadedData

  soundData.promise.then(data => loadedData = data)

  return {
    progress川,
    noteOn (midiNote, velocity = 1) {
      if (!loadedData) return
      let sound = loadedData[midiNote]
      if (!sound) return false
      let instance = playSound(sound, velocity)
      instances.push({ midiNote, instance })
    },
    noteOff (midiNote) {
      let removedInstances = _.remove(instances, { midiNote })
      if (sustained) {
        sustained.push(...removedInstances)
      } else {
        for (let { instance } of removedInstances) instance.stop()
      }
    },
    sustainOn () {
      if (sustained) return
      sustained = [ ]
    },
    sustainOff () {
      if (!sustained) return
      for (let { instance } of sustained) instance.stop()
      sustained = null
    }
  }
}

export default Piano
