from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.auth as schemas_auth
import api.schemas.word as schemas_word
import api.models.model as model

from sqlalchemy import select
from sqlalchemy.engine import Result
from api.db import get_db

from typing import Optional, Any, List


async def get_words_list_by_user(
    current_user: schemas_auth.User,
    db: AsyncSession
) -> List[schemas_word.Word]:
    result: Result = await db.execute(
        select(model.Word).filter(model.Word.user_id == current_user.id)
    )
    words = result.all()
    #@TODO: ここの型変換なしで値を返すようにする。
    return make_response_data_to_list(words, "Word")


async def create_word(
    word_data: schemas_word.Word,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> Any:
    converted_word_data = model.Word(**word_data.dict())
    db.add(converted_word_data)
    await db.commit()
    await db.refresh(converted_word_data)
    return converted_word_data


async def get_word_by_word_id(
    word_id: int,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> schemas_word.Word:
    result: Result = await db.execute(
        select(model.Word).filter(model.Word.id == word_id)
    )
    word = result.all()
    return make_response_data_to_one_dict(word, "Word")

async def delete_word_by_word_id(
    word: schemas_word.Word,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> int:
    await db.delete(word)
    await db.commit()
    return word.id

def make_response_data_to_list(data: List, model_name: str) -> List:
    response_data = []
    for i in data:
        response_data.append(i[model_name])

    return response_data

def make_response_data_to_one_dict(data: List, model_name: str) -> dict:
    # print(data[0][model_name])
    response_data = data[0][model_name]

    return response_data