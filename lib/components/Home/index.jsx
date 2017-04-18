import React from 'react';
import IndividualSong from '../IndividualSong/IndividualSong'

export class Home extends Component {
  constructor(){
    super()
    this.state ={

    }
  }

  componentDidMount(){
    
  }

  render() {
    return(
      <div>
        <ul className='stream'>
          <li>Stream 1</li>
          <li>Stream 2</li>
          <li>Stream 3</li>
        </ul>
      </div>
      )
    }
}

export default Home
