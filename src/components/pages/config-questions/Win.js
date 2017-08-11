import React from 'react';
import { connect } from 'react-redux';

import { RadioInputGroup } from '../../elements';
import { wfpAnswerChange, stealthAnswerChange, stealthOptionAnswerChange, stealthOptionDetailAnswerChange } from '../../../dispatchers';
import { YN, STEALTH_OPTIONS } from '../../../constants/input-options';
import { translator } from '../../../constants/strings';


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
            <RadioInputGroup text={translator.trans('step_2.wfp_enabled')} name="WFP" options={YN} checkedValue={props.winWFPEnabled.value} onChangeHandler={onWFPInputChange} />
            <RadioInputGroup text={translator.trans('step_2.stealth_enabled')} name="Stealth" options={YN} checkedValue={props.winStealthEnabled.value} onChangeHandler={onStealthInputChange} />
            <div className="text text--subtitle">{translator.trans('step_2.win.mark_stealth_options_below')}</div>
            { STEALTH_OPTIONS.map((option, index) => {
                return (
                    <div key={index} className="row row--checkbox">
                        <label className="checkbox">
                            <input className="checkbox__input" type="checkbox" checked={props.winStealthOptions[index].enabled} onChange={onStealthOptionInputChange.bind(null, index)} disabled={!props.winStealthEnabled.value}/>
                            <span className="checkbox__text">{option.label}</span>
                        </label>
                        {
                            option.type !== 'Bool' &&

                            <TextInput {...props.winStealthOptions[index].detail}
                                placeholder=""
                                onChangeHandler={onStealthOptionDetailInputChange.bind(null, index)}
                                disabled={!props.winStealthEnabled.value||!props.winStealthOptions[index].enabled}
                            />
                        }
                    </div>
                );
            }) }
        </div>
    );
}

export default connect((state) => ({
    winWFPEnabled: state.winWFPEnabled,
    winStealthEnabled: state.winStealthEnabled,
    winStealthOptions: state.winStealthOptions
}))(WinSpecific);
