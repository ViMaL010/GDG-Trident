import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    
    // Replace 'apiEndpoint' with your actual API endpoint
  };

  return (
    <div
      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
      onClick={handleClick}
      disabled={loading} // Disable button while API call is in progress
    >
      {loading ? 'Loading...' : 'My Campaign'}
    </div>
  );
};

export default MyComponent;