import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateCustomer.css';
import { Notification } from '../components/Notification';
import { createCustomer } from '../services/api';

export const CreateCustomerPage = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'alert', message: string } | null>(null);

    const [formData, setFormData] = useState<Parameters<typeof createCustomer>[0]>({
        profile: {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            phone: '',
            birthDate: '',
            document: '',
            hasLogin: false,
        },
        type: 'INDIVIDUAL',
        status: 'ACTIVE',
        notes: '',
        password: '',
        address: {
            street: '',
            number: '',
            complement: '',
            suburb: '',
            city: '',
            state: '',
            country: '',
            postCode: '',
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value, type } = target;
        const isChecked = type === 'checkbox' ? (target as HTMLInputElement).checked : undefined;

        setTouchedFields(prev => ({ ...prev, [name]: true }));

        const profileFields = [
            'firstName',
            'lastName',
            'email',
            'gender',
            'phone',
            'birthDate',
            'document',
            'hasLogin',
        ];

        if (profileFields.includes(name)) {
            setFormData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [name]: type === 'checkbox' ? isChecked : value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? isChecked : value,
            }));
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCustomer({
                ...formData,
                type: formData.type as 'INDIVIDUAL' | 'ORGANIZATION',
                status: formData.status as 'ACTIVE' | 'INACTIVE' | 'BLOCKED',
            });
            setNotification({ type: 'success', message: 'Customer created successfully!' });
            setTimeout(() => setNotification(null), 3000);
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            setNotification({ type: 'error', message: 'Failed to create customer.' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const isStepValid = () => {
        if (step === 1) {
            return formData.profile.firstName && formData.profile.lastName && formData.profile.email && formData.profile.document;
        }
        if (step === 4 && formData.profile.hasLogin) {
            return formData.password;
        }
        return true;
    };

    const getInputClass = (field: string, required = false) => {
        const value = (formData.profile as any)?.[field] ?? (formData as any)?.[field];
        return required && touchedFields[field] && !value ? 'invalid' : '';
    };

    return (
        <section className="form-section">
            <h2>Create New Customer</h2>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <form onSubmit={handleSubmit} className={`form-card step-${step}`}>
                {step === 1 && (
                    <div className="form-step fade-in">
                        <div className="form-group">
                            <label className="required">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.profile.firstName}
                                onChange={handleChange}
                                className={getInputClass('firstName', true)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="required">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.profile.lastName}
                                onChange={handleChange}
                                className={getInputClass('lastName', true)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="required">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.profile.email}
                                onChange={handleChange}
                                className={getInputClass('email', true)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="INDIVIDUAL">Individual</option>
                                <option value="ORGANIZATION">Organization</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="required">{formData.type === 'INDIVIDUAL' ? 'TFN' : 'ABN'}</label>
                            <input
                                type="text"
                                name="document"
                                value={formData.profile.document}
                                onChange={handleChange}
                                className={getInputClass('document', true)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="BLOCKED">Blocked</option>
                            </select>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step fade-in">
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" name="phone" value={formData.profile.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Birth Date</label>
                            <input type="date" name="birthDate" value={formData.profile.birthDate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <input type="text" name="gender" value={formData.profile.gender} onChange={handleChange} />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step fade-in">
                        {['street', 'number', 'complement', 'suburb', 'city', 'state', 'country', 'postCode'].map(field => (
                            <div className="form-group" key={field}>
                                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    type="text"
                                    name={field}
                                    value={(formData.address as any)[field]}
                                    onChange={handleAddressChange}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {step === 4 && (
                    <div className="form-step fade-in">
                        <div className="form-group">
                            <label>Notes</label>
                            <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Enable Login</label>
                            <input type="checkbox" name="hasLogin" checked={formData.profile.hasLogin} onChange={handleChange} />
                        </div>
                        {formData.profile.hasLogin && (
                            <div className="form-group">
                                <label className="required">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={getInputClass('password', true)}
                                    required
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="form-navigation">
                    {step > 1 && (
                        <button type="button" className="modern-button" onClick={() => setStep((s) => s - 1)}>
                            Back
                        </button>
                    )}
                    {step < 4 && (
                        <button
                            type="button"
                            className="modern-button"
                            onClick={() => {
                                if (isStepValid()) setStep((s) => s + 1);
                                else setNotification({ type: 'alert', message: 'Please fill all required fields.' });
                            }}
                        >
                            Next
                        </button>
                    )}
                    {step === 4 && (
                        <button type="submit" className="modern-button submit-button">
                            Save
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};
