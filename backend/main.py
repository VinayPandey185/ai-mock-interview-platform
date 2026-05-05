from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
from database import init_db, save_history, get_history, delete_history
import os
import re

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

init_db()

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
- Only questions (no headings like technical/behavioral)
- No explanation
- Each question on new line
- Number from 1 to 5

Example:
1. What is React?
2. Explain REST API
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}]
        )

        text = response.choices[0].message.content
        lines = text.split("\n")

        questions = []

        for line in lines:
            clean = line.strip()
            if not clean:
                continue

            if clean[0].isdigit():
                clean = clean.lstrip("1234567890.-) ")
                questions.append(clean)

        return {"questions": questions[:5]}

    except Exception:
        return {
            "questions": [
                "Tell me about yourself.",
                "Explain OOP concepts.",
                "What is REST API?",
                "What are your strengths?",
                "Why this role?"
            ]
        }

import re

def is_gibberish(text: str) -> bool:
    t = (text or "").strip()

    # too short
    if len(t) < 15:
        return True

    # low word count
    words = re.findall(r"[a-zA-Z]{3,}", t)
    if len(words) < 5:
        return True

    # lots of repeated chars (e.g., aaaa, dfdgdf)
    if re.search(r"(.)\1{3,}", t):
        return True

    # low alphabetic ratio (symbols/numbers heavy)
    letters = re.findall(r"[a-zA-Z]", t)
    if len(letters) / max(len(t), 1) < 0.4:
        return True

    return False


@app.post("/evaluate")
def evaluate(data: dict):
    try:
        answer = data.get("answer", "")
        role = data.get("role", "General")

        # ✅ VALIDATION FIRST (no AI call if bad)
        if is_gibberish(answer):
            result = """Score: 1.5 out of 10

Feedback:
- The answers appear to be incomplete, random, or not meaningful.
- No clear understanding of the questions is demonstrated.
- The responses lack structure and relevant content.

Suggestions:
- Provide clear and structured answers.
- Include examples, explanations, or reasoning.
- Avoid random or placeholder text.
"""

            save_history(role, "1.5 out of 10", result)
            return {"result": result}

        # ✅ ONLY CALL AI FOR VALID ANSWERS
        prompt = f"""
Evaluate this mock interview for {role} role.

Answers:
{answer}

STRICT EVALUATION RULES:

Score Guidelines:
- Nonsense → 0 to 3
- Weak → 3 to 5
- Average → 5 to 7
- Good → 7 to 9
- Excellent → 9+

IMPORTANT:
- Be strict and realistic
- Do not reward meaningless answers

OUTPUT FORMAT:

Score: X.X out of 10

Feedback:
- Point 1
- Point 2

Suggestions:
- Point 1
- Point 2
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}]
        )

        result = response.choices[0].message.content

        match = re.search(r'(\d+(?:\.\d+)?)\s*out\s*of\s*10', result, re.IGNORECASE)

        if match:
            score = f"{match.group(1)} out of 10"
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