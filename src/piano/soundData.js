import sounds from './sounds/index.json'
import fileUrls from './sounds/fileUrls'
import context from 'audio-context'
import Rx from 'rx'
import canPlay from './canPlay'
import _ from 'lodash'
import Promise from 'bluebird'

let soundData = null

export function getSoundData () {
  if (!soundData) soundData = initializeSoundData()
  return soundData
}

function initializeSoundData () {
  const keys = Object.keys(sounds)
  const loads = keys.map(dataForKey)
  return combineLoads(loads)
}

function dataForKey (key) {
  const url = getAppropriateSoundUrl(key)
  if (!url) throw new Error(`Unable to get sound URL for ${key}`)
  return loadSoundData(url, sounds[key])
}

function getAppropriateSoundUrl (key) {
  if (canPlay('audio/ogg; codecs="vorbis"')) {
    return fileUrls[`${key}.ogg`]
  } else {
    return fileUrls[`${key}.m4a`]
  }
}

function loadSoundData (url, specifications) {
  let subject = new Rx.ReplaySubject(1)
  let xh = new window.XMLHttpRequest()
  xh.open('GET', url, true)
  xh.responseType = 'arraybuffer'
  xh.onprogress = e => {
    if (e.lengthComputable && e.total) {
      subject.onNext({ type: 'progress', loaded: e.loaded, total: e.total })
    }
  }
  xh.onload = e => {
    subject.onNext({ type: 'load', response: xh.response, specifications })
    subject.onCompleted()
  }
  xh.onerror = e => {
    subject.onError(e)
  }
  xh.send(null)
  return subject
}

function decodeAudioData (buffer) {
  return new Promise((resolve, reject) => context.decodeAudioData(buffer, resolve, reject))
}

function combineLoads (loads) {
  const progress川 = Rx.Observable.combineLatest(loads.map(fraction)).map(average)
  const promise = (Promise.all(loads.map(getSamplesPromise))
    .then(samplesFromEachLoad => Object.assign({ }, ...samplesFromEachLoad))
  )

  return { progress川, promise }

  function average (fractions) {
    return _.sum(fractions) / loads.length
  }
  function fraction (load) {
    return (load
      .filter(({ type }) => type === 'progress')
      .map(({ loaded, total }) => loaded / total)
      .startWith(0)
      .concat(Rx.Observable.just(1))
    )
  }
  function getSamplesPromise (load) {
    return (load
      .toPromise()
      .then(({ response, specifications }) => {
        return (decodeAudioData(response).then(audioBuffer => toSamples(audioBuffer, specifications)))
      })
    )
  }
  function toSamples (audioBuffer, specification) {
    const SAMPLE_RATE = 44100
    let out = { }
    let start = 0
    for (let [midiNote, sampleLength] of specification) {
      out[midiNote] = {
        audioBuffer: audioBuffer,
        offset: start / SAMPLE_RATE,
        duration: (sampleLength - 512) / SAMPLE_RATE
      }
      start += sampleLength
    }
    return out
  }
}

export default getSoundData
