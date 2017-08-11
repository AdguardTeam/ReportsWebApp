import React from 'react';
import { connect } from 'react-redux';

import { RadioInputGroup } from '../../elements';
import { iosSystemWideFilteringChange, iosSimplifiedFiltersModeChange, iosDNSChange } from '../../../dispatchers';
import { DNS_OPTIONS } from '../../../constants/input-options.js';
import { translator } from '../../../constants/strings';

function IOSSpecific(props) {
    const onSystemWideSelectionChange = (value) => {
        iosSystemWideFilteringChange(JSON.parse(value));
    };
    const onSimplifiedFiltersChange = (value) => {
        iosSimplifiedFiltersModeChange(JSON.parse(value));
    };
    return (
        <div>
            <RadioInputGroup text={translator.trans('step_2.ios.is_syswide_filt_enabled')} name="SystemWide" options={YN} checkedValue={props.iosSystemWideFilteringEnabled.value} onChangeHandler={onSystemWideSelectionChange} />
            <RadioInputGroup text={translator.trans('step_2.ios.is_simplified_filt_enabled')} name="Simplified" options={YN} checkedValue={props.iosSimplifiedFiltersEnabled.value} onChangeHandler={onSimplifiedFiltersChange} />
            <RadioInputGroup text={translator.trans('step_2.ios.is_DNS_enabled')} name="DNS" options={DNS_OPTIONS} checkedValue={props.iosDNS.value} onChangeHandler={iosDNSChange} />
        </div>
    );
}

export default connect((state) => ({
    iosSystemWideFilteringEnabled: state.iosSystemWideFilteringEnabled,
    iosSimplifiedFiltersEnabled: state.iosSimplifiedFiltersEnabled,
    iosDNS: state.iosDNS
}))(IOSSpecific);
