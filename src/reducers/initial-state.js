import { productTypeOptions, checklists, browserOptions, STEALTH_OPTIONS } from '../constants/input-options';
import * as PAGE from '../constants/page_num';
import updateValidatedPages, { validateURL } from './validator';


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

/**
 * See https://github.com/AdguardTeam/ReportsWebApp#pre-filling-the-app-with-query-parameters for details
 */
export function getInitialStateFromQuery() {
    let a = parseQuery(location.search);
    let b = Object.create(null);
    if ('product_type' in a) {
        let pt = a['product_type'];
        if (productTypeOptions.filter((el) => {
                return el.value === pt;
            }).length === 1) {
            b.productType = new InputData(pt, true);
            if (pt != 'And') {
                b.probOnWebOrApp = 'web';
            }
        }
    }
    if ('product_version' in a) {
        b.productVersion = new InputData(a['product_version'], true);
    }
    // [true, true, [true, detailStr], ...]
    if ('stealth.enabled' in a) {
        if (a['stealth.enabled'] === 'true') {
            b.winStealthEnabled = new InputData(true, true);
        } else if (a['stealth.enabled'] === 'false') {
            b.winStealthEnabled = new InputData(false, true);
        }
    }

    b.winStealthOptions = STEALTH_OPTIONS.map((el, index) => {
        if (('stealth.' + el.shorthand) in a) {
            return el.type == 'Bool' ? {
                enabled: a['stealth.' + el.shorthand] == 'true'
            } : {
                enabled: true,
                detail: new InputData(a['stealth.' + el.shorthand], true)
            };
        } else {
            return INITIAL_STATE.winStealthOptions[index];
        }
    });

    if ('browser' in a) {
        if (browserOptions.filter((el) =>  {
                return el.value == a['browser'];
            }).length === 1) {
            b.browserSelector = new InputData(a['browser'], true);
        }
    }
    if ('browser_detail' in a) {
        b.browserDetail = new InputData(a['browser_detail'], true);
    }
    if ('url' in a) {
        b.problemURL = new InputData(a['url'], validateURL(a.url));
    }
    if ('filters' in a) {
        b.selectedFilters = a['filters'].split('.');
    }
    return updateValidatedPages(Object.assign(Object.create(null), INITIAL_STATE, b), 0, 1, 2, 4, 6);
}
