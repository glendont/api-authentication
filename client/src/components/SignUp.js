import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import CustomInput from "./CustomInput";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "./actions";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async onSubmit(data) {
    console.log("Form Data", data);

    // We need to call some action
    await this.props.signUp(data);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@gmail.com"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                d
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="password"
                component={CustomInput}
              />
            </fieldset>{" "}
            <button type="submit" className="btn btn-primary">
              {" "}
              Sign Up{" "}
            </button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">
              Or Sign up using third-party services
            </div>
            <button className="btn btn-primary"> Facebook </button>
            <button className="btn btn-primary"> Google </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: "signup" })
)(SignUp);
