import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
    isOpen,
    onClose,
    onSwitchToLogin
}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(formData);
            onClose();
            setFormData({ username: '', password: '', email: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleClose = () => {
        onClose();
        setFormData({ username: '', password: '', email: '' });
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl text-white font-bold mb-6">Sign Up</h2>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-green-500"
                            required
                        />
                    </div>

                    <div className="flex space-x-4">
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="flex-1 text-white"
                        >
                            Sign Up
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <Button
                        variant="ghost"
                        onClick={onSwitchToLogin}
                        className="text-green-500 hover:text-green-400"
                    >
                        Already have an account? Log in
                    </Button>
                </div>
            </div>
        </div>
    );
}; 