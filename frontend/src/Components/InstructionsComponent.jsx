import React from 'react';

const InstructionsComponent = () => {
  return (
    <div className="bg-white p-6 mb-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Instructions</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">General Guidelines</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><span className="font-medium">Provide Accurate Information</span> – Double-check your details before submitting.</li>
          <li><span className="font-medium">Use Clear Documents</span> – Ensure all uploads are high-quality and readable.</li>
          <li><span className="font-medium">DigiLocker Integration</span> – You can directly upload verified documents via DigiLocker.</li>
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Step-by-Step Process</h3>
        
        <div className="ml-2 mb-3">
          <h4 className="font-medium mb-1">Cover Photo:</h4>
          <ul className="list-disc pl-5 text-sm">
            <li>Upload a high-resolution cover image that effectively represents your fundraiser.</li>
          </ul>
        </div>
        
        <div className="ml-2 mb-3">
          <h4 className="font-medium mb-1">Personal & Academic Information:</h4>
          <ul className="list-disc pl-5 text-sm">
            <li>Full Name (as per official records)</li>
            <li>Course, Institution, and Year of Study</li>
            <li>Achievements, Awards, and Extracurricular Activities (optional)</li>
          </ul>
        </div>
        
        <div className="ml-2 mb-3">
          <h4 className="font-medium mb-1">Fundraiser Details:</h4>
          <ul className="list-disc pl-5 text-sm">
            <li>Purpose of Fundraiser – Clearly explain why you need financial support.</li>
            <li>Fund Allocation Plan – Provide a transparent breakdown of how funds will be utilized.</li>
            <li>Fundraising Goal & Deadline (if applicable)</li>
          </ul>
        </div>
        
        <div className="ml-2 mb-3">
          <h4 className="font-medium mb-1">Required Documents:</h4>
          <ul className="list-disc pl-5 text-sm">
            <li>All applicants must submit the following:</li>
            <ul className="list-disc pl-5 mt-1">
              <li>Aadhar Card – Identity Verification</li>
              <li>10th & 12th Marksheet – Academic Qualification Proof</li>
              <li>Income Certificate – Financial Status Verification</li>
              <li>Admission Letter – Confirmation of College Enrollment</li>
              <li>Fee Structure Receipt – Proof of Tuition & Related Expenses</li>
              <li>Bonafide Certificate – Institutional Enrollment Verification</li>
              <li>College ID Card – Institutional Identity Proof</li>
            </ul>
          </ul>
        </div>
        
        <div className="ml-2 mb-3">
          <h4 className="font-medium mb-1">Optional Documents (Recommended for Stronger Applications):</h4>
          <ul className="list-disc pl-5 text-sm">
            <li>Community Certificate – Proof of Caste/Category (if applicable)</li>
            <li>Awards & Achievements – Additional credentials</li>
            <li>Recommendation Letters – Supporting documents from faculty or mentors</li>
          </ul>
        </div>
        
        <div className="ml-2">
          <h4 className="font-medium mb-1">Final Review & Submission:</h4>
          <ul className="list-disc pl-5 text-sm">
            <li>Carefully review all provided details before submission.</li>
            <li>Ensure document uploads are complete and meet the requirements.</li>
            <li>Click 'Submit' to finalize your fundraiser or scholarship application.</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default InstructionsComponent;