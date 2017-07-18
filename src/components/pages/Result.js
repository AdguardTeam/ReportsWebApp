import React from 'react';
import { connect } from 'react-redux';

import Translator from '../../constants/strings';


function Result(props) {
    if (props.issueUrl.validity === false) {
        return (
            <div>
                <h1 className="title">{Translator.trans('8TitleOnFail')}</h1>
                <div className="text">{Translator.trans('8Sub1OnFail')}</div>
                <div className="text">{Translator.trans('8Sub2OnFail')}</div>
                {/* With a back button */}
            </div>
        )
    } else if (props.issueUrl.validity === true) {
        return (
            <div>
                <h1 className="title">{Translator.trans('8TitleOnSuccess')}</h1>
                <div className="text">{Translator.trans('8Sub1OnSuccess')}</div>
                <div className="text">{Translator.trans('8Sub2OnSuccess')}</div>
                <div className="text"><a className="link" href={props.issueUrl.value}>{props.issueUrl.value}</a></div>
            </div>
        );
    }
}

export default connect((state) => ({
    issueUrl: state.issueUrl
}))(Result);
