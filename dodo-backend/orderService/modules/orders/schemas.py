from pydantic import BaseModel


class Pizza(BaseModel):
    title: str
    cost: int
    picture: str
    pizzaDough: str
    pizzaSize: int
    weight: int

class UserOrder(BaseModel):
    pizzas: list[Pizza]
