import logging
from abc import ABC, abstractmethod
from sqlalchemy import select, update, delete, insert
from typing import Optional

from database import async_session_maker


class AbstractRepository(ABC):
    @abstractmethod
    async def get_one(self, id: int):
        raise NotImplementedError

    @abstractmethod
    async def add_one(self, data: dict):
        raise NotImplementedError

    # @abstractmethod
    # async def update_one(self, id: int, new_values: dict):
    #     raise NotImplementedError
    #
    # @abstractmethod
    # async def delete_one(self, id: int):
    #     raise NotImplementedError


class SQLAlchemyRepository(AbstractRepository):
    model = None
    logger = logging.getLogger(__name__)

    async def get_one(self, id: int) -> Optional[dict]:
        async with async_session_maker() as session:
            query = select(self.model).where(self.model.id == id)
            res = await session.execute(query)
            return res.mappings().one_or_none()

    async def add_one(self, data: dict):
        async with async_session_maker() as session:
            async with session.begin():
                query = insert(self.model).values(**data).returning(self.model.id)
                try:
                    new_item_id = await session.execute(query)
                    return new_item_id.scalar()
                except:
                    self.logger.exception('failed to insert item')
                    return None
