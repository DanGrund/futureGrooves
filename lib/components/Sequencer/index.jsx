import React, { Component } from 'react';
import { Link } from 'react-router';

export class Sequencer extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  render() {
    return(
      <div>
        <h1>Sequencer</h1>
      </div>
    )
  }
}

export default Sequencer;
