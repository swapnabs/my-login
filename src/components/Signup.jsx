import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import facebook from "../assets/facebook.png"
import google from "../assets/google.png"
import linkedin from "../assets/linkedin.png"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password || !email) {
      setError("All fields are required!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.username === username)) {
      setError("Username already exists!");
      return;
    }

    users.push({ username, password, email });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/login");
  };

  const handleSocialLogin = (platform) => {
    switch (platform) {
      case "Google":
        const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email`;
        window.location.href = googleOAuthUrl;
        break;
      case "Facebook":
        const facebookOAuthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=YOUR_FACEBOOK_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email,public_profile`;
        window.location.href = facebookOAuthUrl;
        break;
      case "LinkedIn":
        const linkedinOAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress`;
        window.location.href = linkedinOAuthUrl;
        break;
      default:
        alert("Unsupported platform");
    }
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
          Signup
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
          label="Email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleSignup}
        >
          Signup
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", color: "#3f51b5" }}
        >
          Already have an account? Login
        </Typography>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Or sign up with:
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
          {/* Google Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => handleSocialLogin("Google")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={google}
              alt="Google"
              style={{ width: 20, height: 20, marginRight: 10 }} // Size and spacing for the image
            />
            Google
          </Button>

          {/* Facebook Button */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => handleSocialLogin("Facebook")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={facebook}
              alt="Facebook"
              style={{ width: 20, height: 20, marginRight: 10 }} // Size and spacing for the image
            />
            Facebook
          </Button>

          {/* LinkedIn Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => handleSocialLogin("LinkedIn")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={linkedin}
              alt="LinkedIn"
              style={{ width: 20, height: 20, marginRight: 10 }} // Size and spacing for the image
            />
            LinkedIn
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
