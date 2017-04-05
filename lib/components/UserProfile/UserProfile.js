import React, { Component } from 'react';
import { Link } from 'react-router';

export class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  render() {
    return(
      <div>
        <h1>UserProfile</h1>
      </div>
    )
  }
}

export default UserProfile;
