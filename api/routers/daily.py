from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.db import get_db

import api.schemas.daily as schemas_daily
import api.schemas.auth as schemas_auth
import api.cruds.auth as cruds_auth
import api.cruds.daily as cruds_daily


router = APIRouter()


@router.get("/dailies", response_model=List[schemas_daily.Daily])
async def get_dailies(
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # [バックエンド] メモ一覧表示のAPI
    return await cruds_daily.get_dailies_list_by_user(current_user, db)


@router.get("/dailies/{daily_id}", response_model=schemas_daily.Daily)
async def get_daily_detail(
    daily_id: int,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # [バックエンド] メモ詳細表示のAPI
    return await cruds_daily.get_daily_by_daily_id(daily_id, current_user, db)


@router.post("/dailies/create", response_model=schemas_daily.Daily)
async def create_daily(
    daily_data: schemas_daily.Daily,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user),
    db: AsyncSession = Depends(get_db)

):
    # [バックエンド] メモの新規作成機能
    return await cruds_daily.create_daily(daily_data, current_user, db)


@router.delete("/dailies/{daily_id}/delete", response_model=int)
async def delete_daily(
    daily_id: int,
    current_user: schemas_auth.User = Depends(cruds_auth.get_current_user),
    db: AsyncSession = Depends(get_db)

):
    # [バックエンド] メモの削除
    daily = await cruds_daily.get_daily_by_daily_id(daily_id, current_user, db)
    result = await cruds_daily.delete_daily_by_daily_id(daily, current_user, db)
    return result
