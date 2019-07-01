import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    Joi.validate(this.state.data, this.schema);
    //console.log();

    const errors = [];
    const { data } = this.state;
    if (data.username.trim() === "") errors.username = "User name is requird.";

    if (data.password.trim() === "") errors.password = "Password is requird.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    // if (name === "username") {
    //   if (value.trim() === "") return "User name is required.";
    // }

    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required.";
    // }

    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorsMessage = this.validateProperty(input);
    if (errorsMessage) errors[input.name] = errorsMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors.name}
      />
    );
  }
}

export default Form;
