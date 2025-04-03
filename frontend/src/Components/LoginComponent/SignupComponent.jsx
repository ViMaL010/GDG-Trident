import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FundEdAnimation from '../AnimatedLoader';

const SignupForm = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://gdg-backend-7gpy.onrender.com/api/sign/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard');
        }, 1000);
      } else {
        setLoading(false);
        alert(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error signing up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Loader Component
  function Loader() {
    return (
      <div role="status" className="flex justify-center items-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Responsive Header */}
      <header className="w-full p-3 sm:p-4 md:px-8 flex justify-between items-center border-b">
        <img 
          src="/Logo.png" 
          className="h-5 sm:h-6 cursor-pointer" 
          alt="Logo" 
          onClick={() => navigate('/')}
        />
        <div className="text-xs sm:text-sm flex gap-1 items-center">
          <span className="hidden xs:inline">Already have an account?</span> 
          <span className="xs:hidden">Have an account?</span>
          <div 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:underline cursor-pointer ml-1"
          >
            Sign in
          </div>
        </div>
      </header>
      
      {/* Responsive Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 md:p-8">
        <div className="w-full max-w-md px-3 sm:px-4 md:px-0">
          {loading ? (
            <FundEdAnimation />
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
                Create Your Account & Get Started
              </h1>
              <p className="text-center text-gray-600 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
                Join our platform to connect with donors, showcase your journey, and receive.
              </p>
              
              <form onSubmit={fetchSignup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input 
                    type="email" 
                    id="username" 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors duration-300 mt-2"
                >
                  Sign up
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SignupForm;