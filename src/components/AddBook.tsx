// src/components/AddBook.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AddBook: React.FC = () => {
    const { token, userId } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '',
        availabilityStatus: '',
        location: '',
    });
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        const requestBody = {
            bookId: 0,
            ...formData,
            userId,
            createdAt,
            updatedAt,
        };

        try {
            const response = await fetch('https://localhost:7004/api/Books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            setMessage(data.message);
            setIsModalOpen(true); // Open the modal on successful addition

            // Optionally navigate back to the dashboard after a delay
            if (response.ok) {
                setTimeout(() => {
                    window.location.href = '/dashboard'; // Redirect to the dashboard
                }, 2000); // Adjust delay as needed
            }
        } catch (error) {
            setMessage('Failed to add book. Please try again.');
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        if (message.includes('successfully')) {
            window.location.href = '/dashboard'; // Redirect on success
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add a New Book</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="condition"
                    placeholder="Condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="availabilityStatus"
                    placeholder="Availability Status"
                    value={formData.availabilityStatus}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.submitButton}>Add Book</button>
            </form>

            {/* Modal for success/error message */}
            {isModalOpen && (
                <div style={modalStyles.modal}>
                    <div style={modalStyles.modalContent}>
                        <span style={modalStyles.close} onClick={handleCloseModal}>&times;</span>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyles = {
    modal: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center' as const,
    },
    close: {
        float: 'right' as const,
        fontSize: '1.5rem',
        cursor: 'pointer',
    },
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center' as const,
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AddBook;
