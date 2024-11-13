// src/components/ForgotPassword.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7004/api/auth/reset-password', {
                token,
                newPassword,
            });

            setMessage('Password reset successfully. Please log in.');
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after a short delay
        } catch (err: any) {
            setError(err.response?.data?.message || 'Password reset failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                {message && <Typography color="success.main">{message}</Typography>}
                {error && <Typography color="error.main">{error}</Typography>}
                <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Token"
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
