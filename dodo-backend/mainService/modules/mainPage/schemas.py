from pydantic import BaseModel


class Region(BaseModel):
    id: int
    name: str
    slug:str


class Pizza(BaseModel):
    costs: list[int]
    picture_server_path: str
    title: str
    weight: int
    ingredients: list[str]
