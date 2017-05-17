import React, { Component } from 'react'
import IndividualSong from '../IndividualSong/IndividualSong'
import CompContainer from '../../containers/CompContainer'

export class Home extends Component {
  constructor(){
    super()
    this.state ={

    }
  }

  componentDidMount(){
    this.props.fetchAllCompositions()
  }

  loadComps(){
    return this.props.comps.data.map((comp, i) => {
      let attributes = (JSON.parse(comp.attributes))
      if(attributes) {
        return (
          <IndividualSong className="btn-play"
            key={i}
            name={attributes.compositionName}
            trackRacks={attributes.trackRacks}
            tempo={attributes.tempo}
            handleDelete={() => this.props.deleteComposition(comp.id)}/>
        )
      }
    })
  }

  render() {
    const { data } = this.props.comps
    return (
    <div>
      <div className="future-groove-stream">
        <h1>FutureGrooves Stream</h1>
        {data && <div>{this.loadComps()}</div>}
      </div>
      {/* <div className="future-groove-gif" >
        <img src="http://rs233.pbsrc.com/albums/ee50/manicpanicd/Pixels/wackywavinginflatablearmfailingtube.gif~c200" />
      </div> */}
    </div>
    )
  }
}

export default CompContainer(Home)
