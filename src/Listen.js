import React, { Component } from 'react'
import ListenPage from './ListenPage'
import LoadingPage from './LoadingPage'
import Instrument from './Instrument'
import { CompositeDisposable, BehaviorSubject } from 'rx'
import Subscriber from './remote/Subscriber'

export class Listen extends Component {
  constructor (props) {
    super(props)
    this.channel口 = new BehaviorSubject(this.props.params.id)
    this.state = {
      status: 'loading',
      eventCount: 0,
      midiMessageCount: 0
    }
  }
  componentDidMount () {
    const subscriber = new Subscriber({ channel川: this.channel口 })
    const midiMessage川 = subscriber.midiMessage川
    const instrument = new Instrument({ midiMessage川 })
    this.subscription = new CompositeDisposable(
      instrument.play川.subscribe(),
      instrument.state川.subscribe(state => this.setState({ instrument: state })),
      subscriber.status川.subscribe(status => this.setState({ status: status })),
      subscriber.eventCount川.subscribe(count => this.setState({ eventCount: count })),
      subscriber.midiMessageCount川.subscribe(count => this.setState({ midiMessageCount: count }))
    )
  }
  componentWillUnmount () {
    if (this.subscription) {
      this.subscription.dispose()
    }
  }
  render () {
    return (
      <ListenPage
        id={this.props.params.id}
        status={this.state.status}
        instrument={this.state.instrument}
        eventCount={this.state.eventCount}
        midiMessageCount={this.state.midiMessageCount} />
    )
  }
}

Listen.propTypes = {
  params: React.PropTypes.object
}

export default Listen
