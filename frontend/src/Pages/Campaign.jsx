import React, { useEffect, useState } from 'react';
import { Share, Edit, X } from 'lucide-react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';
import { useLocation } from 'react-router-dom'; // Add this import

const MainCampaignPage = () => {
  const [expandedSection, setExpandedSection] = useState('updates');
  const [campaignDetails, setCampaignDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // Get current location
  
  const email = sessionStorage.getItem("email");

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleMyCampaignDetails = async() => {
    setLoading(true);
    try {
      const response = await fetch("https://gdg-backend-7gpy.onrender.com/api/updateCampaign/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ email }),        
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch campaign details");
      }
      
      const data = await response.json();
      setCampaignDetails(data.user.fundraiserInfo);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      setError("Failed to load campaign details");
    } finally {
      setLoading(false);
    }
  };

  // Modified useEffect that runs when location changes
  useEffect(() => {
    handleMyCampaignDetails();
    // The dependency on location.pathname will cause this effect to run
    // whenever the route/navigation changes
  }, [location.pathname]); 

  console.log(campaignDetails);

  // Calculate progress percentage - assuming we've raised 75% as shown in the image
  const progressPercentage = 100;

  if (loading && !campaignDetails.fundraiserTitle) {
    return (
      <div className="flex">
        <SideBarComponent />
        <div className="flex-grow flex items-center justify-center p-6">
          <p>Loading campaign details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex-row max-w-screen mx-auto">
      <SideBarComponent />
      
      <div className="flex-grow bg-white">
        <div className=" mx-auto p-4">
          {/* Campaign header */}
          <div className="flex flex-col md:flex-row md:gap-8 mb-4">
            {/* Left side - Image placeholder */}
            <div className="w-full md:w-1/2 bg-gray-200 mb-4 md:mb-0 aspect-square md:aspect-auto min-h-64">
              <div className="w-full h-full flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="#888888"/>
                </svg>
              </div>
            </div>
            
            {/* Right side - Campaign details */}
            <div className="w-full md:w-1/2">
              <h1 className="text-xl font-bold mb-2">{campaignDetails.fundraiserTitle}</h1>
              
              <div className="flex items-baseline mb-2">
                <span className="text-lg font-bold">₹1,00,000</span>
                <span className="text-gray-600 text-sm">/ ₹{campaignDetails.fundraisingGoal}</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-1 mb-4">
                <div className="bg-black h-1" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              
              <p className="text-sm mb-4">
                {campaignDetails.fundraiserReason}  
              </p>
              
              <div className="mb-4">
                <p className="text-sm">Total Supporters: 369</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <button className="bg-black text-white py-2 px-4 w-full flex items-center justify-center gap-2">
                  <Edit size={16} />
                  <span>Edit Campaign</span>
                </button>
                
                <button className="border border-gray-300 py-2 px-4 w-full flex items-center justify-center gap-2">
                  <Share size={16} />
                  <span>Share Campaign</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Updates section */}
          <div className="border-t border-gray-200">
            <div className="py-3 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('updates')}>
              <h2 className="font-medium">Updates</h2>
              {expandedSection === 'updates' && <X size={16} />}
            </div>
            
            {expandedSection === 'updates' && (
              <div className="pb-3">
                <div className="mb-4">
                  <p className="text-sm font-bold">March 10, 2025 - Thank You!</p>
                  <p className="text-sm">We've reached 75% of our goal! Thanks to all generous donors, Aditi has successfully paid part of her tuition and is now focusing on her studies. Please keep sharing to help us reach 100%!</p>
                </div>
              </div>
            )}
          </div>
          
          {/* List of Donors section */}
          <div className="border-t border-gray-200">
            <div className="py-3 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('donors')}>
              <h2 className="font-medium">List of Donors</h2>
              {expandedSection === 'donors' && <X size={16} />}
            </div>
            
            {expandedSection === 'donors' && (
              <div className="pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">A</div>
                  <div>
                    <p className="text-sm font-medium">Anonymous</p>
                    <p className="text-xs">₹100, 2 d</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">V</div>
                  <div>
                    <p className="text-sm font-medium">Vimalesh</p>
                    <p className="text-xs">₹1,000, 6 d</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Words of Support section */}
          <div className="border-t border-gray-200">
            <div className="py-3 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('support')}>
              <h2 className="font-medium">Words of Support</h2>
              {expandedSection === 'support' && <X size={16} />}
            </div>
            
            {expandedSection === 'support' && (
              <div className="pb-3">
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">R</div>
                    <div>
                      <p className="text-sm font-medium">Rakshith Rao</p>
                      <p className="text-xs">₹5,000, 2 d</p>
                      <p className="text-sm mt-1">Education changes lives! Wishing you all the best, Aditi!</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">S</div>
                    <div>
                      <p className="text-sm font-medium">Sheik Md. Ali</p>
                      <p className="text-xs">₹5000, 6 d</p>
                      <p className="text-sm mt-1">Hope this helps you achieve your dreams. Keep going!</p>
                    </div>
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