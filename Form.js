import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const result = await response.json();
        setSuccessMessage("Successfully registered!");

        
        localStorage.setItem("isAuthenticated", "true");

        
        setTimeout(() => navigate("/users"), 2000);
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

    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

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
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md mb-4 md:mb-0 md:mr-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        
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
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          label="Phone Number"
        />

        
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

        
        <InputField
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          label="Confirm Password"
        />

        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Register & Continue
        </button>

        
        <button
          type="button"
          onClick={() => navigate("/formPage")}
          className="w-full mt-4 text-black py-2 rounded-md hover:underline transition-all"
        >
          Already have an account? Login
        </button>
      </form>

      <div className="flex justify-center mb-4 md:w-1/2">
        <img
          src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/register_new_banner_50cr_v3.png"
          alt="Registration Banner"
          className="rounded-lg shadow-lg max-w-md h-auto w-3/4 md:w-full"
        />
      </div>
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

export default FormComponent;
