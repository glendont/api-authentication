import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import CustomInput from "./CustomInput";

class SignUp extends Component {
  onSubmit(data) {
    console.log("Form Data", data);
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

export default reduxForm({ form: "signup" })(SignUp);
