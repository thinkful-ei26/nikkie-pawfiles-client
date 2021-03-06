import React from 'react';
import {connect} from 'react-redux';
import Input from '../input';
import {reduxForm, Field, focus} from 'redux-form';
import {updatedUser} from '../../actions/user-crud';
import {required, nonEmpty, isTrimmed} from '../validators';
import {formatName} from '../helper-functions'

export class BasicAccountInfoForm extends React.Component{
  onSubmit(values) {
    const {username, firstName, lastName} = values;
    const user = {username, firstName, lastName};
    user.firstName = formatName(user.firstName);
    return this.props.dispatch(updatedUser(user));
}

  render(){
    let error;
    if (this.props.error) {
        error = (
            <div className="form-error" aria-live="polite">
                {this.props.error}
            </div>
        );
    }
  
    return(
        <form
          className="settings-form form"
          onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
          )}>
          <h2>Account</h2>
          {error}
          <Field 
              component={Input} 
              type="text" 
              name="firstName" 
              label="First Name:"
              maxLength="12"
              className="required"
              validate={[required, nonEmpty, isTrimmed]}
          />
          <Field 
              component={Input} 
              type="text" 
              name="lastName" 
              label="Last Name:"
              className="required"
              validate={[required, nonEmpty, isTrimmed]}
          />
          <Field
              component={Input}
              type="text"
              name="username"
              label = "Username:"
              className="required"
              validate={[required, nonEmpty, isTrimmed]}
          />

          <button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Update Account
          </button>
        </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    // to get the initial values if the user is editing the form: 
    initialValues: {
      firstName: state.auth.currentUser.firstName,
      lastName: state.auth.currentUser.lastName,
      username: state.auth.currentUser.username,
    }
  }
}

export default connect(mapStateToProps)(reduxForm({
  form:'BasicAccountInfoForm',
  onSubmitFail: (error, dispatch) => {
    dispatch(focus('BasicAccountInfoForm', Object.keys(error)[0]));
}
})(BasicAccountInfoForm));