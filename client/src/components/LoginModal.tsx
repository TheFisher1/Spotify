import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onSwitchToRegister
}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData);
            onClose();
            setFormData({ username: '', password: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
        setFormData({ username: '', password: '' });
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Log In</h2>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
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
                        <label className="block text-sm font-medium mb-2">Password</label>
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
                            className="flex-1"
                        >
                            Log In
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
                        onClick={onSwitchToRegister}
                        className="text-green-500 hover:text-green-400"
                    >
                        Don't have an account? Sign up
                    </Button>
                </div>
            </div>
        </div>
    );
}; 