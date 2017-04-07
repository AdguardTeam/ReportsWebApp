import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInput } from '../elements';

import { webOrAppChange, browserSelectionChange, browserDetailChange, problemURLChange } from '../../dispatchers';

import { browserOptions } from '../../constants/input-options.js';

var ProbURL = React.createClass({
    render() {
        var webOrApp = this.props.probOnWebOrApp;
        return (
            <div>
                <h1>Where did you encounter the problem?</h1>
                { 
                    this.props.productType.value == "And" && 
                    <div>
                        <RadioInput value="web" labelText="Browser" checked={webOrApp == "web"} onChangeHandler={webOrAppChange}/>
                        <RadioInput value="app" labelText="Google Play app" checked={webOrApp == "app"} onChangeHandler={webOrAppChange}/>
                        <p className="help-block">If you encountered the problem anywhere else, please contact our tech support: support@adguard.com</p>
                    </div>
                }
                { webOrApp == "web" && <WebDetails /> }
                { webOrApp == "app" && <AppDetails /> }
            </div>
        )
    }
});

var WebDetails = React.createClass({
    onBrowserSelectionChange(event) {
        browserSelectionChange(event.value);
    },
    
    render() {

        return (
            <div>
                <Select
                    name="WebURL"
                    className="form-group"
                    placeholder="Browser"
                    value={this.props.browserSelection.value}
                    options={browserOptions}
                    onChange={this.onBrowserSelectionChange}
                />
                {
                    this.props.browserSelection.value == "Other" &&
                    <TextInput {...this.props.browserDetail} placeholder="Enter the browser name..." onChangeHandler={browserDetailChange} />
                }
                {
                    this.props.productType.value == "And" && 
                    <label>
                        <input type="checkbox"/>Is the data compression in your browser enabled?
                    </label>
                }
                <p className="help-block">If you encountered the problem anywhere else, please contact our tech support: support@adguard.com</p>

                {
                    this.props.browserSelection.value && (this.props.browserSelection.value != "Other" || this.props.browserDetail.validity) &&
                    <div>
                        <p className="help-block">Please enter the full URL of the web page you had encountered the problem on:</p>
                        <TextInput {...this.props.problemURL} placeholder="Enter page URL here..." onChangeHandler={problemURLChange}/>
                        <p className="help-block">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <strong>it will remain secure and will not be shown publicly</strong>.</p>
                    </div>
                }
            </div>
        )
    }
});

WebDetails = connect((state) => ({
    productType: state.productType,
    browserSelection: state.browserSelection,
    browserDetail: state.browserDetail,
    isDataCompressionEnabled: state.isDataCompressionEnabled,
    problemURL: state.problemURL
}))(WebDetails);


var AppDetails = React.createClass({
    render() {
        return (
            <div>
                <p className="help-block">Please enter the full link to the Google Play app you had encountered the problem in. To do so, open the app in Google Play, scroll down, tap on 'Share' button and choose 'Copy to clipboard'. Then paste to the text field below.</p>
                <TextInput {...this.props.problemURL} placeholder="Enter Google Play app URL here..." onChangeHandler={problemURLChange}/>
                <p className = "help-block">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <strong>it will remain secure and will not be shown publicly</strong></p>
            </div>
        )
    }
});

AppDetails = connect((state) => ({
    problemURL: state.problemURL
}))(AppDetails);


export default connect((state) => ({
    productType: state.productType,
    probOnWebOrApp: state.probOnWebOrApp
}))(ProbURL);