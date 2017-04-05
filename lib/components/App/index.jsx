import React, { Component } from 'react';
import { Link } from 'react-router';
// import AppContainer from '../../containers/App';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <div>
        <div>Future Grooves</div>
      </div>
    )
  }
}

export default App;
