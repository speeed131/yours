from typing import Any, List
from fastapi import APIRouter, Depends

import api.schemas.word as schemas_word
import api.schemas.auth as schemas_auth
import api.cruds.auth as cruds_auth


router = APIRouter()


@router.get("/words", response_model=List[schemas_word.Word])
def get_words(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] 単語一覧表示のAPI
    return List[schemas_word.Word]


@router.get("/words/{word_id}", response_model=List[schemas_word.Word])
def get_word_detail(
    word_id: int,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] 単語詳細表示のAPI
    # １,画像をapiを使って取得する
    # ２，取得した画像を返す処理
    return schemas_word.Word


@router.get("/words/create", response_model=schemas_word.Word)
def create_word(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] 単語の新規作成機能

    return schemas_word.Word


@router.get("/words/{word_id}/delete", response_model=schemas_word.Word)
def delete_word(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] 単語の削除

    return schemas_word.Word