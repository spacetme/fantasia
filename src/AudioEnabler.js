import React, { Component } from 'react'
import Rx from 'rx'
import AudioEnablerView from './AudioEnablerView'
import context from 'audio-context'

const enabled川 = (Rx.Observable.interval(250)
  .map(() => context.currentTime > 0)
  .distinctUntilChanged()
)

function unmute () {
  let gain = context.createGain()
  let osc = context.createOscillator()
  osc.frequency.value = 440
  osc.start(context.currentTime + 0.1)
  osc.stop(context.currentTime + 0.1)
  gain.connect(context.destination)
}

export class AudioEnabler extends Component {
  constructor () {
    super()
    this.state = { enabled: true }
  }
  componentDidMount () {
    unmute()
    this.subscription = enabled川.subscribe(enabled => this.setState({ enabled }))
  }
  componentWillUnmount () {
    if (this.subscription) {
      this.subscription.dispose()
    }
  }
  enable () {
    unmute()
  }
  render () {
    return (this.state.enabled
      ? null
      : <AudioEnablerView onClick={() => this.enable()} />
    )
  }
}

export default AudioEnabler
