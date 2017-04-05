import React, { Component } from 'react';
import { Link } from 'react-router';
import AppContainer from '../../containers/AppContainer/AppContainer';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  render() {
    return(
      <div>
        <div>Future Grooves</div>
        {this.props.children}
      </div>
    )
  }
}

export default AppContainer(App);
