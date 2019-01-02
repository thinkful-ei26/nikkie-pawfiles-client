import React from 'react';
import {connect} from 'react-redux';
import {deletePost} from '../../actions/post-crud';
import './memory-post.css'

export function MemoryPost(props){
  return(
    <li key={props.index} className={`${props.type.toLowerCase()} post`}>
      <div className="all-post-info">
        <h3 className="post-title">{props.title}</h3>
        <span className="post-date">{props.date}</span>
        {props.description && <p className="post-description">{props.description}</p>}
      </div>
      {props.memory_img && <img className="post-img" src={props.memory_img} alt={props.title}/>}
      <button onClick={()=>props.dispatch(deletePost(props.currentPetId, props.postId))}><i className="fas fa-trash-alt"></i></button>

    </li>
  );
}

function mapStateToProps(state) {
  return {
    currentPetId: state.pawfile.currentPetId,
  }
}

export default connect(mapStateToProps)(MemoryPost);