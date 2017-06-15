import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInput, RadioInputGroup } from '../elements';

import { problemTypeChange, checklistAnswerChange } from '../../dispatchers';

import { YN, problemTypeOptions, checklists, STEALTH_OPTIONS } from '../../constants/input-options.js';

Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(c,d){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<e;){if(c.call(d,b[a],a,b))return a;a++}return-1}});


function ProbType(props) {
    const onProbTypeChange = (event) => {
        problemTypeChange(event.value);
    };

    let SpecificQuestions;
    switch(props.productType.value) {
        case "Win":
            SpecificQuestions = WinSpecific;
            break;
        case "And":
            SpecificQuestions = AndSpecific;
            break;
        case "iOS":
            SpecificQuestions = IOSSpecific;
            break;
        default:
            SpecificQuestions = () => <div/>;
    }

    return (
        <div>
            <h1 className="title">What type of problem have you encountered?</h1>
            <Select
                name="ProbType"
                className="select"
                value={props.problemType.value}
                options={problemTypeOptions}
                onChange={onProbTypeChange}
            />
            <p className="text">If the problem does not fall under any category that is listed here, please contact our tech support: <a className="link" href="mailto:support@adguard.com">support@adguard.com</a></p>
            <Checklist />
            { props.isPlatformSpecificQuestionsVisible && (
                props.productType.value == "Win" ? <WinSpecific/> : props.productType.value == "And" ? <AndSpecific/> : props.productType.value == "iOS" ? <IOSSpecific/> : null )}
        </div>
    );

}

export default connect(
    (state) => ({
        productType: state.productType,
        problemType: state.problemType,
        isPlatformSpecificQuestionsVisible : state.isPlatformSpecificQuestionsVisible
    })
)(ProbType);


function Checklist(props) {
    const onChecklistAnswer = (value, index) => {
        checklistAnswerChange({
            value: JSON.parse(value), // 'true' -> true ..
            index
        });
    };

    if(!props.productType.validity || !props.problemType.validity) {
        return null;
    }
    return (
        <div>
            { checklists.map(
                (el, index) => {
                    if(props.checklistAnswers[index] === undefined) {
                        return null;
                    }
                    return (
                        <RadioInputGroup key={index} text={el.label} name={index} options={YN} checkedValue={props.checklistAnswers[index]} onChangeHandler={onChecklistAnswer} />
                    )
                }
            ) }
            { props.isResolvedTextVisible && <p className = "text text--bold">Great! Thank you for using Adguard!</p> }
        </div>
    )
}

Checklist = connect((state) => ({
    productType: state.productType,
    problemType: state.problemType,
    visibleChecklists: state.visibleChecklists,
    checklistAnswers: state.checklistAnswers,
    isResolvedTextVisible: state.isResolvedTextVisible
}))(Checklist);


import { wfpAnswerChange, stealthAnswerChange, stealthOptionAnswerChange, stealthOptionDetailAnswerChange } from '../../dispatchers';

function WinSpecific(props) {
    const onWFPInputChange = (value) => {
        wfpAnswerChange(JSON.parse(value));
    };
    const onStealthInputChange = (value) => {
        stealthAnswerChange(JSON.parse(value));
    };
    const onStealthOptionInputChange = (index, event) => {
        stealthOptionAnswerChange(index, event.currentTarget.checked);
    };
    const onStealthOptionDetailInputChange = (index, value) => {
        stealthOptionDetailAnswerChange(index, value);
    };
    return (
        <div>
            <RadioInputGroup text="Do you have WFP driver enabled in Adguard network settings?" name="WFP" options={YN} checkedValue={props.winWFPEnabled.value} onChangeHandler={onWFPInputChange} />
            <RadioInputGroup text="Do you have Stealth Mode enabled?" name="Stealth" options={YN} checkedValue={props.winStealthEnabled.value} onChangeHandler={onStealthInputChange} />
            <p className="text text--subtitle">Please mark any of these options if you have them enabled in Stealth Mode</p>
            { STEALTH_OPTIONS.map((option, index) => {
                return (
                    <div key={index} className="row row--checkbox">
                        <label className="checkbox">
                            <input className="checkbox__input" type="checkbox" checked={props.winStealthOptions[index].enabled} onChange={onStealthOptionInputChange.bind(null, index)}/>
                            <span className="checkbox__text">{option.label}</span>
                        </label>
                        {
                            option.type !== "Bool" &&

                            <TextInput {...props.winStealthOptions[index].detail}
                                       placeholder=""
                                       onChangeHandler={onStealthOptionDetailInputChange.bind(null, index)}
                                       disabled={!props.winStealthOptions[index].enabled}
                            />
                        }
                    </div>
                )
            }) }
        </div>
    )
}

WinSpecific = connect((state) => ({
    winWFPEnabled: state.winWFPEnabled,
    winStealthEnabled: state.winStealthEnabled,
    winStealthOptions: state.winStealthOptions
}))(WinSpecific);


import { androidFilteringModeChange, androidFilteringMethodChange } from '../../dispatchers';
import { VPN_PROXY, FILTERING_METHODS } from '../../constants/input-options.js';

function AndSpecific(props) {
    return (
        <div>
            <RadioInputGroup text="Do you use VPN or HTTP proxy mode?" name="VPN/proxy" options={VPN_PROXY} checkedValue={props.androidFilteringMode.value} onChangeHandler={androidFilteringModeChange} />
            <RadioInputGroup text="What filtering method do you use?" name="method" options={FILTERING_METHODS} checkedValue={props.androidFilteringMethod.value} onChangeHandler={androidFilteringMethodChange} />
        </div>
    )
}

AndSpecific = connect((state) => ({
    androidFilteringMode: state.androidFilteringMode,
    androidFilteringMethod: state.androidFilteringMethod
}))(AndSpecific);


import { iosSystemWideFilteringChange, iosSimplifiedFiltersModeChange, iosDNSChange } from '../../dispatchers';
import { DNS_OPTIONS } from '../../constants/input-options.js';

function IOSSpecific(props) {
    const onSystemWideSelectionChange = (value) => {
        iosSystemWideFilteringChange(JSON.parse(value));
    };
    const onSimplifiedFiltersChange = (value) => {
        iosSimplifiedFiltersModeChange(JSON.parse(value));
    };
    return (
        <div>
            <RadioInputGroup text="Do you use System-wide filtering?" name="SystemWide" options={YN} checkedValue={props.iosSystemWideFilteringEnabled.value} onChangeHandler={onSystemWideSelectionChange} />
            <RadioInputGroup text="Do you use Simplified filters mode?" name="Simplified" options={YN} checkedValue={props.iosSimplifiedFiltersEnabled.value} onChangeHandler={onSimplifiedFiltersChange} />
            <RadioInputGroup text="Do you use Adguard DNS?" name="DNS" options={DNS_OPTIONS} checkedValue={props.iosDNS.value} onChangeHandler={iosDNSChange} />
        </div>
    );
}

IOSSpecific = connect((state) => ({
    iosSystemWideFilteringEnabled: state.iosSystemWideFilteringEnabled,
    iosSimplifiedFiltersEnabled: state.iosSimplifiedFiltersEnabled,
    iosDNS: state.iosDNS
}))(IOSSpecific);
