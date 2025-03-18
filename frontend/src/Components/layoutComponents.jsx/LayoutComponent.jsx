import React from 'react';
import { ApplicationFormComponent } from '../ApplicationComponent/ApplicationFormComponent';

const LayoutComponent = ({ apiEndpoint }) => {
  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-medium">Apply for Scholarship</h2>
        
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          {/* Search input - Responsive width */}
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-48 md:w-64 pl-10 pr-4 py-1.5 sm:py-2 border rounded-lg text-sm"
            />
            <div className="absolute left-3 top-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Notification button */}
          <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {/* Profile button */}
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-medium">P</span>
          </button>
        </div>
      </header>
      
      {/* Application Form */}
      <ApplicationFormComponent />
    </div>
  );
};

export default LayoutComponent;
