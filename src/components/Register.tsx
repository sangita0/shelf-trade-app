import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        favouriteGenre: '',
        readingPreference: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('https://localhost:7004/api/auth/register', formData);
            alert(response.data.message);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleRegister} style={styles.form} autoComplete="off">
                <h2 style={styles.heading}>Register</h2>
                
                {error && <p style={styles.error}>{error}</p>}
                
                <input
                    type="text"
                    name="name"
                    id="reg-name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    autoComplete="off"
                />
                <input
                    type="email"
                    name="email"
                    id="reg-email"
                    placeholder="Email"
                    autoComplete="off" 
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    id="reg-password"
                    placeholder="Password"
                    autoComplete="new-password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="favouriteGenre"
                    id="reg-favouriteGenre"
                    placeholder="Favourite Genre"
                    value={formData.favouriteGenre}
                    onChange={handleInputChange}
                    style={styles.input}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="readingPreference"
                    id="reg-readingPreference"
                    placeholder="Reading Preference"
                    value={formData.readingPreference}
                    onChange={handleInputChange}
                    style={styles.input}
                    autoComplete="off"
                />

                <button type="submit" style={styles.button}>Register</button>
                
                <p style={styles.switchText}>
                    Already have an account? <span onClick={() => navigate('/login')} style={styles.switchLink}>Login</span>
                </p>
            </form>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '400px',
    },
    heading: {
        fontSize: '1.8rem',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center' as const,
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '10px',
        textAlign: 'center' as const,
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        padding: '12px',
        fontSize: '1rem',
        fontWeight: 'bold' as const,
        color: '#fff',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    switchText: {
        fontSize: '0.9rem',
        color: '#555',
        textAlign: 'center' as const,
        marginTop: '20px',
    },
    switchLink: {
        color: '#4CAF50',
        fontWeight: 'bold' as const,
        cursor: 'pointer',
    },
};

export default Register;
