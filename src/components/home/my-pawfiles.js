import React from 'react';
import {connect} from 'react-redux';
import PawfilesList from './pawfiles-list';
import AddNewPawfileButton from './add-new-pawfile-button';
import PawfileForm from '../pawfile-form';
import SortBySelect from './sort-by-select';
import Header from './header';
import LoadingAnimation from '../loading-animation'
import {changeSearchTerm} from '../../actions/index';
import './my-pawfiles.css'

export class MyPawfiles extends React.Component{
  componentWillUnmount(){
    this.props.dispatch(changeSearchTerm(""));
  }

  render(){
     
    if(this.props.pawfilesPending){
      return(
        <LoadingAnimation/>
      )
    }


    let error;
    if (this.props.error) {
        error = (
            <div className="error-message" aria-live="polite">
                {this.props.error}
            </div>
        );
        window.scrollTo(0, 0);
    }

    return(
      <main>
        <div className="center-me">
        {error}
          <Header/>
          <nav className="options">
            {this.props.pawfiles.length>1 && <SortBySelect/>}
            {this.props.pawfiles.length>1 && <input onChange={e=>this.props.dispatch(changeSearchTerm(e.target.value))} className="tape" placeholder='Search Pets'/>}
            <AddNewPawfileButton/>
          </nav>
          {/* only allow user to sort if there's more than one pet */}
          <PawfilesList/>
          {(this.props.showPawfileForm && <PawfileForm/>)}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  pawfiles: state.pawfile.pawfiles,
  showPawfileForm: state.pawfile.showPawfileForm,
  error: state.pawfile.error,
  pawfilesPending: state.pawfile.pawfilesPending,
});

export default connect(mapStateToProps)(MyPawfiles);