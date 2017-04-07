import React from 'react';
import { connect } from 'react-redux';
import { movePage } from '../dispatchers';

class NavButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    movePage(event) {
        if(event.target.name == "prev") {
            movePage(-1);
        }
        else if(event.target.name == "next") {
            movePage(1);
        }
    }
    render(){
        return (
            <div>
                { this.props.currentPage > 0 && <button type="button" name="prev" onClick={this.movePage}>Prev</button> }
                { this.props.currentPage < 8 && <button type="button" name="next" onClick={this.movePage}>Next</button> }
            </div>
        );
    }
}

export default connect(
    state => ({currentPage: state.currentPage})
)(NavButtons);