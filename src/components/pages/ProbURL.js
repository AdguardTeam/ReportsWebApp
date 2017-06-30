import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInput } from '../elements';

import { webOrAppChange, browserSelectionChange, browserDetailChange, dataCompEnabledChange, problemURLChange } from '../../dispatchers';

import { browserOptions } from '../../constants/input-options.js';

import { R_URL_DOMAIN_MATCH } from '../../constants/regexes.js';

import { extractDomain } from '../../utils/parse-url.js';

function ProbURL(props) {
    let webOrApp = props.probOnWebOrApp;
    return (
        <div>
            <h1 className="title">Where did you encounter the problem?</h1>
            { 
                props.productType.value == "And" && 
                <div>
                    <RadioInput value="web" labelText="Browser" checked={webOrApp == "web"} onChangeHandler={webOrAppChange}/>
                    <RadioInput value="app" labelText="Google Play app" checked={webOrApp == "app"} onChangeHandler={webOrAppChange}/>
                    <div className="text">If you encountered the problem anywhere else, please contact our tech support: <a className="link" href="mailto:support@adguard.com">support@adguard.com</a></div>
                </div>
            }
            { webOrApp == "web" && <WebDetails /> }
            { webOrApp == "app" && <AppDetails /> }
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
    }

    return (
        <div>
            <Select
                name="WebURL"
                className="select"
                placeholder="Browser"
                value={props.browserSelection.value}
                options={browserOptions}
                onChange={onBrowserSelectionChange}
            />
            {
                props.browserSelection.value == "Other" &&
                <TextInput {...props.browserDetail} placeholder="Enter the browser name..." onChangeHandler={browserDetailChange} />
            }
            {
                props.productType.value == "And" && 
                <label className="checkbox">
                    <input type="checkbox"
                        className="checkbox__input"
                        checked={props.isDataCompressionEnabled}
                        onChange={onDataCompEnabledChnge}
                    />
                    <span className="checkbox__text">
                        Is the data compression in your browser enabled?
                    </span>
                </label>
            }
            <p className="text">If you encountered the problem anywhere else, please contact our tech support: <a className="link" href="mailto:support@adguard.com">support@adguard.com</a></p>

            {
                props.browserSelection.value && (props.browserSelection.value != "Other" || props.browserDetail.validity) &&
                <div>
                    <div className="text">Please enter the full URL of the web page you had encountered the problem on:</div>
                    <TextInput {...props.problemURL} placeholder="Enter page URL here..." onChangeHandler={problemURLChange}/>
                    <div className="text">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <span className="text text--strong">it will remain secure and will not be shown publicly</span>.</div>
                    <RelatedIssues />
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
            <div className="text">Please enter the full link to the Google Play app you had encountered the problem in. To do so, open the app in Google Play, scroll down, tap on 'Share' button and choose 'Copy to clipboard'. Then paste to the text field below.</div>
            <TextInput {...props.problemURL} placeholder="Enter Google Play app URL here..." onChangeHandler={problemURLChange}/>
            <div className = "text">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <span className="text text--strong">it will remain secure and will not be shown publicly</span></div>
        </div>
    )
}

AppDetails = connect((state) => ({
    problemURL: state.problemURL
}))(AppDetails);

class RelatedIssues extends React.Component {
    constructor(props) {
        super(props);
        this.getRelatedIssues = this.getRelatedIssues.bind(this);
        this.state = {
            data: []
        };
    };
    componentDidMount() {
        if(this.props.problemURL.validity) {
            this.getRelatedIssues(this.props.problemURL.value, this.props.problemType.value);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.problemURL.value != this.props.problemURL.value && nextProps.problemURL.validity) {
            this.getRelatedIssues(nextProps.problemURL.value, nextProps.problemType.value);
        }
    }
    getRelatedIssues(url, type) {
        let domain = extractDomain(url);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', window.search_url || '/search.json');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.setState({
                    data: JSON.parse(xhr.response)
                });
            } else { /* some err handling */ }
        };
        xhr.onerror = () => { /* some err handling */ };
        xhr.send(JSON.stringify({
            domain,
            type
        }));
    }
    onClick(url) { 
        window.open(url, '_blank');
    }
    render() {
        /* to be elaborated */
        return (
            <div className="issues">
                { this.state.data.map((el) => (
                    <div onClick={this.onClick.bind(this, el.url)} key={el.url}>
                        <div className={el.status}/>
                        <div>
                            <div><span>{el.title}</span><span>{el.date}</span></div>
                            <div>{el.desc}</div>
                        </div>
                    </div>
                )) }
            </div>
        );
    }
}

RelatedIssues = connect((state) => ({
    problemType: state.problemType,
    problemURL: state.problemURL
}))(RelatedIssues);


export default connect((state) => ({
    productType: state.productType,
    probOnWebOrApp: state.probOnWebOrApp
}))(ProbURL);
