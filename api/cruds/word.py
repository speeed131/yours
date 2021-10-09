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
    db: AsyncSession = Depends(get_db)
) -> List[model.Word]:
    result: Result = await db.execute(
        select(model.Word).filter(model.Word.user_id == current_user.id)
    )
    return result.all()


