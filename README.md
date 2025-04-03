# 🎓 Student Crowdfunding & Scholarship Platform

![Platform Banner](./images/platform-banner.png)

## 📌 Table of Contents
- [📖 Introduction](#-introduction)
- [🚀 Features](#-features)
- [📊 Screenshots](#-screenshots)
- [📂 Installation & Setup](#-installation--setup)
- [👥 Contributors](#-contributors)
- [🏗️ Technical Architecture](#-technical-architecture)
- [🔒 Security & Compliance](#-security--compliance)
- [🌍 Future Evolution](#-future-evolution)
- [🔗 Useful Links](#-useful-links)
- [📜 License](#-license)

## 📖 Introduction

The Student Crowdfunding & Scholarship Platform is an AI-powered solution designed to bridge the financial gap for students pursuing education. Our platform empowers students to create personalized fundraising campaigns while connecting donors with impactful giving opportunities. The system leverages artificial intelligence to match students with appropriate scholarships and verify documents, ensuring a secure and efficient experience for all users.

## 🚀 Features

### For Students
- **Smart Profile Creation**: Create verified profiles with AI-powered document authentication
- **Personalized Campaigns**: Build customized crowdfunding campaigns with optimization tools
- **Scholarship Matching**: Get matched with relevant scholarships based on your skills and needs
- **Secure Fund Reception**: Receive funds through verified channels with transparent tracking

### For Donors
- **Targeted Impact**: Find and support campaigns aligned with your values and interests
- **Multiple Contribution Options**: Donate to individual students or sponsor scholarships
- **Secure Transactions**: Make payments through multiple secure channels via Razorpay
- **Impact Tracking**: Monitor how your contributions are making a difference

## 📊 Screenshots

### Student Dashboard
![Student Dashboard](./images/student-dashboard.png)

### Campaign Creation Form
![Campaign Form](./images/campaign-form.png)

### Donor Interface
![Donor Interface](./images/donor-interface.png)

### Scholarship Matching
![Scholarship Matching](./images/scholarship-matching.png)

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
npm start

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

## 👥 Contributors

| Name | Role | Contribution |
|------|------|-------------|
| Vimalesh D | Full Stack Developer |  Coded and integrated the entire project |
| Rakshith Rao SV | UI/UX Designer | Designed the user interface |
| Sheik Mohammed Ali M | Python Developer | Developed a profile analysis script and an AI-powered chatbot.|

## 🏗 Technical Architecture

### Infrastructure Components
- **Frontend**: React with Vite for optimized performance
- **Backend**: Node.js with Express.js RESTful API
- **Database**: Firebase Firestore for scalable document storage, complemented by MongoDB
- **Authentication**: Using JWT
- **File Storage**: Firebase Storage for document and media uploads
- **AI Processing**: Google Vision for OCR, Gemini Chatbot for interactions, and Google Cloud AI for skill assessments and fraud detection.
- **Payments**: Razorpay API for secure and efficient transactions

![Technical Architecture Diagram](./images/technical-architecture.png)

## 🔒 Security & Compliance

- **Encryption & Access Control**: End-to-end encryption with role-based access control
- **Secure API Architecture**: API rate limiting and protection against abuse
- **Regular Audits**: Security audits and penetration testing to ensure data integrity
- **Regulatory Compliance**: Adherence to financial regulations and data protection laws

## 🌍 Future Evolution

- **Global Expansion**: Scaling the platform for international students
- **Blockchain Integration**: Transparency in fund disbursement and verification
- **Comprehensive Education Ecosystem**: Integration with mentorship and job placement services

## 🔗 Useful Links

- 📂 [GitHub Repository](https://github.com/your-repo)
- 🎥 [Demo Video](https://youtube.com/your-demo)
- 📝 [Project Documentation](https://your-docs-link.com)
- 💻 [Live Demo](https://your-live-demo.com)

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
