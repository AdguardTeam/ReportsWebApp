import React from 'react';
import { connect } from 'react-redux';


function Result(props) {
    if (props.issueUrl.validity === false) {
        return (
            <div>
                <h1 className="title">Your report couldn't be submitted</h1>
                <div className="text">This could be a temporary network connectivity problem.</div>
                <div className="text">Please try again later.</div>
                {/* With a back button */}
            </div>
        )
    } else if (props.issueUrl.validity === true) {
        return (
            <div>
                <h1 className="title">Your report has been submitted!</h1>
                <div className="text">Thank you for reporting the issue.</div>
                <div className="text">You can keep track of the progress of your report in the below link:</div>
                <div className="text"><a className="link" href={props.issueUrl.value}>{props.issueUrl.value}</a></div>
            </div>
        );
    }
}

export default connect((state) => ({
    issueUrl: state.issueUrl
}))(Result);
