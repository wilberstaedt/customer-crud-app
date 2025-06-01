// src/pages/CreateCustomer.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateCustomer.css';

export const CreateCustomerPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '',
        document: '',
        type: 'INDIVIDUAL',
        status: 'ACTIVE',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você chama a API para criar o cliente
        console.log('Submitted:', formData);
        navigate('/');
    };

    return (
        <section className="form-section">
            <h2>Create New Customer</h2>
            <form onSubmit={handleSubmit} className="form-card">
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Birth Date</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Document (CPF or CNPJ)</label>
                    <input type="text" name="document" value={formData.document} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="ORGANIZATION">Organization</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="BLOCKED">Blocked</option>
                    </select>
                </div>
                <button type="submit" className="modern-button submit-button">Save</button>
            </form>
        </section>
    );
};
