import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { ListSelection } from '../elements';

import { filtersUpdate } from '../../dispatchers';
import { filterOptions, filterOptionsMap } from '../../constants/input-options.js';

import { insVal, delVal } from '../../utils/immutable.js';

import { translator } from '../../constants/strings';


class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '' // Should I store it in the store too?
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.mapDataToListPropsArray = this.mapDataToListPropsArray.bind(this);
    }
    mapDataToInputProps(selected) { // selected is props.selectedFilters
        let options = filterOptions.filter((el) => {
            return selected.indexOf(el.value) === -1;
        });
        return { options };
    }
    onSelectChange(event) {
        if (event) {
            let newSelection = insVal(this.props.selectedFilters, event.value);
            filtersUpdate(newSelection);
            this.setState({
                current: event.value
            });
        }
    }
    mapDataToListPropsArray(selected) {
        let self = this;
        return selected.map( (val, index) => {
            let label = filterOptions[filterOptionsMap[val]].label;
            return {
                label: label,
                onClose: self.onDelete.bind(self, val),
                key: label
            };
        });
    }
    onDelete(val) {
        let newSelection = delVal(this.props.selectedFilters, val);
        filtersUpdate(newSelection);
    }
    render() {
        return (
            <div>
                <h1 className="title">{translator.trans('step_4.title')}</h1>
                <ListSelection
                    dataArray={this.props.selectedFilters}
                    mapDataToInputProps={this.mapDataToInputProps}
                    mapDataToListPropsArray={this.mapDataToListPropsArray}
                >
                    <Select
                        className="select"
                        placeholder={translator.trans('step_4.filter_input_placeholder')}
                        value={this.state.current}
                        onChange={this.onSelectChange}
                    />
                    <FilterEntry />
                </ListSelection>
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

export default Filters = connect((state) => ({
    selectedFilters: state.selectedFilters
}))(Filters);
