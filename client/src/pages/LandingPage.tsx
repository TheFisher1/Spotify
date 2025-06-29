import React, { useState } from 'react';
import { Features } from '../components/Features';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Heroes } from '../components/Heroes';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleLogin = () => {
    setIsLogin(true);
    setShowLoginModal(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData);
      } else {
        await register(formData);
      }
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setFormData({ username: '', password: '', email: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
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

  const closeModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setFormData({ username: '', password: '', email: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white">
      <Navigation />
      <Heroes onLogin={handleLogin} />
      <Features />
      <Footer />

      {(showLoginModal || showRegisterModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">
              {isLogin ? 'Log In' : 'Sign Up'}
            </h2>

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

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              )}

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
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-500 text-black font-bold py-3 px-4 rounded hover:bg-green-400 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : (isLogin ? 'Log In' : 'Sign Up')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-zinc-800 text-white font-bold py-3 px-4 rounded hover:bg-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-green-500 hover:text-green-400"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;