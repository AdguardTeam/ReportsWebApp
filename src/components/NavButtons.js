import React from 'react';
import { connect } from 'react-redux';
import { movePage } from '../dispatchers';

import store from '../reducers';
import { extractDomain } from '../utils/parse-url.js';


const PAGE_START = 0;
const PAGE_SUBMIT = 7;

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
    const onSubmitBtnClick = () => {
/*
        TEMPORARILY DISABLED FOR TESTING
        if(props.captchaResponse.validity) {
            submit();
        }
*/
        submit();
    }
    return (
        <div>
            { props.currentPage > PAGE_START && <button type="button" name="prev" onClick={onNavBtnClick}>Prev</button> }
            { props.currentPage < PAGE_SUBMIT && <button type="button" name="next" disabled={!completed} onClick={onNavBtnClick}>Next</button> }
            { props.currentPage == PAGE_SUBMIT && <button type="button" name="submit" disabled={props.captchaResponse.validity} onClick={onSubmitBtnClick}>Submit</button> }
        </div>
    );
}

export default connect(
    state => ({
        currentPage: state.currentPage,
        completedPages: state.completedPages,
        captchaResponse: state.captchaResponse
    })
)(NavButtons);


const getIssueTitle = (state) => {
    return extractDomain(state.problemURL.value) + " - " + state.problemType.value;
};

const getIssueBody = (state) => {

    const NEW_LINE = '\n';
    const buf = [];

    buf.push('[//]: # (***You can leave the strings with "[//]:" They will not be added to the issue text)');
    buf.push('[//]: # (***Строки, которые начинаются с "[//]:" можно не удалять. Они не будут видны)');
    buf.push('');

    if(state.comments.validity) {
        buf.push("***Comment***: " + state.comments.value)
    }

    buf.push("Screenshot: ");

    state.screenshotURLs.forEach((el, index) => {
        buf.push(`[${index}](${el})`);
    })
    buf.push('');

    buf.push("***System configuration***");
    buf.push("Information | value");
    buf.push("--- | ---");
    buf.push("Adguard version: | " + state.productVersion.value);
    buf.push("Browser: | " + ( state.browserSelection.value == "Other" ? state.browserDetail.value : state.browserSelection.value ));
    buf.push("Filters: | " + state.selectedFilters.toString());

    return buf.join(NEW_LINE);
};

const getLabels = (state) => {
    let labels = [];
    labels.push(state.problemType.value);
    if(state.probOnWebOrApp.value == "app") {
        labels.push("Android");
    }
}

function submit() {
    let state = store.getState();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit.json');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {

        } else { /* some err handling */ }
    };

    let issueData = JSON.stringify({
        'title': getIssueTitle(state),
        'body': getIssueBody(state),
        'label': getLabels(state),
        'g-recaptcha-response': state.captchaResponse // http://emumba.com/blog/2016-12-07-setting-up-google-recaptcha-in-a-reactjs-app/
    });

    console.log(JSON.stringify(issueData));

    xhr.onerror = () => { /* some err handling */ };
    xhr.send(issueData);
}
