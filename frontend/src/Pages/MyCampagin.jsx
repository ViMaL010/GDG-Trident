import React from 'react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';
import { useNavigate } from 'react-router-dom';

const CampaignStart = () => {

    const navigate = useNavigate();
    
  return (
    <div className='flex'>
        <SideBarComponent/>
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Start a campaign</h1>
        
        <p className="text-xs sm:text-sm text-gray-700 mb-1">
          You have no active campaigns yet
        </p>
        
        <p className="text-xs sm:text-sm text-gray-700 mb-6 sm:mb-8">
          Take the first step towards funding your education by starting a fundraiser today!
        </p>
        
        <button 
          className="bg-black text-white py-2 px-4 w-full max-w-xs sm:max-w-sm mb-4 font-medium text-sm sm:text-base cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:shadow hover:scale-105"
          onClick={() => {
            navigate('/details')
          }}
        >
          Create a Fundraiser
        </button>
      </div>
    </div>

    </div>
  );
};

export default CampaignStart;