import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../actions/auth';
import {UPDATED_USER_SUCCESS} from '../actions/user-crud'

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
      return Object.assign({}, state, {
          authToken: action.authToken
      });
  } else if (action.type === CLEAR_AUTH) {
      return Object.assign({}, state, {
          authToken: null,
          currentUser: null
      });
  } else if (action.type === AUTH_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } 
  else if (action.type === AUTH_SUCCESS) {
      console.log('in auth success')
      return Object.assign({}, state, {
          loading: false,
          currentUser: action.currentUser
      });
  } 
  else if (action.type === AUTH_ERROR) {
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      });
  } 
  //this only works when it updates. after refreshing, goes back to old info. doesnt maintain the current user info 
  else if (action.type=== UPDATED_USER_SUCCESS){
    console.log('in auth reducer, setting currentUser to', action.updatedUser)
    return Object.assign({}, state, {
        currentUser: action.updatedUser,
    });
  }
  return state;
}