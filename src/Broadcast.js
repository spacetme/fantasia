import React, { Component } from 'react'
import BroadcastPage from './BroadcastPage'
import LoadingPage from './LoadingPage'
import Instrument from './Instrument'
import { CompositeDisposable, BehaviorSubject } from 'rx'
import midiMessage川 from './midi-io/midiMessage川'
import Publisher from './remote/Publisher'

export class Broadcast extends Component {
  constructor (props) {
    super(props)
    this.channel口 = new BehaviorSubject(this.props.params.id)
  }
  componentDidMount () {
    const channel川 = this.channel口
    const instrument = new Instrument({ midiMessage川 })
    const publisher = new Publisher({ midiMessage川, channel川 })
    this.subscription = new CompositeDisposable(
      instrument.play川.subscribe(),
      publisher.publish川.subscribe(),
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
    return <BroadcastPage id={this.props.params.id} instrument={this.state.instrument} />
  }
}

Broadcast.propTypes = {
  params: React.PropTypes.object
}

export default Broadcast
