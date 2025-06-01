import React from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-logo" onClick={() => navigate('/')}>
                MW
            </div>
        </header>
    );
};
