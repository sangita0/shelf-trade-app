// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import ViewBooks from './components/ViewBooks';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './components/ForgotPassword';
import EnterEmail from './components/EnterEmail';
import UpdatePassword from './components/UpdatePassword';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/view-books" element={<ViewBooks />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/enter-email" element={<EnterEmail />} />
                <Route path="/update-password" element={<UpdatePassword />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
