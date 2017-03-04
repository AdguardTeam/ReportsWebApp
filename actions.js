var store = require('./store.js');
var types = require('./constants.js');

function nextPage() {

    // DO SOME VALIDATION HERE

    var state = store.getState();
    if(!state.duringPageFadeIn){
        store.dispatch({
            type: types['MOVE_PAGE'],
            data: state.duringPageFadeOut ? Math.min(state.nextPage + 1, 7) : state.currentPage + 1
        });
    }
}

function prevPage() {
    var state = store.getState();
    if(!state.duringPageFadeIn) {
        store.dispatch({
            type: types['MOVE_PAGE'],
            data: state.duringPageFadeOut ? Math.max(state.nextPage - 1, 0) : state.currentPage - 1
        });
    }
}

function productTypeChange() {
    store.dispatch({
        type: types['UPDATE_PRODUCT_TYPE'],
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

module.exports = {
    nextPage: nextPage,
    prevPage: prevPage,
    productTypeChange: productTypeChange,
    problemTypeChange: problemTypeChange,
    checklistAnswer: checklistAnswer,
    isWebOrApp: isWebOrApp,
    browserTypeChange: browserTypeChange
};