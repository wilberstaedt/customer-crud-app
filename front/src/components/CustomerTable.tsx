import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/api';
import '../styles/CustomerTable.css';
import { Link } from 'react-router-dom';

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
    const [filters, setFilters] = useState({
        name: '',
        type: '',
        status: ''
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            getCustomers(filters).then(setCustomers).catch(console.error).finally(() => setLoading(false));
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters]);

    const clearFilters = () => {
        setFilters({ name: '', type: '', status: '' });
    };

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <section className="customer-section">
            <div className="filters-container modern-filters">
                <input
                    className="modern-input"
                    type="text"
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
                    <option value="">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="BLOCKED">Blocked</option>
                </select>
                <button className="modern-button" onClick={clearFilters}>
                    Clear Filters
                </button>
                <Link to="/create-customer" className="modern-button add-button">
                    + Add Customer
                </Link>
            </div>

            <div className="table-container">
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
