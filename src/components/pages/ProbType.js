import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput, RadioInputGroup } from '../elements';

import { problemTypeChange, checklistAnswerChange } from '../../dispatchers';

import { YN, problemTypeOptions, checklists, STEALTH_OPTIONS } from '../../constants/input-options.js';

import { translator } from '../../constants/strings';


function ProbType(props) {
    const onProbTypeChange = (event) => {
        let data = event && typeof event.value == 'string' ? event.value : null;
        problemTypeChange(data);
    };

    return (
        <div>
            <h1 className="title">{translator.trans('step_2.title')}</h1>
            <Select
                name="ProbType"
                className="select"
                value={props.problemType.value}
                options={problemTypeOptions}
                onChange={onProbTypeChange}
            />
            <div className="text">{translator.trans('step_2.contact_support')}<a className="link" href={translator.trans('step_2.support_email_link')} target="_blank">{translator.trans('step_2.support_email')}</a></div>
            <Checklist />
            { props.completedPages[1] && <OtherExtensionsInfo/> }
        </div>
    );

}

export default connect(
    (state) => ({
        completedPages: state.completedPages,
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

    const getResolvedText = () => {
        let indexWithFalsyResponse = props.checklistAnswers.findIndex((el) => {
            return el === false;
        });
        switch (indexWithFalsyResponse) {
            case 0:
                return translator.trans('step_2.resolved.with_filter_updates');
            case 1:
                return translator.trans('step_2.resolved.with_disabling_user_filter');
            case 2:
                return translator.trans('step_2.resolved.with_enabling_HTTPS_filtering');
            default:
                // Note: this part will never be executed in a current checklist
                return translator.trans('step_2.resolved.default');
        }
    }

    if (!props.productType.validity || !props.problemType.validity) {
        return null;
    }
    return (
        <div>
            { checklists.map(
                (el, index) => {
                    if (props.checklistAnswers[index] === undefined) {
                        return null;
                    }
                    return (
                        <RadioInputGroup key={index} text={el.label} name={index} options={YN} checkedValue={props.checklistAnswers[index]} onChangeHandler={onChecklistAnswer} />
                    );
                }
            ) }
            { props.isResolvedTextVisible && <div className = "text text--bold">{getResolvedText()}</div> }
        </div>
    );
}

Checklist = connect((state) => ({
    productType: state.productType,
    problemType: state.problemType,
    visibleChecklists: state.visibleChecklists,
    checklistAnswers: state.checklistAnswers,
    isResolvedTextVisible: state.isResolvedTextVisible
}))(Checklist);


import { otherSoftwareNameChanged } from '../../dispatchers';

function OtherExtensionsInfo(props) {
    return (
        <div>
            <div className="text">
                {translator.trans('step_2.provide_other_extensions_info')}
            </div>
            <TextInput
                {...props.otherExtensions}
                placeholder=""
                onChangeHandler={otherSoftwareNameChanged}
            />
        </div>
    )
}

OtherExtensionsInfo = connect((state) => ({
    otherExtensions: state.otherExtensions
}))(OtherExtensionsInfo);
