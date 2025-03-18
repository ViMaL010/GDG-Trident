import { data, useNavigate } from "react-router-dom";
import { Search, Bell, Home, File, FileCheck, Award, Users, Clock, DollarSign, LogOut, Settings, ChevronDown, ChevronRight, MapPin, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SideBarComponent } from "../Components/layoutComponents.jsx/SideBarComponent";


const ScholarshipFinder = () => {
  const navigate = useNavigate();


  const [response, setResponse] = useState(null);
  
  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        const email = sessionStorage.getItem("email");
        const studentDetail = await fetch("http://localhost:5000/api/scholarships/getScholarships", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem('token')
          },
          body: JSON.stringify({ email: email }),
        });
        
        // Parse the response to JSON
        const data = await studentDetail.json();
        setResponse(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };
    
    getStudentDetails();
    
    // This empty dependency array ensures the effect runs only once when component mounts
  }, []);

  // Safely access nested properties with optional chaining
  const mainScholarship = response?.bestMatchedScholarship || {};
  const otherEligibleScholarships = response?.otherEligibleScholarships || [];

  // Format amount to currency format
  const formatAmount = (amount) => {
    return '₹' + amount;
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <SideBarComponent/>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="border-b border-gray-200 flex items-center justify-between p-4">
          <div className="text-lg font-medium">Scholarships</div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64"
              />
            </div>
            <Bell className="h-6 w-6 text-gray-600" />
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Find Scholarships</h1>
            <p className="text-gray-600 mb-6">
              Explore a wide range of scholarships tailored to your academic background and financial needs. Use filters to refine your search and discover the best opportunities available to you.
            </p>
            
            {/* Best matched Scholarships - Only render if mainScholarship data exists */}
            {mainScholarship.name && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Best matched Scholarship</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                  <div className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={() =>{
                        navigate(`/fullscholarship/${response.bestMatchedScholarship._id}`)
                      }}>
                    <div className="h-36 bg-gray-200 flex items-center justify-center">
                      <div className="text-gray-400">
                        <img src="https://www.eastpoint.ac.in/web/themes/default/images/scholarship.png" alt="Scholarship" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-3 mt-2" >
                        <div className="flex items-center text-gray-500 text-sm mr-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{mainScholarship.category}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                        {/* <MapPin className="h-4 w-4 mr-1" /> */}
                        <span>{formatAmount(mainScholarship.amount || 0)}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{mainScholarship.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {mainScholarship.scholarshipDetail}
                      </p>
                      <div className='flex items-center'>
                      <button className="flex items-center text-sm font-medium cursor-pointer" >
                        View details 
                        <ChevronRight className="h-4 w-4 ml-1 mt-[2px]" />
                      </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other Eligible Scholarships - Only render if there are items to display */}
            {otherEligibleScholarships.length > 0 && (
              <div className="cursor-pointer" >
                <h2 className="text-xl font-bold mb-4">Other Eligible Scholarships</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherEligibleScholarships.map(scholarship => (
                    <div key={scholarship._id || Math.random().toString()} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-36 bg-gray-200 flex items-center justify-center relative">
                        <img 
                          className="w-full h-full object-cover" 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTfyjb-WoJD9aMPdHLjdZ1EoaEGCFlKgB_KFtPZFHniKweYF8tE3w24J83Y1GSrSY0UY&usqp=CAU" 
                          alt="Scholarship" 
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-3 cursor-pointer" >
                          <div className="flex items-center text-gray-500 text-sm mr-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{scholarship.category || 'General'}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <span>{formatAmount(scholarship.amount || 0)}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{scholarship.name || 'Scholarship'}</h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Minimum requirements: 
                          {scholarship.criteria ? (
                            <>
                              10th marks {scholarship.criteria.tenthMarks || 'N/A'}%, 
                              12th marks {scholarship.criteria.twelfthMarks || 'N/A'}%, 
                              CGPA {scholarship.criteria.CGPA || 'N/A'}, 
                              AI Score {scholarship.criteria.AIScore || 'N/A'}
                            </>
                          ) : (
                            'Details not available'
                          )}
                        </p>
                        <a href="#" className="flex items-center text-sm font-medium" onClick={() =>{
                        navigate(`/fullscholarship/${scholarship._id}`)
                      }}>
                          View details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Message when no scholarships are found */}
            {!mainScholarship.name && otherEligibleScholarships.length === 0 && (
              <div className="text-center p-8 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Scholarships Found</h3>
                <p className="text-gray-500">No scholarship data is currently available. Please try again later or update your profile to find matching scholarships.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScholarshipFinder;