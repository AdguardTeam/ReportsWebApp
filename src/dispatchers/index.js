import store from '../reducers';

export function movePage(amount) {
    store.dispatch({
        type: 'MOVE_PAGE',
        data: amount
    });
}

export function productTypeChange(val) {
    store.dispatch({
        type: 'UPDATE_PRODUCT_TYPE',
        data: val
    });
}

export function productVersionChange(val) {
    store.dispatch({
        type: 'UPDATE_PRODUCT_VERSION',
        data: val
    });
}

export function problemTypeChange(val) {
    store.dispatch({
        type: 'UPDATE_PROBLEM_TYPE',
        data: val
    });
}

export function checklistAnswerChange(val) {
    store.dispatch({
        type: 'UPDATE_CHECKLIST_ANSWER',
        data: val
    });
}

export function problemURLChange(val) {
    store.dispatch({
        type: 'UPDATE_PROBLEM_URL',
        data: val
    });
}


export function addFilter(val) {
    store.dispatch({
        type: 'ADD_NEW_SELECTED_FILTER',
        data: val
    });
}

export function deleteFilter(val) {
    store.dispatch({
        type: 'DELETE_SELECTED_FILTER',
        data: val
    });
}

export function wfpAnswerChange(val) {
    store.dispatch({
        type: 'UPDATE_WFP_ANSWER',
        data: val
    });
}

export function stealthAnswerChange(val) {
    store.dispatch({
        type: 'UPDATE_STEALTH_ANSWER',
        data: val
    });
}

export function stealthOptionAnswerChange(index, value) {
    store.dispatch({
        type: 'UPDATE_STEALTH_OPTION_ANSWER',
        data: {
            index,
            value
        }
    });
}

export function stealthOptionDetailAnswerChange(index, value) {
    store.dispatch({
        type: 'UPDATE_STEALTH_OPTION_ANSWER_DETAIL',
        data: {
            index,
            value
        }
    });
}

export function androidFilteringModeChange(value) {
    store.dispatch({
        type: 'UPDATE_ANDROID_FILTERING_MODE',
        data: value
    });
}

export function androidFilteringMethodChange(value) {
    store.dispatch({
        type: 'UPDATE_ANDROID_FILTERING_METHOD',
        data: value
    });
}

export function iosSystemWideFilteringChange(value) {
    store.dispatch({
        type: 'UPDATE_IOS_SYSTEM_WIDE_FILTERING',
        data: value
    });
}

export function iosSimplifiedFiltersModeChange(value) {
    store.dispatch({
        type: 'UPDATE_IOS_SIMPLIFIED_FILTERS_MODE',
        data: value
    });
}

export function iosDNSChange(value) {
    store.dispatch({
        type: 'UPDATE_IOS_DNS',
        data: value
    });
}

export function iosCustomDNSNameChange(value) {
    store.dispatch({
        type: 'UPDATE_IOS_CUSTOM_DNS_NAME',
        data: value
    });
}

export function otherSoftwareNameChanged(value) {
    store.dispatch({
        type: 'UPDATE_OTHER_SOFTWARE_NAME',
        data: value
    });
}

export function webOrAppChange(val) {
    store.dispatch({
        type: 'UPDATE_WEB_OR_APP',
        data: val
    });
}

export function browserSelectionChange(val) {
    store.dispatch({
        type: 'UPDATE_BROWSER_SELECTION',
        data: val
    });
}

export function browserDetailChange(val) {
    store.dispatch({
        type: 'UPDATE_BROWSER_DETAIL',
        data: val
    });
}

export function dataCompEnabledChange(val) {
    store.dispatch({
        type: 'UPDATE_DATA_COMPRESSION_ENABLED',
        data: val
    });
}

export function nsfwChange(val) {
    store.dispatch({
        type: 'UPDATE_NSFW_URL',
        data: val
    });
}

export function screenshotURLCurrentUpdate(val) {
    store.dispatch({
        type: 'UPDATE_SCREENSHOT_URL_CURRENT',
        data: val
    });
}

export function addScreenshotUrl() {
    store.dispatch({
        type: 'ADD_SCREENSHOT_URL'
    });
}

export function deleteScreenshotUrl(val) {
    store.dispatch({
        type: 'DELETE_SCREENSHOT_URL',
        data: val
    });
}

export function screenshotIsLoaded(val) {
    store.dispatch({
        type: 'LOAD_SCREENSHOT',
        data: val
    });
}

export function screenshotIsErrored(val) {
    store.dispatch({
        type: 'ERROR_SCREENSHOT',
        data: val
    });
}

export function commentUpdate(val) {
    store.dispatch({
        type: 'UPDATE_COMMENTS',
        data: val
    });
}

export function receivedCaptchaResponse(val) {
    store.dispatch({
        type: 'UPDATE_CAPTCHA_RESPONSE',
        data: val
    });
}

export function startSubmitRequest() {
    store.dispatch({
        type: 'SUBMIT_REQUEST_SENT'
    });
}

export function completeSubmitResponse(val) {
    store.dispatch({
        type: 'SUBMIT_RESPONSE_COMPLETED',
        data: val
    });
}
