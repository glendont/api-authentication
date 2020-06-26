import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import CustomInput from "./CustomInput";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "./actions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseGoogle.bind(this);
  }

  async onSubmit(data) {
    console.log("Form Data", data);
    // We need to call some action
    await this.props.signUp(data);

    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseGoogle(res) {
    console.log("Google:", res);
    await this.props.oauthGoogle(res.accessToken);

    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }

  async responseFacebook(res) {
    console.log("Facebook:", res);

    await this.props.oauthFacebook(res.accessToken);

    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
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
            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}
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
            <FacebookLogin
              appId="757282805017535"
              autoLoad={false}
              textButton="Facebook"
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            />
            {/* <button className="btn btn-primary"> Facebook </button>
            <button className="btn btn-primary"> Google </button> */}

            <GoogleLogin
              clientId="595923078814-a7342ipt4287c0grf1rdefd7mqe59fud.apps.googleusercontent.com"
              autoLoad={false}
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-primary"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
