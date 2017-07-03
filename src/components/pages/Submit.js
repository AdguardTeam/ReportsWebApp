import React from 'react';
import { connect } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';


import { productTypeOptions } from '../../constants/input-options.js';

import { receivedCaptchaResponse } from '../../dispatchers';

import { R_URL_DOMAIN_MATCH } from '../../constants/regexes.js';


function SubmitAndCaptcha(props) {
    let prodName = productTypeOptions.filter((el) => (el.value == props.productType.value))[0].label;

    let recaptchaInstance;
    const sitekey = window.recaptcha_key || '';

    const onChange = (response) => {
        receivedCaptchaResponse(response);
    };

    return (
        <div>
            <h1 className="title">Check the information</h1>

            <div className="summary">
                <div className="summary__row">
                    <div className="summary__cell">
                        Adguard Product:
                    </div>
                    <div className="summary__cell">
                        { prodName + ' ' + props.productVersion.value + ' version' }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        Browser:
                    </div>
                    <div className="summary__cell">
                        {
                            props.browserSelection == 'Other' ? props.browserDetail.value : props.browserSelection.value
                        }
                        {
                            props.isDataCompressionEnabled === true && ' with data compression enabled'
                        }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        { props.isProbOnWebOrApp == 'web' ? 'Problem URL' : 'Problem App' }
                    </div>
                    <div className="summary__cell">
                        { props.problemURL.value }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        Problem type:
                    </div>
                    <div className="summary__cell">
                        { props.problemType.value }
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        Filters:
                    </div>
                    <div className="summary__cell">
                        {props.selectedFilters.toString()}
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        Screenshots:
                    </div>
                    <div className="summary__cell">
                    </div>
                </div>
                <div className="summary__row">
                    <div className="summary__cell">
                        Comments:
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
