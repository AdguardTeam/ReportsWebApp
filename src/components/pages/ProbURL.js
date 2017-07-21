import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInput } from '../elements';

import { webOrAppChange, browserSelectionChange, browserDetailChange, dataCompEnabledChange, problemURLChange } from '../../dispatchers';

import { browserOptions } from '../../constants/input-options.js';

import { R_URL_DOMAIN_MATCH } from '../../constants/regexes.js';

import { extractDomain } from '../../utils/parse-url.js';

import Translator from '../../constants/strings';

function ProbURL(props) {
    let webOrApp = props.probOnWebOrApp;
    return (
        <div>
            <h1 className="title">{Translator.trans('step_3.title')}</h1>
            {
                props.productType.value == 'And' &&
                <div>
                    <RadioInput value="web" labelText="Browser" checked={webOrApp == 'web'} onChangeHandler={webOrAppChange}/>
                    <RadioInput value="app" labelText="Google Play app" checked={webOrApp == 'app'} onChangeHandler={webOrAppChange}/>
                    <div className="text">{Translator.trans('step_3.contact_support')}<a className="link" href="mailto:support@adguard.com">{Translator.trans('step_3.contact_support')}</a></div>
                </div>
            }
            { webOrApp == 'web' && <WebDetails /> }
            { webOrApp == 'app' && <AppDetails /> }
        </div>
    );
}

function WebDetails(props) {
    const onBrowserSelectionChange = (event) => {
        let data = event && typeof event.value == 'string' ? event.value : null;
        browserSelectionChange(data);
    };

    const onDataCompEnabledChnge = (event) => {
        dataCompEnabledChange(event.currentTarget.checked);
    };

    return (
        <div>
            <Select
                name="WebURL"
                className="select"
                placeholder={Translator.trans('step_3.web.web_url_placeholder')}
                value={props.browserSelection.value}
                options={browserOptions}
                onChange={onBrowserSelectionChange}
            />
            {
                props.browserSelection.value == 'Other' &&
                <TextInput {...props.browserDetail} placeholder={Translator.trans('step_3.web.browser_name_placeholder')} onChangeHandler={browserDetailChange} />
            }
            {
                props.productType.value == 'And' &&
                <label className="checkbox">
                    <input type="checkbox"
                        className="checkbox__input"
                        checked={props.isDataCompressionEnabled}
                        onChange={onDataCompEnabledChnge}
                    />
                    <span className="checkbox__text">
                        {Translator.trans('step_3.web.datacomp_enabled')}
                    </span>
                </label>
            }
            <p className="text">{Translator.trans('3ContactSupport')}<a className="link" href="mailto:support@adguard.com">{Translator.trans('3SupportEmail')}</a></p>

            {
                props.browserSelection.value && (props.browserSelection.value != 'Other' || props.browserDetail.validity) &&
                <div>
                    <div className="text">{Translator.trans('step_3.web.above_url_input')}</div>
                    <TextInput {...props.problemURL} placeholder={Translator.trans('step_3.web.url_input_placeholder')} onChangeHandler={problemURLChange}/>
                    <div className="text">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <span className="text text--strong">it will remain secure and will not be shown publicly</span>.</div>
                </div>
            }
        </div>
    );
}
WebDetails = connect((state) => ({
    productType: state.productType,
    browserSelection: state.browserSelection,
    browserDetail: state.browserDetail,
    isDataCompressionEnabled: state.isDataCompressionEnabled,
    problemURL: state.problemURL
}))(WebDetails);

function AppDetails(props) {
    return (
        <div>
            <div className="text">{Translator.trans('step_3.app.how_to_get_url')}</div>
            <TextInput {...props.problemURL} placeholder={Translator.trans('step_3.app.url_placeholder')} onChangeHandler={problemURLChange}/>
            <div className = "text">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <span className="text text--strong">it will remain secure and will not be shown publicly</span></div>
        </div>
    );
}

AppDetails = connect((state) => ({
    problemURL: state.problemURL
}))(AppDetails);

export default connect((state) => ({
    productType: state.productType,
    probOnWebOrApp: state.probOnWebOrApp
}))(ProbURL);
