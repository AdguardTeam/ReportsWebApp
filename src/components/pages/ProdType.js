import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { TextInput } from '../elements';

import { productTypeChange, productVersionChange } from '../../dispatchers';

import { productTypeOptions } from '../../constants/input-options.js';


var ProdType = React.createClass({
    onProdTypeChange(event) {
        console.log(event);
        productTypeChange(event.value);
    },
    onProdVerChange(value) {
        productVersionChange(value);
    },
    render() {
        var prodVerInputConfig = {
            ...this.props.productVersion,
            id: null,
            placeholder: "Enter the product version..."
        };
        return (
            <div>
                <h1>What product type do you use?</h1>
                <Select
                    name="ProdType"
                    className="form-group"
                    placeholder="Adguard product type"
                    value={this.props.productType.value}
                    options={productTypeOptions}
                    onChange={this.onProdTypeChange}
                />
                <TextInput
                    name="ProdVer"
                    placeholder="Enter the product version..."
                    {...this.props.productVersion}
                    onChangeHandler={this.onProdVerChange}
                />
            </div>
        )
    }
})

export default connect(
    state => ({
        productType: state.productType,
        productVersion: state.productVersion
    })
)(ProdType);