from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.auth as schemas_auth
import api.schemas.word as schemas_word
import api.models.model as model
import api.utils.make_data as make_data

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
    # @TODO: ここの型変換なしで値を返すようにする。
    return make_data.make_response_data_to_list(words, "Word")


async def get_word_by_word_id(
    word_id: int,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> schemas_word.Word:
    result: Result = await db.execute(
        select(model.Word).filter(model.Word.id == word_id)
    )
    word = result.all()
    return make_data.make_response_data_to_one_dict(word, "Word")


async def create_word(
    word_data: schemas_word.WordRequest,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> Any:
    converted_word_data = model.Word(**word_data.dict())
    db.add(converted_word_data)
    await db.commit()
    await db.refresh(converted_word_data)
    return converted_word_data


async def delete_word_by_word_id(
    word: schemas_word.Word,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> int:
    await db.delete(word)
    await db.commit()
    return word.id

async def update_word_by_word_id(
    update_word: model.Word,
    update_word_data: schemas_word.WordRequest,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> model.Word:
    update_word.name = update_word_data.name
    update_word.part_of_speech = update_word_data.part_of_speech
    update_word.meaning_japanese = update_word_data.meaning_japanese
    update_word.meaning_english = update_word_data.meaning_english
    update_word.is_remembered = update_word_data.is_remembered
    update_word.remember_rating = update_word_data.remember_rating
    update_word.remembered_at = update_word_data.remembered_at
    db.add(update_word)
    await db.commit()
    await db.refresh(update_word)
    return update_word