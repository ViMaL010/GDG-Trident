import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideBarComponent = () => {
  const navigate = useNavigate();
  const [scholarshipsOpen, setScholarshipsOpen] = useState(true);
  const [campaignsOpen, setCampaignsOpen] = useState(false);

  const toggleScholarships = () => setScholarshipsOpen(!scholarshipsOpen);
  const toggleCampaigns = () => setCampaignsOpen(!campaignsOpen);

  const getStudentDetails = async () => {
    try {
      const email = sessionStorage.getItem("email");
      const response = await fetch("http://localhost:5000/api/scholarships/getScholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch scholarships");
      }

      const data = await response.json();

      console.log("clicked" ,data.bestMatchedScholarship)
      
      // If scholarships exist, navigate to /scholarships; otherwise, navigate to /apply
      if (data && data.bestMatchedScholarship) {
        navigate("/scholarships");
      } else {
        navigate("/apply");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      navigate("/apply"); // Navigate to apply if an error occurs
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-56 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <img className="h-7 cursor-pointer" src="/Logo.png" alt="" onClick={()=>{
            navigate('/')
          }}/>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <div
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                {/* <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg> */}
                Dashboard
              </div>
            </li>

            <li>
              <div onClick={toggleScholarships} className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Scholarships
                </div>
                <svg className={`w-4 h-4 transition-transform ${scholarshipsOpen ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {scholarshipsOpen && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer" onClick={getStudentDetails}>
                      Find Scholarships
                    </div>
                  </li>
                  {/* <li>
                    <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      Application History
                    </div>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                      Applied Scholarships
                    </a>
                  </li> */}
                </ul>
              )}
            </li>

            <li>
              <div onClick={toggleCampaigns} className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  Campaigns
                </div>
                <svg className={`w-4 h-4 transition-transform ${campaignsOpen ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {campaignsOpen && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer" onClick={()=>{
                      navigate('/myCampaign')
                    }}>
                      My Campaign
                    </div>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
                      Ongoing Campaigns
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="absolute bottom-0 left-0 w-56 border-t border-gray-200">
            <div onClick={() => {
              sessionStorage.removeItem("token");
              navigate("/");
            }} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Log Out
            </div>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              Settings
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};
