import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApplicationFormComponent = () => {
    const [aiScore, setAiScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        category: 'Merit-Based',
        CGPA: '',
        tenthMarks: '',
        twelfthMarks: '',
        AIScore: '',
        requiredFunds: '',
        github_username: "",
        leetcode: "",
        repo1: "",
        repo2: "",
        annualIncome: ""
    });

    const fetchAiScore = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
        setAiScore(null);
    
        try {
          // First validate all fields
        //   const isValid = await validateAll();
          
        //   if (!isValid) {
        //     throw new Error('Please correct the validation errors before calculating the score');
        //   }
    
          // If validation passes, calculate score
          const response = await fetch('http://localhost:5000/api/Ai/calculate-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: formData.github_username,
              leetcode: formData.leetcode,
              repo1: formData.repo1,
              repo2: formData.repo2,
              income: formData.annualIncome
            })
          });
    
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || `Server error: ${response.status}`);
          }
    
          if (!data.success || typeof data.ai_score !== 'number' || isNaN(data.ai_score)) {
            throw new Error('Invalid AI score received from server');
          }
    
          setAiScore(data.ai_score.toFixed(2)); // Round to 2 decimal places
          setSuccessMessage('Score calculated successfully!')
          console.log(aiScore);
          console.log(successMessage)
        } catch (err) {
          setError(err.message || 'Network error, please try again');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const studentDetail = await fetch("http://localhost:5000/api/scholarships/studentDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : sessionStorage.getItem('token')
                },
                body: JSON.stringify(formData),
            });

            sessionStorage.setItem("email", formData.email);

            if (!studentDetail.ok) {
                throw new Error(`API responded with status: ${studentDetail.status}`);
            }

            fetchAiScore();

            const response = await fetch('http://localhost:5000/api/scholarships/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : sessionStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();
            setSubmitStatus({ success: true, message: 'Application submitted successfully!' });
            setLoading(true);
            setTimeout(() => {
                navigate('/submission');
            }, 1500);
        } catch (error) {
            setSubmitStatus({ success: false, message: `No eligible scholarships found` });
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderLoader = () => {
        if (!loading) return null;
        
        return (
            <div className="flex justify-center my-4">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 bg-white m-2 sm:m-6 rounded-lg shadow">
            <div className="text-center sm:text-left sm:ml-4 md:ml-8 lg:ml-16 mt-6 sm:mt-10">
                <h1 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Scholarship Application Form</h1>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Please fill in your details accurately to apply for the scholarship.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Illustration section */}
                    <div className="hidden md:flex items-center justify-center md:w-2/5 lg:w-1/2">
                        <img 
                            src="https://media.istockphoto.com/id/2027690301/vector/backend-development-coding-and-programming-it-specialist-sit-and-write-code-on-a-laptop-for.jpg?s=612x612&w=0&k=20&c=XFAq03A3tCnwvoKzT4mS3oBxlCiKJg1C5JaJVRmbH6I="
                            alt="Student applying for scholarship" 
                            className="rounded-lg object-cover max-w-full h-auto mr-10"
                        />
                    </div>
                    
                    {/* Form fields */}
                    <div className="space-y-4 sm:space-y-6 w-full md:w-3/5 lg:w-1/2">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:-mt-24">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                                <input 
                                    type="text" 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                        </div>
                        
                        {/* Contact and Funds */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                                <div className="flex items-center border rounded">
                                    <div className="pl-3 pr-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="sample@gmail.com" 
                                        required
                                        className="w-full p-2 focus:outline-none" 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Required Funds (₹) *</label>
                                <input 
                                    type="number" 
                                    name="requiredFunds"
                                    value={formData.requiredFunds}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    max="100000"
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                        </div>
                        
                        {/* Scholarship Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Category *</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="Merit-Based">Merit-Based</option>
                                <option value="Skill-Based">Skill-Based</option>
                            </select>
                        </div>
                        
                        {/* Academic Performance */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current CGPA *</label>
                                <input 
                                    type="number" 
                                    name="CGPA"
                                    value={formData.CGPA}
                                    onChange={handleInputChange}
                                    step="0.01" 
                                    min="0" 
                                    max="10"
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">10th Marks (%) *</label>
                                <input 
                                    type="number" 
                                    name="tenthMarks"
                                    value={formData.tenthMarks}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                        </div>
                        
                        {/* Additional Academic Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">12th Marks (%) *</label>
                                <input 
                                    type="number" 
                                    name="twelfthMarks"
                                    value={formData.twelfthMarks}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Annual family income *</label>
                                <input 
                                    type="number" 
                                    name="annualIncome"
                                    value={formData.annualIncome}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    max="500000"
                                    required
                                    className="w-full p-2 border rounded" 
                                />
                            </div>
                        </div>

                        {/* Skill-Based Fields (Conditionally Rendered) */}
                        {formData.category === 'Skill-Based' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Github Username *</label>
                                        <div className="flex items-center border rounded">
                                            <input 
                                                type="text" 
                                                name="github_username"
                                                value={formData.github_username}
                                                onChange={handleInputChange}
                                                placeholder="VimaL010" 
                                                required
                                                className="w-full p-2 focus:outline-none ml-1" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Leetcode Username *</label>
                                        <input 
                                            type="text" 
                                            name="leetcode"
                                            value={formData.leetcode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border rounded" 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Project 1 Link *</label>
                                        <div className="flex items-center border rounded">
                                            <input 
                                                type="text" 
                                                name="repo1"
                                                value={formData.repo1}
                                                onChange={handleInputChange}
                                                placeholder="https://github.com/ViMaL010/Medium.git" 
                                                required
                                                className="w-full p-2 focus:outline-none ml-1" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Project 2 Link *</label>
                                        <input 
                                            type="text" 
                                            name="repo2"
                                            value={formData.repo2}
                                            onChange={handleInputChange}
                                            placeholder="https://github.com/ViMaL010/Solutions.git"
                                            required
                                            className="w-full p-2 border rounded ml-1" 
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {/* Submission Status and Loader */}
                        {submitStatus && !submitStatus.success && (
                            <div className="bg-red-100 text-red-800 p-4 rounded text-sm">
                                {submitStatus.message}
                            </div>
                        )}
                        
                        {renderLoader()}
                        
                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                            <button 
                                type="button" 
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 border rounded hover:bg-gray-100 text-sm sm:text-base"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-black text-white rounded text-sm sm:text-base ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};