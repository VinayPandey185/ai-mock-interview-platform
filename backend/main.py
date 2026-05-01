from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
from database import init_db, save_history, get_history
from database import init_db, save_history, get_history, delete_history
import os
import re

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

# Initialize SQLite DB
init_db()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Groq AI Backend Running"}


@app.get("/question")
def get_questions(role: str = "Software Engineer"):
    try:
        prompt = f"""
        Generate exactly 5 interview questions for {role} role.

        Rules:
        - Professional
        - Role specific
        - Numbered list only
        - No heading
        - No explanation

        Example:
        1. Question...
        2. Question...
        """

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        text = response.choices[0].message.content
        lines = text.split("\n")

        questions = []

        for line in lines:
            clean = line.strip()

            if not clean:
                continue

            if "here are" in clean.lower():
                continue

            if clean[0].isdigit():
                clean = clean.lstrip("1234567890.-) ")
                questions.append(clean)

        return {"questions": questions[:5]}

    except Exception:
        return {
            "questions": [
                "Tell me about yourself.",
                "Why should we hire you?",
                "What are your strengths?",
                "Where do you see yourself in 5 years?",
                "Why this role?"
            ]
        }


@app.post("/evaluate")
def evaluate(data: dict):
    try:
        answer = data.get("answer", "")
        role = data.get("role", "General")

        prompt = f"""
        Evaluate this full mock interview for {role} role.

        {answer}

        Give:
        Score out of 10 (STRICT format: X out of 10)
        Feedback
        Suggestions
        """

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        result = response.choices[0].message.content

        # ✅ Normalize score format
        match = re.search(r'(\d+)\s*/\s*10|(\d+)\s*out\s*of\s*10', result, re.IGNORECASE)

        if match:
            num = match.group(1) or match.group(2)
            score = f"{num} out of 10"
        else:
            score = "AI Rated"

        save_history(role, score, result)

        return {"result": result}

    except Exception as e:
        return {"result": f"Error: {str(e)}"}

@app.get("/history")
def history():
    rows = get_history()

    data = []

    for row in rows:
        data.append({
            "id": row[0],
            "role": row[1],
            "score": row[2],
            "report": row[3],
            "date": row[4]
        })

    return {"history": data}

@app.delete("/history/{item_id}")
def remove_history(item_id: int):
    delete_history(item_id)
    return {"message": "Deleted successfully"}