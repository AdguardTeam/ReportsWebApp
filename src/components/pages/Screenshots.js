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
            <h1 className="title">{Translator.trans('step_5.title')}</h1>
            <div className="text">{Translator.trans('step_5.please_take_a_screenshot')}</div>
            {
                repPh(Translator.trans('step_5.how_do_i_do_it'), /%ManualLink%/, (
                    <a href={Translator.trans('step_5.manual_link')} target="_blank" className="link">
                        {Translator.trans('step_5.manual')}
                    </a>
                ))
            }
            <div className="text">{Translator.trans('step_5.screenshot_requirements')}</div>
            <div className="list list--ordered">
                <div className="list__item">
                    <div className="text">{Translator.trans('step_5.please_highlight_screenshot')}</div>
                </div>
                <div className="list__item">
                    <div className="text">{Translator.trans('step_5.full_br_should_be_visible')}</div>
                </div>
                {
                    (props.productType == 'And' || props.productType=='iOS') &&
                    <div className="list__item">
                    {
                        repPh(Translator.trans('step_5.take_a_long_screenshot'), /%InstructionLink%/, (
                            <a href={Translator.trans('step_5.long_screenshot_instr_link')} target="_blank" className="link">
                                {Translator.trans('step_5.what_is_a_long_screenshot')}
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
            <TextInput placeholder={Translator.trans('step_5.screenshot_inputbox_placeholder')} {...props.inputProps}/>
            <button className="button button--green button--file" type="button" onClick={props.onAdd} disabled={!props.inputProps.validity}>{Translator.trans('step_5.screenshot_addbtn')}</button>
        </div>
    );
}
