from typing import Optional
from datetime import datetime


from fastapi import FastAPI
from pydantic import BaseModel, Field


class User(BaseModel):
    id: int
    username: str
    email: Optional[str]
    created_at: datetime
    updated_at: datetime


class UserInDB(User):
    hashed_password: str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str = Field(example="daiki")
    password: str = Field(example="hirose")


class UserResponse(BaseModel):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
