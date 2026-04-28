# AI Mock Interview Platform

AI-powered mock interview platform that helps users practice interviews with dynamic role-based questions, receive instant AI feedback, and track interview history.

## Live Features

- Dynamic AI-generated interview questions based on selected role
- Supports multiple job roles:
  - Python Developer
  - Frontend Developer
  - Data Analyst
  - HR Interview
  - Java Developer
  - Software Engineer
- 5-question interview flow
- Back button to review and edit previous answers
- AI-generated final evaluation report
- Score, feedback, and improvement suggestions
- Interview history tracking
- Delete previous interview records
- Premium responsive UI
- Role-based mock interview experience

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI Integration
- Groq API

### Database
- SQLite

---

## Folder Structure

```bash
ai-mock-interview/
│── src/app/
│   ├── page.tsx
│   ├── select-role/page.tsx
│   ├── interview/page.tsx
│   ├── dashboard/page.tsx
│   └── history/page.tsx
│
│── backend/
│   ├── main.py
│   ├── database.py
│   └── interviews.db
```

---

## How to Run Project

## Frontend

```bash
npm install
npm run dev
```

Runs on:

```bash
http://localhost:3000
```

---

## Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Runs on:

```bash
http://127.0.0.1:8000
```

---

## Environment Variables

Create `.env` inside backend folder:

```env
GROQ_API_KEY=your_api_key_here
```

---

## Screenshots

Add screenshots here after deployment:

- Homepage
- Select Role Page
- Interview Page
- Dashboard Report
- History Page

---

## Future Improvements

- User authentication
- PDF report export
- Voice interview mode
- Webcam interview simulation
- Leaderboard
- Resume-based interview questions
- Multi-language support

---

## Why This Project

This project simulates a real AI interview preparation platform where users can practice role-based interviews, improve communication skills, and receive instant feedback.

---

## Author

Vinay Pandey

GitHub: https://github.com/VinayPandey185  
LinkedIn: https://www.linkedin.com/in/vinay-pandey-855579134/

```