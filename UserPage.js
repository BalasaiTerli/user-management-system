import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    navigate("/formPage"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <h2 className="text-4xl font-bold mb-8 text-blue-800">
        Registered Users
      </h2>
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        {users.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <p className="text-blue-700 font-semibold">
                  <strong>Phone Number:</strong> {user.phoneNumber}
                </p>
                <p className="text-blue-700 font-semibold mt-2">
                  <strong>Email:</strong> {user.email}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-blue-700">No registered users yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
