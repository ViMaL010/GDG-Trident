import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SideBarComponent } from "../Components/layoutComponents.jsx/SideBarComponent";
import FundEdAnimation from "../Components/AnimatedLoader";

const ScholarshipFinder = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        const email = sessionStorage.getItem("email");
        const studentDetail = await fetch(
          "https://gdg-backend-7gpy.onrender.com/api/scholarships/getScholarships",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("token"),
            },
            body: JSON.stringify({ email: email }),
          }
        );

        const data = await studentDetail.json();
        setResponse(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    getStudentDetails();
    
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Handle resize events - similar to SideBarComponent
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainScholarship = response?.bestMatchedScholarship || {};
  const otherEligibleScholarships = response?.otherEligibleScholarships || [];

  const formatAmount = (amount) => {
    return "₹" + amount;
  };

  // Animation variants - enhanced for consistency
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

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };
  
  // Mobile menu animation variants - similar to SideBarComponent
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <FundEdAnimation/>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Fixed Sidebar for desktop - always visible */}
      {!isMobile && (
        <div className="h-screen">
          <SideBarComponent />
        </div>
      )}

      {/* Mobile Menu - using AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop for mobile menu */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              className="fixed inset-0 bg-black z-10"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Sidebar - slides in from left */}
            {/* <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed left-0 top-0 z-20 h-screen w-60 bg-white shadow-lg overflow-y-auto"
            > */}
              <SideBarComponent />
            {/* </motion.div> */}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="border-b border-gray-200 flex items-center justify-between p-4">
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
            <div className="text-lg font-medium">Scholarships</div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <motion.input
                whileFocus={{ width: "16rem", transition: { duration: 0.3 } }}
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div> */}
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-8 w-8 bg-gray-200 rounded-full"
            ></motion.div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-xl md:text-2xl font-bold mb-2 md:mb-4"
            >
              Find Scholarships
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base"
            >
              Explore a wide range of scholarships tailored to your academic
              background and financial needs. Use filters to refine your search
              and discover the best opportunities available to you.
            </motion.p>

            {/* Best Matched Scholarship */}
            {mainScholarship.name && (
              <motion.div variants={itemVariants} className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Best Matched Scholarship</h2>
                <div className="w-full md:w-2/3 lg:w-1/3"> {/* Responsive width */}
                  <motion.div
                    whileHover="hover"
                    variants={cardHoverVariants}
                    className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-sm w-full"
                    onClick={() => navigate(`/fullscholarship/${mainScholarship._id}`)}
                  >
                    <div className="h-36 bg-gray-200 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src="/team.png"
                        alt="Scholarship"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-gray-500 text-sm mr-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{mainScholarship.category}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <span>{formatAmount(mainScholarship.amount || 0)}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{mainScholarship.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {mainScholarship.scholarshipDetail}
                      </p>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        className="flex items-center text-sm font-medium text-black"
                      >
                        View details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Other Eligible Scholarships */}
            {otherEligibleScholarships.length > 0 && (
              <motion.div variants={itemVariants}>
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                  Other Eligible Scholarships
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {otherEligibleScholarships.map((scholarship, index) => (
                    <motion.div
                      key={scholarship._id || Math.random().toString()}
                      whileHover="hover"
                      variants={cardHoverVariants}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.1 * index,
                          duration: 0.5
                        }
                      }}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer"
                      onClick={() => navigate(`/fullscholarship/${scholarship._id}`)}
                    >
                      <div className="h-36 bg-gray-200 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTfyjb-WoJD9aMPdHLjdZ1EoaEGCFlKgB_KFtPZFHniKweYF8tE3w24J83Y1GSrSY0UY&usqp=CAU"
                          alt="Scholarship"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-3">
                          <div className="flex items-center text-gray-500 text-sm mr-4">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{scholarship.category || "General"}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <span>{formatAmount(scholarship.amount || 0)}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">
                          {scholarship.name || "Scholarship"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Minimum requirements:{" "}
                          {scholarship.criteria ? (
                            <>
                              10th marks {scholarship.criteria.tenthMarks || "N/A"}%, 12th
                              marks {scholarship.criteria.twelfthMarks || "N/A"}%, CGPA{" "}
                              {scholarship.criteria.CGPA || "N/A"}, AI Score{" "}
                              {scholarship.criteria.AIScore || "N/A"}
                            </>
                          ) : (
                            "Details not available"
                          )}
                        </p>
                        <motion.button 
                          whileHover={{ x: 5 }}
                          className="flex items-center text-sm font-medium text-black"
                        >
                          View details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Scholarships Found */}
            {!mainScholarship.name && otherEligibleScholarships.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center p-6 md:p-8 border border-gray-200 rounded-lg"
              >
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl font-medium text-gray-700 mb-2"
                >
                  No Scholarships Found
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-500"
                >
                  No scholarship data is currently available. Please try again later or
                  update your profile to find matching scholarships.
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ScholarshipFinder;