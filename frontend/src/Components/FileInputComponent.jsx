import React, { useState } from 'react';

export const FileInput = ({
  title,
  placeholder,
  name,
  onChange,
  required = false,
  accept = "*/*",
  value
}) => {
  // Local state to track the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      
      // Call the parent component's onChange with the file
      onChange({
        target: {
          name: name,
          value: file
        }
      });
    }
  };

  // Display the filename if a file is selected or passed as value
  const displayValue = selectedFile ? selectedFile.name : 
                      (value && typeof value === 'object' ? value.name : 
                      (value ? value : ''));

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
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <label
          htmlFor={name}
          className="cursor-pointer flex-1"
        >
          {displayValue || (placeholder ? placeholder : "Choose file")}
        </label>
        {selectedFile && (
          <div className="ml-2 flex items-center text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
