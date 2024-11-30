import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      setError("Invalid username or password!");
      return;
    }

    alert("Login successful!");
    navigate("/home");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Paper elevation={10} 
      sx={{
        padding: 4,
        maxWidth: 400,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: 2,
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor:"#4f1657" }}
          onClick={handleLogin}
        >
          login
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", color: "#3f51b5" }}
        >
          Don't have an account? Signup
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
