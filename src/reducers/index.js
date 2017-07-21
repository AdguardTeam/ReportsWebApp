Object.assign = require('object-assign');
import { createStore } from 'redux';
import { productTypeOptions, browserOptions, checklists, STEALTH_OPTIONS } from '../constants/input-options.js';
import { R_URL } from '../constants/regexes.js';
import * as PAGE from '../constants/page_num.js';

function InputData(value, validity) {
    this.value = value;
    this.validity = validity;
}

function validateVersion(ver) {
    return /^\d+(?:\.\d+(?:\.\d+)?)?$/.test(ver);
}

function validateURL(url) {
    return R_URL.test(url);
}

function validatePlayStoreURL(url) {
    return /^(https?:\/\/)?play\.google\.com\/store\/apps\/details\?id=/.test(url);
}

function shouldSkip(skip, productType, problemType) {
    if (skip) {
        if (skip.on_prod) {
            if (skip.on_prod.indexOf(productType) != -1) {
                return true;
            }
        }

        if (skip.except_on_prob) {
            if (skip.except_on_prob.indexOf(problemType) == -1) {
                return true;
            }
        }

        return false;
    }

    return false;
}


const INITIAL_STATE = (function() {
    var _state = Object.create(null);

    _state.currentPage = PAGE.START;
    _state.completedPages = [false/*ProdType*/, false/*ProbType*/, false/*ProbURL*/, true/*Filters*/, false/*Screenshots*/, true/*Comments*/, process.env.NODE_ENV == 'production' ? false : true/*Submit&Captcha*/, false];

    /* Page 1 */
    _state.productType = new InputData('', false);
    _state.productVersion = new InputData('', false);

    /* Page 2 */
    _state.problemType = new InputData('', false);

    _state.checklistAnswers = [null, undefined, undefined, undefined];
    _state.isResolvedTextVisible = false;

    _state.isPlatformSpecificQuestionsVisible = false;

    _state.winWFPEnabled = new InputData(null, false);
    _state.winStealthEnabled = new InputData(null, false);
    _state.winStealthOptions = STEALTH_OPTIONS.map((el) => (
        el.type == 'Bool' ? {
            enabled: false
        } : {
            enabled: false,
            detail: new InputData('', true)
        }
    ));

    _state.androidFilteringMode = new InputData(null, false);
    _state.androidFilteringMethod = new InputData(null, false);

    _state.iosSystemWideFilteringEnabled = new InputData(null, false);
    _state.iosSimplifiedFiltersEnabled = new InputData(null, false);
    _state.iosDNS = new InputData(null, false);

    /* Page 3 */
    _state.probOnWebOrApp = null;

    _state.browserSelection = new InputData('', false);
    _state.browserDetail = new InputData('', false);

    _state.problemURL = new InputData('', false);

    _state.isDataCompressionEnabled = false;

    /* Page 4 */
    _state.selectedFilters = [];

    /* Page 5 */
    _state.screenshotURLCurrent = new InputData('', false);
    _state.screenshotURLs = [];

    /* Page 6 */
    _state.comments = new InputData('', true);

    /* Page 7 */
    _state.captchaResponse = new InputData('', false);

    _state.waitingResponse = false;
    _state.issueUrl = new InputData('', false);

    return _state;
})();


function parseQuery(qstr) {
    var query = Object.create(null);
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

/**
 * Product type: pt
 * Product version: pv
 * Stealth mode settings: st
 * Browser and version: br
 * Page URL or app's package name: url
 * Enabled filters: ft
 */
function getInitialStateFromQuery() {
    var a = parseQuery(location.search);
    var b = Object.create(null);
    if ('pt' in a) {
        if (productTypeOptions.filter((el) => {
                return el.value === a.pt;
            }).length === 1) {
            b.productType = new InputData(a.pt, true);
            if (a.pt != 'And') {
                b.probOnWebOrApp = 'web';
            }
        }
    }
    if ('pv' in a) {
        b.productVersion = new InputData(a.pv, true);
    }
    // [true, true, [true, detailStr], ...]
    if ('st' in a) {
        if (!a.st) {
            b.winStealthEnabled = new InputData(false, true);
        }
        else {
            let st = JSON.parse(a.st);
            b.winStealthEnabled = new InputData(true, true);
            b.winStealthOptions = STEALTH_OPTIONS.map((el, index) => (
                el.type == 'Bool' ? {
                    enabled: st[el.shorthand] === undefined ? false : !!st[el.shorthand]
                } : {
                    enabled: st[el.shorthand] === undefined,
                    detail: new InputData(st[el.shorthand], true)
                }
            ));
        }
    }
    if ('br' in a) {
        if (browserOptions.filter((el) =>  {
                return el.value == a.br;
            }).length === 1) {
            b.browserSelector = new InputData(a.br, true);
        }
    }
    if ('bd' in a) {
        b.browserDetail = new InputData(a.bd, true);
    }
    if ('url' in a) {
        b.problemUrl = new InputData(a.url, validateURL(a.url));
    }
    if ('ft' in a) {
        b.selectedFilters = a.ft.split(',');
    }
    return updateValidatedPages(Object.assign(Object.create(null), INITIAL_STATE, b), 0, 1, 2, 4, 6);
}

const updateValidatedPages = function(state) { // further arguemnts are page numbers to update validity.
    let pages = Array.prototype.slice.call(arguments, 1);
    let newCompletedPages = {};

    pages.forEach((page) => {
        newCompletedPages[page] = updateValidatedPages[page](state);
    });

    return Object.assign({}, state, {
        completedPages: Object.assign([], state.completedPages, newCompletedPages)
    });
};

updateValidatedPages['0'] = function(state) {
    return state.productType.validity && state.productVersion.validity;
};

updateValidatedPages['1'] = function(state) {
    if (!state.isPlatformSpecificQuestionsVisible) {
        return false;
    }
    switch(state.productType.value) {
        case 'Win':
            return state.winWFPEnabled.validity && state.winStealthEnabled.validity;
        case 'And':
            return state.androidFilteringMethod.validity && state.androidFilteringMode.validity;
        case 'iOS':
            return state.iosSystemWideFilteringEnabled.validity && state.iosSimplifiedFiltersEnabled.validity && state.iosDNS.validity;
        default:
            return true;
    }
};

updateValidatedPages['2'] = function(state) {
    return state.problemURL.validity && (
        (
            state.probOnWebOrApp == 'web' && state.browserSelection.validity && (state.browserSelection.value != 'Other' || state.browserDetail.validity)
        )
        || state.probOnWebOrApp == 'app'
    );
};

updateValidatedPages['4'] = function(state) {
    return state.screenshotURLs.length > 0;
};

updateValidatedPages['6'] = function(state) {
    return state.captchaResponse.validity;
}


const reducer = function(state, action) {
    if (typeof state === 'undefined') {
        return getInitialStateFromQuery();
    }
    switch (action.type) {
        case 'MOVE_PAGE': {
            return Object.assign({}, state, {
                currentPage: state.currentPage + action.data,
            });
        }
        case 'UPDATE_PRODUCT_TYPE': {
            if (state.productType.value !== action.data) {
                let newProbOnWebOrApp = action.data == 'And' ? null : 'web';
                let newProductType = new InputData(action.data, action.data !== null ? true : false);
                return updateValidatedPages(Object.assign({}, state, {
                    productType: newProductType,
                    checklistAnswers: INITIAL_STATE.checklistAnswers,
                    isPlatformSpecificQuestionsVisible: false,
                    probOnWebOrApp: newProbOnWebOrApp
                }), 0, 1, 2);
            }
            return state;
        }
        case 'UPDATE_PRODUCT_VERSION': {
            let newProductVersion = new InputData(action.data, validateVersion(action.data));

            return updateValidatedPages(Object.assign({}, state, {
                productVersion: newProductVersion
            }), 0);
        }
        case 'UPDATE_PROBLEM_TYPE': {
            if (state.problemType.value !== action.data) {
                return updateValidatedPages(Object.assign({}, state, {
                    problemType: new InputData(action.data, action.data !== null ? true : false),
                    checklistAnswers: INITIAL_STATE.checklistAnswers,
                    isResolvedTextVisible: false,
                    isPlatformSpecificQuestionsVisible: false
                }), 1, 2);
            }
            return state;
        }
        case 'UPDATE_CHECKLIST_ANSWER': {
            let answerTF = action.data.value, answerIndex = action.data.index;
            let isPlatformSpecificQuestionsVisible;
            let tmp = Object.assign([], state.checklistAnswers, {
                [answerIndex]: answerTF
            });
            if (answerTF) {
                let nextIndex = checklists.findIndex((el, index) => (index > answerIndex && !shouldSkip(el.skip, state.productType.value, state.problemType.value)));
                if (nextIndex !== -1) {
                    tmp = Object.assign([], tmp, {
                        [nextIndex]: null
                    }); // make it visible
                    isPlatformSpecificQuestionsVisible = false;
                }
                else {
                    isPlatformSpecificQuestionsVisible = true; // page 1 is validated
                }
            }
            else {
                tmp = tmp.map((el, index) => ( index > answerIndex ? undefined : el )); // hide subsequent checklists
                isPlatformSpecificQuestionsVisible = false; // problem is resolved, no need to proceed with the wizard
            }


            return updateValidatedPages(Object.assign({}, state, {
                checklistAnswers: tmp,
                isResolvedTextVisible: !answerTF,
                isPlatformSpecificQuestionsVisible: isPlatformSpecificQuestionsVisible
            }), 1);
        }
        case 'UPDATE_WFP_ANSWER': {
            return updateValidatedPages(Object.assign({}, state, {
                winWFPEnabled: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_STEALTH_ANSWER': {
            return updateValidatedPages(Object.assign({}, state, {
                winStealthEnabled: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_STEALTH_OPTION_ANSWER': { // specifying enabled stealth mode options is optional
            return Object.assign({}, state, {
                winStealthOptions: Object.assign([], state.winStealthOptions, {
                    [action.data.index]: Object.assign({}, state.winStealthOptions[action.data.index], {
                        enabled: action.data.value
                    })
                })
            });
        }
        case 'UPDATE_STEALTH_OPTION_ANSWER_DETAIL': {
            return Object.assign({}, state, {
                winStealthOptions: Object.assign([], state.winStealthOptions, {
                    [action.data.index]: Object.assign({}, state.winStealthOptions[action.data.index], {
                        detail: new InputData(action.data.value, true) // or add validation too
                    })
                })
            });
        }
        case 'UPDATE_ANDROID_FILTERING_MODE': {
            return updateValidatedPages(Object.assign({}, state, {
                androidFilteringMode: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_ANDROID_FILTERING_METHOD': {
            return updateValidatedPages(Object.assign({}, state, {
                androidFilteringMethod: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_IOS_SYSTEM_WIDE_FILTERING': {
            return updateValidatedPages(Object.assign({}, state, {
                iosSystemWideFilteringEnabled: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_IOS_SIMPLIFIED_FILTERS_MODE': {
            return updateValidatedPages(Object.assign({}, state, {
                iosSimplifiedFiltersEnabled: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_IOS_DNS': {
            return updateValidatedPages(Object.assign({}, state, {
                iosDNS: new InputData(action.data, true)
            }), 1);
        }
        case 'UPDATE_WEB_OR_APP': {
            return updateValidatedPages(Object.assign({}, state, {
                probOnWebOrApp: action.data
            }), 2);
        }
        case 'UPDATE_BROWSER_SELECTION': {
            return updateValidatedPages(Object.assign({}, state, {
                browserSelection: new InputData(action.data, action.data !== null ? true : false),
                browserDetail: action.data == 'Other' ? state.browserDetail : new InputData(undefined, false) // Or maybe it can be cleared not immediately, only after a page navigation.
            }));
        }
        case 'UPDATE_BROWSER_DETAIL': {
            return updateValidatedPages(Object.assign({}, state, {
                browserDetail: new InputData(action.data, action.data.length > 0)
            }), 2);
        }
        case 'UPDATE_DATA_COMPRESSION_ENABLED': {
            return Object.assign({}, state, {
                isDataCompressionEnabled: action.data
            });
        }
        case 'UPDATE_PROBLEM_URL': {
            return updateValidatedPages(Object.assign({}, state, {
                problemURL: new InputData(action.data, state.probOnWebOrApp=='web' ? validateURL(action.data) : validatePlayStoreURL(action.data)),
            }), 2);
        }
        case 'UPDATE_ENABLED_FILTERS': {
            return Object.assign({}, state, {
                selectedFilters: action.data
            });
        }
        case 'UPDATE_SCREENSHOT_URL_CURRENT': {
            return Object.assign({}, state, {
                screenshotURLCurrent: new InputData(action.data, validateURL(action.data))
            });
        }
        case 'UPDATE_SCREENSHOT_URLS': {
            return updateValidatedPages(Object.assign({}, state, {
                screenshotURLs: action.data
            }), 4);
        }
        case 'UPDATE_COMMENTS': {
            return Object.assign({}, state, {
                comments: new InputData(action.data, true)
            });
        }
        case 'UPDATE_CAPTCHA_RESPONSE': {
            return updateValidatedPages(Object.assign({}, state, {
                captchaResponse: new InputData(action.data, true)
            }), 6);
        }
        case 'SUBMIT_REQUEST_SENT': {
            return Object.assign({}, state, {
                waitingResponse: true
            });
        }
        case 'SUBMIT_RESPONSE_COMPLETED': {
            return Object.assign({}, state, {
                currentPage: PAGE.RESULT,
                waitingResponse: false,
                issueUrl: new InputData(action.data, validateURL(action.data))
            });
        }
        default:
            return state;
    }
};

export default createStore(reducer, process.env.NODE_ENV === 'production' ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
