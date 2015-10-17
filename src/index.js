import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

// import pubnub from './pubnub'
// import now from './now'
// import remoteAction川ForChannel from './remoteAction川ForChannel'

import App from './App'
import IndexPage from './IndexPage'
import PlayAlone from './PlayAlone'
import Broadcast from './Broadcast'
import Listen from './Listen'
import NewChannel from './NewChannel'
import NotFoundPage from './NotFoundPage'
import history from './history'

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={IndexPage} />
      <Route path='alone' component={PlayAlone} />
      <Route path='new' component={NewChannel} />
      <Route path='broadcast/:id' component={Broadcast} />
      <Route path='listen/:id' component={Listen} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Router>
), document.querySelector('#root'))

// if (window.location.search.match(/play/)) {
//   play()
// } else {
//   broadcast()
// }

// function broadcast () {
//   const actions川 = (action川
//     .map(withNow)
//     .bufferWithTime(1000)
//   )
//   actions川.subscribe(actions => {
//     const message = { time: now(), actions }
//     pubnub.publish({ channel: 'hello', message: message })
//   })
// }
//
// function play () {
//   let piano = new Piano()
//   piano.progress.subscribe(progress => console.log(progress))
//   let remoteAction川 = remoteAction川ForChannel('hello')
//   log('Subscribing!')
//   remoteAction川.subscribe(function (action) {
//     log(JSON.stringify(action))
//     performAction(action, piano)
//   })
// }
