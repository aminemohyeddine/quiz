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
      console.log(user.data);
      localStorage.setItem("headerToken", JSON.stringify(user.data.token));
      history.push("/game");
    } else {
      console.log(user.data);
      setMessage(user.data);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(60, "Username Must be 15 characters or less")
            .min(5, "Username Must be 5 characters or more")
            .required("Username is Required"),
          password: Yup.string()
            .max(20, "password Must be 20 characters or less")
            .min(5, "password Must be 5 characters or more")
            .required("password is Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          fetchProducts(values.userName, values.password);

          // console.log(
          //   JSON.stringify(values.userName) +
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
                  <h1>Log in shoooo Ishop</h1>
                  {errors.userName && touched.userName ? (
                    <div className="usernameErrorMessage">
                      <ErrorMessage name="userName" />
                    </div>
                  ) : null}
                  <Field
                    placeholder="username"
                    className="userNameInput"
                    name="userName"
                    type="text"
                    autoComplete="off"
                  />
                  {errors.password && touched.password ? (
                    <div className="passwordErrorMessage">
                      <ErrorMessage name="password" />
                    </div>
                  ) : null}

                  <Field
                    placeholder="password"
                    className="PasswordInput"
                    name="password"
                    type="password"
                  />
                  <button className="loginButton" type="submit">
                    Log in
                  </button>
                  <div className="signUpPage">
                    you don't have an account ?{" "}
                    <Link to="/signup">create one by clicking this</Link>
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
