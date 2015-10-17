import React, { Component } from 'react'
import PlayAlonePage from './PlayAlonePage'
import LoadingPage from './LoadingPage'
import Instrument from './Instrument'
import { CompositeDisposable } from 'rx'
import midiMessage川 from './midi-io/midiMessage川'

export class PlayAlone extends Component {
  componentDidMount () {
    const instrument = new Instrument({ midiMessage川 })
    this.subscription = new CompositeDisposable(
      instrument.play川.subscribe(),
      instrument.state川.subscribe(state => this.setState({ instrument: state }))
    )
  }
  componentWillUnmount () {
    if (this.subscription) {
      this.subscription.dispose()
    }
  }
  render () {
    if (!this.state) {
      return <LoadingPage />
    }
    return <PlayAlonePage instrument={this.state.instrument} />
  }
}

export default PlayAlone
