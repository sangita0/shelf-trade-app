// src/components/UpdatePassword.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePassword: React.FC = () => {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put('https://localhost:7004/api/auth/update-password', {
                token,
                newPassword,
            });

            setMessage(response.data.message || 'Password updated successfully.');
            setError('');

            // Redirect to login page after successful password update
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update password. Please try again.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Update Password
                </Typography>
                {message && <Typography color="success.main">{message}</Typography>}
                {error && <Typography color="error.main">{error}</Typography>}
                <Box component="form" onSubmit={handleUpdatePassword} sx={{ mt: 1 }}>
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
                        Update Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default UpdatePassword;
