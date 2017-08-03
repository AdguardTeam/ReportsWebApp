import React from 'react';
import { connect } from 'react-redux';

import { translator } from '../constants/strings';


function ProgressBar(props) {
    return (
        <div className="progress">
            <div className="progress__step">
                {translator.trans('global.progress_bar.step') + ' ' + (props.currentPage + 1) + '/8'}
            </div>
            <div className="progress__wrapper">
                <div className="progress__inner" role="progressbar" style={{'width': String(props.currentPage / 7 * 100) + '%'}}/>
            </div>
        </div>

    );
}

export default connect((state) => ({
    currentPage: state.currentPage
}))(ProgressBar);
