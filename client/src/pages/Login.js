import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import authenticate from "../utils/Authenticate";
import setAuthToken from "../utils/setAuthtoken";

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // gets the bearer token to validate the user that is logged in
    const token = localStorage.getItem("example-app");

    // if token is authenticated redirect page to /dashboard
    if (authenticate(token)) {
      setRedirect(true);
    }
  }, []);

  // for for field change
  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, hasChanged: true, [name]: value });
  };

  // Form Submit
  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: formData.email,
      password: formData.password,
    };
    axios
      .post("/api/user/login", newUser)
      .then((res) => {
        if (res.data.token) {
          const { token } = res.data;

          localStorage.setItem("example-app", token);
          setAuthToken(token);
        }
        console.log("here");
        setRedirect(true);
        setErrors(errors);
      })
      .catch((err) => {
        console.error(err.response.data);
        setErrors(err.response.data);
      });
  };

  // When the user is logged in redirect is set to true in state.
  // Then the page redirects to dashboard
  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center content-center justify-center font-bold font-m-plus-rounded text-white">
      <Link to={{ pathname: "/" }} className="absolute top-5 left-5">
        <i className="material-icons back-button">arrow_back</i>
      </Link>
      <h3 className="lg:text-6xl text-4xl font-bold font-m-plus-rounded pb-1 ">
        Log In
      </h3>
      {errors.user ? <p>{errors.user}</p> : ""}
      {errors.password ? <p>{errors.password}</p> : ""}
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col justify-between items-center w-2/3 mt-20 lg:w-1/2"
      >
        {/* Email */}
        <label htmlFor="email" className="self-start">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          type="email"
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
          type="password"
          className="mb-5 p-1 w-full rounded-md text-gray-700"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => onChange(e)}
        />

        <button
          type="submit"
          name="action"
          className="bg-blue-700 hover:bg-blue-800 lg:w-40 lg:mx-36 text-lg rounded-lg p-2 text-white w-2/3 font-bold font-m-plus-rounded"
        >
          LOG IN
        </button>
      </form>
      <div className="mt-10 lg:w-1/2 ">
        <p className="mb-2">Demo Login:</p>
        <p>Email: code7sandbox@gmail.com</p>
        <p>Password: DemoTest#1</p>
      </div>
    </div>
  );
}
