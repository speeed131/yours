from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.auth as schemas_auth
import api.schemas.daily as schemas_daily
import api.models.model as model
import api.utils.make_data as make_data

from sqlalchemy import select
from sqlalchemy.engine import Result

from typing import Optional, Any, List


async def get_dailies_list_by_user(
    current_user: schemas_auth.User,
    db: AsyncSession
) -> List[schemas_daily.Daily]:
    result: Result = await db.execute(
        select(model.Daily).filter(model.Daily.user_id == current_user.id)
    )
    dailies = result.all()
    return make_data.make_response_data_to_list(dailies, "Daily")


async def get_daily_by_daily_id(
    daily_id: int,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> schemas_daily.Daily:
    result: Result = await db.execute(
        select(model.Daily).filter(model.Daily.id == daily_id)
    )
    daily = result.all()
    return make_data.make_response_data_to_one_dict(daily, "Daily")


async def create_daily(
    daily_data: schemas_daily.Daily,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> schemas_daily.Daily:
    converted_daily_data = model.Daily(**daily_data.dict())
    db.add(converted_daily_data)
    await db.commit()
    await db.refresh(converted_daily_data)
    return converted_daily_data


async def delete_daily_by_daily_id(
    daily: schemas_daily.Daily,
    current_user: schemas_auth.User,
    db: AsyncSession
) -> int:
    await db.delete(daily)
    await db.commit()
    return daily.id
