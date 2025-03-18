import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { LoginPage } from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import ScholarshipApplicationPage from "./Pages/ScholarshipApplicationPage";
import { SuccessSubmission } from "./Pages/SuccessSubmission";
import ScholarshipFinder from "./Pages/MatchedScholarship";
import TechInnovatorsScholarship from "./Pages/FullScholarship";
import { SignupPage } from "./Pages/SignupPage";
import AuthRoute from "./Auth/AuthRoute";
import CampaignStart from "./Pages/MyCampagin";
import MultiStepForm from "./Pages/FullDetail";
import FormReviewComponent from "./Components/ApplicationComponent/FormReviewComponent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/apply"
          element={
            <AuthRoute>
              <ScholarshipApplicationPage />
            </AuthRoute>
          }
        />
        <Route
          path="/submission"
          element={
            <AuthRoute>
              <SuccessSubmission />
            </AuthRoute>
          }
        />
        <Route
          path="/scholarships"
          element={
            <AuthRoute>
              <ScholarshipFinder />
            </AuthRoute>
          }
        />
        <Route
          path="/fullscholarship/:id"
          element={
            <AuthRoute>
              <TechInnovatorsScholarship />
            </AuthRoute>
          }
        />
        <Route
          path="/myCampaign"
          element={
            <AuthRoute>
              <CampaignStart />
            </AuthRoute>
          }
        />
        <Route
          path="/details"
          element={
            <AuthRoute>
              <MultiStepForm />
            </AuthRoute>
          }
        />
        <Route
          path="/review"
          element={
            <AuthRoute>
              <FormReviewComponent />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
