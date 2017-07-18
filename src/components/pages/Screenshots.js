import React from 'react';
import { connect } from 'react-redux';
import { TextInput, ListSelection } from '../elements';

import { screenshotURLCurrentUpdate, screenshotsUpdate } from '../../dispatchers';

import { pushVal, delInd } from '../../utils/immutable.js';

import Translator from '../../constants/strings';


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

    const repPh = (str, ph, el) => { // Replaces a placeholder into a React element.
        ph.test(str);
        let l = RegExp.leftContext;
        let r = RegExp.rightContext;
        return ( <div className="text"> {l}{el}{r} </div> );
    };

    return (
        <div>
            <h1 className="title">{Translator.trans('5Title')}</h1>
            <div className="text">{Translator.trans('5PleaseTake')}</div>
            {
                repPh(Translator.trans('5HowTo'), /%ManualLink%/, (
                    <a href="https://www.take-a-screenshot.org/" className="link">
                        {Translator.trans('5Manual')}
                    </a>
                ))
            }
            <div className="text">{Translator.trans('5ScReq')}</div>
            <div className="list list--ordered">
                <div className="list__item">
                    <div className="text">{Translator.trans('5Highlight')}</div>
                </div>
                <div className="list__item">
                    <div className="text">{Translator.trans('5FullVisible')}</div>
                </div>
                {
                    (props.productType == 'And' || props.productType=='iOS') &&
                    <div className="list__item">
                    {
                        repPh(Translator.trans('5LongScrs'), /%InstructionLink%/, (
                            <a href="http://phandroid.com/2016/07/13/scrolling-screenshots-android/" className="link">
                                {Translator.trans('5InstrLink')}
                            </a>
                        ))
                    }
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
            <TextInput placeholder={Translator.trans('5ScrsUrlPh')} {...props.inputProps}/>
            <button className="button button--green button--file" type="button" onClick={props.onAdd} disabled={!props.inputProps.validity}>{Translator.trans('5ScrsAdd')}</button>
        </div>
    );
}
