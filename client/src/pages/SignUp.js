import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../utils/setAuthtoken";

export default function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // for for field change
  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, hasChanged: true, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // check for strong password
    //  8 Characters, 1 uppercase Letter, 1 Lowercase letter 1 Number, and 1 Special Character
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    // found regex at https://www.w3resource.com/javascript/form/password-validation.php
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (passwordRegex.test(formData.password) !== true) {
      setErrors({
        password:
          "Password must be at least 8 characters and have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      });
      return (console.log("Password must be at least 8 characters and have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",))
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        password: "passwords do not match",
      });
      return (console.log("passwords do not match"))
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("api/user", newUser)
      .then((res) => {
        setErrors({
          errors: "none",
        });

        // after use is signed up the app will log them in immediately and redirect to /dashboard

        axios
          .post("api/user/login", newUser)
          .then((res) => {
            if (res.data.token) {
              const { token } = res.data;
              localStorage.setItem("example-app", token);
              setAuthToken(token);
            }
            setRedirect(true)
              setErrors({
                errors: {},
              });
          })
          .catch((err) => {
            console.error(err.res.data);
            setErrors(err.res.data);
          });
      })
      .catch((err) => {
        console.error(err.response.data);
        setErrors(
         err.response.data,
        );
      });
    
  };
  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center content-center justify-center font-bold font-m-plus-rounded text-white">
    <Link to={{ pathname: "/" }} className="absolute top-5 left-5">
        <i className="material-icons back-button">arrow_back</i>
      </Link>
      <h3 className="lg:text-6xl text-4xl font-bold font-m-plus-rounded pb-1 ">
Sign Up</h3>
      <form onSubmit={(e) => onSubmit(e)}         className="flex flex-col justify-between items-center w-2/3 mt-20 lg:w-1/2"
>
      {errors.email === "This email already exists" ? <p>This email already exists</p> : ''}
      {errors.password ? <p>{errors.password}</p> : ''}
         {/* First Name */}
         <label htmlFor="first name" className="self-start">
          First Name
        </label>
         <input
          type="text"
          id="firstName"
          className="mb-5 p-1 w-full rounded-md text-gray-700"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => onChange(e)}
        />

         {/* Last Name */}
         <label htmlFor="last name" className="self-start">
          Last Name
        </label>
         <input
          type="text"
          id="lastName"
          className="mb-5 p-1 w-full rounded-md text-gray-700"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => onChange(e)}
        />

        {/* Email */}
        <label htmlFor="email" className="self-start">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          className="mb-5 p-1 w-full rounded-md text-gray-700"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => onChange(e)}
        />

        {/* Password */}
        <label htmlFor="password" className="self-start">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mb-5 p-1 w-full rounded-md text-gray-700"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => onChange(e)}
        />

        {/* Confirm Password */}
        <label htmlFor="email" className="self-start">
          Confirm Password
        </label>
        <input
          type="password"
          id="Confirm Password"
          className="mb-5 p-1 w-full rounded-md text-gray-700"
          name="confirmPassword"
          placeholder="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => onChange(e)}
        />

        <button type="submit" name="action"           className="bg-blue-700 lg:w-40 lg:mx-36 text-lg rounded-lg p-2 text-white w-2/3 font-bold font-m-plus-rounded"
>
          SIGN UP
        </button>
      </form>
    </div>
  );
}
