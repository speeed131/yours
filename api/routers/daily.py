from typing import Any, List
from fastapi import APIRouter, Depends

import api.schemas.daily as schemas
import api.schemas.auth as schemas_auth
import api.cruds.auth as cruds_auth


router = APIRouter()


@router.get("/dailies", response_model=List[schemas.Daily])
def get_dailies(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] メモ一覧表示のAPI
    return List[schemas.Daily]


@router.get("/dailies/{daily_id}", response_model=List[schemas.Daily])
def get_daily_detail(
    daily_id: int,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] メモ詳細表示のAPI
    # １,画像をapiを使って取得する
    # ２，取得した画像を返す処理
    return schemas.Daily


@router.get("/dailies/create", response_model=schemas.Daily)
def create_daily(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] メモの新規作成機能

    return schemas.Daily


@router.get("/dailies/{daily_id}/delete", response_model=schemas.Daily)
def delete_daily(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user)
):
    # [バックエンド] メモの削除

    return schemas.Daily
