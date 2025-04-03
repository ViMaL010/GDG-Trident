# 🎓 Student Crowdfunding & Scholarship Platform

Empowering students with financial support through AI-driven crowdfunding and scholarship matching while ensuring a seamless donor experience.

![Platform Banner](./images/platform-banner.png)

## 📌 Table of Contents
- [🚀 Features Overview](#-features-overview)
- [👨‍🎓 Student Workflow](#-student-workflow)
- [💰 Donor Workflow](#-donor-workflow)
- [🔒 Security & Compliance](#-security--compliance)
- [🏗️ Technical Architecture](#-technical-architecture)
- [📊 Screenshots](#-screenshots)
- [🌍 Future Evolution](#-future-evolution)
- [📂 Installation & Setup](#-installation--setup)
- [👥 Team Members](#-team-members)
- [🔗 Useful Links](#-useful-links)
- [📜 License](#-license)

## 🚀 Features Overview

An AI-powered platform connecting students with financial resources through crowdfunding campaigns and personalized scholarship matching.

## 👨‍🎓 Student Workflow

### A. Registration & Profile Creation
- **Authentication Options**: Google, GitHub, Email/Password, DigiLocker (for Indian students)
- **Profile Verification**:
  - AI-powered document authentication via Google Vision OCR
  - Institutional database cross-referencing
- **Skill Profile Development**:
  - Auto-import from GitHub, LeetCode, and academic records
  - AI-generated skill scoring for scholarship recommendations

### B. Crowdfunding Campaign Creation
- **Campaign Wizard**: Easily set goals, upload documents, and create campaign narratives
- **Optimization Tools**:
  - Razorpay-generated QR codes & virtual accounts for fundraising
  - Social media sharing tools & an analytics dashboard

### C. Scholarship Application
- **Types of Scholarships**: Merit-based, Skill-based, Need-based
- **Automated Submission & Verification**:
  - AI-driven document review & skill assessment
  - Personalized scholarship recommendations & tracking

### D. Fund Reception
- **Verification Checkpoint**: Multi-layer fraud detection & compliance checks
- **Fund Disbursement**: Secure transfer with real-time notifications and tax documentation

## 💰 Donor Workflow

### A. Registration & Profile Setup
- **Donor Types**: Individual, Corporate, CSR Contributors
- **Customization**: Preferences for impact areas, funding settings, and notifications

### B. Donation Process
- **Campaign Discovery**: AI-powered recommendations and advanced filtering
- **Payment Methods**: UPI, Cards, Net Banking (via Razorpay)
- **Transaction Features**: Secure payments, digital receipts, and tax automation

### C. Corporate Scholarship Sponsorship
- **Custom Scholarship Framework**: Design scholarship criteria and budget allocation
- **Candidate Matching**: AI-driven shortlisting & evaluation
- **Scholarship Management**: Track fund usage and monitor recipient performance

### D. Impact Tracking & Engagement
- **Donor Dashboard**: Visual insights on donation impact and student success
- **Engagement Tools**: Mentorship opportunities, communication channels, and periodic impact reports

## 🔒 Security & Compliance

- **Encryption & Access Control**: End-to-end encryption with role-based access control
- **Secure API Architecture**: API rate limiting and protection against abuse
- **Regular Audits**: Security audits and penetration testing to ensure data integrity
- **Regulatory Compliance**: Adherence to financial regulations and data protection laws

## 🏗️ Technical Architecture

### Infrastructure Components
- **Frontend**: React with Vite for optimized performance
- **Backend**: Node.js with Express.js RESTful API
- **Database**: Firebase Firestore for scalable document storage, complemented by MongoDB
- **Authentication**: Multi-provider authentication using Firebase Auth & JWT
- **File Storage**: Firebase Storage for document and media uploads
- **AI Processing**: Google Cloud AI for skill assessments and fraud detection
- **Payments**: Razorpay API for secure and efficient transactions

![Technical Architecture Diagram](./images/technical-architecture.png)

### Security Implementation
- **Data Protection**: End-to-end encryption for sensitive data
- **Access Control**: Role-based access throughout the application
- **Threat Mitigation**: API rate limiting and fraud detection mechanisms
- **Compliance Standards**: Adheres to financial and data protection laws

## 📊 Screenshots

### Student Dashboard
![Student Dashboard](./images/student-dashboard.png)

### Campaign Creation Form
![Campaign Form](./images/campaign-form.png)

### Donor Interface
![Donor Interface](./images/donor-interface.png)

### Scholarship Matching
![Scholarship Matching](./images/scholarship-matching.png)

## 🌍 Future Evolution

- **Global Expansion**: Scaling the platform for international students
- **Blockchain Integration**: Transparency in fund disbursement and verification
- **Comprehensive Education Ecosystem**: Integration with mentorship and job placement services

## 📂 Installation & Setup

### 🔧 Prerequisites
- Node.js & npm installed
- Firebase & Razorpay account setup
- MongoDB database running (if used alongside Firestore)

### 🚀 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-repo.git
cd your-repo

# Backend Setup
cd backend
npm install
npm start  # or: node server.js

# Frontend Setup
cd ../frontend
npm install
npm run dev
```

### 🔄 Environment Variables
Create a `.env` file in the root directory and configure it as follows:

```
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Database Configuration
MONGODB_URI=your_mongodb_uri

# Authentication
JWT_SECRET=your_jwt_secret
```

## 👥 Team Members

| Name | Role | Contribution |
|------|------|-------------|
| Your Name | Backend Developer | Implemented AI-driven fraud detection |
| Team Member 2 | Frontend Developer | Designed the user interface |
| Team Member 3 | AI Engineer | Built predictive scholarship matching model |

## 🔗 Useful Links

- 📂 [GitHub Repository](https://github.com/your-repo)
- 🎥 [Demo Video](https://youtube.com/your-demo)
- 📝 [Project Documentation](https://your-docs-link.com)
- 💻 [Live Demo](https://your-live-demo.com)

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
