import React, { useEffect, useState } from "react";
import LayoutComponent from "../Components/layoutComponents.jsx/LayoutComponent";
import { SideBarComponent } from "../Components/layoutComponents.jsx/SideBarComponent";
import { useParams } from "react-router-dom";
import FundEdAnimation from "../Components/AnimatedLoader";

const TechInnovatorsScholarship = () => {
  const [resp, setResponse] = useState(null); // Initially null to differentiate between loading and empty state
  const { id } = useParams();

  const fetchSingleScholarship = async () => {
    try {
      const response = await fetch(
        `https://gdg-backend-7gpy.onrender.com/api/scholarships/getSingleScholarship/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch scholarship");

      const data = await response.json();
      setResponse(data.fullScholarship || {}); // Ensure `fullScholarship` is defined
    } catch (error) {
      console.error("Error fetching scholarship:", error);
      setResponse({}); // Prevent undefined issues
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleScholarship();
    }
  }, [id]); // ✅ Depend on ID

  if (!resp) return <div className="flex justify-center items-center h-screen">
    <FundEdAnimation/>
  </div>; // ✅ Prevents rendering before data is loaded

  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-col w-full border border-gray-300">
        <div className="flex flex-row">
          <div className="w-1/2 bg-gray-200 p-4 flex items-center justify-center">
            <div className="bg-gray-300 flex items-center justify-center rounded">
              <img
                className="w-full h-full object-cover"
                src="https://media.istockphoto.com/id/1164538944/vector/woman-with-laptop-studying-or-working-concept-table-with-books-lamp-coffee-cup-vector.jpg?s=612x612&w=0&k=20&c=VhUj_AZoUnilUKdRessjsK6JQUjXCfum7RQyuzOr6_0="
                alt="Scholarship"
              />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <h1 className="text-2xl font-bold mb-2">{resp.name || "Scholarship Name"}</h1>
            <p className="text-xl font-bold mb-4">Rs.{resp.amount || "N/A"}</p>
            <p className="text-sm mb-4">{resp.scholarshipDetail || "No details available."}</p>
            <div className="border border-gray-300 mb-2 p-2 text-center">
              <p className="text-sm">Deadline: {resp.deadline || "April 15, 2025"}</p>
            </div>
            <div className="border border-gray-300 mb-4 p-2 text-center">
              <p className="text-sm">Location: {resp.location || "Global"}</p>
            </div>
            <button className="bg-black text-white w-full py-2 mb-2">Apply Now</button>
            <p className="text-xs text-center">For inquiries, contact: scholarships@techinnovators</p>
          </div>
        </div>

        {/* Section: Eligibility */}
        <div className="border-t border-gray-300 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Eligibility Criteria</h2>
          </div>
          <ol className="list-decimal pl-6 mb-4">
            <li className="text-sm">Open to undergraduate students in Computer Science or related fields</li>
            <li className="text-sm">
              Minimum GPA of {resp.criteria?.CGPA ?? "N/A"}+
            </li>
            <li className="text-sm">
              Applicants must submit a personal statement and academic transcripts
            </li>
          </ol>
          <hr className="border-t border-gray-300 mb-4" />

          {/* Section: Application Process */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Application Process</h2>
          </div>
          <ol className="list-decimal pl-6 mb-4">
            <li className="text-sm">Complete the application form on the scholarship portal</li>
            <li className="text-sm">Submit required documents (Transcripts, Statement of Purpose, Recommendation Letter)</li>
            <li className="text-sm">Wait for review and selection notification</li>
          </ol>
          <hr className="border-t border-gray-300 mb-4" />

          {/* Section: Additional Details */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Additional Details</h2>
          </div>
          <ol className="list-decimal pl-6">
            <li className="text-sm">Application Requirements: Transcripts, Essay, Resume</li>
            <li className="text-sm">Selection Criteria: Academic performance, innovation in tech, leadership skills</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TechInnovatorsScholarship;
