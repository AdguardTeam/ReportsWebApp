Object.assign = require('object-assign');
var types = require('./constants.js');

var INITIAL_STATE = (function(){ 
    var _state = Object.create(null);

    _state.currentPage = 1;
    _state.nextPage = null;
    _state.duringPageAnimation = false;

    _state.productType = null;
    _state.updateAndroidOnlyUI = false;

    _state.problemType = null;

    _state.lastAnsweredChecklistIndex = null;
    _state.showFirstChecklist = false;
    _state.showNextChecklist = false;
    _state.updateChecklistSkip = false;
    _state.showResolvedText = false;

    _state.webOrApp = null;
    _state.updateWebOrAppPane = false; 

    _state.isBrowserOther = null;
    _state.updateBrowserFirstSelectionUI = false;
    _state.updateOtherBrowserUI = false;

    return _state;
})();

var reducer = function(state, action) {
    if(typeof state === 'undefined') {
        return INITIAL_STATE;
    }
    switch(action.type) {
        case types["MOVE_PAGE"]:
            return Object.assign({}, state, {
                nextPage: action.data
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
                showFirstChecklist: state.problemType === null ? false : true
            });
        case types["UPDATE_PRODUCT_TYPE"]:
            if(state.productType != action.data) {
                return Object.assign({}, state, {
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
        case types["UPDATE_ANDROID_ONLY_UI_COMPLETED"]:
            return Object.assign({}, state, {
                updateAndroidOnlyUI: false
            });
        case types["UPDATE_PROBLEM_TYPE"]:
            if(state.problemType != action.data) {
                return Object.assign({}, state, {
                    problemType: action.data,
                    showFirstChecklist: true,
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
                showNextChecklist: false
            });
        case types["SHOW_RESOLVED_TEXT_COMPLETED"]:
            return Object.assign({}, state, {
                showResolvedText: false
            });
        case types["UPDATE_CHECKLIST_SKIPPED_ENTRY_COMPLETED"]:
            return Object.assign({}, state, {
                updateChecklistSkip: false
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
                isBrowserOther: action.data == "Other" ? true : false,
                updateBrowserFirstSelectionUI: state.isBrowserOther === null ? true : false,
                updateOtherBrowserUI: true,
            });
        case types["UPDATE_BROWSER_FIRST_SELECTION_COMPLETED"]:
            return Object.assign({}, state, {
                updateBrowserFirstSelectionUI: false
            });
        case types["UPDATE_OTHER_BROWSER_UI_COMPLETED"]:
            return Object.assign({}, state, {
                updateOtherBrowserUI: false
            });
        default:
            return state;
    }
};

module.exports = reducer;