import React, { useEffect, useState, useCallback } from 'react';
import { Search, Bell, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'https://gdg-backend-7gpy.onrender.com/api';

// Loading placeholder component with animation
const LoadingPlaceholder = ({ message = "Loading..." }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center"
  >
    <p className="text-gray-600">{message}</p>
  </motion.div>
);

// Reusable scholarship card component with enhanced hover effects
const ScholarshipCard = ({ scholarship }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white p-4 border border-gray-200 transition-all duration-300 hover:border-gray-300 cursor-pointer rounded-md"
  >
    <div className="h-40 bg-gray-200 flex items-center justify-center mb-4 overflow-hidden rounded">
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        src="/teaching.png" 
        alt="Scholarship" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-between items-center text-xs mb-1">
      <div className="flex items-center">
        <span className="mr-1">📅</span>
        <span>ENDS 11/15/2024</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[13px] font-semibold">Amount Payable </span>
        <span className="mr-1">₹</span>
        <span className="-ml-1">{scholarship.amount}</span>
      </div>
    </div>
    <h3 className="font-bold text-sm mb-1">{scholarship.name}</h3>
    <p className="text-xs text-gray-500 mb-3">{scholarship.scholarshipDetail || 'No description available'}</p>
    <motion.div 
      whileHover={{ x: 5 }} 
      className="flex items-center text-xs font-medium group"
    >
      <span className="group-hover:text-blue-600 transition-colors">View Details</span>
      <span className="ml-1 group-hover:ml-2 transition-all duration-300 group-hover:text-blue-600">→</span>
    </motion.div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State variables
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarshipsPerPage] = useState(6); // Number of scholarships per page

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Set initial mobile state and handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize fetchScholarships with useCallback to prevent unnecessary re-renders
  const fetchScholarships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Redirect to login if no token found
        navigate('/login');
        return;
      }

      const email = sessionStorage.getItem('email');
      const activeCampaignDetail = await fetch(`${API_BASE_URL}/updateCampaign/getUserDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ email: email })
      });


      const userResponse = await activeCampaignDetail.json();

      // console.log(userResponse.response); // Log the user response for debugging

      const response = await fetch(`${API_BASE_URL}/scholarships/getAllScholarships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      const data = await response.json();

      if (response.ok) {
        setScholarships(data.scholarships || []);
        setCurrentPage(1); // Reset to first page when new data is fetched
        
        // Set active campaign from user response if available
        if (userResponse && userResponse.response) {
          setActiveCampaign(userResponse.response);
        }
      } else {
        setError(data.message || 'Failed to fetch scholarships');
      }
    } catch (err) {
      console.error('Error fetching scholarships:', err);
      setError('An error occurred while fetching scholarships');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      fetchScholarships();
    }
  }, [location.pathname, fetchScholarships]);

  // console.log(activeCampaign.fundraiserInfo); // Log the active campaign title for debugging

  // Filter scholarships based on search query
  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (scholarship.scholarshipDetail && scholarship.scholarshipDetail.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination calculations
  const indexOfLastScholarship = currentPage * scholarshipsPerPage;
  const indexOfFirstScholarship = indexOfLastScholarship - scholarshipsPerPage;
  const currentScholarships = filteredScholarships.slice(
    indexOfFirstScholarship, 
    indexOfLastScholarship
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredScholarships.length / scholarshipsPerPage);

  // Render pagination controls
  const renderPagination = () => {
    if (filteredScholarships.length <= scholarshipsPerPage) return null;

    return (
      <div className="flex justify-center items-center mt-6 space-x-2">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-white border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        {[...Array(totalPages)].map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(index + 1)}
            className={`
              px-4 py-2 rounded-md text-sm transition-all
              ${currentPage === index + 1 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}
            `}
          >
            {index + 1}
          </motion.button>
        ))}

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-white border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar - always visible on desktop */}
      {!isMobile && (
        <div className="h-screen">
          <SideBarComponent />
        </div>
      )}
      
      {/* Mobile Menu - using AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <>
            {/* Backdrop for mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Sidebar - slides in from left */}
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-20 h-screen"
            >
              <SideBarComponent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
  {/* Menu button for mobile */}
  <div className="flex items-center">
    {isMobile && (
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="mr-3 text-gray-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </motion.button>
    )}
    <span className="font-bold">Dashboard</span>
  </div>
  
  {/* Desktop search and notifications */}
  <div className="flex items-center space-x-4">
    {/* Full search bar on desktop, icon only on mobile */}
    <div className={`relative ${isMobile ? 'hidden' : 'block'}`}>
      <motion.input
        whileFocus={{ width: "16rem", transition: { duration: 0.3 } }}
        type="text"
        placeholder="Search scholarships"
        className="pl-8 pr-4 py-1 border border-gray-200 rounded text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on new search
        }}
      />
      <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
    </div>

    {/* Search button on mobile */}
    {isMobile && (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        className="p-2 text-gray-500"
      >
        <Search className="h-5 w-5" />
      </motion.button>
    )}

    <motion.div 
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }}
    >
      <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors duration-300" />
    </motion.div>
  </div>
</div>

{/* Mobile search bar - expandable/collapsible */}
<AnimatePresence>
  {isMobile && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white px-4 py-3 border-b border-gray-200"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search scholarships"
          className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          autoFocus
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </motion.div>
  )}
</AnimatePresence>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="p-6"
        >
          {/* Campaign Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-2xl font-bold mb-1">My Campaign</h1>
            <p className="text-sm text-gray-500 mb-4">
              Track and manage your crowdfunding campaign effectively
            </p>

            {/* Active Campaign */}
            {loading ? (
              <LoadingPlaceholder message="Loading campaign data..." />
            ) : error ? (
              <motion.div 
                whileHover={{ boxShadow: "0 8px 20px rgba(239, 68, 68, 0.1)" }}
                className="bg-red-50 text-red-700 p-6 shadow-sm border border-red-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <p>Error: {error}</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchScholarships}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 hover:shadow transition-all duration-300 text-sm"
                >
                  Retry
                </motion.button>
              </motion.div>
            ) : activeCampaign ? (
              <motion.div 
                whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                className="max-w-3xl bg-white p-6 shadow-md border border-gray-200 rounded-lg flex gap-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Campaign Image */}
                <div className="h-32 w-32 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src="/dev.png" 
                    alt="Campaign" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Campaign Details */}
                <div className="flex-1">
                  <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded">ACTIVE</span>
                  <h2 className="text-lg font-bold mt-1">{activeCampaign.fundraiserInfo.fundraiserTitle}</h2>

                  {/* Funding Details */}
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-gray-500">Goal: ₹{activeCampaign.fundraiserInfo.fundraisingGoal}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-green-600">₹100000 (100%)</span>
                  </div>

                  {/* Progress bar with hover effect */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden group">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-green-600 h-2 rounded-full transition-all duration-700 group-hover:bg-green-500" 
                    />
                  </div>

                  {/* Campaign Description */}
                  <p className="text-sm text-gray-500 mt-3 max-w-lg">
                    {activeCampaign.fundraiserInfo.fundraiserReason}
                  </p>

                  {/* Manage Button with hover effect */}
                  <motion.button 
                    whileHover={{ y: -4, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-5 py-2 bg-black text-white text-sm rounded-md transition-all duration-300"
                    onClick={()=>{
                      navigate('/campaign')
                    }}
                  >
                    Manage Campaign
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" }}
                className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-gray-600">No active campaigns found.</p>
                <motion.button 
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-all duration-300 hover:shadow"
                  onClick={() => navigate('/myCampaign')}
                >
                  Create Campaign
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Featured Scholarships */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Featured Scholarships</h2>
              {filteredScholarships.length > 0 && (
                <span className="text-sm text-gray-500">
                  Showing {indexOfFirstScholarship + 1}-{Math.min(indexOfLastScholarship, filteredScholarships.length)} of {filteredScholarships.length} scholarships
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <LoadingPlaceholder key={i} message="Loading scholarships..." />
                ))}
              </div>
            ) : error ? (
              <motion.div 
                whileHover={{ boxShadow: "0 8px 20px rgba(239, 68, 68,.1)" }}
                className="bg-red-50 text-red-700 p-6 shadow-sm border border-red-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <p>Error: {error}</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchScholarships}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 hover:shadow transition-all duration-300 text-sm"
                >
                  Retry
                </motion.button>
              </motion.div>
            ) : filteredScholarships.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentScholarships.map((scholarship, index) => (
                    <motion.div
                      key={scholarship.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.1 * index % 3,
                          duration: 0.5
                        }
                      }}
                      onClick={() => navigate(`/fullscholarship/${scholarship._id}`)}
                    >
                      <ScholarshipCard scholarship={scholarship} />
                    </motion.div>
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {renderPagination()}
              </>
            ) : (
              <motion.div 
                whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" }}
                className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-gray-600">
                  {searchQuery ? 'No scholarships match your search.' : 'No scholarships available.'}
                </p>
                {searchQuery && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery('')}
                    className="mt-2 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-300 text-sm"
                  >
                    Clear Search
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;