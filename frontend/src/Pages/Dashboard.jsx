import React, { useEffect, useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { SideBarComponent } from '../Components/layoutComponents.jsx/SideBarComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import FileUpload from '../Components/FileUploadComponent';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this line to properly get location
  

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/scholarships/getAllScholarships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : sessionStorage.getItem('token')
        },
      });

      const data = await response.json();

      if (response.ok) {
        setScholarships(data.scholarships);
      } else {
        alert(data.message || 'Failed to fetch scholarships. Please try again.');
      }
    } catch(e) {
      console.error('Error fetching scholarships:', e);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // console.log(scholarships)

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      fetchScholarships();
    }
  }, [location.pathname]); // Added location.pathname as a dependency

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <SideBarComponent/>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <span className="font-bold">Dashboard</span>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-4 py-1 border border-gray-200 text-sm w-64"
              />
              <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
            </div>
            <Bell className="h-5 w-5 text-gray-500" />
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
          <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center">
            <p className="text-gray-600">Loading campaign data...</p>
          </div>
        ) : scholarships.length > 0 ? (
          
<div className="max-w-3xl bg-white p-6 shadow-md border border-gray-200 rounded-lg flex gap-6">
  {/* Campaign Image */}
  <div className="h-32 w-32 bg-gray-200 flex items-center justify-center rounded-md">
    <img src="/dev.png" alt="" />
  </div>

  {/* Campaign Details */}
  <div className="flex-1">
    <span className="text-xs font-medium text-gray-500">ACTIVE</span>
    <h2 className="text-lg font-bold mt-1">{scholarships[0].name}</h2>

    {/* Funding Details */}
    <div className="flex items-center mt-2 text-sm">
      <span className="text-gray-500">Goal: $10,000</span>
      <span className="mx-2 text-gray-300">|</span>
      <span className="text-green-600">$3,464 (34%)</span>
    </div>

    {/* Campaign Description */}
    <p className="text-sm text-gray-500 mt-3 max-w-lg">
      Alex is struggling to pay tuition needed to finish their degree in computer science.
      Your contribution can make a difference for their future. Help them reach their goal!
    </p>

    {/* Manage Button */}
    <button className="mt-4 px-5 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition">
      Manage Campaign
    </button>
  </div>
</div>
) : (
          <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-lg text-center">
            <p className="text-gray-600">No active campaigns found.</p>
          </div>
        )}
      </div>

          
          {/* Featured Scholarships */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Featured Scholarships</h2>
            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <div className="bg-white p-4 border border-gray-200">
                  <p>Loading scholarships...</p>
                </div>
              ) : scholarships.length > 0 ? (
                scholarships.map((scholarship, index) => (
                  <div key={index} className="bg-white p-4 border border-gray-200">
                    <div className="h-40 bg-gray-200 flex items-center justify-center mb-4">
                      <img src="/teaching.png" alt="" />
                    </div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <div className="flex items-center">
                        <span className="mr-1">📅</span>
                        <span>ENDS 11/15/2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className='text-[13px] font-semibold'>Amount Payable </span>
                        <span className="mr-1">₹</span>
                        <span className='-ml-1'>{scholarship.amount}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm mb-1">{scholarship.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{scholarship.scholarshipDetail || 'No description available'}</p>
                    <div className="flex items-center text-xs font-medium">
                      <span>View Details</span>
                      <span className="ml-1">→</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-4 border border-gray-200">
                  <p>No scholarships available.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Funds Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-1">Funds Overview</h2>
            <p className="text-sm text-gray-500 mb-4">Track and manage your fundraising effectively</p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="bg-white p-4 border border-gray-200">
                  <div className="flex mb-4">
                    <div className="text-sm text-gray-500 mr-4">All Time</div>
                    <div className="text-sm font-medium">Last Month</div>
                  </div>
                  
                  <div className="flex space-x-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">45</div>
                      <div className="text-xs text-gray-500">Donors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">12</div>
                      <div className="text-xs text-gray-500">New</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">44</div>
                      <div className="text-xs text-gray-500">%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">29</div>
                      <div className="text-xs text-gray-500">Days</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="px-4 py-2 border border-gray-300 text-sm">
                      View All Donors
                    </button>
                    <button className="px-4 py-2 bg-black text-white text-sm">
                      Download Report
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      All data is calculated based on the latest figures. For more detailed reports, please contact support.
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white h-full border border-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Chart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;