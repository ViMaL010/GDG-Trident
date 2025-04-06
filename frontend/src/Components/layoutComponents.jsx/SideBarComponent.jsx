import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        "https://gdg-backend-7gpy.onrender.com/api/scholarships/getScholarships",
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
          email: sessionStorage.getItem("email"),
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
    navigate("/page-not-found");
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

  // Animation variants
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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - only shown on mobile */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-40">
          <motion.button
            onClick={toggleMobileMenu}
            className="bg-white p-2 rounded-md shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      )}

      {/* Desktop Sidebar - always visible on desktop */}
      {!isMobile && (
        <div className="w-56 bg-white border-r border-gray-200 h-screen flex flex-col">
          {/* Logo Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <img
              className="h-7 cursor-pointer"
              src="/Logo.png"
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Navigation Menu */}
          <nav className="p-2 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <div
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => navigate("/dashboard")}
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
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    Scholarships
                  </div>
                  <motion.svg
                    animate={{ rotate: scholarshipsOpen ? 180 : 0 }}
                    className="w-4 h-4"
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
                  </motion.svg>
                </div>
                <AnimatePresence>
                  {scholarshipsOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-7 mt-1 space-y-1 overflow-hidden"
                    >
                      <li>
                        <div
                          className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={getStudentDetails}
                        >
                          {loading.scholarships ? (
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-t-2 border-gray-500 rounded-full"
                              ></motion.div>
                              <span>Loading...</span>
                            </div>
                          ) : (
                            "Find Scholarships"
                          )}
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={()=>{
                            navigate('/page-not-found')
                          }}
                        >
                            <div className="flex items-center space-x-2">

                            Applied Scholarships
                            </div>
                        </div>
                      </li>
                      <li>
                        <div
                          className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={()=>{
                            navigate('/page-not-found')
                          }}
                        >
                          
                            <div className="flex items-center space-x-2">
                        
                            Application History
                          </div>
                        </div>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <div
                  onClick={toggleCampaigns}
                  className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                    Campaigns
                  </div>
                  <motion.svg
                    animate={{ rotate: campaignsOpen ? 180 : 0 }}
                    className="w-4 h-4"
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
                  </motion.svg>
                </div>
                <AnimatePresence>
                  {campaignsOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-7 mt-1 space-y-1 overflow-hidden"
                    >
                      <li>
                        <div
                          className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={handleMyCampaign}
                        >
                          {loading.myCampaign ? (
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-t-2 border-gray-500 rounded-full"
                              ></motion.div>
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
                          onClick={handleOngoingCampaigns}
                        >
                          {loading.ongoingCampaigns ? (
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-t-2 border-gray-500 rounded-full"
                              ></motion.div>
                              <span>Loading...</span>
                            </div>
                          ) : (
                            "Ongoing Campaigns"
                          )}
                        </div>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-200">
            <div
              onClick={handleLogout}
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar with animations */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              className="fixed inset-0 bg-black z-30"
              onClick={toggleMobileMenu}
            />

            {/* Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed top-0 left-0 z-40 h-screen w-60 bg-white shadow-lg"
            >
              {/* Logo Header */}
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
                <motion.button
                  onClick={toggleMobileMenu}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Navigation Menu */}
              <nav className="p-2 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  <li>
                    <motion.div
                      whileHover={{ x: 3 }}
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
                    </motion.div>
                  </li>

                  <li>
                    <motion.div
                      whileHover={{ x: 3 }}
                      onClick={toggleScholarships}
                      className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                        Scholarships
                      </div>
                      <motion.svg
                        animate={{ rotate: scholarshipsOpen ? 180 : 0 }}
                        className="w-4 h-4"
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
                      </motion.svg>
                    </motion.div>
                    <AnimatePresence>
                      {scholarshipsOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-7 mt-1 space-y-1 overflow-hidden"
                        >
                          <li>
                            <motion.div
                              whileHover={{ x: 3 }}
                              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => {
                                getStudentDetails();
                                closeMenuIfMobile();
                              }}
                            >
                              {loading.scholarships ? (
                                <div className="flex items-center space-x-2">
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-t-2 border-gray-500 rounded-full"
                                  ></motion.div>
                                  <span>Loading...</span>
                                </div>
                              ) : (
                                "Find Scholarships"
                              )}
                            </motion.div>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>

                  <li>
                    <motion.div
                      whileHover={{ x: 3 }}
                      onClick={toggleCampaigns}
                      className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                          />
                        </svg>
                        Campaigns
                      </div>
                      <motion.svg
                        animate={{ rotate: campaignsOpen ? 180 : 0 }}
                        className="w-4 h-4"
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
                      </motion.svg>
                    </motion.div>
                    <AnimatePresence>
                      {campaignsOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="pl-7 mt-1 space-y-1 overflow-hidden"
                        >
                          <li>
                            <motion.div
                              whileHover={{ x: 3 }}
                              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => {
                                handleMyCampaign();
                                closeMenuIfMobile();
                              }}
                            >
                              {loading.myCampaign ? (
                                <div className="flex items-center space-x-2">
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-t-2 border-gray-500 rounded-full"
                                  ></motion.div>
                                  <span>Loading...</span>
                                </div>
                              ) : (
                                "My Campaign"
                              )}
                            </motion.div>
                          </li>
                          <li>
                            <motion.div
                              whileHover={{ x: 3 }}
                              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => {
                                handleOngoingCampaigns();
                                closeMenuIfMobile();
                              }}
                            >
                              {loading.ongoingCampaigns ? (
                                <div className="flex items-center space-x-2">
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-t-2 border-gray-500 rounded-full"
                                  ></motion.div>
                                  <span>Loading...</span>
                                </div>
                              ) : (
                                "Ongoing Campaigns"
                              )}
                            </motion.div>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                </ul>
              </nav>

              {/* Logout Section */}
              <div className="p-4 border-t border-gray-200">
                <motion.div
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    handleLogout();
                    closeMenuIfMobile();
                  }}
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};