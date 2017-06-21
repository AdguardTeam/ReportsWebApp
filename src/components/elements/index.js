import React from 'react';

// props: value, validity
export class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this._onChange = this._onChange.bind(this);
    }
    _onChange(e) {
        this.props.onChangeHandler(e.target.value);
        this.setState({
            value: e.target.value
        });
    }
    render() {
        let classStr = "input"; // To be used on something else..
        if(this.state.value === '') {
            classStr += " input--empty";
        }
        else {
            if(this.props.validity) {
                classStr += " input--valid";
            }
            else {
                classStr += " input--invalid";
            }
        }
        return (
            <div className="input-wrapper">
                <input type="text" className={classStr} id={this.props.id} placeholder={this.props.placeholder} onChange={this._onChange} value={this.state.value} disabled={this.props.disabled} />
            </div>
        );
    }
}

export class RadioInput extends React.Component {
    constructor(props) {
        super(props);
    }
    _onChange(name, event) {
        this.props.onChangeHandler.call(this, event.currentTarget.value, name);
    }
    render() {
        return (
            <label className="radio">
                <input className="radio__input" type="radio" value={this.props.value} autoComplete="off" checked={this.props.checked} onChange={this._onChange.bind(this, this.props.name)}/>
                <span className="radio__text">{this.props.labelText}</span>
            </label>
        )
    }
}

/**
 * props:
 * text,
 * name,
 * options: array of Names.
 * onChangeHandler : called with (event.currentTarget.value, name)
 * checkedValue 
 */
export class RadioInputGroup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
            return (
            <div className="row row--radio">
                <div className="text">{this.props.text}</div>
                <div>
                    {
                        this.props.options.map((option, index) => <RadioInput key={index} value={option.value} labelText={option.label} name={this.props.name} checked={this.props.checkedValue==option.value} onChangeHandler={this.props.onChangeHandler} />)
                    }
                </div>
            </div>
        );
    }
}

/**
 * Displays a list of user input. Gets 3 props:
 * dataArray, mapDataToInputProps, mapDataToListPropsArray
 */
export class ListSelection extends React.Component {
    constructor(props) {
        super(props);
        this.renderChildren = this.renderChildren.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderList = this.renderList.bind(this);
    }
    renderInput(element) {
        return React.cloneElement(element, {...this.props.mapDataToInputProps(this.props.dataArray)});
    }
    renderList(element) {
        let propsArray = this.props.mapDataToListPropsArray(this.props.dataArray);
        return (
            <div>
                { propsArray.map((prop, index) => React.cloneElement(element, {...prop})) }
            </div>
        )
    }
    renderChildren() {
        return React.Children.map(this.props.children, (child, i) => {
            switch(i) {
                case 0:
                    return this.renderInput(child);
                case 1:
                    return this.renderList(child);
                default:
                    return null;
            }
        });
    }
    render() {
        return (
            <div>
                { this.renderChildren() }
            </div>
        )
    }
}
