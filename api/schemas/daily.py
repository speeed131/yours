from typing import Optional
from datetime import datetime


from fastapi import FastAPI
from pydantic import BaseModel, Field


class Daily(BaseModel):
    id: int
    user_id: int = Field(example=1)
    title: str = Field(example="１日のメモ")
    meaning_japanese: str = Field(example="遊ぶは英語でなんというのか")
    meaning_english: str = Field(example="play")
    is_open: bool = Field(example=False)
    opened_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
