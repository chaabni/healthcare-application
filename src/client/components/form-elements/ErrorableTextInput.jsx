import React from 'react';
import _ from 'lodash';

import { makeField } from '../../../common/fields.js';

/**
 * A form input with a label that can display error messages.
 *
 * Props:
 * `errorMessage` - Error string to display in the component.
 *                  When defined, indicates input has a validation error.
 * `label` - String for the input field label.
 * `name` - String for the input name attribute.
 * `autocomplete` - String for the input autocomplete attribute.
 * `placeholder` - placeholder string for input field.
 * `required` - boolean. Render marker indicating field is required.
 * `field` - string. Value of the input field.
 * `additionalClass` - Extra attribute for use by CSS selector, specifically
 *                     by tests
 * `onValueChange` - a function with this prototype: (newValue)
 */
class ErrorableTextInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.inputId = _.uniqueId('errorable-text-input-');
  }

  handleChange(domEvent) {
    this.props.onValueChange(makeField(domEvent.target.value, true));
  }

  render() {
    // Calculate error state.
    let errorSpan = '';
    let errorSpanId = undefined;
    let inputErrorClass = undefined;
    let labelErrorClass = undefined;
    if (this.props.errorMessage) {
      errorSpanId = `${this.inputId}-error-message`;
      errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{this.props.errorMessage}</span>;
      inputErrorClass = 'usa-input-error';
      labelErrorClass = 'usa-input-error-label';
    }

    // Calculate required.
    let requiredSpan = undefined;
    if (this.props.required) {
      requiredSpan = <span className="hca-required-span">*</span>;
    }

    return (
      <div className={inputErrorClass}>
        <label
            className={labelErrorClass}
            htmlFor={this.inputId}>
              {this.props.label}
              {requiredSpan}
        </label>
        {errorSpan}
        <input
            className={this.props.additionalClass}
            aria-describedby={errorSpanId}
            id={this.inputId}
            placeholder={this.props.placeholder}
            name={this.props.name}
            autoComplete={this.props.autocomplete}
            type="text"
            value={this.props.field.value}
            onChange={this.handleChange}/>
      </div>
    );
  }
}

ErrorableTextInput.propTypes = {
  errorMessage: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  name: React.PropTypes.string,
  autocomplete: React.PropTypes.string,
  required: React.PropTypes.bool,
  field: React.PropTypes.shape({
    value: React.PropTypes.string,
    dirty: React.PropTypes.bool
  }).isRequired,
  additionalClass: React.PropTypes.string,
  onValueChange: React.PropTypes.func.isRequired,
};

export default ErrorableTextInput;
