import React, { Component } from 'react'

import load from './load.gif'


export class Spinner extends Component {
  render() {
    return (
      <div className='text-center' >
        <img src={load} className='my-3'  alt="loading" />
      </div>
    )
  }
}

export default Spinner
