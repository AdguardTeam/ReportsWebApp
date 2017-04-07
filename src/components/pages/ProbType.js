import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { RadioInput } from '../elements';

import { problemTypeChange, checklistAnswerChange } from '../../dispatchers';

import { problemTypeOptions, checklists } from '../../constants/input-options.js';

Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(c,d){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<e;){if(c.call(d,b[a],a,b))return a;a++}return-1}});

var Checklist = React.createClass({
    shouldSkip(skip, productType, problemType) {
        if(skip) {
            if(skip.on_prod) {
                if(skip.on_prod.indexOf(productType) != -1) {
                    return true;
                }
            }
            if(skip.except_on_prob) {
                if(skip.except_on_prob.indexOf(problemType) == -1) {
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    },
    onChecklistAnswer(value, index) {
        checklistAnswerChange({
            value: value == 'Y' ? true : false,
            index
        });
    },
    render() {
        if(!this.props.productType.validity || !this.props.problemType.validity) {
            return null;
        }
        return (
            <div>
                { checklists.map(
                    (el, index) => {
                        if(this.props.checklistAnswers[index] === undefined) {
                            return null;
                        }
                        return (
                            <div key={index} className="row">
                                <p className="help-block" style={{ float: 'left' }}>{el.label}</p>
                                <div style={{ float: 'right' }}>
                                    <RadioInput value="Y" name={index} labelText="Yes" checked={this.props.checklistAnswers[index] === true} onChangeHandler={this.onChecklistAnswer}/>
                                    <RadioInput value="N" name={index} labelText="No" checked={this.props.checklistAnswers[index] === false} onChangeHandler={this.onChecklistAnswer}/>
                                </div>
                            </div>
                        )
                    }
                ) }
                { this.props.isResolvedTextVisible && <p className = "help-block">Great! Thank you for using Adguard!</p> }
            </div>
        )
    }
});

Checklist = connect((state) => ({
    productType: state.productType,
    problemType: state.problemType,
    visibleChecklists: state.visibleChecklists,
    checklistAnswers: state.checklistAnswers,
    isResolvedTextVisible: state.isResolvedTextVisible
}))(Checklist);

var ProbType = React.createClass({
    onProbTypeChange(event) {
        problemTypeChange(event.value);
    },
    render() {
        return (
            <div>
                <h1>What type of problem have you encountered?</h1>
                <Select
                    name="ProbType"
                    className="form-group"
                    value={this.props.problemType.value}
                    options={problemTypeOptions}
                    onChange={this.onProbTypeChange}
                />
                <p className="help-block">If the problem does not fall under any category that is listed here, please contact our tech support: support@adguard.com</p>
                <Checklist />
                
            </div>
        )
    }
});

export default connect(
    (state) => ({
        problemType: state.problemType
    })
)(ProbType);