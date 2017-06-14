import React from 'react';
import { connect } from 'react-redux';
import { movePage } from '../dispatchers';


function NavButtons(props) {
    let completed = props.completedPages[props.currentPage];
    const onNavBtnClick = (event) => {
        if(event.target.name == "prev") {
            movePage(-1);
        }
        else if(event.target.name == "next") {
            if(completed) {
                movePage(1);
            }
        }
    };
    return (
        <div className="buttons">
            { props.currentPage > 0 && <button type="button" className="button button--green" name="prev" onClick={onNavBtnClick}>Prev</button> }
            { props.currentPage < 8 && <button type="button" className="button button--green" name="next" disabled={!completed} onClick={onNavBtnClick}>Next</button> }
        </div>
    );
}

export default connect(
    state => ({
        currentPage: state.currentPage,
        completedPages: state.completedPages
    })
)(NavButtons);
