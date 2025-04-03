import React, { useEffect, useState, useCallback } from 'react';
import { Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import Chatbot from '../Components/Chatbot';

const API_BASE_URL = 'https://gdg-backend-7gpy.onrender.com/api';

// Loading placeholder component
const LoadingPlaceholder = ({ message = "Loading..." }) => (
  <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center">
    <p className="text-gray-600">{message}</p>
  </div>
);

// Reusable scholarship card component with hover effects
const ScholarshipCard = ({ scholarship }) => (
  <div className="bg-white p-4 border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:translate-y-[-4px] cursor-pointer rounded-md" >
    <div className="h-40 bg-gray-200 flex items-center justify-center mb-4 overflow-hidden rounded">
      <img src="/teaching.png" alt="Scholarship" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
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
    <div className="flex items-center text-xs font-medium group">
      <span className="group-hover:text-blue-600 transition-colors">View Details</span>
      <span className="ml-1 group-hover:ml-2 transition-all duration-300 group-hover:text-blue-600">→</span>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

    const sidebarVariants = {
    hidden: { x: -240 },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      x: -240,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };
  
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCampaign , setActiveCampaign ] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [scholarshipsPerPage] = useState(6); // Number of scholarships per page

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

      const email = (sessionStorage.getItem('email'))
      const activeCampaignDetail = await fetch(`${API_BASE_URL}/updateCampaign/getUserDetails`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body : JSON.stringify({ email })
      })

      const userResponse = await activeCampaignDetail.json();

      console.log(userResponse)

      const response = await fetch(`${API_BASE_URL}/scholarships/getAllScholarships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });
      // setActiveCampaign(userResponse);

      const data = await response.json();

      if (response.ok) {
        setScholarships(data.scholarships || []);
        setCurrentPage(1); // Reset to first page when new data is fetched
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
        <button 
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-white border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`
              px-4 py-2 rounded-md text-sm transition-all
              ${currentPage === index + 1 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}
            `}
          >
            {index + 1}
          </button>
        ))}

        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-white border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

  // Get the active campaign (first scholarship or null)
  // const activeCampaign = scholarships.length > 0 ? scholarships[1] : null;

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div>

        <SideBarComponent/>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <span className="font-bold">Dashboard</span>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
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
            <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-800 transition-colors duration-300 hover:scale-110" />
          </div>
        </div>
        
        <div className="p-6">
          {/* Campaign Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">My Campaign</h1>
            <p className="text-sm text-gray-500 mb-4">
              Track and manage your crowdfunding campaign effectively
            </p>

            {/* Active Campaign */}
            {loading ? (
              <LoadingPlaceholder message="Loading campaign data..." />
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-6 shadow-sm border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <p>Error: {error}</p>
                <button 
                  onClick={fetchScholarships}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 hover:shadow transition-all duration-300 text-sm"
                >
                  Retry
                </button>
              </div>
            ) : activeCampaign ? (
              <div className="max-w-3xl bg-white p-6 shadow-md border border-gray-200 rounded-lg flex gap-6 hover:shadow-lg transition-shadow duration-300">
                {/* Campaign Image */}
                <div className="h-32 w-32 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
                  <img src="/dev.png" alt="Campaign" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>

                {/* Campaign Details */}
                <div className="flex-1">
                  <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded">ACTIVE</span>
                  <h2 className="text-lg font-bold mt-1">{activeCampaign.name}</h2>

                  {/* Funding Details */}
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-gray-500">Goal: $10,000</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-green-600">$3,464 (34%)</span>
                  </div>

                  {/* Progress bar with hover effect */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden group">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-700 group-hover:bg-green-500" style={{ width: '34%' }}></div>
                  </div>

                  {/* Campaign Description */}
                  <p className="text-sm text-gray-500 mt-3 max-w-lg">
                    Alex is struggling to pay tuition needed to finish their degree in computer science.
                    Your contribution can make a difference for their future. Help them reach their goal!
                  </p>

                  {/* Manage Button with hover effect */}
                  <button className="mt-4 px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                    Manage Campaign
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                <p className="text-gray-600">No active campaigns found.</p>
                <button 
                  className="mt-4 px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-all duration-300 hover:shadow hover:scale-105"
                  onClick={() => navigate('/myCampaign')} // Make sure you have this route
                >
                  Create Campaign
                </button>
              </div>
            )}
          </div>

          {/* Featured Scholarships */}
          <div className="mb-8">
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
              <div className="bg-red-50 text-red-700 p-6 shadow-sm border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <p>Error: {error}</p>
                <button 
                  onClick={fetchScholarships}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 hover:shadow transition-all duration-300 text-sm"
                >
                  Retry
                </button>
              </div>
            ) : filteredScholarships.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentScholarships.map((scholarship, index) => (
                    <ScholarshipCard key={scholarship.id || index} scholarship={scholarship} />
                  ))}
                </div>
                
                {/* Pagination Controls */}
                {renderPagination()}
              </>
            ) : (
              <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
                <p className="text-gray-600">
                  {searchQuery ? 'No scholarships match your search.' : 'No scholarships available.'}
                </p>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-2 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-300 text-sm"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;