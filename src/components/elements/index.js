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
        if(this.state.value === undefined) {
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
                <input type="text" className={classStr} id={this.props.id} placeholder={this.props.placeholder} onChange={this._onChange} value={this.state.value} />
            </div>
        );
    }
}

export class RadioInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked // Should I maintain this state here? I heard that React only updates when its state is updated. However, maybe storing it here won't be needed, because its parent component will be updated anyway and maybe it will cause its child components to re-render?
        };
    }
    _onChange(name, event) {
        this.setState({
            checked: event.currentTarget.checked
        });
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
