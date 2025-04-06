import React from 'react';
import { SideBarComponent } from './layoutComponents.jsx/SideBarComponent';

const NotFoundPage = () => {
  return (
    <div className='flex w-full'>
      <SideBarComponent />
      
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white relative">
        {/* Red border line on the left */}
        <div className="absolute h-full left-0"></div>
        
        <div className="flex flex-col items-center max-w-md mx-auto text-center p-6">
          <h1 className="text-5xl font-bold mb-6">503</h1>
          
          <img src="/under.svg" alt="Under Construction" className='mt-5 max-w-full' />
          
          <p className="text-gray-700 mb-6 mt-4">
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
    </div>
  );
};

export default NotFoundPage;