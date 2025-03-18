import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  function Loader() {
    return (
      <div role="status" className="flex justify-center mt-4">
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

  const fetchLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    console.log('Attempting login with:', username, password);
    setLoading(true); // Show loader

    try {
      const response = await fetch('http://localhost:5000/api/sign/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (response.ok) {
        setTimeout(() => {
          sessionStorage.setItem("token", data.token)
          sessionStorage.setItem("email" , username)
          console.log('Redirecting to dashboard');
          setLoading(false);
          navigate('/dashboard');
        }, 1000); // Show loader for 5 seconds
      } else {
        setLoading(false);
        alert(data.msg || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error.msg);
      alert('An error occurred. Please try again later.');
    }
  };

  const responseGoogle = (response) => {
    console.log('Google Login Success:', response);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleFailure = (error) => {
    console.error('Google Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="121285127858-v6b1n7qbl5lcs94045s8v5f3l36j5bqi.apps.googleusercontent.com">
      <div className="min-h-screen bg-white flex flex-col">
        <header className="w-full p-4 flex justify-between items-center border-b">
          <div className="text-xl font-bold italic">
            <img src="/Logo.png" className='h-6 cursor-pointer' alt="" onClick={()=>{
            navigate('/')
          }}/>
          </div>
          <div className="text-sm flex gap-1">
            New here? <div className="text-blue-600 hover:underline cursor-pointer" onClick={()=>{
              navigate('/signup');
            }}>Sign Up</div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-2">Welcome Back! Log in to Your Account</h1>
            <p className="text-center text-gray-600 mb-8">
              Access your dashboard, track progress, and manage your account seamlessly.
            </p>

            {loading ? (
              <Loader />
            ) : (
              <form className="space-y-4" onSubmit={fetchLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                  Log in
                </button>

                {/* <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={handleFailure}
                    className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded hover:bg-gray-50"
                  />
                </div> */}

                <div className="text-center">
                  <a href="#" className="text-sm text-gray-600 hover:underline">Forgot your password?</a>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginComponent;
