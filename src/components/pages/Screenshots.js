import React from 'react';
import { connect } from 'react-redux';
import { TextInput, ListSelection } from '../elements';

import { screenshotURLCurrentUpdate, screenshotsUpdate } from '../../dispatchers';

import { pushVal, delInd } from '../../utils/immutable.js';


function Screenshots(props) {
    const onInputChange = (url) => {
        screenshotURLCurrentUpdate(url);
    };
    const mapDataToListPropsArray = (screenshotURLs) => {
        return screenshotURLs.map((el, index) => ({
                src: el,
                onDelete: onDelete.bind(this, index),
                key: el
        }));
    };
    const onDelete = (index) => {
        let newScreenshotURLs = delInd(props.screenshotURLs, index);
        screenshotsUpdate(newScreenshotURLs);
    };
    const onAdd = (event) => {
        if(props.screenshotURLCurrent.validity && props.screenshotURLs.indexOf(props.screenshotURLCurrent.value) == -1) {
            let newScreenshotURLs = pushVal(props.screenshotURLs, props.screenshotURLCurrent.value);
            screenshotsUpdate(newScreenshotURLs);
        }
        else {
            //do nothing, or alert user about it..
        }
    };

    return (
        <div>
            <h1>Submit a screenshot</h1>
            <p className = "help-block">Please take a screenshot (or screenshots, if needed) of the problem and upload it to any cloud service.</p>
            <p className = "help-block">If you are unsure of how to do it, read our [URL]manual[/URL].</p>
            <p className = "help-block text-left">When taking the screenshot(s), please keep in mind following requirements:</p>
            <ol>
                <li><p>If it is unclear from the screenshot what the problem is, highlight it with an arrow/frame/etc;</p></li>
                <li><p>The full browser window should be visible;</p></li>
                { 
                    (props.productType == "And" || props.productType=="iOS") && 
                    <li>
                        <p class = "text-left" >Please take a 'long' screenshot ([URL]what is 'long' screenshot?[/URL])</p>
                    </li>
                }
            </ol>
            <ListSelection
                dataArray={props.screenshotURLs}
                mapDataToInputProps={() =>{} }
                mapDataToListPropsArray={mapDataToListPropsArray}
            >
                <InputBoxWithAddButton
                    inputProps={{
                        onChangeHandler: onInputChange,
                            ...props.screenshotURLCurrent
                    }}
                    onAdd={onAdd} />
                <ImageBox width="100px" height="100px"/> {/* say 100 px for now...*/}
            </ListSelection>
        </div>
    )
    
}

export default Screenshots = connect((state) => ({
    productType: state.productType,
    screenshotURLCurrent: state.screenshotURLCurrent,
    screenshotURLs: state.screenshotURLs
}))(Screenshots);

// To be elaborated...
function ImageBox(props) {
    return (
        <div style={{display: 'inline'}}>
            <img src={props.src} width={props.width} height={props.height}/>
            <div className="close-btn" onClick={props.onDelete}>X</div>
        </div>
    );
}
/**
 * props: inputProps, onAdd
 */
function InputBoxWithAddButton(props) {
    return (
        <div>
            <TextInput placeholder="Enter screenshot URL..." {...props.inputProps}/>
            <button type="button" onClick={props.onAdd}>Add</button>
        </div>
    );
}
