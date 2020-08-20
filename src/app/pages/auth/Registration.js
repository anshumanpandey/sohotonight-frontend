import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Select, TextField, MenuItem, FormControl, InputLabel, makeStyles } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

function Registration(props) {
  const { intl } = props;
  const classes = useStyles();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        {registerSuccess == false && (
          <div className="kt-login__title">
            <h3>
              <FormattedMessage id="AUTH.REGISTER.TITLE" />
            </h3>
          </div>
        )}

        {registerSuccess == true && (
          <h2>Thanks for showing your interest in Soho Tonight. We shall be in touch soon.</h2>
        )}

        {!registerSuccess && (
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobileNumber: "",
              age: "",
              role: "",
              location: "",
            }}
            validate={values => {
              const errors = {};

              if (!values.email) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD"
                });
              }

              if (!values.name) {
                errors.name = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.confirmPassword) {
                errors.confirmPassword = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword =
                  "Password and Confirm Password didn't match.";
              }

              if (!values.age) {
                errors.age = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.mobileNumber) {
                errors.mobileNumber = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.role) {
                errors.role = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              if (!values.location) {
                errors.location = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              register(values)
                .then(({ data: { token } }) => {
                  setRegisterSuccess(true)
                })
                .catch(() => {
                  setSubmitting(false);
                  setStatus(
                    intl.formatMessage({
                      id: "AUTH.VALIDATION.INVALID_LOGIN"
                    })
                  );
                });
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting
            }) => (
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                  {status && (
                    <div role="alert" className="alert alert-danger">
                      <div className="alert-text">{status}</div>
                    </div>
                  )}

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      label="Name"
                      className="kt-width-full"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      helperText={touched.name && errors.name}
                      error={Boolean(touched.name && errors.name)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      label="Email"
                      margin="normal"
                      className="kt-width-full"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      label="Mobile Number"
                      className="kt-width-full"
                      name="mobileNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobileNumber}
                      helperText={touched.mobileNumber && errors.mobileNumber}
                      error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      label="Age"
                      className="kt-width-full"
                      name="age"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.age}
                      helperText={touched.age && errors.age}
                      error={Boolean(touched.age && errors.age)}
                    />
                  </div>

                  <div className="form-group mb-0">
                    <TextField
                      margin="normal"
                      label="Location"
                      className="kt-width-full"
                      name="location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      helperText={touched.location && errors.location}
                      error={Boolean(touched.location && errors.location)}
                    />
                  </div>

                  <div className="form-group mb-0">
                  </div>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth={true}
                      placeholder="Select a role"
                      value={values.role}
                      onChange={(e) => setFieldValue("role", e.target.value)}
                    >
                      <MenuItem value={"Escort"}>Escort</MenuItem>
                      <MenuItem value={"Cam"}>Cam</MenuItem>
                      <MenuItem value={"Massage"}>Massage</MenuItem>
                    </Select>
                  </FormControl>

                  <div className="form-group mb-0">
                    <TextField
                      type="password"
                      margin="normal"
                      label="Password"
                      className="kt-width-full"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      type="password"
                      margin="normal"
                      label="Confirm Password"
                      className="kt-width-full"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                    />
                  </div>

                  <div className="kt-login__actions">
                    <button
                      disabled={isSubmitting}
                      className="btn btn-primary btn-elevate kt-login__btn-primary"
                    >
                      Submit
                        </button>
                  </div>
                </form>
              )}
          </Formik>

        )}

      </div>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Registration)
);
