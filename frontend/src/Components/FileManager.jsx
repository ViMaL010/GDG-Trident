import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';

// File Upload Manager Hook
export const useFileUploadManager = () => {
  const [uploaderFiles, setuploaderFiles] = useState({
    aadharCard: null,
    marksheet10th: null,
    marksheet12th: null,
    bonafide: null,
    collegeId: null,
    incomeCertificate: null,
    communityCertificate: null,
    admissionLetter: null,
    feeStructure: null,
    supportingDocuments: null,
    mediaContent: null
  });
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedUrls, setUploadedUrls] = useState({});
  const [uploadError, setUploadError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, value } = e.target;
    setuploaderFiles(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Upload a single file and return its URL
  const uploadFile = (key, file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null); // Skip if no file
        return;
      }
      
      const storageRef = ref(storage, `uploads/${key}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(prev => ({
            ...prev,
            [key]: progress
          }));
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };
  
  // Upload all files at once and return object with URLs
  const uploadAllFiles = async () => {
    setUploading(true);
    setUploadError(null);
    
    try {
      const fileEntries = Object.entries(uploaderFiles).filter(([_, file]) => file !== null);
      
      // Initialize progress for each file
      const initialProgress = {};
      fileEntries.forEach(([key]) => {
        initialProgress[key] = 0;
      });
      setUploadProgress(initialProgress);
      
      // Upload all files concurrently
      const uploadPromises = fileEntries.map(([key, file]) => 
        uploadFile(key, file).then(url => ({ key, url }))
      );
      
      const results = await Promise.all(uploadPromises);
      
      // Convert results to object
      const urlsObject = results.reduce((acc, { key, url }) => {
        if (url) acc[key] = url;
        return acc;
      }, {});
      
      setUploadedUrls(urlsObject);
      setUploading(false);
      
      return urlsObject;
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadError(error.message || "Failed to upload files");
      setUploading(false);
      throw error;
    }
  };
  
  return {
    uploaderFiles,
    setuploaderFiles,
    handleFileChange,
    uploadAllFiles,
    uploading,
    uploadProgress,
    uploadedUrls,
    uploadError
  };
};

// File Input Component
export const FileInput = ({ title, placeholder, name, onChange, required = false, value }) => {
  const handleFileSelect = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      onChange({
        target: {
          name: name,
          value: files[0]
        }
      });
    }
  };

  const displayValue = value ? (typeof value === 'object' ? value.name : value) : '';

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
          onChange={handleFileSelect}
          className="hidden"
        />
        <label htmlFor={name} className="cursor-pointer flex-1">
          {displayValue || (placeholder ? placeholder : "Choose file")}
        </label>
        {value && (
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

// File Upload Review Component
export const FileUploadReview = ({ files }) => {
  return (
    <div className="mt-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Uploaded Documents</h3>
      <div className="bg-gray-50 p-4 rounded-md">
        {Object.entries(files).filter(([_, file]) => file).length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {Object.entries(files)
              .filter(([_, file]) => file)
              .map(([key, file]) => (
                <li key={key} className="py-2 flex justify-between">
                  <span className="font-medium">{formatDocName(key)}</span>
                  <span className="text-gray-600">{file.name}</span>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-yellow-600">No documents selected</p>
        )}
      </div>
    </div>
  );
};

// Upload Progress Component
export const UploadProgressDisplay = ({ progress, uploading }) => {
  if (!uploading) return null;
  
  return (
    <div className="mt-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Upload Progress</h3>
      <div className="space-y-3">
        {Object.entries(progress).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span>{formatDocName(key)}</span>
              <span>{Math.round(value)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to format document names
const formatDocName = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};