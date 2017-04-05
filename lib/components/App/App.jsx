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
        <div>Hi der hey der ho der World!</div>
        <button onClick={this.props.increase.bind(this)}>Increase</button>
        <button onClick={this.props.decrease.bind(this)}>
          Decrease
        </button>

        <input onChange={(e) => {this.setState({ name: e.target.value })}}></input>
        <button onClick={() => this.props.storeShit(this.state.name)}>Store Shit</button>
        {this.props.count}
      </div>
    )
  }
}

export default AppContainer(App);
