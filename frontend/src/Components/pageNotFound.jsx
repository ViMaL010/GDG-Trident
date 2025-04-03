import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center max-w-md mx-auto text-center p-6">
        <div className="border-r border-red-300 absolute h-full left-0"></div>
        
        <h1 className="text-5xl font-bold mb-6">404</h1>
        
        <p className="text-gray-700 mb-6">
          We're sorry! The page you're looking for couldn't be found or is currently under 
          construction. Please check back later or explore our homepage for more information.
        </p>
        
        <a 
          href="/dashboard" 
          className="text-gray-700 underline hover:text-gray-900 transition-colors"
        >
          Please use main menu
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;