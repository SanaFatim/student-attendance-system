import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from './Select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  schema = {};

  validate = () => {
    const errors = {};
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return;
    for (let item of error.details) {
      errors[item.path] = item.message;
    }
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    let { data, errors } = { ...this.state };
    data[input.name] = input.value;
    const error = this.validateProperty(input.name, input.value);
    error ? (errors[input.name] = error) : (errors = {});
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button
        className="btn btn-primary mt-3"
        onSubmit={this.handleSubmit}
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  };

  renderSelect = (name, label, displayValue, actualValue, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        displayValue={displayValue}
        actualValue={actualValue}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderParagraph = (paragraphText, href, linkText) => {
    return (
      <p className="mb-3">
        {paragraphText} <a href={href}>{linkText}</a>
      </p>
    );
  };
}

export default Form;
