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
        if (props.screenshotURLCurrent.validity && props.screenshotURLs.indexOf(props.screenshotURLCurrent.value) == -1) {
            let newScreenshotURLs = pushVal(props.screenshotURLs, props.screenshotURLCurrent.value);
            screenshotsUpdate(newScreenshotURLs);
        }
        else {
            //do nothing, or alert user about it..
        }
    };

    return (
        <div>
            <h1 className="title">Submit a screenshot</h1>
            <div className="text">Please take a screenshot (or screenshots, if needed) of the problem and upload it to any cloud service.</div>
            <div className="text">If you are unsure of how to do it, read our <a href="https://www.take-a-screenshot.org/" className="link">manual</a>.</div>
            <div className="text">When taking the screenshot(s), please keep in mind following requirements:</div>
            <div className="list list--ordered">
                <div className="list__item">
                    <div className="text">If it is unclear from the screenshot what the problem is, highlight it with an arrow/frame/etc;</div>
                </div>
                <div className="list__item">
                    <div className="text">The full browser window should be visible;</div>
                </div>
                {
                    (props.productType == 'And' || props.productType=='iOS') &&
                    <div className="list__item">
                        <div className="text">Please take a "long" screenshot (<a href="http://phandroid.com/2016/07/13/scrolling-screenshots-android/" className="link">what is "long" screenshot?</a>)</div>
                    </div>
                }
            </div>
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
                <ImageBox/> {/* say 100 px for now...*/}
            </ListSelection>
        </div>
    );

}

export default Screenshots = connect((state) => ({
    productType: state.productType,
    screenshotURLCurrent: state.screenshotURLCurrent,
    screenshotURLs: state.screenshotURLs
}))(Screenshots);

// To be elaborated...
function ImageBox(props) {
    return (
        <div className="screenshot">
            <img className="screenshot__image" src={props.src}/>
            <div className="screenshot__remove" onClick={props.onDelete}>X</div>
        </div>
    );
}
/**
 * props: inputProps, onAdd
 */
function InputBoxWithAddButton(props) {
    return (
        <div className="form form--file">
            <TextInput placeholder="Enter screenshot URL..." {...props.inputProps}/>
            <button className="button button--green button--file" type="button" onClick={props.onAdd} disabled={!props.inputProps.validity}>Add</button>
        </div>
    );
}
