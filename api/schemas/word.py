from typing import Optional
from datetime import datetime


from fastapi import FastAPI
from pydantic import BaseModel, Field


class Word(BaseModel):
    id: int
    user_id: int = Field(example=1)
    name: str = Field(example="遊ぶ")
    meaning_japanese: str = Field(example="遊ぶ")
    meaning_english: str = Field(example="play")
    memo: str = Field(example="外で遊ぶは play out")
    is_rememberd: bool
    rememberd_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
