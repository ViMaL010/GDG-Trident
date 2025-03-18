import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate(); // React Router navigation function

  const fetchSignup = async (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    console.log('Attempting login with:', username, password);

    try {
      const response = await fetch('http://localhost:5000/api/sign/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, username, password }),
      });

      const data = await response.json(); // Parse the response as JSON
      console.log('Server Response:', data);
      
      if (response.ok) {
        sessionStorage.setItem('token', data.token); // Store the token in local storage
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-white border border-black">
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full p-4 flex justify-between items-center border-b">
        <img src="/Logo.png" className='h-6' alt="" />
          <div className="text-sm flex gap-1">
            Already have an account? <div onClick={()=>{
              navigate('/login');
            }} className="text-blue-600 hover:underline cursor-pointer">Sign in</div>
          </div>
        </header>
        
        <div className="mt-16 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Create Your Account & Get Started</h1>
          <p className="text-center mb-8">Join our platform to connect with donors, showcase your journey, and receive.</p>
          
          <form onSubmit={fetchSignup}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm mb-1">Name*</label>
              <input 
                type="text" 
                id="name" 
                className="w-full border border-gray-300 p-2"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm mb-1">Email*</label>
              <input 
                type="username" 
                id="username" 
                className="w-full border border-gray-300 p-2"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm mb-1">Password*</label>
              <input 
                type="password" 
                id="password" 
                className="w-full border border-gray-300 p-2"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-black text-white py-2 mb-2"
            >
              Sign up
            </button>
            
            {/* <button 
              type="button" 
              className="w-full border border-gray-300 py-2 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" className="mr-2">
                <path 
                  fill="currentColor" 
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Sign up with Google
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;