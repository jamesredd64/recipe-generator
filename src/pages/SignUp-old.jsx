import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  Alert,
  Button
} from "@mui/material";
import "../styles/theme.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
          fontWeight: 500,
          mb: 4,
          textAlign: "center",
        }}
      >
        Create Account
      </Typography>

      <Card elevation={2} className="card">
        <CardContent sx={{ p: 2 }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              Sign up for a new account
            </Typography>

            <Box component="form" onSubmit={handleSignUp}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                required="true"
                InputLabelProps={{
                  sx: { color: "text.secondary" },
                }}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                required="true"
                InputLabelProps={{
                  sx: { color: "text.secondary" },
                }}
              />

              <Button
                type="submit"
                className="button"
                fullWidth
                disabled={loading}
                sx={{ mt: 3 }}
              >
                Sign Up
              </Button>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignUp;
