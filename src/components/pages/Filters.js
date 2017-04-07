import React from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { ListSelection } from '../elements';

import { filtersUpdate } from '../../dispatchers';
import { filterOptions, filterOptionsMap } from '../../constants/input-options.js';

import { immutableInsert, immutableDelete, complement } from '../../utils.js';


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
        var unselected = complement(selected, filterOptions.length);
        var options = unselected.map((i) => {
            let option = filterOptions[filterOptionsMap[i]];
            return {
                label: option.label,
                value: option.value
            };
        });
        return { options };
    }
    onSelectChange(event){
        var newSelection = immutableInsert(this.props.selectedFilters, event.value);
        filtersUpdate(newSelection);
        this.setState({
            current: event.value
        });
    }
    mapDataToListPropsArray(selected) {
        var self = this;
        return selected.map( (val, index) => {
            return {
                label: filterOptions[filterOptionsMap[val]].label,
                onClose: self.onDelete.bind(self, val),
                key: index
            };
        });
    }
    onDelete(val) {
        var newSelection = immutableDelete(this.props.selectedFilters, val);
        filtersUpdate(newSelection);
    }
    render() {
        return (
            <div>
                <h1>Here goes a title</h1>
                <ListSelection 
                    dataArray={this.props.selectedFilters}
                    mapDataToInputProps={this.mapDataToInputProps}
                    mapDataToListPropsArray={this.mapDataToListPropsArray}    
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
    selectedFilters: state.selectedFilters
}))(Filters);


