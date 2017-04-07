import React from 'react';
import { connect } from 'react-redux';
import { TextInput, ListSelection } from '../elements';

import { screenshotURLCurrentUpdate, screenshotsUpdate } from '../../dispatchers';

import { immutableDelete } from '../../utils.js';

class Screenshots extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(url) {
        screenshotURLCurrentUpdate(url);
    }
    mapDataToListPropsArray(screenshotURLs) {
        return screenshotURLs.map((el, index) => ({
                src: el,
                onDelete: this.onDelete.bind(this, index)
        }));
    }
    onDelete(index) {
        var newScreenshotURLs = immutableDelete(this.props.screenshotURLs, index);
        screenshotsUpdate(newScreenshotURLs);
    }
    onAdd(event) {
        // if valid, push it to screenshot dataArray
        // if invalid, do nothing
    }
    render() {
        return (
            <div>
                <h1>Submit a screenshot</h1>
                <p className = "help-block">Please take a screenshot (or screenshots, if needed) of the problem and upload it to any cloud service.</p>
                <p className = "help-block">If you are unsure of how to do it, read our [URL]manual[/URL].</p>
                <p class = "help-block text-left">When taking the screenshot(s), please keep in mind following requirements:</p>
                <ol>
                    <li><p>If it is unclear from the screenshot what the problem is, highlight it with an arrow/frame/etc;</p></li>
                    <li><p>The full browser window should be visible;</p></li>
                    { 
                        (this.props.productType == "And" || this.props.productType=="iOS") && 
                        <li>
                            <p class = "text-left" >Please take a 'long' screenshot ([URL]what is 'long' screenshot?[/URL])</p>
                        </li>
                    }
                </ol>
                <ListSelection
                    dataArray={this.props.screenshotURLs}
                    mapDataToInputProps={() => ({...this.props.screenshotURLCurrent, onChangeHandler: this.onInputChange})}
                    mapDataToListPropsArray={this.mapDataToListPropsArray}
                >
                    <TextInput placeholder="Enter screenshot URL..."/>
                    <button onClick={this.onAdd}>Add another...</button>
                    <ImageBox width="100px" height="100px"/> {/* say 100 px for now...*/}
                </ListSelection>
            </div>
        )
    }
};

export default Screenshots = connect((state) => ({
    productType: state.productType,
    screenshotURLCurrent: state.screenshotURLCurrent,
    screenshotURLs: state.screenshotURLs
}))(Screenshots);

// To be elaborated...
function ImageBox(props) {
    return (
        <div style={{display: 'inline'}}>
            <img src={this.props.src} width={this.props.width} height={this.props.height}/>
            <div className="close-btn" onClick={this.props.onDelete}/>
        </div>
    );
}
