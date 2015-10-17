import React, { Component } from 'react'
import { Link } from 'react-router'

export class IndexPage extends Component {
  render () {
    return (
      <div className='IndexPage'>
        <p>Broadcast what you’re playing!</p>
        <ul>
          <li>Plug in your MIDI keyboard and <Link to='/new'>start broadcasting!</Link> (or just <Link to='/alone'>play alone</Link>)</li>
        </ul>
      </div>
    )
  }
}

export default IndexPage
