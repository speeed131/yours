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
) -> Any:
    result: Result = await db.execute(
        select(model.Word).filter(model.Word.user_id == current_user.id)
    )
    words = result.all()
    #@TODO: ここの型変換なしで値を返すようにする。さらに、Anyの型をなくす。
    return make_response_data(words, "Word")


def make_response_data(data: List, model_name: str) -> List:
    response_data = []
    for i in data:
        response_data.append(i[model_name])

    return response_data

async def create_word(
    word_data: schemas_word.Word,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> Any:
    print(word_data)
    converted_word_data = model.Word(**word_data.dict())
    print(converted_word_data)
    db.add(converted_word_data)
    await db.commit()
    await db.refresh(converted_word_data)
    return converted_word_data


