import React, { useState } from 'react';
import { Share, Edit, X } from 'lucide-react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';

const MainCampaignPage = () => {
  const [expandedSection, setExpandedSection] = useState('support');

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className='flex'>
        <SideBarComponent/>
        
    <div className='flex flex-col'>
        
        <div className="flex flex-row w-full  bg-white">
          {/* Left side - Image placeholder */}
          <div className="w-2/3 h-100 bg-gray-100 flex items-center justify-center p-8">
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#CCCCCC"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="#CCCCCC"/>
              </svg>
            </div>
          </div>
    
          {/* Right side - Campaign details */}
          <div className="w-2/3 flex flex-col px-6 py-4">
            {/* Campaign header */}
            <h1 className="text-2xl font-bold leading-tight">Help Aditi Complete His Engineering Dream at IIT Delhi</h1>
            
            <div className="mt-6 flex items-baseline">
              <span className="text-2xl font-bold">₹1,00,000</span>
              <span className="text-gray-500"> / ₹1,50,000</span>
            </div>
            
            <p className="mt-4 text-sm">
              I come from a low-income family, and despite securing admission to IIT Delhi, my family is struggling to afford my tuition fees and hostel expenses. This fundraiser will help me pay for my academic journey without financial stress.
            </p>
    
            <div className="mt-4">
              <p className="text-sm">Total Supporters: 369</p>
            </div>
            
            <div className="mt-4 flex flex-col gap-2">
              <button className="bg-black text-white py-2 px-4 w-full flex items-center justify-center gap-2">
                <Edit size={16} />
                Edit Campaign
              </button>
              
              <button className="border border-gray-300 py-2 px-4 w-full flex items-center justify-center gap-2">
                <Share size={16} />
                Share Campaign
              </button>
            </div>
    
            {/* Collapsible sections */}
    
          </div>
        </div>
    
        <div>
    
        </div>
        <div className="mt-6 max-w-1/3 ml-3">
              {/* Updates section */}
              <div className="border-t border-gray-200">
                <div className="py-3 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('updates')}>
                  <h2 className="font-medium">Updates</h2>
                </div>
              </div>
              
              {/* List of Donors section */}
              <div className="border-t border-gray-200">
                <div className="py-3 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('donors')}>
                  <h2 className="font-medium">List of Donors</h2>
                  {expandedSection === 'donors' && <X size={20} />}
                </div>
                {expandedSection === 'donors' && (
                  <div className="py-2">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="mt-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">R</div>
                      <div>
                        <p className="text-sm font-medium">Rakshith Rao</p>
                        <p className="text-xs">₹5,000, 2 days ago</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">S</div>
                      <div>
                        <p className="text-sm font-medium">Sheik Md. Ali</p>
                        <p className="text-xs">₹5000, 6 days ago</p> 
                        </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Words of Support section */}
              <div className="border-t border-gray-200">
                <div className="py-3 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('support')}>
                  <h2 className="font-medium">Words of Support</h2>
                  {expandedSection === 'support' && <X size={20} />}
                </div>
                
                {expandedSection === 'support' && (
                  <div className="py-2">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="mt-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">R</div>
                      <div>
                        <p className="text-sm font-medium">Rakshith Rao</p>
                        <p className="text-xs">₹5,000, 2 days ago</p>
                        <p className="text-sm mt-1">Education changes lives! Wishing you all the best, Aditi!</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">S</div>
                      <div>
                        <p className="text-sm font-medium">Sheik Md. Ali</p>
                        <p className="text-xs">₹5000, 6 days ago</p>
                        <p className="text-sm mt-1">Hope this helps you achieve your dreams. Keep going!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>
    </div>
  );
};

export default MainCampaignPage;