import React from 'react';
import {connect} from 'react-redux';
import PawfileBlurb from '../home/pawfile-blurb';
import ReminderBlurb from './reminder-blurb';

import './sidebar.css'

export class Sidebar extends React.Component{

  componentDidMount(){
    document.title = this.props.individualPawfile ? `${this.props.individualPawfile.name}` : "Pawfile";
  }

  componentDidUpdate(){
    document.title = this.props.individualPawfile ? `${this.props.individualPawfile.name}` : "Pawfile";
  }

  render(){
    console.log('rendering sidebar with props', this.props)
    //return redirect if individualpawfile doesnt exist
    return(
        <aside className="sidebar left"> 
          <PawfileBlurb {...this.props.individualPawfile}/>
          <ReminderBlurb {...this.props.individualPawfile} />
        </aside>      
      );
  }
}

const mapStateToProps = (state, props) => ({
  //find the pawfile with an id equal to the one passed down in props
  individualPawfile: state.pawfile.pawfiles.find(pawfile=>pawfile.id==props.id)
});

export default connect(mapStateToProps)(Sidebar);