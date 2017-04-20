import React from 'react';
import { connect } from 'react-redux';

import { productTypeOptions } from '../../constants/input-options.js';


function SubmitAndCaptcha(props) {
    let prodName = productTypeOptions.filter((el) => (el.value == props.productType.value))[0].label;
    return (
        <div>
            <h1>Check the information</h1>
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
                                {props.browserSelection == 'Other' ? props.browserDetail.value : props.browserSelection.value}
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
                </tbody>
            </table>
        </div>
    )
}

export default connect((state) => state)(SubmitAndCaptcha);
