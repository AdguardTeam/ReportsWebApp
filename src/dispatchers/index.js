import store from '../reducers';

export function movePage(amount) {
    store.dispatch({
        type: "MOVE_PAGE",
        data: amount
    });
}

export function productTypeChange(val) {
    store.dispatch({
        type: "UPDATE_PRODUCT_TYPE",
        data: val
    });
}

export function productVersionChange(val) {
    console.log(val);
    store.dispatch({
        type: "UPDATE_PRODUCT_VERSION",
        data: val
    });
}

export function problemTypeChange(val) {
    store.dispatch({
        type: "UPDATE_PROBLEM_TYPE",
        data: val
    });
}

export function checklistAnswerChange(val) {
    store.dispatch({
        type: "UPDATE_CHECKLIST_ANSWER",
        data: val
    });
}

export function webOrAppChange(val) {
    store.dispatch({
        type: "UPDATE_WEB_OR_APP",
        data: val
    });
}

export function browserSelectionChange(val) {
    store.dispatch({
        type: "UPDATE_BROWSER_SELECTION",
        data: val
    });
}

export function browserDetailChange(val) {
    store.dispatch({
        type: "UPDATE_BROWSER_DETAIL",
        data: val
    });
}

export function problemURLChange(val) {
    store.dispatch({
        type: "UPDATE_PROBLEM_URL",
        data: val
    });
}

export function filtersUpdate(val) {
    store.dispatch({
        type: "UPDATE_ENABLED_FILTERS",
        data: val
    });
}

export function screenshotURLCurrentUpdate(val) {
    store.dispatch({
        type: "UPDATE_SCREENSHOT_URL_CURRENT",
        data: val
    });
}

export function screenshotsUpdate(val) {
    store.dispatch({
        type: "UPDATE_SCREENSHOT_URLS",
        data: val
    });
}

export function commentUpdate(val) {
    store.dispatch({
        type: "UPDATE_COMMENTS",
        data: val
    });
}