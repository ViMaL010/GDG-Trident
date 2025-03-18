import React, { useState } from "react";
import FormReviewComponent from "../Components/ApplicationComponent/FormReviewComponent";

// File Input Component
const FileInput = ({ 
  title,
  placeholder,
  name, 
  value, 
  onChange, 
  required = false 
}) => {
  const handleFileUpload = (e) => {
    const { files } = e.target;  // Remove the name destructuring here
    if (files && files[0]) {
      onChange({
        target: {
          name: name,  // Use the name from props
          value: files[0]
        }
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border border-gray-300 p-2 flex items-center">
        <input
          type="file"
          name={name}
          id={name}
          onChange={handleFileUpload}
          className="hidden"
        />
        <label
          htmlFor={name}
          className="cursor-pointer flex-1 "
        >
          {placeholder ? placeholder : "Choose one option below"}
        </label>
      </div>
    </div>
  );
};

const MultiStepForm = () => {
  
  const [currentStep, setCurrentStep] = useState(1);

  // State for Personal Information form
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    email: ''
  });

  // State for Academic Details form
  const [academicInfo, setAcademicInfo] = useState({
    highestQualification: '',
    currentCourse: '',
    collegeName: '',
    universityName: '',
  });

  // State for file uploads
  const [uploadedFiles, setUploadedFiles] = useState({
    aadharCard: null,
    marksheet10th: null,
    marksheet12th: null,
    bonafide: null,
    collegeId: null,
    incomeCertificate : null,
    communityCertificate : null,
    admissionLetter : null,
    feeStructure : null,
    supportingDocuments : null,
    mediaContent : null
  });

  const [fundraiserInfo , setFundraiserInfo] = useState({
    fundraiserTitle : '',
    fundraiserReason : '',
    fundraisingGoal : '',
    fundsUsage : ''
  })

  const [financialInfo, setFinancialInfo] = useState({
    annualIncome : '',
    guardianName : '',
    guardianContact : ''
  })

  const [bankDetails, setBankDetails ] = useState({
    accountHolderName : '',
    bankName : '',
    accountNumber : '',
    ifscCode : '',
    upiId : '',
  }) 
  

  // Handle personal info input changes
  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFundraiserInfoChange = (e) => {
    const { name, value } = e.target;
    setFundraiserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle academic info input changes
  const handleAcademicInfoChange = (e) => {
    const { name, value } = e.target;
    setAcademicInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const financialInfoChange = (e) => {
    const { name, value } = e.target;
    setFinancialInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const { name, value } = e.target;
    setUploadedFiles(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Navigate to next step
  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Make sure it's at the start
    formData = personalInfo;
    // ✅ This should log the object
    console.log('Form submitted:', { personalInfo, academicInfo, fundraiserInfo, bankDetails, uploadedFiles });
  };

  const personalSections = [
    {
      title: 'Personal Information',
      fields: [
        { label: 'First Name', key: 'fullName' },
        { label: 'Gender', key: 'gender' },
        { label: 'DOB', key: 'dateOfBirth' },
        { label: 'Email', key: 'email' },
        { label: 'Phone Number', key: 'mobileNumber' },
      ],
    }
  ];

  const academicSection = [
    {
      title : 'Academic Details',
      fields: [
        {label : 'Highest Qualification' , key : 'highestQualification'},
        { label : 'Current Course' , key : 'currentCourse'},
        {label : 'College Name' , key : 'collegeName'},
        {label : 'University Name' , key : 'universityName'},

      ]
    }
  ]

  const financialSection = [
    // annualIncome : '',
    // guardianName : '',
    // guardianContact : ''
    {
      title : 'Financial & Identity Verification',
      fields: [
        {label : 'Annual Family Income' , key : 'annualIncome'},
        { label : 'Guardian Name' , key : 'guardianName'},
        {label : 'Guardian Contact' , key : 'guardianContact'},

      ]
    }
  ]
  


  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Steps indicator */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`rounded-full w-6 h-6 flex items-center justify-center text-xs 
              ${step === currentStep ? 'bg-black text-white' : 
                step < currentStep ? 'bg-gray-300 text-black' : 'bg-white text-black border border-gray-300'}`}>
              {step}
            </div>
            {step < 7 && <div className="w-4 h-px bg-gray-300"></div>}
          </div>
        ))}
      </div>

      {/* Personal Information Form - Step 1 */}
      {currentStep === 1 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">Personal Information</h1>
          <p className="text-center text-gray-600 mb-6">Help us verify your identity with your basic details.</p>

          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full legal name as per documents."
                value={personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <div className="relative">
                <input
                  type="text"
                  name="dateOfBirth"
                  placeholder="dd/mm/yy"
                  value={personalInfo.dateOfBirth}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none"
                  required = {false}
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none appearance-none"
                required = {false}
              >
                <option value="">Select one...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="+91-8771230050"
                  value={personalInfo.mobileNumber}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 pl-8 border border-gray-300 focus:outline-none"
                  required = {false}
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Enter your email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="sample@gmail.com"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 pl-8 border border-gray-300 focus:outline-none"
                  required = {false}
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                // onClick={}
                className="px-6 py-2 bg-black text-white"
              >
                Next
              </button>
            </div>
          </form>
        </>
      )}

      {/* Academic Information Form - Step 2 */}
      {currentStep === 2 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">Academic Information</h1>
          <p className="text-center text-gray-600 mb-6">Please provide your academic details.</p>

          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Highest Qualification <span className="text-red-500">*</span>
              </label>
              <select
                name="highestQualification"
                value={academicInfo.highestQualification}
                onChange={handleAcademicInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none appearance-none"
                required = {false}
              >
                <option value="">Select one...</option>
                <option value="high-school">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>

            <FileInput
              title="Aadhar Card"
              name="aadharCard"
              value={uploadedFiles.aadharCard}
              onChange={handleFileUpload}
              required = {false}
            />
            
            <FileInput
              title="10th Marksheet"
              name="marksheet10th"
              value={uploadedFiles.marksheet10th}
              onChange={handleFileUpload}
              required = {false}
            />
            
            <FileInput
              title="12th Marksheet"
              name="marksheet12th"
              value={uploadedFiles.marksheet12th}
              onChange={handleFileUpload}
              required = {false}
            />
            
            <FileInput
              title="Bonafide Certificate"
              name="bonafide"
              value={uploadedFiles.bonafide}
              onChange={handleFileUpload}
              required = {false}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Current Course <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentCourse"
                placeholder="e.g., B.Tech Computer Science"
                value={academicInfo.currentCourse}
                onChange={handleAcademicInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                College Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="collegeName"
                placeholder="Enter your college name"
                value={academicInfo.collegeName}
                onChange={handleAcademicInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                University Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="universityName"
                placeholder="Enter your university name"
                value={academicInfo.universityName}
                onChange={handleAcademicInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <FileInput
              title="College ID"
              name="collegeId"
              value={uploadedFiles.collegeId}
              onChange={handleFileUpload}
              required = {false}
            />

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-black"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white"
              >
                Next
              </button>
            </div>
          </form>
        </>
      )}

      {/* Document Upload Form - Step 3 */}
      {currentStep === 3 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">Financial & Identity Verification</h1>
          <p className="text-center text-gray-600 mb-6">We need to verify your financial backgrount to access your eligibility.</p>

          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>

          <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Annual Family Income <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="annualIncome"
                placeholder="Enter your total family income per year..."
                value={financialInfo.annualIncome}
                onChange={setFinancialInfo}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <FileInput               
              title="Income Certificate Upload"
              name="incomeCertificate"
              value={uploadedFiles.incomeCertificate}
              onChange={handleFileUpload}
              required = {false}
            />

            <FileInput               
              title="Community Certificate"
              name="communityCertificate"
              value={uploadedFiles.communityCertificate}
              onChange={handleFileUpload}
              required = {false}
            />

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                placeholder="Enter your parent or guardian's name"
                value={financialInfo.guardianName}
                onChange={setFinancialInfo}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Guardian Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianContact"
                placeholder="Enter your parent or guardian's name"
                value={financialInfo.guardianContact}
                onChange={setFinancialInfo}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {false}
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-black"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white"
              >
                Next
              </button>
            </div>
          </form>
        </>
      )}

      {currentStep === 4 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">Admission Details</h1>
          <p className="text-center text-gray-600 mb-6">Confirm your enrollment by providing your admission details.</p>

          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>

          <FileInput               
              title="Admission Letter Upload"
              name="admissionLetter"
              value={uploadedFiles.admissionLetter}
              onChange={handleFileUpload}
              required = {false}
            />

            <FileInput               
              title="Fee Structure Receipt Upload"
              name="feeStructure"
              value={uploadedFiles.feeStructure}
              onChange={handleFileUpload}
              required = {false}
            />

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Scholarships Previously Applied For (if any) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                placeholder="Enter your parent or guardian's name"
                value={financialInfo.guardianName}
                onChange={setFinancialInfo}
                className="w-full p-2 border border-gray-300 focus:outline-none"
              />
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-black"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white"
              >
                Next
              </button>
            </div>
          </form>
        </>
      )}


      {currentStep === 5 && (
    <>
    <h1 className="text-2xl font-bold text-center mb-2">Fundraiser Details</h1>
    <p className="text-center text-gray-600 mb-6">
      Share your story to help donors understand why you need financial support.
    </p>

    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Fundraiser Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fundraiserTitle"
          placeholder="Example: Help Aditi Complete His Engineering Dream at IIT Delhi"
          value={fundraiserInfo.fundraiserTitle || ''}
          onChange={handleFundraiserInfoChange}
          className="w-full p-2 border border-gray-300 focus:outline-none"
          required = {false}
        />
        <p className="text-xs text-gray-500 mt-1">
          Note: This title will be used everywhere in your campaign, including your fundraiser page, donor communications, and promotional materials.
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Why Do You Need Funds? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="fundraiserReason"
          placeholder="Explain your financial needs and how this fundraiser will help you..."
          value={fundraiserInfo.fundraiserReason || ''}
          onChange={handleFundraiserInfoChange}
          className="w-full p-2 border border-gray-300 focus:outline-none h-24"
          required = {false}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Fundraising Goal (Amount in ₹) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="fundraisingGoal"
          placeholder="Specify the total amount you need to raise..."
          value={fundraiserInfo.fundraisingGoal}
          onChange={handleFundraiserInfoChange}
          className="w-full p-2 border border-gray-300 focus:outline-none"
          required = {false}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          
        </label>
        <FileInput
          title="Upload additional documents to strengthen your fundraiser request"
          name="supportingDocuments"
          value={uploadedFiles.supportingDocuments}
          onChange={handleFileUpload}
          required={false}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          How Will the Funds Be Used? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="fundsUsage"
          placeholder="Break down how you plan to use the funds."
          value={fundraiserInfo.fundsUsage || ''}
          onChange={handleFundraiserInfoChange}
          className="w-full p-2 border border-gray-300 focus:outline-none"
          required = {false}
        />
      </div>

      <div className="mb-4">
        <FileInput
          title="Add a Picture/Video"
          placeholder="A clear photo or video helps build trust with donors"
          name="mediaContent"
          value={uploadedFiles.mediaContent}
          onChange={handleFileUpload}
          required = {false}
        />
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="px-6 py-2 bg-gray-200 text-black"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white"
        >
          Next
        </button>
      </div>
    </form>
  </>
      )}


      {currentStep === 6 && (
        <>
            <h1 className="text-2xl font-bold text-center mb-2">Bank Account Details</h1>
            <p className="text-center text-gray-600 mb-6">Provide your bank details to receive funds securely.</p>
        
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  placeholder="Enter the name as per your bank account"
                  value={bankDetails.accountHolderName}
                  onChange={handleBankDetailsChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none"
                  required = {false}
                />
              </div>
        
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <select
                  name="bankName"
                  value={bankDetails.bankName}
                  onChange={handleBankDetailsChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none appearance-none"
                  required = {false}
                >
                  <option value="">Mention the name of your bank...</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="Axis">Axis Bank</option>
                </select>
              </div>
        
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={bankDetails.accountNumber}
                  onChange={handleBankDetailsChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none"
                  required = {false}
                />
              </div>
        
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="XXXXXXXX"
                  value={bankDetails.ifscCode}
                  onChange={handleBankDetailsChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none"
                  required = {false}
                />
              </div>
        
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  UPI ID (Optional)
                </label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="Add your UPI ID for faster transactions."
                  value={bankDetails.upiId}
                  onChange={handleBankDetailsChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none"
                />
              </div>
        
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Bank Passbook/Cancelled Cheque Upload
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="passbook"
                    id="passbook"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="passbook"
                    className="flex items-center justify-between w-full p-2 border border-gray-300 focus:outline-none cursor-pointer"
                  >
                    <span className="text-gray-500">
                      {bankDetails.passbook ? bankDetails.passbook.name : "Upload a scanned copy"}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                  </label>
                </div>
              </div>
        
              <div className="flex justify-end mt-8 space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  // onClick={handleSubmit}
                  className="px-6 py-2 bg-black text-white"
                >
                  Next
                </button>
              </div>
            </form>
          </>
      )}

      {currentStep == 7 && (
        
        <div>
                <h2 className="text-2xl font-bold text-center mb-2">Review & Submit</h2>
      <p className="text-center text-gray-600 mb-6">Check your details before submitting.</p>
      
          
          {console.log(personalInfo)}
          {console.log('Form submitted:', { personalInfo, academicInfo, fundraiserInfo, bankDetails, uploadedFiles })}
          <FormReviewComponent formData={personalInfo} sections={personalSections} />
          <FormReviewComponent formData={academicInfo} sections={academicSection} />
          <FormReviewComponent formData={financialInfo} sections={financialSection} />
          <div className="flex justify-end mt-8 space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  // onClick={handleSubmit}
                  className="px-6 py-2 bg-black text-white"
                >
                  Submit
                </button>
              </div>
        </div>
        
      )}

      
    </div>
  );
};

export default MultiStepForm;