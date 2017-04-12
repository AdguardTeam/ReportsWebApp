import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { ListSelection } from '../elements';

import { filtersUpdate } from '../../dispatchers';
import { filterOptions, filterOptionsMap } from '../../constants/input-options.js';

import { insVal, delVal, complement } from '../../utils.js';


class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '' // Should I store it in the store too?
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.mapDataToListPropsArray = this.mapDataToListPropsArray.bind(this);
    }
    mapDataToInputProps(selected) {
        let unselected = complement(selected, filterOptions.length);
        let options = unselected.map((i) => {
            let option = filterOptions[filterOptionsMap[i]];
            return {
                label: option.label,
                value: option.value
            };
        });
        return { options };
    }
    onSelectChange(event) {
        let newSelection = insVal(this.props.selectedFilters, event.value);
        filtersUpdate(newSelection);
        this.setState({
            current: event.value
        });
    }
    onAddClick(event) {

    }
    mapDataToListPropsArray(selected) {
        let self = this;
        return selected.map( (val, index) => {
            return {
                label: filterOptions[filterOptionsMap[val]].label,
                onClose: self.onDelete.bind(self, val),
                key: index
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
                <h1>What filters do you have enabled?</h1>
                <ListSelection 
                    dataArray={this.props.selectedFilters}
                    mapDataToInputProps={this.mapDataToInputProps}
                    mapDataToListPropsArray={this.mapDataToListPropsArray}
                    onAddClick={this.onAddClick}
                >
                    <Select
                        placeholder="Start typing filters name here..."
                        value={this.state.current}
                        onChange={this.onSelectChange}
                    />
                    <FilterEntry />
                </ListSelection>
            </div>
        )
    }
}

// to be elaborated...
function FilterEntry(props) { 
    return (
        <div>
            <span>{props.label}</span>
            <span onClick={props.onClose}>x</span>
        </div>
    )
}

export default Filters = connect((state) => ({
    selectedFilterCurrent: state.selectedFilterCurrent,
    selectedFilters: state.selectedFilters
}))(Filters);
