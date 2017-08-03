import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput } from '../elements';

import { productTypeChange, productVersionChange } from '../../dispatchers';

import { productTypeOptions } from '../../constants/input-options.js';

import { translator } from '../../constants/strings';

function ProdType(props) {
    const onProdTypeChange = (event) => {
        // react-select passes `null` to onChange props when the close button at the input field is clicked.
        let data = event && typeof event.value == 'string' ? event.value : null;
        productTypeChange(data);
    };
    const onProdVerChange = (value) => {
        productVersionChange(value);
    };
    return (
        <div>
            <h1 className="title">{translator.trans('step_1.title')}</h1>
            <Select
                name="ProdType"
                className="select"
                placeholder={translator.trans('step_1.prod_type_placeholder')}
                value={props.productType.value}
                options={productTypeOptions}
                onChange={onProdTypeChange}
            />
            <TextInput
                name="ProdVer"
                placeholder={translator.trans('step_1.prod_version_placeholder')}
                {...props.productVersion}
                onChangeHandler={onProdVerChange}
            />
        </div>
    );
}

export default connect(
    state => ({
        productType: state.productType,
        productVersion: state.productVersion
    })
)(ProdType);
