import { productTypeOptions, checklists, browserOptions, STEALTH_OPTIONS, VPN_PROXY, FILTERING_METHODS, DNS_OPTIONS } from '../constants/input-options';
import * as PAGE from '../constants/page_num';
import updateValidatedPages, { validateURL, validatePlayStoreURL } from './validator';


export function InputData(value, validity) {
    this.value = value;
    this.validity = validity;
}

export const INITIAL_STATE = (function() {
    var _state = Object.create(null);

    _state.currentPage = PAGE.START;
    _state.completedPages = [false/*ProdType*/, false/*ProbType*/, false/*ProbURL*/, true/*Filters*/, false/*Screenshots*/, true/*Comments*/, process.env.NODE_ENV == 'production' ? false : true/*Submit&Captcha*/, false];

    /* Page 1 */
    _state.productType = new InputData('', false);
    _state.productVersion = new InputData('', false);

    /* Page 2 */
    _state.problemType = new InputData('', false);

    // The checklist of given index is visible if the value is not undefined.
    // The value can be true or false. If the value is null, it means that
    // the corresponding radio group is not checked.
    _state.checklistAnswers = checklists.map((el, index) => {
        if(index === 0) { return null; }
        else { return undefined; }
    });
    _state.isResolvedTextVisible = false;

    /* Page 3 */
    _state.probOnWebOrApp = null;

    _state.browserSelection = new InputData('', false);
    _state.browserDetail = new InputData('', false);

    _state.problemURL = new InputData('', false);

    _state.isDataCompressionEnabled = false;

    /* Page 4 */
    _state.selectedFilters = [];

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

function optionHasGivenValue(option, value) {
    return option.filter((el) => {
        return el.value === value;
    }).length === 1;
}

/**
 * See https://github.com/AdguardTeam/ReportsWebApp#pre-filling-the-app-with-query-parameters for details
 */
export function getInitialStateFromQuery() {
    let queryMap = parseQuery(location.search);
    let state = Object.create(null);
    if ('product_type' in queryMap) {
        let pt = queryMap['product_type'];
        if (optionHasGivenValue(productTypeOptions, pt)) {
            state.productType = new InputData(pt, true);
            if (pt != 'And') {
                state.probOnWebOrApp = 'web';
            }
        }
    }
    if ('product_version' in queryMap) {
        state.productVersion = new InputData(queryMap['product_version'], true);
    }
    if ('browser' in queryMap) {
        if (optionHasGivenValue(browserOptions, queryMap['browser'])) {
            state.browserSelection = new InputData(queryMap['browser'], true);
            if (state.productType.value == 'And') {
                state.probOnWebOrApp = 'web';
            }
        }
    }
    if ('browser_detail' in queryMap) {
        state.browserDetail = new InputData(queryMap['browser_detail'], true);
    }
    if ('url' in queryMap) {
        let url = queryMap['url'];
        if (queryMap['product_type'] == 'And' && validatePlayStoreURL(url)) {
            state.probOnWebOrApp = 'app';
            state.problemURL = new InputData(queryMap['url'], true);
        } else {
            state.problemURL = new InputData(queryMap['url'], validateURL(queryMap.url));
        }
    }
    if ('filters' in queryMap) {
        state.selectedFilters = queryMap['filters'].split('.');
    }
    if ('win.wfp' in queryMap) {
        if (queryMap['win.wfp'] === 'true') {
            state.winWFPEnabled = new InputData(true, true);
        } else if (queryMap['win.wfp'] === 'false') {
            state.winWFPEnabled = new InputData(false, true);
        }
    }
    if ('stealth.enabled' in queryMap) {
        if (queryMap['stealth.enabled'] === 'true') {
            state.winStealthEnabled = new InputData(true, true);
        } else if (queryMap['stealth.enabled'] === 'false') {
            state.winStealthEnabled = new InputData(false, true);
        }
    }

    state.winStealthOptions = STEALTH_OPTIONS.map((el, index) => {
        if (('stealth.' + el.shorthand) in queryMap) {
            return el.type == 'Bool' ? {
                enabled: queryMap['stealth.' + el.shorthand] == 'true'
            } : {
                enabled: true,
                detail: new InputData(queryMap['stealth.' + el.shorthand], true)
            };
        } else {
            return INITIAL_STATE.winStealthOptions[index];
        }
    });

    if ('android.mode' in queryMap) {
        if (optionHasGivenValue(VPN_PROXY, queryMap['android.mode'])) {
            state.androidFilteringMode = new InputData(queryMap['android.mode'], true);
        }
    }
    if ('android.method' in queryMap) {
        if (optionHasGivenValue(FILTERING_METHODS, queryMap['android.method'])) {
            state.androidFilteringMethod = new InputData(queryMap['android.method'], true);
        }
    }
    if ('ios.systemwide' in queryMap) {
        if (queryMap['ios.systemwide'] === 'true') {
            state.iosSystemWideFilteringEnabled = new InputData(true, true);
        } else if (queryMap['ios.systemwide'] === 'false') {
            state.iosSystemWideFilteringEnabled = new InputData(false, true);
        }
    }
    if ('ios.simplified' in queryMap) {
        if (queryMap['ios.simplified'] === 'true') {
            state.iosSimplifiedFiltersEnabled = new InputData(true, true);
        } else if (queryMap['ios.simplified'] === 'false') {
            state.iosSimplifiedFiltersEnabled = new InputData(false, true);
        }
    }

    if ('ios.DNS' in queryMap) {
        if (optionHasGivenValue(DNS_OPTIONS, queryMap['ios.DNS'])) {
            state.iosDNS = new InputData(queryMap['ios.DNS'], true);
        }
    }

    return updateValidatedPages(Object.assign(Object.create(null), INITIAL_STATE, state), 0, 1, 2, 3, 4, 6);
}
