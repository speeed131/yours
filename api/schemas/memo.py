from typing import Optional, DateTime

from fastapi import FastAPI
from pydantic import BaseModel, Field

class Memo(BaseModel):
    id: int 
    user_id: int = Field(example="1")
    meaning_japanese: str = Field(example="遊ぶ")
    meaning_english: str  = Field(example="play")
    is_open: bool = Field(example=False)
    opened_at: Optional[DateTime]
    created_at: DateTime
    updated_at: DateTime

