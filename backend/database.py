import sqlite3
from datetime import datetime
from zoneinfo import ZoneInfo


def init_db():
    conn = sqlite3.connect("interviews.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT,
            score TEXT,
            report TEXT,
            created_at TEXT
        )
    """)

    conn.commit()
    conn.close()


def save_history(role, score, report):
    conn = sqlite3.connect("interviews.db")
    cursor = conn.cursor()

    india_time = datetime.now(
        ZoneInfo("Asia/Kolkata")
    ).strftime("%Y-%m-%d %I:%M %p")

    cursor.execute("""
        INSERT INTO history (role, score, report, created_at)
        VALUES (?, ?, ?, ?)
    """, (role, score, report, india_time))

    conn.commit()
    conn.close()


def get_history():
    conn = sqlite3.connect("interviews.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, role, score, report, created_at
        FROM history
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return rows

def delete_history(item_id):
    conn = sqlite3.connect("interviews.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM history WHERE id = ?",
        (item_id,)
    )

    conn.commit()
    conn.close()