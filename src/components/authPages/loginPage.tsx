import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export const LoginPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const fetchProducts = async (email: string, password: string) => {
    const user = await axios.post("http://localhost:3001/user/login", {
      email: email,
      password: password,
    });

    if (user.data.login) {
      localStorage.setItem("userToken", JSON.stringify(user.data.token));
      history.push("/posts");
    } else {
      console.log(user.data);
      setMessage(user.data);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(60, "* email Must be 15 characters or less")
            .min(6, "*email Must be 6 characters or more")
            .required("*email is Required")
            .email("must be an email"),
          password: Yup.string()
            .max(20, "*password Must be 20 characters or less")
            .min(6, "*password Must be 6 characters or more")
            .required("*password is Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          fetchProducts(values.email, values.password);

          // console.log(
          //   JSON.stringify(values.email) +
          //     " " +
          //     JSON.stringify(values.password)
          // );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="LoginPageContainer">
              <div className="formContainer">
                <div className="itemsContainer">
                  <div className="loginFailedMessage">{message}</div>
                  <div className="loginIcon">
                    <i className="far fa-user"></i>
                  </div>

                  <div className="loginText">Login here</div>
                  {errors.email ? (
                    <div className="usernameErrorMessage">
                      <ErrorMessage name="email" />
                    </div>
                  ) : null}
                  {errors.password ? (
                    <div className="passwordErrorMessage">
                      <ErrorMessage name="password" />
                    </div>
                  ) : null}
                  <label className="emailLabel">Email</label>

                  <Field
                    placeholder="enter email"
                    className="userNameInput"
                    name="email"
                    type="text"
                    autoComplete="off"
                  />
                  <label className="passwordLabel">password</label>

                  <Field
                    placeholder="password"
                    className="passwordInput"
                    name="password"
                    type="password"
                  />
                  <button className="loginButton" type="submit">
                    Login
                  </button>
                  <div className="signUpPageDiv">
                    <Link to="/register" className="signUpPageLink">
                      Don't have an account?
                    </Link>
                  </div>
                  <div className="forgottenPasswordDiv">
                    <Link to="/reset" className="forgottenPasswordLink">
                      Lost your password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
