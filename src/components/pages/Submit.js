import React from 'react';
import { connect } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';


import { productTypeOptions } from '../../constants/input-options.js';

import { receivedCaptchaResponse } from '../../dispatchers';

import { R_URL_DOMAIN_MATCH } from '../../constants/regexes.js';

import { translator } from '../../constants/strings';


function SubmitAndCaptcha(props) {
    let prodName = productTypeOptions.filter((el) => (el.value == props.productType.value))[0].label;

    let recaptchaInstance;
    const sitekey = window.recaptcha_key || 'xxxxxxx';

    const onChange = (response) => {
        receivedCaptchaResponse(response);
    };

    if (props.waitingResponse) {
        return (
            <div>
                <h1 className="title">{translator.trans('step_7.your_report_is_being_submitted')}</h1>
                <div className="loading"></div>
                <div className="text"> {translator.trans('step_7.please_wait')} </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="title">{translator.trans('step_7.title')}</h1>

            <div className="summary">
                <div className="summary__row">
                    <div className="summary__cell">
                        {translator.trans('step_7.prod')}
                    </div>
                    <div className="summary__cell">
                        { prodName + ' ' + props.productVersion.value + ' ' + translator.trans('step_7.ver') }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        {translator.trans('step_7.br')}
                    </div>
                    <div className="summary__cell">
                        {
                            props.browserSelection == 'Other' ? props.browserDetail.value : props.browserSelection.value
                        }
                        {
                            props.isDataCompressionEnabled === true && ' ' + translator.trans('step_7.datacompenabled')
                        }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        { props.isProbOnWebOrApp == 'web' ? translator.trans('step_7.prob_url') : translator.trans('step_7.prob_app_url') }
                    </div>
                    <div className="summary__cell">
                        { props.problemURL.value }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        { translator.trans('step_7.prob_type') }
                    </div>
                    <div className="summary__cell">
                        { props.problemType.value }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        { translator.trans('step_7.filters') }
                    </div>
                    <div className="summary__cell">
                        {props.selectedFilters.toString()}
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        { translator.trans('step_7.screenshots') }
                    </div>
                    <div className="summary__cell">
                        { props.screenshotURLs.map((el, index) => {
                            return <a href={el.value} target="_blank" key={el.value} className="link">{index + 1}</a>
                        }) }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        { translator.trans('step_7.comments') }
                    </div>
                    <div className="summary__cell">
                        {props.comments.value}
                    </div>
                </div>
            </div>

            <div className="captcha">
                <ReCAPTCHA
                    ref={e => recaptchaInstance = e}
                    sitekey={sitekey}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default connect((state) => state)(SubmitAndCaptcha);
