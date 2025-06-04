import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import '../styles/Header.css';

export const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const stored = localStorage.getItem('darkMode');
        return stored === 'true';
    });

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        let timeout: number;
        if (menuOpen) {
            // Espera um ciclo de render pra não capturar o clique no próprio botão
            timeout = window.setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 0);
        }

        return () => {
            clearTimeout(timeout);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);


    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <header className="header">
            <div className="header-logo" onClick={() => navigate('/')}>
                MW
            </div>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars />
            </div>
            {menuOpen && (
                <div className="dropdown-menu" ref={menuRef}>
                    <button
                        className="theme-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <FaMoon size={16} /> : <FaSun size={16} />}
                    </button>
                </div>
            )}
        </header>
    );
};