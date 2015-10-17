
import React, { Component } from 'react'
import history from './history'
import LoadingPage from './LoadingPage'
import pubnub from './remote/pubnub'

export class NewChannel extends Component {
  componentDidMount () {
    const channelName = pubnub.uuid()
    history.replaceState(null, `/broadcast/${channelName}`)
  }
  componentWillUnmount () {
  }
  render () {
    return <LoadingPage />
  }
}

export default NewChannel
