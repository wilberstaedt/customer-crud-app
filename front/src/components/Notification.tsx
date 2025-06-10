import React, { useEffect } from 'react';
import '../styles/Notification.css';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'alert';
    onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <div className={`notification ${type}`}>
            <span className="message">{message}</span>
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
    );
};