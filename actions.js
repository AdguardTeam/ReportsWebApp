var store = require('./store.js');
var types = require('./constants/action-types.js');

function nextPage() {
    var state = store.getState();
    if(!state.duringPageFadeIn && state.completedPages[state.currentPage - 1]){
        store.dispatch({
            type: types['MOVE_PAGE'],
            data: Math.min(state.duringPageFadeOut ? state.nextPage + 1: state.currentPage + 1, 7)
        });
    }
}

function prevPage() {
    var state = store.getState();
    if(!state.duringPageFadeIn) {
        store.dispatch({
            type: types['MOVE_PAGE'],
            data: Math.max(state.duringPageFadeOut ? state.nextPage - 1 : state.currentPage - 1, 0)
        });
    }
}

function productTypeChange() {
    store.dispatch({
            type: "UPDATE_PRODUCT_TYPE",
            data: $(this).val()
    });
}

function productVersionChange() {
    store.dispatch({
        type: "UPDATE_PRODUCT_VERSION",
        data: $(this).val()
    });
}

function problemTypeChange() {
    store.dispatch({
        type: types['UPDATE_PROBLEM_TYPE'],
        data: $(this).val()
    });
}

function checklistAnswer() {
    if($(this).val() == 'N') {
        store.dispatch({
            type: types['CHECKLIST_ANSWER_N'],
            data: $('.checklist').index($(this).closest('.checklist'))
        });
    }
    else {
        store.dispatch({
            type: types['CHECKLIST_ANSWER_Y'],
            data: $('.checklist').index($(this).closest('.checklist'))
        });
    }
}

function isWebOrApp() {
    store.dispatch({
        type: types['WEB_OR_APP'],
        data: $(this).find('input[type="radio"]').val()
    });
}

function browserTypeChange() {
    store.dispatch({
        type: types['BROWSER_CHANGED'],
        data: $(this).val()
    });
}

function browserNameChange() {
    store.dispatch({
        type: types['BROWSER_NAME_CHANGED'],
        data: $(this).val()
    });
}

function problemURLChange() {
    store.dispatch({
        type: types['UPDATE_PROBLEM_URL'],
        data: $(this).val()
    });
}

function filtersChange() {
    store.dispatch({
        type: types["PAGE_FORM_VALIDATE"],
        data: $(this).val().length != 0
    });
}

function screenshotURLChange() {
    store.dispatch({
        type: types["UPDATE_SCREENSHOT_URL"],
        data: $(this).val()
    });
}

module.exports = {
    nextPage: nextPage,
    prevPage: prevPage,
    productTypeChange: productTypeChange,
    productVersionChange: productVersionChange,
    problemTypeChange: problemTypeChange,
    checklistAnswer: checklistAnswer,
    isWebOrApp: isWebOrApp,
    browserTypeChange: browserTypeChange,
    browserNameChange: browserNameChange,
    problemURLChange: problemURLChange,
    filtersChange: filtersChange,
    screenshotURLChange: screenshotURLChange
};