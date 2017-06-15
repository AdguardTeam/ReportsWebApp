import React from 'react';
import { connect } from 'react-redux';


function ProgressBar(props) {
    return (
        <div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{'width': String(props.currentPage / 7 * 100) + '%'}}/>
            </div>
            <div>
                <span>{"Step " + (props.currentPage + 1) + "/8"}</span>
            </div>
        </div>

    )
}

export default connect((state) => ({
    currentPage: state.currentPage
}))(ProgressBar);
