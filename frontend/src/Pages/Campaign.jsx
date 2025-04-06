import React, { useEffect, useState } from 'react';
import { Share, Edit, X, Bell, Menu } from 'lucide-react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';
import { useLocation } from 'react-router-dom';

const MainCampaignPage = () => {
  const [expandedSection, setExpandedSection] = useState('updates');
  const [campaignDetails, setCampaignDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  
  const email = sessionStorage.getItem("email") || "";

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleMyCampaignDetails = async() => {
    if (!email) {
      setError("No email found in session storage");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await fetch("https://gdg-backend-7gpy.onrender.com/api/updateCampaign/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ email }),        
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch campaign details: ${response.status}`);
      }
      
      const data = await response.json();
      if (data && data.user && data.user.fundraiserInfo) {
        setCampaignDetails(data.user.fundraiserInfo);
      } else {
        throw new Error("Invalid data structure returned from API");
      }
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      setError(error.message || "Failed to load campaign details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMyCampaignDetails();
  }, [location.pathname, email]); 

  // Calculate progress percentage based on raised amount vs goal
  const calculateProgress = () => {
    if (!campaignDetails || !campaignDetails.fundraisingGoal) return 0;
    // Assuming 100,000 is the raised amount as per your UI
    const raisedAmount = 100000;
    const goal = parseInt(campaignDetails.fundraisingGoal, 10);
    if (isNaN(goal) || goal <= 0) return 0;
    
    const percentage = (raisedAmount / goal) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  const progressPercentage = calculateProgress();

  // Format currency for display
  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Handle refresh data
  const handleRefresh = () => {
    handleMyCampaignDetails();
  };
  
  // Handle share campaign
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaignDetails.fundraiserTitle || 'My Fundraising Campaign',
        text: campaignDetails.fundraiserReason || 'Support my campaign!',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Campaign link copied to clipboard!'))
        .catch((err) => console.error('Failed to copy: ', err));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {!isMobile && <SideBarComponent />}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mb-4"></div>
            <p>Loading campaign details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {!isMobile && <SideBarComponent />}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={handleRefresh}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}
      
      {/* Sidebar - Conditionally rendered or positioned based on mobile state */}
      <div className={`md:static md:block ${
        isMobile 
          ? `fixed top-0 left-0 h-full z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out` 
          : ''
      }`}>
        <SideBarComponent />
      </div>
      
      <div className="flex-grow bg-white flex flex-col">
        {/* Header Component */}
        <header className="border-b border-gray-200 flex items-center justify-between p-4 sticky top-0 bg-white z-30">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mr-3 text-gray-600 focus:outline-none hover:bg-gray-100 rounded-full p-1 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div className="text-lg font-medium">{campaignDetails.fundraiserTitle || 'My Campaign'}</div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleRefresh} 
              className="text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors focus:outline-none"
              aria-label="Refresh"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button 
              className="relative text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors focus:outline-none"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
            </button>
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium overflow-hidden">
              {email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Campaign Content - Scrollable */}
        <div className="flex-grow overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4">
            {/* Campaign header */}
            <div className="flex flex-col md:flex-row md:gap-8 mb-6">
              {/* Left side - Image placeholder */}
              <div className="w-full md:w-1/2 bg-gray-100 mb-4 md:mb-0 rounded-lg overflow-hidden aspect-video md:aspect-square">
                <div className="w-full h-full flex items-center justify-center">
                  <img src="/process.svg" alt="" />
                </div>
              </div>
              
              {/* Right side - Campaign details */}
              <div className="w-full md:w-1/2">
                <h1 className="text-xl font-bold mb-2">{campaignDetails.fundraiserTitle || 'Campaign Title'}</h1>
                
                <div className="flex items-baseline mb-2">
                  <span className="text-lg font-bold">{formatCurrency(100000)}</span>
                  <span className="text-gray-600 text-sm ml-1">/ {formatCurrency(campaignDetails.fundraisingGoal)}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full mb-4 overflow-hidden">
                  <div 
                    className="bg-black h-2 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <p className="text-sm mb-4">
                  {campaignDetails.fundraiserReason || 'No description available.'}
                </p>
                
                <div className="mb-4">
                  <p className="text-sm">Total Supporters: 369</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="bg-black text-white py-2 px-4 flex-1 flex items-center justify-center gap-2 rounded hover:bg-gray-800 transition-colors">
                    <Edit size={16} />
                    <span>Edit Campaign</span>
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="border border-gray-300 py-2 px-4 flex-1 flex items-center justify-center gap-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Share size={16} />
                    <span>Share Campaign</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Collapsible Sections */}
            <div className="space-y-2">
              {/* Updates section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="py-3 px-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors" 
                  onClick={() => toggleSection('updates')}
                >
                  <h2 className="font-medium">Updates</h2>
                  {expandedSection === 'updates' ? (
                    <X size={16} />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                
                {expandedSection === 'updates' && (
                  <div className="p-4">
                    <div className="mb-4 last:mb-0">
                      <p className="text-sm font-bold mb-1">March 10, 2025 - Thank You!</p>
                      <p className="text-sm">We've reached 75% of our goal! Thanks to all generous donors, Aditi has successfully paid part of her tuition and is now focusing on her studies. Please keep sharing to help us reach 100%!</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* List of Donors section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="py-3 px-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors" 
                  onClick={() => toggleSection('donors')}
                >
                  <h2 className="font-medium">List of Donors</h2>
                  {expandedSection === 'donors' ? (
                    <X size={16} />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                
                {expandedSection === 'donors' && (
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">A</div>
                      <div>
                        <p className="text-sm font-medium">Anonymous</p>
                        <p className="text-xs text-gray-500">₹100, 2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">V</div>
                      <div>
                        <p className="text-sm font-medium">Vimalesh</p>
                        <p className="text-xs text-gray-500">₹1,000, 6 days ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Words of Support section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="py-3 px-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors" 
                  onClick={() => toggleSection('support')}
                >
                  <h2 className="font-medium">Words of Support</h2>
                  {expandedSection === 'support' ? (
                    <X size={16} />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
                
                {expandedSection === 'support' && (
                  <div className="p-4">
                    <div className="mb-4 last:mb-0">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">R</div>
                        <div>
                          <p className="text-sm font-medium">Rakshith Rao</p>
                          <p className="text-xs text-gray-500">₹5,000, 2 days ago</p>
                          <p className="text-sm mt-1 bg-gray-50 p-2 rounded-lg">Education changes lives! Wishing you all the best, Aditi!</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">S</div>
                        <div>
                          <p className="text-sm font-medium">Sheik Md. Ali</p>
                          <p className="text-xs text-gray-500">₹5,000, 6 days ago</p>
                          <p className="text-sm mt-1 bg-gray-50 p-2 rounded-lg">Hope this helps you achieve your dreams. Keep going!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCampaignPage;