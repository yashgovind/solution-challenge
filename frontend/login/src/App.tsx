import React, { useState } from 'react';
import {  Brain } from 'lucide-react';
import googleLogo from './assets/g-logo.png'; // Adjust the path as per your project// Adjust the path as per your project


function App() {
  // const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <>
    <div className="min-h-screen bg-[#1A1B4B] relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles absolute inset-0" />
        <div className="geometric-shapes absolute inset-0" />
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-12 h-12 text-[#00FFD1] animate-pulse" />
          <h1 className="text-4xl font-bold text-white ml-3 tracking-wider">
            Neo<span className="text-[#00FFD1]">Tutor</span>
          </h1>
        </div>

        {/* Login card */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white border border-gray-300 text-black py-3 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all relative overflow-hidden group flex items-center justify-center"
            >
              <div className="flex items-center">
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  className="w-6 h-6 mr-2"
                />
                <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  Login with Google
                </span>
              </div>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>


          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <a
              href="#"
              className="block text-white/70 hover:text-white transition-colors text-sm"
            >
              Forgot your password?
            </a>
            <p className="text-white/70 text-sm">
              Don't have an account?{' '}
              <a
                href="#"
                className="text-[#00FFD1] hover:text-white transition-colors font-semibold"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;