Object.assign = require('object-assign');

Array.prototype.findIndex||Object.defineProperty(Array.prototype,'findIndex',{value:function(c,d){if (null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if ('function'!==typeof c)throw new TypeError('predicate must be a function');for(var a=0;a<e;){if (c.call(d,b[a],a,b))return a;a++;}return-1;}});

import { createStore } from 'redux';
import * as PAGE from '../constants/page_num';
import updateValidatedPages from './validator';
import { validateVersion, validateURL, validatePlayStoreURL, getNextIndex, parseComments } from './validator';
import { INITIAL_STATE, getInitialStateFromQuery, InputData } from './initial-state';
import { pushVal, insVal, delInd, delVal } from '../utils/immutable';

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
                    isResolvedTextVisible: false
                }), 1, 2);
            }
            return state;
        }
        case 'UPDATE_CHECKLIST_ANSWER': {
            let answerTF = action.data.value, answerIndex = action.data.index;
            let tmp = Object.assign([], state.checklistAnswers, {
                [answerIndex]: answerTF
            });
            if (answerTF) {
                let nextIndex = getNextIndex(state, answerIndex);
                if (nextIndex !== -1) {
                    tmp = Object.assign([], tmp, {
                        [nextIndex]: null
                    }); // make it visible
                }
            }
            else {
                tmp = tmp.map((el, index) => ( index > answerIndex ? undefined : el )); // hide subsequent checklists
            }
            return updateValidatedPages(Object.assign({}, state, {
                checklistAnswers: tmp,
                isResolvedTextVisible: !answerTF
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
            }), 2);
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
        case 'UPDATE_OTHER_SOFTWARE_NAME': {
            return Object.assign({}, state, {
                otherExtensions: new InputData(action.data, !!action.data.length)
            });
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
            }), 2);
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
        case 'UPDATE_NSFW_URL': {
            return Object.assign({}, state, {
                isNSFWURL: action.data
            });
        }
        case 'UPDATE_PROBLEM_URL': {
            return updateValidatedPages(Object.assign({}, state, {
                problemURL: new InputData(action.data, state.probOnWebOrApp=='web' ? validateURL(action.data) : validatePlayStoreURL(action.data)),
            }), 2);
        }
        case 'ADD_NEW_SELECTED_FILTER': {
            let value = action.data;
            switch (typeof value) {
                case 'number': {
                    // It indicates a filter ID.
                    let newSelection = insVal(state.selectedFilters, value)
                    return updateValidatedPages(Object.assign({}, state, {
                        selectedFilters: newSelection
                    }), 3);
                }
                case 'string': {
                    // It indicates a custom filter subscription URL.
                    value = value.trim(); // trim whitespaces at the start and the end.

                    // If it is a duplicate value, do not update state.
                    if (state.selectedCustomFilters.indexOf(value) !== -1) {
                        return state;
                    }

                    let newSelection = pushVal(state.selectedCustomFilters, value);
                    return updateValidatedPages(Object.assign({}, state, {
                        selectedCustomFilters: newSelection
                    }), 3);
                }
                default:
                    return state;
            }
        }
        case 'DELETE_SELECTED_FILTER': {
            let value = action.data;
            switch (typeof value) {
                case 'number': {
                    // It indicates a filter ID.
                    let newSelection = delVal(state.selectedFilters, value);
                    return updateValidatedPages(Object.assign({}, state, {
                        selectedFilters: newSelection
                    }), 3);
                }
                case 'string': {
                    // It indicates a custom filter subscription URL.
                    let newSelection = delVal(state.selectedCustomFilters, value);
                    return updateValidatedPages(Object.assign({}, state, {
                        selectedCustomFilters: newSelection
                    }), 3);
                }
                default:
                    return state;
            }
        }
        case 'UPDATE_WFP_ANSWER': {
            return updateValidatedPages(Object.assign({}, state, {
                winWFPEnabled: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_STEALTH_ANSWER': {
            return updateValidatedPages(Object.assign({}, state, {
                winStealthEnabled: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_STEALTH_OPTION_ANSWER': { // specifying enabled stealth mode options is optional
            return updateValidatedPages(Object.assign({}, state, {
                winStealthOptions: Object.assign([], state.winStealthOptions, {
                    [action.data.index]: Object.assign({}, state.winStealthOptions[action.data.index], {
                        enabled: action.data.value
                    })
                })
            }), 3);
        }
        case 'UPDATE_STEALTH_OPTION_ANSWER_DETAIL': {
            return updateValidatedPages(Object.assign({}, state, {
                winStealthOptions: Object.assign([], state.winStealthOptions, {
                    [action.data.index]: Object.assign({}, state.winStealthOptions[action.data.index], {
                        detail: new InputData(action.data.value, true) // or add validation too
                    })
                })
            }), 3);
        }
        case 'UPDATE_ANDROID_FILTERING_MODE': {
            return updateValidatedPages(Object.assign({}, state, {
                androidFilteringMode: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_ANDROID_FILTERING_METHOD': {
            return updateValidatedPages(Object.assign({}, state, {
                androidFilteringMethod: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_IOS_SYSTEM_WIDE_FILTERING': {
            return updateValidatedPages(Object.assign({}, state, {
                iosSystemWideFilteringEnabled: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_IOS_SIMPLIFIED_FILTERS_MODE': {
            return updateValidatedPages(Object.assign({}, state, {
                iosSimplifiedFiltersEnabled: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_IOS_DNS': {
            return updateValidatedPages(Object.assign({}, state, {
                iosDNS: new InputData(action.data, true)
            }), 3);
        }
        case 'UPDATE_IOS_CUSTOM_DNS_NAME': {
            return updateValidatedPages(Object.assign({}, state, {
                iosDNSCustom: new InputData(action.data, !!action.data)
            }), 3);
        }
        case 'UPDATE_SCREENSHOT_URL_CURRENT': {
            return Object.assign({}, state, {
                screenshotURLCurrent: new InputData(action.data, validateURL(action.data))
            });
        }
        case 'ADD_SCREENSHOT_URL': {
            if (state.screenshotURLs.findIndex((el) => {
                return el.value === state.screenshotURLCurrent.value;
            }) === -1) {
                return updateValidatedPages(Object.assign({}, state, {
                    screenshotURLCurrent: new InputData('', false),
                    screenshotURLs: pushVal(state.screenshotURLs, new InputData(state.screenshotURLCurrent.value, false))
                }), 4);
            } else {
                return state;
            }
        }
        case 'DELETE_SCREENSHOT_URL': {
            return updateValidatedPages(Object.assign({}, state, {
                screenshotURLs: delInd(state.screenshotURLs, action.data)
            }), 4);
        }
        case 'LOAD_SCREENSHOT': {
            return updateValidatedPages(Object.assign({}, state, {
                screenshotURLs: Object.assign([], state.screenshotURLs, {
                    [action.data]: new InputData(state.screenshotURLs[action.data].value, true)
                })
            }), 4);
        }
        case 'ERROR_SCREENSHOT': {
            return updateValidatedPages(Object.assign({}, state, {
                screenshotURLs: Object.assign([], state.screenshotURLs, {
                    [action.data]: new InputData(state.screenshotURLs[action.data].value, false)
                })
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
