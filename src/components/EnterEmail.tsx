// src/components/EnterEmail.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnterEmail: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7004/api/auth/reset-password', {
                email,
            });

            setMessage(response.data.message || 'Password reset link sent to the registered email.');
            setError('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send password reset email. Please try again.');
        }
    };

    const handleContinue = () => {
        navigate('/update-password');
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                {message && <Typography color="success.main">{message}</Typography>}
                {error && <Typography color="error.main">{error}</Typography>}
                <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Reset Link
                    </Button>
                    {message && (
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 2 }}
                            onClick={handleContinue}
                        >
                            Continue
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default EnterEmail;
