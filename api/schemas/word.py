from typing import Optional, DateTime

from fastapi import FastAPI
from pydantic import BaseModel, Field

class Word(BaseModel):
    id: int
    user_id: int
    name: str
    meaning_japanese: str
    meaning_english: str
    memo: str
    is_rememberd: bool
    rememberd_at: Optional[DateTime]
    created_at: DateTime
    updated_at: DateTime
