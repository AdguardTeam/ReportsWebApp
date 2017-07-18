import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput } from '../elements';

import { productTypeChange, productVersionChange } from '../../dispatchers';

import { productTypeOptions } from '../../constants/input-options.js';

import Translator from '../../constants/strings';

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
            <h1 className="title">{Translator.trans('1Title')}</h1>
            <Select
                name="ProdType"
                className="select"
                placeholder="Adguard product type"
                value={props.productType.value}
                options={productTypeOptions}
                onChange={onProdTypeChange}
            />
            <TextInput
                name="ProdVer"
                placeholder="Enter the product version..."
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
