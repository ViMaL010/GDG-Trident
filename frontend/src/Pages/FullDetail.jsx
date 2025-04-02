import React, { useState } from "react";
import FormReviewComponent from "../Components/ApplicationComponent/FormReviewComponent";
import { FileInput } from "../Components/FileInputComponent";
import { FileUploadReview, UploadProgressDisplay, useFileUploadManager } from "../Components/FileManager";
import FileUpload from "../Components/FileUploadComponent";
import { uploadAllFiles } from "../Components/UploadComponent";
import { useNavigate } from "react-router-dom";

// File Input Component



const MultiStepForm = () => {

  const navigate = useNavigate();
  
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

  const [uploadResults, setUploadResults] = useState(null);

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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [fileUrls, setFileUrls] = useState({});

  const navigateToCampaign = () => {
    setTimeout(() => {
      navigate('/campaign');
    }, 1000); // Optional delay before navigation
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileMap = {};
    Array.from(files).forEach((file, index) => {
      fileMap[`file_${index + 1}`] = file;
    });
    setUploadedFiles(fileMap);
  };

  // Upload Handler
  const handleUpload = () => {
    uploadAllFiles(uploadedFiles, (result) => {
      if (result.success) {
        console.log("All files uploaded successfully:", result.successResults);
        
      } else {
        console.error("Some files failed to upload:", result.failedResults);
      }
    });
  };

  
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
  };    // Navigate to next step   
  // const handleNext = () => {     setCurrentStep(prevStep => prevStep + 1);   };    // Navigate to previous step   const handleBack = () => {     setCurrentStep(prevStep => prevStep - 1);   };
  const handleUploadComplete = (result) => {
    console.log("Result of FileUpload component is:" , result)
    if (result.success) {
      const uploadedFileUrls = result.successResults.reduce((acc, fileResult) => {
        if (fileResult.name && fileResult.url) {
          acc[fileResult.name] = fileResult.url;
        }
        return acc;
      }, {});
  
      setFileUrls(uploadedFileUrls);
      console.log('File URLs after upload:', uploadedFileUrls);
    } else {
      setSubmissionError('Some files failed to upload. Please check and try again.');
      console.log('Error submitting form');
    }
  };
  
  
 

  // Navigate to next step
  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };


  function CheckboxForm() {
    const [formState, setFormState] = useState({
      allDetailsCorrect: false,
      agreeToTerms: true
    });
  
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setFormState({
        ...formState,
        [name]: checked
      });
    };
  
    // Custom checkbox styles
    const checkboxContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      position: 'relative',
      cursor: 'pointer'
    };
  
    const checkboxLabelStyle = {
      marginLeft: '10px',
      fontFamily: 'Arial, sans-serif'
    };
  
    const checkboxStyle = {
      appearance: 'none',
      width: '20px',
      height: '20px',
      border: '1px solid #ccc',
      borderRadius: '3px',
      outline: 'none',
      cursor: 'pointer',
      position: 'relative'
    };
  
    const checkboxCheckedStyle = {
      backgroundColor: '#000',
      borderColor: '#000'
    };
  
    const checkmarkStyle = {
      position: 'absolute',
      top: '2px',
      left: '6px',
      width: '8px',
      height: '14px',
      border: 'solid white',
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
      display: 'none'
    };
  
    return (
      <div className="checkbox-form" style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
        <div style={checkboxContainerStyle}>
          <div style={{ position: 'relative' }}>
            <input
              type="checkbox"
              id="allDetailsCorrect"
              name="allDetailsCorrect"
              checked={formState.allDetailsCorrect}
              onChange={handleCheckboxChange}
              style={{
                ...checkboxStyle,
                ...(formState.allDetailsCorrect ? checkboxCheckedStyle : {})
              }}
            />
            <div
              style={{
                ...checkmarkStyle,
                display: formState.allDetailsCorrect ? 'block' : 'none'
              }}
            />
          </div>
          <label htmlFor="allDetailsCorrect" style={checkboxLabelStyle}>
            All details are correct.
          </label>
        </div>
        
        <div style={checkboxContainerStyle}>
          <div style={{ position: 'relative' }}>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formState.agreeToTerms}
              onChange={handleCheckboxChange}
              style={{
                ...checkboxStyle,
                ...(formState.agreeToTerms ? checkboxCheckedStyle : {})
              }}
            />
            <div
              style={{
                ...checkmarkStyle,
                display: formState.agreeToTerms ? 'block' : 'none'
              }}
            />
          </div>
          <label htmlFor="agreeToTerms" style={checkboxLabelStyle}>
            I agree to the terms & conditions.
          </label>
        </div>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    const formData = {
      personalInfo,
      academicInfo,
      financialInfo,
      fundraiserInfo,
      bankDetails,
      uploadedFiles
    }
    console.log(formData)
  
    try {
      setSubmissionComplete(false);
      // ✅ Upload all files to Firebase
      // const fileUrls = handleUpload(uploadedFiles);
  
      // // ✅ Check if any required files are missing
      // const missingFiles = Object.keys(uploadedFiles).filter(
      //   (key) => uploadedFiles[key] && !(fileUrls?.[key])
      // );
  
      // if (missingFiles.length > 0) {
      //   console.log(
      //     `The following files are missing: ${missingFiles
      //       .map((file) => file.replace(/([A-Z])/g, ' $1').trim())
      //       .join(', ')}. Please upload them before submitting.`
      //   );
      // }
  
      // ✅ Prepare form data
      const formData = {
        personalInfo,
        academicInfo,
        financialInfo,
        fundraiserInfo,
        bankDetails,
      };
  
      console.log('Submitting form data:', formData);
      // console.log('File URLs:', fileUrls);
  
      // ✅ Submit form data to the backend API
      
      const response = await fetch('http://localhost:5000/api/updateCampaign/uploadUserDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : sessionStorage.getItem('token')
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        console.log('Failed to submit form');
      }
  
      const result = await response.json();
      console.log('Submission successful:', result);
      

      // ✅ Submission successful
      setSubmissionComplete(true);
      if(setSubmissionComplete){
        navigate('/campaign')
      }

    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmissionError(error.message || 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };
  
    const renderFinalStep = () => (
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">Review & Submit</h2>
        <p className="text-center text-gray-600 mb-6">Check your details before submitting.</p>
        
        {/* Personal info review */}
        <FormReviewComponent formData={personalInfo} sections={personalSections} />
        
        {/* Academic info review */}
        <FormReviewComponent formData={academicInfo} sections={academicSection} />
        
        {/* Financial info review */}
        <FormReviewComponent formData={financialInfo} sections={financialSection} />
        
        {/* Fundraiser info review */}
        <FormReviewComponent formData={fundraiserInfo} sections={fundraiserSection} />
        
        {/* Bank details review */}
        <FormReviewComponent formData={bankDetails} sections={bankDetailsSection} />
        
        {/* File upload review */}
        {/* <FileUploadReview files={uploadedFiles} /> */}
        
        {/* Upload progress (only shown when uploading) */}
        {/* <UploadProgressDisplay progress={uploadProgress} uploading={uploading} /> */}
        
        {/* Error message */}
        {/* {(uploadError || submissionError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
            {uploadError || submissionError}
          </div>
        )} */}
        
        {/* Success message */}
        {submissionComplete && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700">
            Your application has been submitted successfully!
          </div>
        )}
        
        {/* Checkbox agreement */}
        <CheckboxForm />
        
        {/* Action buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300"
            onClick={handleBack}
            disabled={isSubmitting || ""}
          >
            Back
          </button>
          <button
            type="submit"
            className={`px-6 py-2 text-white ${(isSubmitting || "") ? 'bg-gray-500' : 'bg-black'}`}
            disabled={isSubmitting || ""}
          >
            {isSubmitting || "" ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </div>
    );


 

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
    {
      title : 'Financial & Identity Verification',
      fields: [
        {label : 'Annual Family Income' , key : 'annualIncome'},
        { label : 'Guardian Name' , key : 'guardianName'},
        {label : 'Guardian Contact' , key : 'guardianContact'},

      ]
    }
  ]

  const fundraiserSection = [
    {
      title : 'Fundraiser Details',
      fields : [
        {label : 'Fundraiser Title', key : 'fundraiserTitle'},
        {label : 'Why Do You Need Funds?', key : 'fundraiserReason'},
        {label : 'Fundraiser Goal (Amount in ₹)', key : 'fundraiserGoal'},
        {label : 'How Will The Funds Be Used', key : 'fundraiserUsage'},
      ]
    }
  ]
  
  const bankDetailsSection = [
    {
      title : 'Bank Account Details',
      fields : [
        {label : 'Account Holder Name' , key: 'accountHolderName'},
        {label : 'Bank Name' , key : 'bankName'},
        {label : 'Account Number' , key : 'accountNumber'},
        {label : 'IFSC Code' , key : 'ifscCode'},
        {label : 'UPI ID (Optional)', key : 'upiId'}
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
                required = {true}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <div className="relative">
                <input
                  type="text"
                  name="dateOfBirth"
                  placeholder="dd/mm/yyyy"
                  value={personalInfo.dateOfBirth}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-2 border border-gray-300 focus:outline-none"
                  required = {true}
                />
                {/* <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  
                </div> */}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none appearance-none"
                required = {true}
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
                  required = {true}
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
                  required = {true}
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
                required = {true}
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
              required = {true}
            />
            
            <FileInput
              title="10th Marksheet"
              name="marksheet10th"
              value={uploadedFiles.marksheet10th}
              onChange={handleFileUpload}
              required = {true}
            />
            
            <FileInput
              title="12th Marksheet"
              name="marksheet12th"
              value={uploadedFiles.marksheet12th}
              onChange={handleFileUpload}
              required = {true}
            />
            
            <FileInput
              title="Bonafide Certificate"
              name="bonafide"
              value={uploadedFiles.bonafide}
              onChange={handleFileUpload}
              required = {true}
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
                required = {true}
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
                required = {true}
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
                required = {true}
              />
            </div>

            <FileInput
              title="College ID"
              name="collegeId"
              value={uploadedFiles.collegeId}
              onChange={handleFileUpload}
              required = {true}
            />

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
                onChange={financialInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {true}
              />
            </div>

            <FileInput               
              title="Income Certificate Upload"
              name="incomeCertificate"
              value={uploadedFiles.incomeCertificate}
              onChange={handleFileUpload}
              required = {true}
            />

            <FileInput               
              title="Community Certificate"
              name="communityCertificate"
              value={uploadedFiles.communityCertificate}
              onChange={handleFileUpload}
              required = {true}
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
                onChange={financialInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {true}
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
                onChange={financialInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
                required = {true}
              />
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
              required = {true}
            />

            <FileInput               
              title="Fee Structure Receipt Upload"
              name="feeStructure"
              value={uploadedFiles.feeStructure}
              onChange={handleFileUpload}
              required = {true}
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
                // onChange={financialInfoChange}
                className="w-full p-2 border border-gray-300 focus:outline-none"
              />
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
          required = {true}
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
          required = {true}
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
          required = {true}
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
          required = {true}
        />
      </div>

      <div className="mb-4">
        <FileInput
          title="Add a Picture/Video"
          placeholder="A clear photo or video helps build trust with donors"
          name="mediaContent"
          value={uploadedFiles.mediaContent}
          onChange={handleFileUpload}
          required = {true}
        />
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
                  required = {true}
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
                  required = {true}
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
                  required = {true}
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
                  required = {true}
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

      <form onSubmit={handleSubmit} >
      {currentStep == 7 && renderFinalStep()}
      </form>
      
    </div>
  );
};

export default MultiStepForm;