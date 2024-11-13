import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Book {
    bookId: number;
    title: string;
    author: string;
    genre: string;
    location: string;
    availabilityStatus: string;
    condition: string;
}

const Dashboard: React.FC = () => {
    const { name, userId, token, clearAuthData } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchAvailableBooks();
    }, []);

    useEffect(() => {
        handleSearch(); // Apply search whenever searchQuery changes
    }, [searchQuery, availableBooks]);

    const fetchAvailableBooks = async () => {
        try {
            const response = await axios.get(`https://localhost:7004/api/Books/excludeUser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            setAvailableBooks(response.data.books || []);
            setFilteredBooks(response.data.books || []); // Set initial filtered books
        } catch (error) {
            console.error("Error fetching available books:", error);
        }
    };

    const handleSearch = () => {
        const lowercasedQuery = searchQuery.toLowerCase();

        const results = availableBooks.filter((book) => 
            book.title.toLowerCase().includes(lowercasedQuery) ||
            book.author.toLowerCase().includes(lowercasedQuery) ||
            book.genre.toLowerCase().includes(lowercasedQuery) ||
            book.location.toLowerCase().includes(lowercasedQuery)
        );

        setFilteredBooks(results);
    };

    return (
        <div style={styles.dashboardContainer}>
            {/* Navigation Bar */}
            <nav style={styles.navBar}>
                <h2 style={styles.navTitle}>Hello {name}</h2>
                <div style={styles.navLinks}>
                    <Link to="/add-book" style={styles.navLink}>Add Books</Link>
                    <Link to="/view-books" style={styles.navLink}>View Books</Link>
                    <span style={styles.navLink} onClick={clearAuthData}>Logout</span>
                </div>
            </nav>

            {/* Search Section */}
            <div style={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Search by title, author, genre, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {/* Available Books Table */}
            <div style={styles.bookList}>
                <h3 style={styles.sectionTitle}>Available books for exchange</h3>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Title</th>
                            <th style={styles.tableHeader}>Author</th>
                            <th style={styles.tableHeader}>Genre</th>
                            <th style={styles.tableHeader}>Location</th>
                            <th style={styles.tableHeader}>Availability</th>
                            <th style={styles.tableHeader}>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks && filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <tr key={book.bookId} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{book.title}</td>
                                    <td style={styles.tableCell}>{book.author}</td>
                                    <td style={styles.tableCell}>{book.genre}</td>
                                    <td style={styles.tableCell}>{book.location}</td>
                                    <td style={styles.tableCell}>{book.availabilityStatus}</td>
                                    <td style={styles.tableCell}>{book.condition}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={styles.tableCell}>No books available for exchange.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    dashboardContainer: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        minHeight: '100vh',
    },
    navBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    navTitle: {
        fontSize: '1.5rem',
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        cursor: 'pointer',
        fontSize: '1rem',
        color: '#fff',
        textDecoration: 'underline',
    },
    searchSection: {
        width: '80%',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    bookList: {
        width: '80%',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
    },
    sectionTitle: {
        fontSize: '1.3rem',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
    },
    tableHeader: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        textAlign: 'left' as const,
    },
    tableRow: {
        borderBottom: '1px solid #ccc',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'left' as const,
    },
};

export default Dashboard;
