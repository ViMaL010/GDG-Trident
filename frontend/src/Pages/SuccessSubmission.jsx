import { useNavigate } from "react-router-dom"
import { SideBarComponent } from "../Components/layoutComponents.jsx/SideBarComponent";

export const SuccessSubmission = () => {   

  const navigate = useNavigate();
    return <div className="flex">
      <SideBarComponent/>
            <div className="flex w-full items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your AI Score is: 87/100</h1>
        
        <p className="text-gray-700 mb-8">
          Your application has been submitted. Track your status and updates in the Applied Scholarships section.
        </p>
        
        <button 
          className="bg-black text-white py-2 px-4 w-64 text-center"
          onClick={() => {
            navigate('/scholarships')
          }}
        >
         Apply For Scholarships
        </button>
      </div>
    </div>
    </div>
}