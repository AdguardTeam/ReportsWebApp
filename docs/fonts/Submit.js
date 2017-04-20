import React from 'react';
import { connect } from 'react-redux';


function SubmitAndCaptcha(props) {
    return (
        <div>
            <h1>Check the information</h1>
            {/*generate summary of user input here..*/}
            <table style={{margin: "10px auto 10px auto"}}>
                <tbody>
                    <tr>
                        <th>
                            Adguard product:
                        </th>
                        <td>
                            {props.productType.value + '' + props.productVersion.value}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Problem type:
                        </th>
                        <td>
                            {props.problemType.value}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Problem URL:{/*We need better descriptions*/}
                        </th>
                        <td>
                            {props.problemURL.value}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Browser:
                        </th>
                        <td>
                            {
                                props.browserSelection.value == 'Other' ? props.browserDetail.value : props.browserSelection.value
                            }
                            {
                                props.isDataCompressionEnabled === true && ' with data compression enabled'
                            }
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

        </div>
    )
}

export default connect((state) => state)(SubmitAndCaptcha);