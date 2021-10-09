from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from api.db import get_db


import api.schemas.word as schemas_word
import api.schemas.auth as schemas_auth
import api.cruds.auth as cruds_auth
import api.cruds.word as cruds_word


router = APIRouter()


@router.get("/words", response_model=Any)
async def get_words(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # [バックエンド] 単語一覧表示のAPI
    return await cruds_word.get_words_list_by_user(current_user, db)
    # return List[schemas_word.Word]


@router.get("/words/{word_id}", response_model=List[schemas_word.Word])
def get_word_detail(
    word_id: int,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] 単語詳細表示のAPI
    # １,画像をapiを使って取得する
    # ２，取得した画像を返す処理
    return schemas_word.Word


@router.post("/words/create", response_model=schemas_word.Word)
async def create_word(
    word_data: schemas_word.Word,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # [バックエンド] 単語の新規作成機能
    return await cruds_word.create_word(word_data, current_user, db)


@router.get("/words/{word_id}/delete", response_model=schemas_word.Word)
def delete_word(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] 単語の削除

    return schemas_word.Word
