import React from 'react';
import { connect } from 'react-redux';

import ReCAPTCHA from 'react-google-recaptcha';


import { productTypeOptions } from '../../constants/input-options.js';

import { receivedCaptchaResponse } from '../../dispatchers';

import { R_URL_DOMAIN_MATCH } from '../../constants/regexes.js';


function SubmitAndCaptcha(props) {
    let prodName = productTypeOptions.filter((el) => (el.value == props.productType.value))[0].label;

    let recaptchaInstance;
    const sitekey = 'xxxxxxx';

    const onChange = (response) => {
        receivedCaptchaResponse(response);
    };

    return (
        <div>
            <h1 className="title">Check the information</h1>
            <table className="summary">
                <tbody>
                <tr>
                    <th>
                        Adguard Product:
                    </th>
                    <td>
                        { prodName + " " + props.productVersion.value + " version" }
                    </td>
                </tr>
                { props.isProbOnWebOrApp == 'web' && (
                    <tr>
                        <th>
                            Browser:
                        </th>
                        <td>
                            {
                                props.browserSelection == 'Other' ? props.browserDetail.value : props.browserSelection.value
                            }
                            {
                                props.isDataCompressionEnabled === true && ' with data compression enabled'
                            }
                        </td>
                    </tr>
                ) }
                <tr>
                    <th>
                        { props.isProbOnWebOrApp == 'web' ? "Problem URL" : "Problem App" }
                    </th>
                    <td>
                        { props.problemURL.value }
                    </td>

                </tr>
                <tr>
                    <th>
                        Problem type:
                    </th>
                    <td>
                        { props.problemType.value }
                    </td>
                </tr>
                <tr>
                    <th>
                        Filters:
                    </th>
                    <td>
                        {props.selectedFilters.toString()}
                    </td>
                </tr>
                <tr>
                    <th>
                        Screenshots:
                    </th>
                    <td>
                    </td>
                </tr>
                <tr>
                    <th>
                        Comments:
                    </th>
                    <td>
                        {props.comments.value}
                    </td>
                </tr>
                </tbody>
            </table>
            <ReCAPTCHA
                ref={e => recaptchaInstance = e}
                sitekey={sitekey}
                onChange={onChange}
            />
        </div>
    )
}

export default connect((state) => state)(SubmitAndCaptcha);
