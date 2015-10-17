import React, { Component } from 'react'

export class InstrumentView extends Component {
  render () {
    return (
      <div className='InstrumentView'>
        <p>Instrument status: {this.renderStatus()}</p>
      </div>
    )
  }
  renderStatus () {
    let state = this.props.state
    if (!state) return 'waiting'
    if (state.progress < 1) {
      return 'loading instrument (' + Math.floor(state.progress) + '%)'
    } else {
      return 'loaded'
    }
  }
}

InstrumentView.propTypes = {
  state: React.PropTypes.object
}

export default InstrumentView
