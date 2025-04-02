import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SideBarComponent = () => {
  const navigate = useNavigate();
  const [scholarshipsOpen, setScholarshipsOpen] = useState(true);
  const [campaignsOpen, setCampaignsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState({
    scholarships: false,
    myCampaign: false,
    ongoingCampaigns: false,
  });

  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleScholarships = () => setScholarshipsOpen(!scholarshipsOpen);
  const toggleCampaigns = () => setCampaignsOpen(!campaignsOpen);

  const getStudentDetails = async () => {
    setLoading(prev => ({ ...prev, scholarships: true }));
    try {
      const email = sessionStorage.getItem("email");
      const response = await fetch(
        "http://localhost:5000/api/scholarships/getScholarships",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch scholarships");
      }

      const data = await response.json();
      if (data?.bestMatchedScholarship) {
        navigate("/scholarships");
      } else {
        navigate("/apply");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      navigate("/apply");
    } finally {
      setLoading(prev => ({ ...prev, scholarships: false }));
    }
  };

  const handleMyCampaign = async () => {
    setLoading(prev => ({ ...prev, myCampaign: true }));
    try {
      const response = await fetch("http://localhost:5000/api/updateCampaign/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          email: sessionStorage.getItem("email"), // Fixed from localStorage to sessionStorage for consistency
        }),
      });
  
      navigate(response.status === 200 ? "/campaign" : "/myCampaign");
    } catch (error) {
      console.error("Error fetching API:", error);
      navigate("/myCampaign");
    } finally {
      setLoading(prev => ({ ...prev, myCampaign: false }));
    }
  };
  
  const handleOngoingCampaigns = () => {
    setLoading(prev => ({ ...prev, ongoingCampaigns: true }));
    // Navigate directly since this was just a simulation
    navigate("/ongoingCampaigns");
    setTimeout(() => {
      setLoading(prev => ({ ...prev, ongoingCampaigns: false }));
    }, 1000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    navigate("/");
  };

  const closeMenuIfMobile = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Sidebar content
  const renderSidebarContent = () => (
    <div className={`${isMobile ? 'fixed inset-0 z-50 bg-gray-800 bg-opacity-75' : 'flex h-screen bg-gray-100'}`}>
      <div className={`${isMobile ? 'w-64 absolute h-full transform transition-transform duration-300 ease-in-out' : 'w-56'} bg-white border-r border-gray-200 h-full`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <img
            className="h-7 cursor-pointer"
            src="/Logo.png"
            alt="Logo"
            onClick={() => {
              navigate("/");
              closeMenuIfMobile();
            }}
          />
          {isMobile && (
            <button onClick={toggleMobileMenu} className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <nav className="p-2 h-full overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <div
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  navigate("/dashboard");
                  closeMenuIfMobile();
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </div>
            </li>

            <li>
              <div
                onClick={toggleScholarships}
                className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Scholarships
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    scholarshipsOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {scholarshipsOpen && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <div
                      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        getStudentDetails();
                        closeMenuIfMobile();
                      }}
                    >
                      {loading.scholarships ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-t-2 border-gray-500 rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Find Scholarships"
                      )}
                    </div>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <div
                onClick={toggleCampaigns}
                className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  Campaigns
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    campaignsOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {campaignsOpen && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <div
                      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        handleMyCampaign();
                        closeMenuIfMobile();
                      }}
                    >
                      {loading.myCampaign ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-t-2 border-gray-500 rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "My Campaign"
                      )}
                    </div>
                  </li>
                  <li>
                    <div
                      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        handleOngoingCampaigns();
                        closeMenuIfMobile();
                      }}
                    >
                      {loading.ongoingCampaigns ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-t-2 border-gray-500 rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Ongoing Campaigns"
                      )}
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="absolute bottom-0">
          <div className="  w-full  flex items-end p-2 cursor-pointer">
            <div
              onClick={() => {
                handleLogout();
                closeMenuIfMobile();
              }}
              className="flex items-center p-4 w-full text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </div>
          </div>

          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Toggle Button - only shown on mobile */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-40 -mt-1">
          <button
            onClick={toggleMobileMenu}
            className="bg-white p-2 rounded-md shadow-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Sidebar - Always visible on desktop, conditionally visible on mobile */}
      {(!isMobile || (isMobile && isMobileMenuOpen)) && renderSidebarContent()}
    </>
  );
};