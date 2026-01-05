  <source src="./demo.mp4" type="video/mp4">
  Your browser does not support the video tag.</video>

# Demo Video
# Visa Evaluator Tool

A full-stack application that evaluates visa eligibility for multiple countries using AI.It allows users to upload documents, analyzes them against specific visa requirements, and provides a score with actionable feedback.

## Limitations in hosted live demo

- The live demo will not send emails because of security restrictions on the email service.
- The live demo has limited access to the Google Gemini API, which after the reaching the limits may result in failed evaluations.
- The live demo is slow due to free tier hosting limitations.

## 🚀 Features

- **Multi-Country Support**: Supports Visa types for US, Ireland, Poland, France, Netherlands, and Germany.
- **AI-Powered Evaluation**: Uses Google Gemini AI to analyze profile strength and document completeness.
- **File Uploads**: Handles multiple document uploads (Resume, Passport, Contracts, etc.).
- **Scoring System**: Generates a 0-100 approval probability score.
- **Resilient Storage**: Saves data to MongoDB with a local JSON fallback if the database is offline.
- **Email Notifications**: Sends evaluation results via email (Nodemailer).

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with local JSON file fallback)
- **AI**: Google Generative AI (Gemini Flash 2.5)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (optional, system falls back to local storage if not available)
- Google Cloud API Key (for Gemini)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rahulparihar-30/visa-evaluator.git
cd visa-evaluator
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

**Environment Configuration:**
Create a \`.env\` file in the \`backend\` folder based on \`.env.example\`:

```env
PORT=4000
MONGO_URL=mongodb://localhost:27017/visa_records
G_API_KEY=your_google_api_key_here
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password
```

_(Note: `EMAIL` and `EMAIL_PASS` are used for sending results via Gmail. You'll need an App Password if using 2FA)._

**Start the Server:**

```bash
npm start
# OR for development
npm run dev
```

The backend runs on http://localhost:4000.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd ../frontend
npm install
```

**Environment Configuration:**
Create a \`.env\` file in the \`frontend\` folder based on \`.env.example\`:

```env
VITE_BACKEND_API=http://localhost:4000
```

**Start the Application:**

```bash
npm run dev
```

The frontend typically runs on http://localhost:5173.

## 📂 Project Structure

```bash
visa-evaluator/
├── backend/
│   ├── DB/                 # Local JSON storage (auto-created)
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # AI & Email logic
│   │   ├── utils/          # Storage helpers
│   │   └── app.js          # Entry point
│   ├── .env.example        # Backend env template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # EvaluationForm, Result
│   │   ├── services/       # API integration
│   │   └── App.jsx
│   ├── .env.example        # Frontend env template
│   └── package.json
│
└── readme.md
```

## ⚡ Usage

1.  Open the web app.
2.  Fill in your details (Name, Email).
3.  Select a **Country** and **Visa Type**.
4.  Upload the required documents shown.
5.  Click **Submit**.
6.  View your **Evaluation Score** and **Summary**.
