import React from 'react';
import { connect } from 'react-redux';
import ProdType from './ProdType.js';
import ProbType from './ProbType.js';
import ProbURL from './ProbURL.js';
import Filters from './Filters.js';
import Screenshots from './Screenshots.js';

class Pages extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        switch(this.props.currentPage) {
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
            default:
                return null;
        }
    }
}

export default connect(state => ({currentPage: state.currentPage}))(Pages);