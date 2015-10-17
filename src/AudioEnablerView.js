
import React from 'react'

const TEMP_STYLE = {
  display: 'block',
  background: '#944',
  color: 'white',
  textAlign: 'center',
  padding: 5
}

export const AudioEnablerView = ({ onClick }) => {
  return (
    <div className='AudioEnabler'>
      <a href='javascript://' style={TEMP_STYLE} onTouchStart={onClick} onClick={onClick}>Please click here to enable Web Audio</a>
    </div>
  )
}

export default AudioEnablerView
