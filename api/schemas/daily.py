from typing import Optional
from datetime import datetime


from fastapi import FastAPI
from pydantic import BaseModel, Field


class Daily(BaseModel):
    id: int = Field(example=1)
    user_id: int = Field(example=1)
    title: str = Field(example="１日のメモ")
    meaning_japanese: str = Field(example="遊ぶは英語でなんというのか")
    meaning_english: str = Field(example="play")
    is_open: bool = Field(example=False)
    opened_at: Optional[str] = Field(example="20210908")
    created_at: datetime
    updated_at: datetime


# orm_modeをtrueにすることで、レスポンスが読み取れるようになっている？詳しくは以下を参照 https://fastapi.tiangolo.com/tutorial/sql-databases/?h=orm_mode#use-pydantics-orm_mode

    class Config:
        orm_mode = True


class DailyRequest(BaseModel):
    user_id: int = Field(example=1)
    title: str = Field(example="１日のメモ")
    meaning_japanese: Optional[str] = Field(example="遊ぶは英語でなんというのか")
    meaning_english: Optional[str] = Field(example="play")
    is_open: Optional[bool] = Field(example=False)
    opened_at: Optional[str] = Field(example="20210908")
    class Config:
        orm_mode = True


