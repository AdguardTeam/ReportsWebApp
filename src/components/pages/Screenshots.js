import React from 'react';
import { connect } from 'react-redux';
import { TextInput, ListSelection } from '../elements';

import { screenshotURLCurrentUpdate, addScreenshotUrl,  deleteScreenshotUrl, screenshotIsLoaded, screenshotIsErrored } from '../../dispatchers';

import { translator } from '../../constants/strings';


function Screenshots(props) {
    const onInputChange = (url) => {
        screenshotURLCurrentUpdate(url);
    };
    const mapDataToInputProps = (data) => {
        return {
            value: data[0].value
        };
    }
    const mapDataToListPropsArray = (data) => {
        // data is [screenshotURLCurrent, screenshotURLs]
        return data[1].map((el, index) => ({
            src: el.value,
            loadedOnce: el.validity,
            onDelete: onDelete.bind(this, index),
            onLoad: onLoad.bind(this, index),
            onError: onError.bind(this, index),
            key: el.value
        }));
    };
    const onDelete = (index) => {
        deleteScreenshotUrl(index);
    };
    const onLoad = (index) => {
        screenshotIsLoaded(index);
    };
    const onError = (index) => {
        screenshotIsErrored(index);
    }
    const onAdd = (event) => {
        addScreenshotUrl();
    };

    const repPh = (str, ph, el) => { // Replaces a placeholder into a React element.
        ph.test(str);
        let l = RegExp.leftContext;
        let r = RegExp.rightContext;
        return ( <div className="text"> {l}{el}{r} </div> );
    };

    return (
        <div>
            <h1 className="title">{translator.trans('step_5.title')}</h1>
            <div className="text">{translator.trans('step_5.please_take_a_screenshot')}</div>
            {
                repPh(translator.trans('step_5.how_do_i_do_it'), /%ManualLink%/, (
                    <a href={translator.trans('step_5.manual_link')} target="_blank" className="link">
                        {translator.trans('step_5.manual')}
                    </a>
                ))
            }
            <div className="text">{translator.trans('step_5.screenshot_requirements')}</div>
            <div className="list list--ordered">
                <div className="list__item">
                    <div className="text">{translator.trans('step_5.please_highlight_screenshot')}</div>
                </div>
                <div className="list__item">
                    <div className="text">{translator.trans('step_5.full_br_should_be_visible')}</div>
                </div>
                {
                    (props.productType == 'And' || props.productType=='iOS') &&
                    <div className="list__item">
                    {
                        repPh(translator.trans('step_5.take_a_long_screenshot'), /%InstructionLink%/, (
                            <a href={translator.trans('step_5.long_screenshot_instr_link')} target="_blank" className="link">
                                {translator.trans('step_5.what_is_a_long_screenshot')}
                            </a>
                        ))
                    }
                    </div>
                }
            </div>
            <ListSelection
                dataArray={[props.screenshotURLCurrent, props.screenshotURLs]}
                mapDataToInputProps={mapDataToInputProps}
                mapDataToListPropsArray={mapDataToListPropsArray}
            >
                <InputBoxWithAddButton
                    inputProps={{
                        onChangeHandler: onInputChange,
                        ...props.screenshotURLCurrent
                    }}
                    onAdd={onAdd} />
                <ImageBox/>
            </ListSelection>
        </div>
    );

}

export default Screenshots = connect((state) => ({
    productType: state.productType,
    screenshotURLCurrent: state.screenshotURLCurrent,
    screenshotURLs: state.screenshotURLs
}))(Screenshots);


class ImageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: props.loadedOnce ? true : null
        };
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
    }
    onLoad(evt) {
        if (!evt) { this.onError(); }
        let img = evt.target;
        if (img.naturalHeight + img.naturalWidth === 0) { this.onError(); }
        this.setState({
            loaded: true
        });
        this.props.onLoad();
    }
    onError() {
        this.setState({
            loaded: false
        });
        this.props.onError();
    }
    render() {
        return (
            <div className="screenshot">
                <img className="screenshot__image" src={this.props.src} onLoad={this.onLoad} onError={this.onError} />
                { this.state.loaded === null && <div className="loading"></div> }
                { this.state.loaded === false && <div className="screenshot__error"></div> }
                <div className="screenshot__remove" onClick={this.props.onDelete}>X</div>
            </div>
        );
    }
}

/**
 * props: inputProps, onAdd
 */
function InputBoxWithAddButton(props) {
    return (
        <div className="form form--file">
            <TextInput placeholder={translator.trans('step_5.screenshot_inputbox_placeholder')} {...props.inputProps}/>
            <button className="button button--green button--file" type="button" onClick={props.onAdd} disabled={!props.inputProps.validity}>{translator.trans('step_5.screenshot_addbtn')}</button>
        </div>
    );
}
