import { productTypeOptions, browserOptions, checklists, STEALTH_OPTIONS } from '../constants/input-options.js';
import { R_URL } from '../constants/regexes.js';

export function validateVersion(ver) {
    return /^\d+(?:\.\d+(?:\.\d+)?)?$/.test(ver);
}

export function validateURL(url) {
    return R_URL.test(url);
}

export function validatePlayStoreURL(url) {
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

export function getNextIndex(state, start) {
    return checklists.findIndex((el, index) => {
        return index > start && !shouldSkip(el.skip, state.productType.value, state.problemType.value);
    });
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
    if (state.isResolvedTextVisible) { return false; } // No need to proceed with the wizard.
    // Otherwise, the last non-null element is the latest answered checklist.
    let index = state.checklistAnswers.lastIndexOf(true);
    // The page is validated when there is no more checklist questions to answer.
    return getNextIndex(state, index) === -1;
};

updateValidatedPages['2'] = function(state) {
    return state.problemURL.validity && (
        (
            state.probOnWebOrApp == 'web' && state.browserSelection.validity && (state.browserSelection.value != 'Other' || state.browserDetail.validity)
        )
        || state.probOnWebOrApp == 'app'
    );
};

updateValidatedPages['3'] = function(state) {
    if (state.selectedFilters.length === 0) { return false; }
    switch(state.productType.value) {
        case 'Win':
            if (!state.winWFPEnabled.validity || !state.winStealthEnabled.validity) {
                return false;
            }
            let check = true;
            STEALTH_OPTIONS.forEach((el, index) => {
                if (el.type !== 'Bool') {
                    if (!state.winStealthOptions[index].detail.validity) {
                        check = false;
                    }
                }  
            });
            return check;
        case 'And':
            return state.androidFilteringMethod.validity && state.androidFilteringMode.validity;
        case 'iOS':
            return state.iosSystemWideFilteringEnabled.validity && state.iosSimplifiedFiltersEnabled.validity && state.iosDNS.validity;
        default:
            return true;
    }
}

updateValidatedPages['4'] = function(state) {
    if (state.screenshotURLs.length === 0) { return false; }
    let check = true;
    state.screenshotURLs.forEach((el) => {
        if (el.validity !== true) { check = false; } 
    });
    return check; 
};

updateValidatedPages['6'] = function(state) {
    return state.captchaResponse.validity;
}

export default updateValidatedPages;
