import React, { Component } from 'react'

import url from 'url'

export class BroadcastPage extends Component {
  render () {
    return (
      <div className='BroadcastPage'>
        <h2>Now broadcasting!</h2>
        <p>{url.resolve(window.location.href, '#/listen/' + this.props.id)}</p>
      </div>
    )
  }
}

BroadcastPage.propTypes = {
  id: React.PropTypes.string
}

export default BroadcastPage
