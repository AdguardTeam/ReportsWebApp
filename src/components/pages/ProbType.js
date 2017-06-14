import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { RadioInput } from '../elements';

import { problemTypeChange, checklistAnswerChange } from '../../dispatchers';

import { problemTypeOptions, checklists } from '../../constants/input-options.js';

Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(c,d){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<e;){if(c.call(d,b[a],a,b))return a;a++}return-1}});


function Checklist(props) {
    const onChecklistAnswer = (value, index) => {
        checklistAnswerChange({
            value: value == 'Y' ? true : false,
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
                        <div key={index} className="row">
                            <p className="text">{el.label}</p>
                            <div>
                                <RadioInput value="Y" name={index} labelText="Yes" checked={props.checklistAnswers[index] === true} onChangeHandler={onChecklistAnswer}/>
                                <RadioInput value="N" name={index} labelText="No" checked={props.checklistAnswers[index] === false} onChangeHandler={onChecklistAnswer}/>
                            </div>
                        </div>
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

function ProbType(props) {
    const onProbTypeChange = (event) => {
        problemTypeChange(event.value);
    };
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
            <p className="text">
                If the problem does not fall under any category that is listed here, please contact our tech support:
                 <a className="link" href="mailto:support@adguard.com">support@adguard.com</a>
            </p>
            <Checklist />
        </div>
    );
}

export default connect(
    (state) => ({
        problemType: state.problemType
    })
)(ProbType);
