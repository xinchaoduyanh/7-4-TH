// components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://9mlf5s-8081.csb.app/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: userName,
            password: password,
            location: location,
            description: description,
            occupation: occupation,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data._id);
        localStorage.setItem("user_name", data.user_name);
        navigate("/users");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        placeholder="Occupation"
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Register;
