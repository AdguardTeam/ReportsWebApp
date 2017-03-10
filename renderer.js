var store = require('./store.js');
var action = require('./actions.js');
var types = require('./constants/action-types.js');

var TOTAL_PAGE = 8;

function scrollToClass(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({scrollTop: scroll_to}, 0);
    }
}

function updateProgress(page) {
    $('.progress-bar').css('width', String(page / TOTAL_PAGE * 100) + "%");
    $('#s').html('Step ' + page + "/" + TOTAL_PAGE);
}

function validateProdVer() {
    if(/\d+(?:\.\d+(?:\.\d+)?)?/.$(this).val()) {

    }
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

function makeSummary() {

}

function render() {
    var state = store.getState();
    
    if(state.nextPage !== null) {
        if(!state.duringPageFadeIn) {
            if(!state.duringPageFadeOut) {
                // Allow pressing next button further during fade out.
                store.dispatch({
                    type: types["DURING_PAGE_FADE_OUT"]
                });

                $('#f fieldset:nth-child(' + state.currentPage + ')').fadeOut(400, function() {
                    store.dispatch({
                        type: types["DURING_PAGE_FADE_IN"]
                    });

                    // show previous step
                    $('#f fieldset:nth-child(' + store.getState().nextPage + ')').fadeIn(400, function() {
                        store.dispatch({
                            type: types["MOVE_PAGE_COMPLETED"]
                        });
                    });

                    // scroll window to beginning of the form
                    scrollToClass( $('html'), 20 );
                });
            }
            if(state.nextPage == 1) {
                $('.btn-prev, .btn-submit').hide();
                $('.btn-next').show();
            }
            else if(state.nextPage == 7) {
                $('.btn-next').hide();
                $('.btn-prev, .btn-submit').show();
            }
            else {
                $('.btn-prev, .btn-next').show();
                $('.btn-submit').hide();
            }
            updateProgress(state.nextPage);
        }
    }

    state = store.getState();

    if(state.toggleNextBtn !== null) {
        $('.btn-next').toggleClass('disabled', !state.toggleNextBtn);
        store.dispatch({
            type: types["TOGGLE_NEXT_BUTTON_COMPLETED"]
        });
    }

    state = store.getState();

    if(state.validatePage) {
        var bool;
        switch(state.currentPage) {
            case 1:
                bool = state.isProdVerValid && state.productType !== null;
                break;
            // There is no case 2: 
            case 3:
                bool = state.isProbURLValid && (!state.isBrowserOther || !!$("#browser-name input").val()); //may need to validate browser name as well
                break;
            case 5:
                bool = state.isScreenshotURLValid;
                break;
            default:
                bool = true;
        }
        store.dispatch({
            type: types["PAGE_FORM_VALIDATE"],
            data: bool
        });
    }

    state = store.getState();

    if(state.updateChecklistSkip) {
        $('.checklist').each(function() {
            var skip = $(this).data('skip');
            $(this).hide().toggleClass('skip', shouldSkip(skip, state.productType, state.problemType));
        });
        store.dispatch({
            type: types["UPDATE_CHECKLIST_SKIPPED_ENTRY_COMPLETED"]
        });
    }

    state = store.getState();

    if(state.showFirstChecklist) {
        $('.checklist, .checklist ~ .resolved').hide();
        $('.checklist label.btn').removeClass('active').find('input').prop('checked', false);
        $('.checklist').eq(0).fadeIn();
        store.dispatch({
            type: types["SHOW_CHECKLIST_COMPLETE"],
            data: 0
        });
    }

    state = store.getState();

    if(state.showNextChecklist) {
        $('.checklist ~ .resolved').hide();

        var nextChecklist = $('.checklist').eq(state.lastAnsweredChecklistIndex).nextAll('.checklist:not(.skip):first').fadeIn();
        
        store.dispatch({
            type: types["SHOW_CHECKLIST_COMPLETE"],
        });

        // When there is no next checklist, enable the next button
        if(nextChecklist.length == 0) {
            store.dispatch({
                type: types["PAGE_FORM_VALIDATE"],
                data: true
            });
        }

    }

    state = store.getState();

    if(state.showResolvedText) {
        $('.checklist').slice(state.lastAnsweredChecklistIndex + 1).hide().find('label').removeClass('active').find('input').prop('checked', false);
        $('.checklist ~ .resolved').fadeIn();
        store.dispatch({
            type: types["SHOW_RESOLVED_TEXT_COMPLETED"]
        });
    }

    state = store.getState();

    if(state.updateAndroidOnlyUI) {
        $('.prod-dep').each(function() {
            $(this).toggle($(this).data('display').indexOf(state.productType) != -1);
        });
        store.dispatch({
            type: types["UPDATE_ANDROID_ONLY_UI_COMPLETED"]
        });
    }

    state = store.getState();

    if(state.updateWebOrAppPane) {
        switch(state.webOrApp) {
            case 'web':
                $('.app').fadeOut(400, function() {
                    $('.web').fadeIn();
                });
                break;
            case 'app':
                $('.web').fadeOut(400, function() {
                    $('.app').fadeIn();
                });
                break;
            case null:
                $('.web, .app').hide();
        }
        store.dispatch({
            type: types["UPDATE_WEB_OR_APP_PANE_COMPLETED"]
        });
    }

    state = store.getState();

    if(state.updateOtherBrowserUI) {
        if(state.isBrowserOther) {
            $('#browser-name').fadeIn();
        }
        else {
            $('#browser-name').fadeOut();
        }
        store.dispatch({
            type: types["UPDATE_OTHER_BROWSER_UI_COMPLETED"]
        });
    }

    state = store.getState();

    if(state.updateBrowserFirstSelectionUI) {
        $('.after-browser-selection').fadeIn();
        store.dispatch({
            type: types["UPDATE_BROWSER_FIRST_SELECTION_COMPLETED"]
        });
    }
}

$(document).ready(function() {
    store.subscribe(render);
    $('#f fieldset:first').fadeIn('slow');
    $('.btn-next').on('click', action.nextPage);
    $('.btn-prev').on('click', action.prevPage);

    $('#prod-type').change(action.productTypeChange);
    $('#prob-type').change(action.problemTypeChange);

    $('#prod-ver').keyup(action.productVersionChange);


    $('.checklist input[type="radio"]').change(action.checklistAnswer);

    $('#browser-name input').keyup(action.browserNameChange);

    $('#web-or-app label').on('click', action.isWebOrApp);

    $('#web-url, #app-url').keyup(action.problemURLChange);

    $('#browser-select').change(action.browserTypeChange);

    $('#filters').select2({
        data: [
            {id: 1, text: "Russian filter"},
            {id: 2, text: "English filter"},
            {id: 3, text: "Spyware filter"},
            {id: 4, text: "Social media filter"},
            {id: 5, text: "Experimental Filter"},
            {id: 6, text: "German filter"},
            {id: 7, text: "Japanese filter"},
            {id: 8, text: "Dutch filter"},
            {id: 9, text: "Spanish/Portuguese filter"},
            {id: 10, text: "Useful ads filter"},
            {id: 11, text: "Mobile ads filter"},
            {id: 12, text: "Safari filter"},
            {id: 13, text: "Turkish filter"},
            {id: 14, text: "Annoyance filter"},
            {id: 15, text: "Simplified domain names filter"}
        ]
    });

    $('#filters').change(action.filtersChange);

    $('#ss-url').keyup(action.screenshotURLChange);


    $('#ss-add').on('click', function() {

    });


    $('#f').on('submit', function(e) {
        
        // DO SOME VALIDATION
        
    });
});