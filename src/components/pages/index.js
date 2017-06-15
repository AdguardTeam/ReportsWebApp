import React from 'react';
import { connect } from 'react-redux';
import ProdType from './ProdType.js';
import ProbType from './ProbType.js';
import ProbURL from './ProbURL.js';
import Filters from './Filters.js';
import Screenshots from './Screenshots.js';
import Comments from './Comments.js';
import SubmitAndCaptcha from './Submit.js';


function Pages(props) {
    switch(props.currentPage) {
        case 0:
            return (<ProdType/>);
        case 1:
            return (<ProbType/>);
        case 2:
            return (<ProbURL/>);
        case 3:
            return (<Filters/>);
        case 4:
            return (<Screenshots/>);
        case 5:
            return (<Comments/>);
        case 6:
            return (<SubmitAndCaptcha />);
        default:
            return null;
    }
}

export default connect(state => ({currentPage: state.currentPage}))(Pages);
