import React from 'react';
import { connect } from 'react-redux';

import { commentUpdate } from '../../dispatchers';

import Translator from '../../constants/strings';


function Comments(props) {
    const onTextareaChange = (event) => {
        commentUpdate(event.currentTarget.value);
    };
    return (
        <div>
            <h1 className="title">{Translator.trans('6Title')}</h1>
            <div className="text">{Translator.trans('6SubText')}</div>
            <textarea className="input input--textarea" value={props.comments.value} onChange={onTextareaChange} placeholder = {Translator.trans('6CommentPh')} rows={5}/>
        </div>
    );
}

export default Comments = connect((state) => ({
    comments: state.comments
}))(Comments);
