import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInput } from '../elements';

import { webOrAppChange, browserSelectionChange, browserDetailChange, dataCompEnabledChange, problemURLChange } from '../../dispatchers';

import { browserOptions } from '../../constants/input-options.js';

import { R_URL_DOMAIN_MATCH } from '../../constants/regexes.js';

import { extractDomain } from '../../utils/parse-url.js';

import { translator } from '../../constants/strings';

function ProbURL(props) {
    let webOrApp = props.probOnWebOrApp;
    return (
        <div>
            <h1 className="title">{translator.trans('step_3.title')}</h1>
            {
                props.productType.value == 'And' &&
                <div>
                    <RadioInput value="web" labelText={translator.trans('step_3.browser')} checked={webOrApp == 'web'} onChangeHandler={webOrAppChange}/>
                    <RadioInput value="app" labelText={translator.trans('step_3.app')} checked={webOrApp == 'app'} onChangeHandler={webOrAppChange}/>
                    <div className="text">{translator.trans('step_3.contact_support')}<a className="link" href={translator.trans('step_3.support_email_link')} target="_blank">{translator.trans('step_3.support_email')}</a></div>
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
                placeholder={translator.trans('step_3.web.web_url_placeholder')}
                value={props.browserSelection.value}
                options={browserOptions}
                onChange={onBrowserSelectionChange}
            />
            {
                props.browserSelection.value == 'Other' &&
                <TextInput {...props.browserDetail} placeholder={translator.trans('step_3.web.browser_name_placeholder')} onChangeHandler={browserDetailChange} />
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
                        {translator.trans('step_3.web.datacomp_enabled')}
                    </span>
                </label>
            }
            <p className="text">{translator.trans('step_3.contact_support')}<a className="link" href={translator.trans('step_3.support_email_link')} target="_blank">{translator.trans('step_3.support_email')}</a></p>

            {
                props.browserSelection.value && (props.browserSelection.value != 'Other' || props.browserDetail.validity) &&
                <div>
                    <div className="text">{translator.trans('step_3.web.above_url_input')}</div>
                    <TextInput {...props.problemURL} placeholder={translator.trans('step_3.web.url_input_placeholder')} onChangeHandler={problemURLChange}/>
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
            <div className="text">{translator.trans('step_3.app.how_to_get_url')}</div>
            <TextInput {...props.problemURL} placeholder={translator.trans('step_3.app.url_placeholder')} onChangeHandler={problemURLChange}/>
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
