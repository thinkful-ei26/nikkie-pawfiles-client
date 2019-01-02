import React from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../helper-functions';
import {deleteReminder} from '../../actions/reminder-crud';

import './reminder.css'

export class Reminder extends React.Component{

  render(){
    console.log('in reminders petid is', this.props.currentPetId, 'and reminderid is', this.props.reminderId);
    return(
      <li data-id={`${this.props.reminderId}`} className="reminder">
        <button onClick={()=>{this.props.dispatch(deleteReminder(this.props.currentPetId, this.props.reminderId))}} className="delete-reminder">X</button>
        <span className="reminder-note">
          <strong>{this.props.note}</strong>
        </span>
        <span className="reminder-date">
          {formatDate(this.props.date).toLocaleDateString()}
        </span>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentPetId: state.pawfile.currentPetId,
  }
}

export default connect(mapStateToProps)(Reminder);