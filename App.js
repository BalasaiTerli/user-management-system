import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/Form";
import UserPage from "./components/UserPage";
import LoginComponent from "./components/Login"; // Import the LoginComponent
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent />} />{" "}
        {/* Set login as the default route */}
        <Route path="/formPage" element={<LoginComponent/>} />{" "}
        {/* Route for the form page */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
