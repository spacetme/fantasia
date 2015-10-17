import React, { Component } from 'react'
import InstrumentView from './InstrumentView'

export class ListenPage extends Component {
  render () {
    return (
      <div className='ListenPage'>
        <h2>Now listening from {this.props.id}!</h2>
        <p>Connection status: {this.props.status}</p>
        <p>Received {this.props.eventCount} events from server, emitted {this.props.midiMessageCount} MIDI messages.</p>
        <InstrumentView state={this.props.instrument} />
      </div>
    )
  }
}

ListenPage.propTypes = {
  id: React.PropTypes.string,
  status: React.PropTypes.string,
  instrument: React.PropTypes.object,
  eventCount: React.PropTypes.number,
  midiMessageCount: React.PropTypes.number
}

export default ListenPage
