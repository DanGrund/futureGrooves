import React, { Component } from 'react';
import { Link } from 'react-router';

export class SoundMaker extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  render() {
    return(
      <div>
        <h1>SoundMaker PLayer</h1>
      </div>
    )
  }
}

export default SoundMaker;
