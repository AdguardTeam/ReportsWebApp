import React from 'react';
import { connect } from 'react-redux';

import { RadioInputGroup } from '../../elements';
import { androidFilteringModeChange, androidFilteringMethodChange } from '../../../dispatchers';
import { VPN_PROXY, FILTERING_METHODS } from '../../../constants/input-options.js';
import { translator } from '../../../constants/strings';

function AndSpecific(props) {
    return (
        <div>
            <RadioInputGroup text={translator.trans('step_2.android.select_filtering_mode')} name="VPN/proxy" options={VPN_PROXY} checkedValue={props.androidFilteringMode.value} onChangeHandler={androidFilteringModeChange} />
            <RadioInputGroup text={translator.trans('step_2.android.select_filtering_method')} name="method" options={FILTERING_METHODS} checkedValue={props.androidFilteringMethod.value} onChangeHandler={androidFilteringMethodChange} />
        </div>
    );
}

export default connect((state) => ({
    androidFilteringMode: state.androidFilteringMode,
    androidFilteringMethod: state.androidFilteringMethod
}))(AndSpecific);
