import React from 'react';
import { connect } from 'react-redux';
import { movePage } from '../dispatchers';

import store from '../reducers';
import { extractDomain } from '../utils/parse-url.js';

import * as PAGE from '../constants/page_num.js';

import submit from '../send-report.js';

import Translator from '../constants/strings';


function NavButtons(props) {
    let completed = props.completedPages[props.currentPage];
    const onNavBtnClick = (event) => {
        if (event.target.name == 'prev') {
            movePage(-1);
        } else if (event.target.name == 'next') {
            if (completed) {
                movePage(1);
            }
        }
    };
    const onSubmitBtnClick = () => {
        submit();
    };

    if (props.waitingResponse) {
        return null;
    }

    return (
        <div className="buttons">
            { props.currentPage > PAGE.START && ( props.currentPage < PAGE.RESULT || !props.issueUrl.validity ) && <button type="button" className="button button--green" name="prev" onClick={onNavBtnClick}>{Translator.trans('global.nav.prev')}</button> }
            { props.currentPage < PAGE.SUBMIT && <button type="button" className="button button--green" name="next" disabled={!completed} onClick={onNavBtnClick}>{Translator.trans('global.nav.next')}</button> }
            { props.currentPage == PAGE.SUBMIT && <button type="button" className="button button--green" name="submit" disabled={process.env.NODE_ENV === 'production' ? !props.captchaResponse.validity : false} onClick={onSubmitBtnClick}>{Translator.trans('global.nav.submit')}</button> }
        </div>
    );
}

export default connect(
    state => ({
        currentPage: state.currentPage,
        completedPages: state.completedPages,
        captchaResponse: state.captchaResponse,
        waitingResponse: state.waitingResponse,
        issueUrl: state.issueUrl
    })
)(NavButtons);
