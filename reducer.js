Object.assign = require('object-assign');
var types = require('./constants/action-types.js');

var INITIAL_STATE = (function(){ 
    var _state = Object.create(null);

    _state.currentPage = 1;
    _state.nextPage = null;
    _state.duringPageAnimation = false;

    _state.completedPages = [false, false, false, true, false, true, true, false];
    _state.toggleNextBtn = null;

    _state.validatePage = false;

    _state.productType = null;
    _state.updateAndroidOnlyUI = false;

    _state.isProdVerValid = false;

    _state.problemType = null;

    _state.lastAnsweredChecklistIndex = null;
    _state.showFirstChecklist = false;
    _state.showFirstChecklistOnPageFocus = false;
    _state.showNextChecklist = false;
    _state.updateChecklistSkip = false;
    _state.showResolvedText = false;

    _state.webOrApp = null;
    _state.updateWebOrAppPane = false; 

    _state.isBrowserOther = null;
    _state.updateBrowserFirstSelectionUI = false;
    _state.updateOtherBrowserUI = false;

    _state.isScreenshotURLValid = false;

    return _state;
})();


function validateVersion(ver) {
    return /^\d+(?:\.\d+(?:\.\d+)?)?$/.test(ver)
}

function validateURL(url) {
    return /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/.test(url);
}

function validatePlayStoreURL(url) {
    return /^(https?\:\/\/)?play\.google\.com\/store\/apps\/details\?id=/.test(url);
}


var reducer = function(state, action) {
    if(typeof state === 'undefined') {
        return INITIAL_STATE;
    }
    switch(action.type) {
        case types["MOVE_PAGE"]:
            return Object.assign({}, state, {
                nextPage: action.data,
                toggleNextBtn: state.completedPages[action.data - 1]
            });
        case types["DURING_PAGE_FADE_OUT"]:
            return Object.assign({}, state, {
                duringPageFadeOut: true
            });
        case types["DURING_PAGE_FADE_IN"]:
            return Object.assign({}, state, {
                duringPageFadeOut: false,
                duringPageFadeIn: true
            });
        case types["MOVE_PAGE_COMPLETED"]:            
            return Object.assign({}, state, {
                currentPage: state.nextPage,
                nextPage: null,
                duringPageFadeIn: false,
                showFirstChecklist: state.problemType !== null && state.showFirstChecklistOnPageFocus ? true : false
            });
        case types["PAGE_FORM_VALIDATE"]:
            var temp = [];
            temp[state.currentPage - 1] = action.data;
            return Object.assign({}, state, {
                completedPages: Object.assign([], state.completedPages, temp),
                toggleNextBtn: action.data,
                validatePage: false
            });
        case types["TOGGLE_NEXT_BUTTON_COMPLETED"]:
            return Object.assign({}, state, {
                toggleNextBtn: null
            });
        case types["UPDATE_PRODUCT_TYPE"]:
            if(state.productType != action.data) {
                return Object.assign({}, state, {
                    validatePage: true,
                    productType: action.data,
                    updateAndroidOnlyUI: true,
                    updateChecklistSkip: true,
                    webOrApp: action.data == 'And' ? null : 'web',
                    updateWebOrAppPane: true
                });
            }
            else {
                return state;
            }
            break;
        case types["UPDATE_PRODUCT_VERSION"]:
            return Object.assign({}, state, {
                validatePage: true,
                isProdVerValid: validateVersion(action.data)
            });
        case types["UPDATE_ANDROID_ONLY_UI_COMPLETED"]:
            return Object.assign({}, state, {
                updateAndroidOnlyUI: false
            });
        case types["UPDATE_PROBLEM_TYPE"]:
            if(state.problemType != action.data) {
                return Object.assign({}, state, {
                    problemType: action.data,
                    updateChecklistSkip: true
                });
            }
            else {
                return state;
            }
        case types["CHECKLIST_ANSWER_Y"]:
            return Object.assign({}, state, {
                showNextChecklist: true,
                lastAnsweredChecklistIndex: action.data
            });
        case types["CHECKLIST_ANSWER_N"]:
            return Object.assign({}, state, {
                showResolvedText: true,
                lastAnsweredChecklistIndex: action.data
            });
        case types["SHOW_CHECKLIST_COMPLETE"]:
            return Object.assign({}, state, {
                showFirstChecklist: false,
                showFirstChecklistOnPageFocus: false,
                showNextChecklist: false
            });
        case types["SHOW_RESOLVED_TEXT_COMPLETED"]:
            return Object.assign({}, state, {
                showResolvedText: false
            });
        case types["UPDATE_CHECKLIST_SKIPPED_ENTRY_COMPLETED"]:
            var temp = [];
            temp[1] = false;
            return Object.assign({}, state, {
                updateChecklistSkip: false,
                showFirstChecklist: state.currentPage == 2 ? true : false,
                showFirstChecklistOnPageFocus: state.currentPage == 2 ? false : true,
                completedPages: Object.assign([], state.completedPages, temp)
            });
        case types["WEB_OR_APP"]:
            return Object.assign({}, state, {
                webOrApp: action.data,
                updateWebOrAppPane: true
            });
        case types["UPDATE_WEB_OR_APP_PANE_COMPLETED"]:
            return Object.assign({}, state, {
                updateWebOrAppPane: false
            });
        case types["BROWSER_CHANGED"]:
            return Object.assign({}, state, {
                validatePage: true,
                isBrowserOther: action.data == "Other" ? true : false,
                updateBrowserFirstSelectionUI: state.isBrowserOther === null ? true : false,
                updateOtherBrowserUI: true,
            });
        case types["BROWSER_NAME_CHANGED"]:
            return Object.assign({}, state, {
                validatePage: true
            });
        case types["UPDATE_BROWSER_FIRST_SELECTION_COMPLETED"]:
            return Object.assign({}, state, {
                updateBrowserFirstSelectionUI: false
            });
        case types["UPDATE_OTHER_BROWSER_UI_COMPLETED"]:
            return Object.assign({}, state, {
                updateOtherBrowserUI: false
            });
        case types["UPDATE_PROBLEM_URL"]:
            return Object.assign({}, state, {
                isProbURLValid: state.webOrApp == 'web' ? validateURL(action.data) : validatePlayStoreURL(action.data),
                validatePage: true
            });
        case types["UPDATE_SCREENSHOT_URL"]:
            return Object.assign({}, state, {
                isScreenshotURLValid: validateURL(action.data),
                validatePage: true
            });
        default:
            return state;
    }
};

module.exports = reducer;