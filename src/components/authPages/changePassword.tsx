import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./changePassword.css";
import { useDispatch } from "react-redux";
import { Loading } from "../gamePages/Loading";

interface Props {
  setUserInfoToFalse: () => void;
}
export const ChangePassword: React.FC<Props> = ({ setUserInfoToFalse }) => {
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const JWT_TOKEN: string | null = JSON.parse(
    localStorage.getItem("userToken") || "{}"
  );
  const adminIsAuthenticated: boolean | null = JSON.parse(
    localStorage.getItem("adminAuth") || "{}"
  );
  const isAuthenticated: boolean | null = JSON.parse(
    localStorage.getItem("isAuthenticated") || "{}"
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
      }}
      validationSchema={Yup.object({
        oldPassword: Yup.string()
          .max(255, "Must be 255 characters or less")
          .required("Required")
          .min(6, "Must be 255 characters or more"),
        newPassword: Yup.string()
          .max(255, "Must be 255 characters or less")
          .required("Required")
          .min(1, "Must be 255 characters or more"),
      })}
      onSubmit={async ({ oldPassword, newPassword }, { setSubmitting }) => {
        if (isAuthenticated) {
          const data: any = await axios.post(
            "http://localhost:3001/user/changepassword",
            {
              token: JWT_TOKEN,
              oldPassword: oldPassword,
              newPassword: newPassword,
            }
          );
          data.data === "password changed"
            ? setChangePasswordMessage("password edited")
            : setChangePasswordMessage(
                "error in editing password  '" + data.data + "'"
              );
          console.log(data);
        } else if (adminIsAuthenticated) {
          const data: any = await axios.post(
            "http://localhost:3001/admin/changepassword",
            {
              token: JWT_TOKEN,
              oldPassword: oldPassword,
              newPassword: newPassword,
            }
          );
          data.data === "password changed"
            ? setChangePasswordMessage("password edited")
            : setChangePasswordMessage(
                "error in editing password  '" + data.data + "'"
              );
          console.log(data);
        } else {
          console.log("non");
        }
      }}
    >
      <>
        {isAuthenticated ? (
          <>
            {loading ? (
              <>{<Loading />}</>
            ) : (
              <>
                <Form>
                  <div
                    onClick={() => {
                      setUserInfoToFalse();
                    }}
                    className="ChangePasswordContainer"
                  >
                    <div className="changePasswordFormContainer">
                      <h1 className="changePasswordMainMessage">
                        Change your Password
                      </h1>
                      <p>{changePasswordMessage}</p>
                      <div className="changePasswordForms">
                        <div className="changePasswordErrorDiv changePasswordErrorTextQuestion">
                          <ErrorMessage name="oldPassword" />
                        </div>
                        <Field
                          className="oldPasswordInput"
                          name="oldPassword"
                          type="text"
                          placeholder="type old password"
                        />
                        <div className="changePasswordErrorDiv changePasswordErrorResponseOne">
                          <ErrorMessage name="newPassword" />
                        </div>
                        <Field
                          className="newPasswordInput"
                          name="newPassword"
                          type="text"
                          placeholder="type new password"
                        />
                        <button className="changePasswordButton" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </>
        ) : isAuthenticated && !adminIsAuthenticated ? (
          <>login first user</>
        ) : null}
        {!isAuthenticated && adminIsAuthenticated ? (
          <>
            {loading ? (
              <>{<Loading />}</>
            ) : (
              <>
                <Form>
                  <div
                    onClick={() => {
                      setUserInfoToFalse();
                    }}
                    className="ChangePasswordContainer"
                  >
                    <div className="changePasswordFormContainer">
                      <h1 className="changePasswordMainMessage">
                        Change your Password
                      </h1>
                      <p>{changePasswordMessage}</p>
                      <div className="changePasswordForms">
                        <div className="changePasswordErrorDiv changePasswordErrorTextQuestion">
                          <ErrorMessage name="oldPassword" />
                        </div>
                        <Field
                          className="oldPasswordInput"
                          name="oldPassword"
                          type="text"
                          placeholder="type old password"
                        />
                        <div className="changePasswordErrorDiv changePasswordErrorResponseOne">
                          <ErrorMessage name="newPassword" />
                        </div>
                        <Field
                          className="newPasswordInput"
                          name="newPassword"
                          type="text"
                          placeholder="type new password"
                        />
                        <button className="changePasswordButton" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </>
        ) : (
          <>login first</>
        )}
      </>
    </Formik>
  );
};
