import { useNavigate } from "react-router-dom"

export const SuccessSubmission = () => {   

  const navigate = useNavigate();
    return <div>
            <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Scholarship applied Successfully</h1>
        
        <p className="text-gray-700 mb-8">
          Your application has been submitted. Track your status and updates in the Applied Scholarships section.
        </p>
        
        <button 
          className="bg-black text-white py-2 px-4 w-64 text-center"
          onClick={() => {
            navigate('/scholarships')
          }}
        >
         Apply scholarships
        </button>
      </div>
    </div>
    </div>
}