import * as React from 'react';

export const XInput = React.createClass({
    inputChange(e){
        this.props.onChange(e.target.value);
    },
    render() {
        var label = (this.props.label) ? <label className="x-input__label">{this.props.label}</label> : "";
        var placeholder = (this.props.placeholder) ? this.props.placeholder : "";
        return (
            <div className="x-input">
                {label}
                <input className="x-input__value" onChange={this.inputChange} value={this.props.value} placeholder={placeholder}/>
            </div>
        );
    }
})
