var store = require('./store.js');
var action = require('./actions.js');
var types = require('./constants.js');

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
/*
        store.dispatch({
            type: types["MOVE_PAGE_COMPLETED"]
        });
        */
    }
    if(state.updateChecklistSkip) {
        $('.checklist').each(function() {
            var skip = $(this).data('skip');
            $(this).hide().toggleClass('skip', shouldSkip(skip, state.productType, state.problemType));
        });
        store.dispatch({
            type: types["UPDATE_CHECKLIST_SKIPPED_ENTRY_COMPLETED"]
        });
    }
    if(state.showFirstChecklist) {
        $('.checklist, .checklist ~ .resolved').hide();
        $('.checklist label.btn').removeClass('active').find('input').prop('checked', false);
        $('.checklist').eq(0).fadeIn();
        store.dispatch({
            type: types["SHOW_CHECKLIST_COMPLETE"],
            data: 0
        });
    }
    if(state.showNextChecklist) {
        $('.checklist ~ .resolved').hide();
        var index = $('.checklist').index($('.checklist').eq(state.lastAnsweredChecklistIndex).nextAll('.checklist:not(.skip):first').fadeIn());

        // When there is no next checklist, enable the next button
        if(index == -1) {
            // do something..
        }

        store.dispatch({
            type: types["SHOW_CHECKLIST_COMPLETE"],
        });
    }
    if(state.showResolvedText) {
        $('.checklist').slice(state.lastAnsweredChecklistIndex + 1).hide().find('label').removeClass('active').find('input').prop('checked', false);
        $('.checklist ~ .resolved').fadeIn();
        store.dispatch({
            type: types["SHOW_RESOLVED_TEXT_COMPLETED"]
        });
    }
    if(state.updateAndroidOnlyUI) {
        if(state.productType != "And") {
            $('.on-And').hide();
            $('.not-on-And').show();
        }
        else {
            $('.on-And').show();
            $('.not-on-And').hide();
        }
        store.dispatch({
            type: types["UPDATE_ANDROID_ONLY_UI_COMPLETED"]
        });
    }
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

    $('.checklist input[type="radio"]').change(action.checklistAnswer);

    $('#web-or-app label').on('click', action.isWebOrApp);

    $('#browser-select').change(action.browserTypeChange);


    $('#f').on('submit', function(e) {
        
        // DO SOME VALIDATION
        
    });
});