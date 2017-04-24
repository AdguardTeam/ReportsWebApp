Object.assign = require('object-assign');
import { createStore } from 'redux';
import { checklists } from '../constants/input-options.js';

function InputData(value, validity) {
    this.value = value;
    this.validity = validity;
}

function validateVersion(ver) {
    return /^\d+(?:\.\d+(?:\.\d+)?)?$/.test(ver);
}

function validateURL(url) {
    return /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/.test(url);
}

function validatePlayStoreURL(url) {
    return /^(https?\:\/\/)?play\.google\.com\/store\/apps\/details\?id=/.test(url);
}

function shouldSkip(skip, productType, problemType) {
    if(skip) {
        if(skip.on_prod) {
            if(skip.on_prod.indexOf(productType) != -1) {
                return true;
            }
        }
        if(skip.except_on_prob) {
            if(skip.except_on_prob.indexOf(problemType) == -1) {
                return true;
            }
        }
        return false;
    }
    else {
        return false;
    }
}

const INITIAL_STATE = (function() {
    var _state = Object.create(null);

    _state.currentPage = 0;
    _state.completedPages = [false/*ProdType*/, false/*ProbType*/, false/*ProbURL*/, true/*Filters*/, false/*Screenshots*/, true/*Comments*/, true/*Submit&Captcha*/, false];

    _state.productType = new InputData('', false);
    _state.productVersion = new InputData('', false);

    _state.problemType = new InputData('', false);

    _state.checklistAnswers = [null, undefined, undefined, undefined];

    _state.isResolvedTextVisible = false;

    _state.probOnWebOrApp = null;

    _state.browserSelection = new InputData('', false);
    _state.browserDetail = new InputData('', false);

    _state.problemURL = new InputData('', false);

    _state.isDataCompressionEnabled = undefined;

    _state.selectedFilters = [];

    _state.screenshotURLCurrent = new InputData('', false);
    _state.screenshotURLs = [];

    _state.comments = new InputData('', true);

    return _state;
})();

function validatePage0(productType, productVersion) {
    return productType.validity && productVersion.validity;
}

function validatePage2(probURL, probOnWebOrApp, browserSelection, browserDetail) {
    return probURL.validity && (
        (
            probOnWebOrApp == 'web' && browserSelection.validity && (browserSelection.value != "Other" || browserDetail.validity)
        )
        || probOnWebOrApp == 'app'
    );
}

const reducer = function(state, action) {
    if(typeof state === 'undefined') {
        return INITIAL_STATE;
    }
    switch(action.type) {
        case "MOVE_PAGE": {
            return Object.assign({}, state, {
                currentPage: state.currentPage + action.data
            });
        }
        case "UPDATE_PRODUCT_TYPE": {
            if(state.productType.value !== action.data) {
                let newProbOnWebOrApp = action.data == "And" ? null : "web";
                let newProductType = new InputData(action.data, true);
                return Object.assign({}, state, {
                    productType: newProductType,
                    checklistAnswers: INITIAL_STATE.checklistAnswers,
                    probOnWebOrApp: newProbOnWebOrApp,
                    completedPages: Object.assign([], state.completedPages, {
                        '0': validatePage0(newProductType, state.productVersion),
                        '1': false,
                        '2': state.prodOnWebOrApp == newProbOnWebOrApp ? state.completedPages[2] : false // reset page validity only when it is updated
                    })
                });
            }
            return state;
        }
        case "UPDATE_PRODUCT_VERSION": {
            let newProductVersion = new InputData(action.data, validateVersion(action.data));
            return Object.assign({}, state, {
                productVersion: newProductVersion,
                completedPages: Object.assign([], state.completedPages, {
                    '0': validatePage0(state.productType, newProductVersion)
                })
            });
        }
        case "UPDATE_PROBLEM_TYPE": {
            if(state.problemType.value !== action.data) {
                return Object.assign({}, state, {
                    problemType: new InputData(action.data, true),
                    checklistAnswers: INITIAL_STATE.checklistAnswers,
                    completedPages: Object.assign([], state.completedPages, {
                        '2': false
                    })
                });
            }
            return state;
        }
        case "UPDATE_CHECKLIST_ANSWER": {
            let answerTF = action.data.value, answerIndex = action.data.index;
            let isPage1Validated;
            let tmp = Object.assign([], state.checklistAnswers, {
                [answerIndex]: answerTF
            });
            if(answerTF) {
                let nextIndex = checklists.findIndex((el, index) => (index > answerIndex && !shouldSkip(el.skip, state.productType.value, state.problemType.value)));
                if(nextIndex !== -1) {
                    tmp = Object.assign([], tmp, {
                        [nextIndex]: null
                    }); // make it visible
                    isPage1Validated = false;
                }
                else {
                    isPage1Validated = true; // page 1 is validated
                }
            }
            else {
                tmp = tmp.map((el, index) => ( index > answerIndex ? undefined : el )); // hide subsequent checklists
                isPage1Validated = false; // problem is resolved, no need to proceed with the wizard
            }
            return Object.assign({}, state, {
                checklistAnswers: tmp,
                isResolvedTextVisible: !answerTF,
                completedPages: Object.assign([], state.completedPages, {
                    '1': isPage1Validated
                })
            });
        }
        case "UPDATE_WEB_OR_APP": {
            let newProbOnWebOrApp = action.data;
            return Object.assign({}, state, {
                probOnWebOrApp: newProbOnWebOrApp,
                completedPages: Object.assign([], state.completedPages, {
                    '2': validatePage2(state.problemURL, newProbOnWebOrApp, state.browserSelection, state.browserDetail)
                })
            });
        }
        case "UPDATE_BROWSER_SELECTION": {
            let newBrowserSelection = new InputData(action.data, true);
            let newBrowserDetail = action.data == "Other" ? state.browserDetail : new InputData(undefined, false); // Or maybe it can be cleared not immediately, only after a page navigation.
            return Object.assign({}, state, {
                browserSelection: newBrowserSelection,
                browserDetail: newBrowserDetail,
                completedPages: Object.assign([], state.completedPages, {
                    '2': validatePage2(state.problemURL, state.probOnWebOrApp, newBrowserSelection, newBrowserDetail)
                })
            });
        }
        case "UPDATE_BROWSER_DETAIL": {
            let newBrowserDetail = new InputData(action.data, action.data.length > 0);
            return Object.assign({}, state, {
                browserDetail: newBrowserDetail,
                completedPages: Object.assign([], state.completedPages, {
                    '2': validatePage2(state.problemURL, state.probOnWebOrApp, state.browserSelection, newBrowserDetail)
                })
            });
        }
        case "UPDATE_PROBLEM_URL": {
            let newProblemURL = new InputData(action.data, state.probOnWebOrApp=="web" ? validateURL(action.data) : validatePlayStoreURL(action.data));
            return Object.assign({}, state, {
                problemURL: newProblemURL,
                completedPages: Object.assign([], state.completedPages, {
                    '2': validatePage2(newProblemURL, state.probOnWebOrApp, state.browserSelection, state.browserDetail)
                })
            });
        }
        case "UPDATE_ENABLED_FILTERS": {
            return Object.assign({}, state, {
                selectedFilters: action.data
            });
        }
        case "UPDATE_SCREENSHOT_URL_CURRENT": {
            return Object.assign({}, state, {
                screenshotURLCurrent: new InputData(action.data, validateURL(action.data))
            });
        }
        case "UPDATE_SCREENSHOT_URLS": {
            return Object.assign({}, state, {
                screenshotURLs: action.data,
                completedPages: Object.assign([], state.completedPages, {
                    '4': action.data.length > 0
                })
            });
        }
        case "UPDATE_COMMENTS": {
            return Object.assign({}, state, {
                comments: new InputData(action.data, true)
            });
        }
        default:
            return state;
    }
};

export default createStore(reducer, process.env.NODE_ENV === 'production' ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
