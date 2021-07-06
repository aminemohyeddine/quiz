import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginPage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
}
export const SignUp: React.FC = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");

  const fetchProducts = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userName: string,
    phoneNumber: string
  ) => {
    const user = await axios.post("http://localhost:3001/user/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userName: userName,
      phoneNumber: phoneNumber,
    });
    if (user.data.message === "user added") return setMessage("user Added");
    setMessage(user.data);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          email: "",
          phoneNumber: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string()
            .max(15, "Username Must be 15 characters or less")
            .min(5, "Username Must be 5 characters or more")
            .required("Username is Required"),
          password: Yup.string()
            .max(20, "password Must be 20 characters or less")
            .min(5, "password Must be 5 characters or more")
            .required("password is Required"),
          firstName: Yup.string()
            .max(15, "firstName Must be 15 characters or less")
            .min(2, "firstName Must be 2 characters or more")
            .required("firstName is Required"),
          lastName: Yup.string()
            .max(20, "lastName Must be 20 characters or less")
            .min(2, "lastName Must be 2 characters or more")
            .required("lastName is Required"),
          email: Yup.string()
            .max(60, "email Must be 60 characters or less")
            .min(10, "email Must be 10 characters or more")
            .required("email is Required")
            .email(),
          phoneNumber: Yup.string()
            .max(20, "password Must be 20 characters or less")
            .min(5, "password Must be 5 characters or more")
            .required("password is Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          fetchProducts(
            values.firstName,
            values.lastName,
            values.email,
            values.password,
            values.userName,
            values.phoneNumber
          );
          // firstName, lastName, email, password, userName, phoneNumber;
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="signUp">
              <div className="singUpFormContainer">
                <h1>{message}</h1>
                <h1>Sign Up</h1>

                {/* firstName input */}
                {errors.firstName && touched.firstName ? (
                  <div className="firstNameErrorM">
                    <ErrorMessage name="firstName" />
                  </div>
                ) : null}
                <Field
                  placeholder="First name"
                  className="singUpFirstNameInput"
                  name="firstName"
                  type="text"
                  autoComplete="off"
                />

                {/* lastName input */}
                {errors.lastName && touched.lastName ? (
                  <div className="lastNameErrorM">
                    <ErrorMessage name="lastName" />
                  </div>
                ) : null}
                <Field
                  placeholder="Last name"
                  className="singUpLastNameInput"
                  name="lastName"
                  type="text"
                  autoComplete="off"
                />

                {/* userName input */}
                {errors.userName && touched.userName ? (
                  <div className="lastNameUserNameErrorM">
                    <ErrorMessage name="userName" />
                  </div>
                ) : null}
                <Field
                  placeholder="User name"
                  className="lastNameUserNameInput"
                  name="userName"
                  type="text"
                  autoComplete="off"
                />

                {/* password input */}
                {errors.password && touched.password ? (
                  <div className="singUpPasswordErrorM">
                    <ErrorMessage name="password" />
                  </div>
                ) : null}
                <Field
                  placeholder="Password"
                  className="singUpPasswordInput"
                  name="password"
                  type="password"
                />

                {/* email input */}
                {errors.email && touched.email ? (
                  <div className="emailEmailErrorM">
                    <ErrorMessage name="email" />
                  </div>
                ) : null}
                <Field
                  className="singUpEmailInput"
                  name="email"
                  placeholder="Email"
                  type="text"
                />

                {/* phoneNumber input */}
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="phoneErrorM">
                    <ErrorMessage name="phoneNumber" />
                  </div>
                ) : null}
                <Field
                  placeholder="Phone Number"
                  className="phoneInput"
                  name="phoneNumber"
                  type="text"
                />
                <button className="signUpLoginButton" type="submit">
                  Create Your Store
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
