import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInput } from '../elements';

import { webOrAppChange, browserSelectionChange, browserDetailChange, problemURLChange } from '../../dispatchers';

import { browserOptions } from '../../constants/input-options.js';

import Promise from 'bluebird';


function ProbURL(props) {
    let webOrApp = props.probOnWebOrApp;
    return (
        <div>
            <h1>Where did you encounter the problem?</h1>
            { 
                props.productType.value == "And" && 
                <div>
                    <RadioInput value="web" labelText="Browser" checked={webOrApp == "web"} onChangeHandler={webOrAppChange}/>
                    <RadioInput value="app" labelText="Google Play app" checked={webOrApp == "app"} onChangeHandler={webOrAppChange}/>
                    <p className="help-block">If you encountered the problem anywhere else, please contact our tech support: support@adguard.com</p>
                </div>
            }
            { webOrApp == "web" && <WebDetails /> }
            { webOrApp == "app" && <AppDetails /> }
        </div>
    );
}

function WebDetails(props) {
    const onBrowserSelectionChange = (event) => {
        browserSelectionChange(event.value);
    };

    return (
        <div>
            <Select
                name="WebURL"
                className="form-group"
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
                <label>
                    <input type="checkbox"/>Is the data compression in your browser enabled?
                </label>
            }
            <p className="help-block">If you encountered the problem anywhere else, please contact our tech support: support@adguard.com</p>

            {
                props.browserSelection.value && (props.browserSelection.value != "Other" || props.browserDetail.validity) &&
                <div>
                    <p className="help-block">Please enter the full URL of the web page you had encountered the problem on:</p>
                    <TextInput {...props.problemURL} placeholder="Enter page URL here..." onChangeHandler={problemURLChange}/>
                    <p className="help-block">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <strong>it will remain secure and will not be shown publicly</strong>.</p>
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
            <p className="help-block">Please enter the full link to the Google Play app you had encountered the problem in. To do so, open the app in Google Play, scroll down, tap on 'Share' button and choose 'Copy to clipboard'. Then paste to the text field below.</p>
            <TextInput {...props.problemURL} placeholder="Enter Google Play app URL here..." onChangeHandler={problemURLChange}/>
            <p className = "help-block">Is any additional information required to reproduce the problem? (e.g. login/password etc.) Please include it here, <strong>it will remain secure and will not be shown publicly</strong></p>
        </div>
    )
}

AppDetails = connect((state) => ({
    problemURL: state.problemURL
}))(AppDetails);

class RelatedIssues extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
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
        console.log("url is valid, trying to fetch related issues...");
        console.log(url);
        let domain = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?((?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)/.exec(url)[1].replace(/\.$/g, '');

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/search.json');
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.setState({
                    data: JSON.parse(xhr.response)
                });
            } else { /* some err handling */ }
        };
        xhr.onerror = () => { /* some err handling */ };
        var a = new FormData();
        a.append('domain', domain);
        a.append('type', type);
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
                    <div onClick={this.onClick.bind(this, el.url)}>
                        <div className={el.status}/>
                        <div>
                            <p><span>{el.title}</span><span>{el.date}</span></p>
                            <p>{el.desc}</p>
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
