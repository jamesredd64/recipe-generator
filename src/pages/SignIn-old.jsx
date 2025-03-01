import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
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

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          textAlign: 'center'
        }}
      >
        Sign In
      </Typography>
      
      <Card elevation={2} className="card">
        <CardContent sx={{ p: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              Welcome back
            </Typography>
            
            <Box component="form" onSubmit={handleSignIn}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="filled"
                margin="normal"
                required
                sx={{
                  backgroundColor: 'var(--input-background)',
                  borderRadius: '4px',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'transparent',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-primary)',
                    '&.Mui-focused': {
                      color: 'var(--text-primary)',
                    }
                  },
                  '& .MuiFilledInput-input': {
                    color: 'var(--text-primary)',
                  }
                }}
              />
              
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="filled"
                margin="normal"
                required
                sx={{
                  backgroundColor: 'var(--input-background)',
                  borderRadius: '4px',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'transparent',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--text-primary)',
                    '&.Mui-focused': {
                      color: 'var(--text-primary)',
                    }
                  },
                  '& .MuiFilledInput-input': {
                    color: 'var(--text-primary)',
                  }
                }}
              />
              
              <Button 
                type="submit"
                className="button"
                fullWidth
                disabled={loading}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                Sign In
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

export default SignIn;
