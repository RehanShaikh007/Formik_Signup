import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .test(
        "is-rehan-email",
        "Email must be regex@gmail.com",
        (email) => email === "regex@gmail.com"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8)
      .oneOf(["rishiME@199", null], "Password Hint : r__h___@__9")
      .required("Password is required"),
    confirm_password: Yup.string()
      .min(8)
      .required("Please enter confirm_password")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center uppercase">Signup Form</h2>
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
            {successMessage}
          </div>
        )}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            
            console.log('Form submitted with values:', values);

            setSuccessMessage('Signup Successful!');

            resetForm();
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="text-red-500 text-sm mt-1">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!(isValid && dirty)}
                  className={`w-full p-2 bg-blue-500 text-white rounded ${
                    !(isValid && dirty)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  SINGUP
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
