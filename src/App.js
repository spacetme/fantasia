import React, { Component } from 'react'
import AudioEnabler from './AudioEnabler'

export class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='Appのheader'>
          <h1>fantasie.spacet.me</h1>
          <AudioEnabler />
        </div>
        {this.props.children}
        <footer>
          Piano soundfont: <a href='http://zenvoid.org/audio/'>Acoustic grand piano soundfont</a> &copy; 2008 by Roberto Gordo Saez, licensed CC-BY 3.0.
        </footer>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
