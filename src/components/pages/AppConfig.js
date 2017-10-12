import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { ListSelection } from '../elements';
import WinSpecific from './config-questions/Win';
import AndSpecific from './config-questions/And';
import IOSSpecific from './config-questions/iOS';

import { addFilter, deleteFilter } from '../../dispatchers';
import { filterOptions, filterOptionsMap } from '../../constants/input-options.js';

import { translator } from '../../constants/strings';

import { validateURL } from '../../reducers/validator';


class AppConfig extends React.Component {
    constructor(props) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.mapDataToListPropsArray = this.mapDataToListPropsArray.bind(this);
    }
    mapDataToInputProps([selectedFilters, selectedCustomFilters]) {
        let options = filterOptions.filter((el) => {
            return selectedFilters.indexOf(el.value) === -1;
        });
        return { options };
    }
    onSelectChange(event) {
        if (event) {
            addFilter(event.value);
        }
    }
    mapDataToListPropsArray([selectedFilters, selectedCustomFilters]) {
        let filters = selectedFilters.map( (val, index) => {
            let label = filterOptions[filterOptionsMap[val]].label;
            return {
                label: label,
                onClose: this.onDelete.bind(this, val),
                key: label
            };
        });
        let customFilters = selectedCustomFilters.map( (val) => {
            return {
                label: val,
                onClose: this.onDelete.bind(this, val),
                key: val
            };
        });
        return filters.concat(customFilters);
    }
    onDelete(val) {
        deleteFilter(val);
    }
    render() {
        let SpecificQuestions;
        switch(this.props.productType.value) {
            case 'Win':
                SpecificQuestions = WinSpecific;
                break;
            case 'And':
                SpecificQuestions = AndSpecific;
                break;
            case 'iOS':
                SpecificQuestions = IOSSpecific;
                break;
            default:
                SpecificQuestions = () => <div/>;
        }

        return (
            <div>
                <h1 className="title">{translator.trans('step_4.title')}</h1>
                <div className="text">{translator.trans('step_4.what_filter_do_you_have_enabled')}</div>
                <ListSelection
                    dataArray={[this.props.selectedFilters, this.props.selectedCustomFilters]}
                    mapDataToInputProps={this.mapDataToInputProps}
                    mapDataToListPropsArray={this.mapDataToListPropsArray}
                >

                    <Select.Creatable
                        className="select"
                        placeholder={translator.trans('step_4.filter_input_placeholder')}
                        
                        onChange={this.onSelectChange}

                        isValidNewOption={
                            ({ label: filterUrl }) => {
                                return filterUrl && validateURL(filterUrl.trim());
                            }
                        }

                        promptTextCreator={
                            (filterUrl) => {
                                return translator.trans('step_4.enter_custom_filter_subscription', {
                                    'filterUrl': filterUrl
                                })
                            }
                        }
                    />


                    <FilterEntry />
                </ListSelection>
                <SpecificQuestions />
            </div>
        );
    }
}

// to be elaborated...
function FilterEntry(props) {
    return (
        <div className="filter">
            <span className="filter__title">{props.label}</span>
            <span className="filter__remove" onClick={props.onClose}>x</span>
        </div>
    );
}

export default AppConfig = connect((state) => ({
    productType: state.productType,
    
    selectedFilterCurrent: state.selectedFilterCurrent,
    
    selectedFilters: state.selectedFilters,
    selectedCustomFilters: state.selectedCustomFilters
}))(AppConfig);
