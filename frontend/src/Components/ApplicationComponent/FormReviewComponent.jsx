import React from 'react';

const FormReviewItem = ({ label, value, isUploadedFile = false }) => {
  return (
    <div className="mb-4 ">
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      {isUploadedFile ? (
        <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 bg-gray-50">
          <span className="text-sm text-gray-700">{value}</span>
          <svg 
            className="h-5 w-5 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
        </div>
      ) : (
        <div className="rounded-md border border-gray-300 px-3 py-2 bg-white">
          <span className="text-sm text-gray-500">{value || "—"}</span>
        </div>
      )}
    </div>
  );
};

const FormReviewSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const FormStepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
            i + 1 === currentStep 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : i + 1 < currentStep 
                ? 'bg-blue-100 border-blue-500 text-blue-500' 
                : 'bg-white border-gray-300 text-gray-500'
          }`}>
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-12 h-1 ${
              i + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

const FormReviewComponent = ({ formData, sections }) => {
    console.log(formData.personalInfo)
  return (
    <div className="max-w-3xl mx-auto p-6">
      

      {sections?.length > 0 ? (
  sections.map((section, index) => (
    <FormReviewSection key={index} title={section.title}>
      {section.fields?.map((field, fieldIndex) => (
        <FormReviewItem
          key={fieldIndex}
          label={field.label}
          value={formData[field.key] || field.value}
          isUploadedFile={field.isFile}
        />
      ))}
    </FormReviewSection>
  ))
) : (
  <p className="text-center text-gray-500">No data available to review.</p>
)}

    </div>
  );
};

export default FormReviewComponent;