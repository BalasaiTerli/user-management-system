import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending data:", formData);
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Response Error:", errorData);
          if (response.status === 401) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              submit: "Invalid credentials. Please try again.",
            }));
          } else {
            throw new Error(errorData.message || "Network response was not ok");
          }
          return; // Prevent further execution
        }

        const result = await response.json();
        console.log("Login result:", result);
        setSuccessMessage("Successfully logged in!");

        localStorage.setItem("isAuthenticated", "true");

        setTimeout(() => navigate("/users"), 1000);
        resetForm();
      } catch (error) {
        handleErrors(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleErrors = (error) => {
    console.error("Error submitting form:", error);
    setErrors((prevErrors) => ({
      ...prevErrors,
      submit: "An error occurred. Please try again.",
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {successMessage && (
          <p className="text-green-500 text-center text-sm mt-1">
            {successMessage}
          </p>
        )}

        {errors.submit && (
          <p className="text-red-500 text-center text-sm mt-1">
            {errors.submit}
          </p>
        )}

        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          label="Email"
        />

        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          label="Password"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ type, name, value, onChange, error, label }) => (
  <div className="relative mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 peer transition-all"
    />
    <label
      className={`absolute left-3 top-3 text-gray-500 transition-all duration-200 transform -translate-y-1/2 ${
        value && "-top-3 text-xs text-blue-500"
      }`}
    >
      {label}
    </label>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    
  </div>
  
);

export default LoginComponent;
