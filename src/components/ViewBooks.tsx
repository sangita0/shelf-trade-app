// ViewBooks.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Book {
    bookId: number;
    title: string;
    author: string;
    genre: string;
    condition: string;
    availabilityStatus: string;
    location: string;
}

const ViewBooks: React.FC = () => {
    const { userId, token } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [editBook, setEditBook] = useState<Book | null>(null); // Book to edit

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://localhost:7004/api/Books/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooks(response.data.books);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [userId, token]);

    const handleEditClick = (book: Book) => {
        setEditBook(book); // Set the selected book for editing
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editBook) {
            setEditBook({ ...editBook, [e.target.name]: e.target.value });
        }
    };

    const handleUpdateBook = async () => {
        if (editBook) {
            try {
                await axios.put(
                    `https://localhost:7004/api/Books/${editBook.bookId}`,
                    {
                        ...editBook,
                        userId,
                        updatedAt: new Date().toISOString(),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Update the book list after successful update
                setBooks(books.map((book) => (book.bookId === editBook.bookId ? editBook : book)));
                setEditBook(null); // Close the edit modal
            } catch (error) {
                console.error("Error updating book:", error);
            }
        }
    };

    const handleDeleteBook = async (bookId: number) => {
        try {
            await axios.delete(`https://localhost:7004/api/Books/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            // Remove the book from the list after successful deletion
            setBooks(books.filter((book) => book.bookId !== bookId));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleCloseModal = () => {
        setEditBook(null); // Close the modal without saving
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Books</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.tableHeaderCell}>Title</th>
                                <th style={styles.tableHeaderCell}>Author</th>
                                <th style={styles.tableHeaderCell}>Genre</th>
                                <th style={styles.tableHeaderCell}>Condition</th>
                                <th style={styles.tableHeaderCell}>Availability</th>
                                <th style={styles.tableHeaderCell}>Location</th>
                                <th style={styles.tableHeaderCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.bookId} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{book.title}</td>
                                    <td style={styles.tableCell}>{book.author}</td>
                                    <td style={styles.tableCell}>{book.genre}</td>
                                    <td style={styles.tableCell}>{book.condition}</td>
                                    <td style={styles.tableCell}>{book.availabilityStatus}</td>
                                    <td style={styles.tableCell}>{book.location}</td>
                                    <td style={styles.tableCell}>
                                        <button onClick={() => handleEditClick(book)} style={styles.actionButton}>Edit</button>
                                        <button onClick={() => handleDeleteBook(book.bookId)} style={styles.actionButton}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editBook && (
                        <div style={styles.modalOverlay}>
                            <div style={styles.modalContent}>
                                <h3 style={styles.formHeading}>Edit Book</h3>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={editBook.title}
                                    onChange={handleInputChange}
                                    style={styles.inputField}
                                />
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Author"
                                    value={editBook.author}
                                    onChange={handleInputChange}
                                    style={styles.inputField}
                                />
                                <input
                                    type="text"
                                    name="genre"
                                    placeholder="Genre"
                                    value={editBook.genre}
                                    onChange={handleInputChange}
                                    style={styles.inputField}
                                />
                                <input
                                    type="text"
                                    name="condition"
                                    placeholder="Condition"
                                    value={editBook.condition}
                                    onChange={handleInputChange}
                                    style={styles.inputField}
                                />
                                <input
                                    type="text"
                                    name="availabilityStatus"
                                    placeholder="Availability Status"
                                    value={editBook.availabilityStatus}
                                    onChange={handleInputChange}
                                    style={styles.inputField}
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={editBook.location}
                                    onChange={handleInputChange}
                                    style={styles.inputField}
                                />
                                <div style={styles.modalActions}>
                                    <button onClick={handleUpdateBook} style={styles.saveButton}>Save Changes</button>
                                    <button onClick={handleCloseModal} style={styles.cancelButton}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    heading: {
        fontSize: '1.8rem',
        marginBottom: '20px',
        color: '#333',
    },
    table: {
        width: '90%',
        borderCollapse: 'collapse' as const,
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    tableHeader: {
        backgroundColor: '#4CAF50',
    },
    tableHeaderCell: {
        color: '#fff',
        padding: '12px',
        fontWeight: 'bold' as const,
        textAlign: 'left' as const,
        borderBottom: '2px solid #4CAF50',
    },
    tableRow: {
        transition: 'background-color 0.3s ease',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
        color: '#555',
    },
    actionButton: {
        margin: '0 5px',
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '0.9rem',
        border: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease',
    },
    actionButtonHover: {
        backgroundColor: '#45a049', // Slightly darker green on hover
    },
    editFormContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formHeading: {
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    modalOverlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    inputField: {
        display: 'block',
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    saveButton: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    saveButtonHover: {
        backgroundColor: '#45a049',
    },
    cancelButton: {
        padding: '10px 15px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    cancelButtonHover: {
        backgroundColor: '#e53935',
    },
};

export default ViewBooks;
