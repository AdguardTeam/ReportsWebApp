import React from 'react';
import { connect } from 'react-redux';

import { translator } from '../../constants/strings';


function Result(props) {
    if (props.issueUrl.validity === false) {
        return (
            <div>
                <h1 className="title">{translator.trans('step_8.title.fail')}</h1>
                <div className="text">{translator.trans('step_8.sub1.fail')}</div>
                <div className="text">{translator.trans('step_8.sub2.fail')}</div>
                {/* With a back button */}
            </div>
        )
    } else if (props.issueUrl.validity === true) {
        return (
            <div>
                <h1 className="title">{translator.trans('step_8.title.success')}</h1>
                <div className="text">{translator.trans('step_8.sub1.success')}</div>
                <div className="text">{translator.trans('step_8.sub2.success')}</div>
                <div className="text"><a className="link" href={props.issueUrl.value}>{props.issueUrl.value}</a></div>
            </div>
        );
    }
}

export default connect((state) => ({
    issueUrl: state.issueUrl
}))(Result);
