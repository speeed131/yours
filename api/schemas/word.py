from typing import Optional
from datetime import datetime


from fastapi import FastAPI
from pydantic import BaseModel, Field


class Word(BaseModel):
    id: int = Field(example=1)
    user_id: int = Field(example=1)
    name: str = Field(example="遊ぶ")
    part_of_speech: str = Field(example="動詞")
    meaning_japanese: str = Field(example="遊ぶ")
    meaning_english: str = Field(example="play")
    memo: str = Field(example="外で遊ぶは play out")
    remember_rating: int = Field(example=5)
    is_remembered: bool = Field(example=False)
    remembered_at: Optional[str] = Field(example="20210908")
    created_at: datetime
    updated_at: datetime

# orm_modeをtrueにすることで、レスポンスが読み取れるようになっている？詳しくは以下を参照 https://fastapi.tiangolo.com/tutorial/sql-databases/?h=orm_mode#use-pydantics-orm_mode

    class Config:
        orm_mode = True


class WordRequest(BaseModel):
    user_id: int = Field(example=1)
    name: str = Field(example="遊ぶ")
    part_of_speech: Optional[str] = Field(example="動詞")
    meaning_japanese: Optional[str] = Field(example="遊ぶ")
    meaning_english: Optional[str] = Field(example="play")
    memo: Optional[str] = Field(example="外で遊ぶは play out")
    is_remembered: Optional[bool] = Field(example=False)
    remember_rating: Optional[int] = Field(example=5)
    remembered_at: Optional[str] = Field(example="20210908")    
    
    class Config:
        orm_mode = True
