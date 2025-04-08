from pydantic import BaseModel


class MyBaseModel(BaseModel):
    pass


class OrderUpdate(MyBaseModel):
    order_id: int = None
    status: str
    region:str


class OrderUpdateStatus(MyBaseModel):
    order_id: int
    status: str
