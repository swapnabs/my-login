import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
