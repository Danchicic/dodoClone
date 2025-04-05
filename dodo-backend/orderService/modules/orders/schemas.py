from pydantic import BaseModel


class PizzaShortInfo(BaseModel):
    title: str
    pizzaDough: str
    pizzaSize: int


class Pizza(PizzaShortInfo):
    cost: int
    picture: str
    weight: int


class UserOrder(BaseModel):
    pizzas: list[Pizza]


class UserOrderCreateSchema(BaseModel):
    pizzas: list[PizzaShortInfo]
    id: int
    username: str
    user_phone_number:str


class UpdatedStatus(BaseModel):
    new_status: str
