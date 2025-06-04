import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomerTable.css';

interface Customer {
    id: string;
    type: string;
    status: string;
    profile: {
        firstName: string;
        lastName: string;
        phone?: string;
        birthDate?: string;
    };
}

export const CustomerTable = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ name: '', type: '', status: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.type) params.append('type', filters.type);
        if (filters.status) params.append('status', filters.status);

        getCustomers(filters)
            .then((res) => setCustomers(res))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [filters]);

    const handleClearFilters = () => {
        setFilters({ name: '', type: '', status: '' });
    };

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <section className="customer-section">
            <div className="filters-container modern-filters">
                <div className="filters-left">
                    <input
                        type="text"
                        className="modern-input"
                        placeholder="Search by name"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                    <select
                        className="modern-select"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="">All Types</option>
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="ORGANIZATION">Organization</option>
                    </select>
                    <select
                        className="modern-select"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">All Statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="BLOCKED">Blocked</option>
                    </select>
                </div>
                <div className="filters-right">
                    <button className="modern-button filter-clear-button" onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>
            <div className="table-container">
                <button className="modern-button add-button" onClick={() => navigate('/create-customer')}>
                    + Add Customer
                </button>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id}>
                                <td>{c.profile.firstName} {c.profile.lastName}</td>
                                <td>{c.type}</td>
                                <td>{c.status}</td>
                                <td>{c.profile.phone || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
