import React from 'react';
import { connect } from 'react-redux';

import { commentUpdate } from '../../dispatchers';


function Comments(props) {
    const onTextareaChange = (event) => {
        commentUpdate(event.currentTarget.value);
    };
    return (
        <div>
            <h1 className="title">Add your comment</h1>
            <div className="text">This step is optional. Type in the text box below any information that you think is necessary for the developers to know.</div>
            <textarea className="input input--textarea" value={props.comments.value} onChange={onTextareaChange} placeholder = "Enter any additional information here" rows={5}/>
        </div>
    );
}

export default Comments = connect((state) => ({
    comments: state.comments
}))(Comments);
