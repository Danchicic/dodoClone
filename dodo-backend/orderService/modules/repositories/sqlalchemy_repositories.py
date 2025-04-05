from database.models.order import Order
from . import SQLAlchemyRepository


class OrderRepository(SQLAlchemyRepository):
    model = Order