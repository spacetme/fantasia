
const dummyAudioTag = document.createElement('audio')

export function canPlay(type) {
  return dummyAudioTag.canPlayType(type) === 'probably'
}

export default canPlay
