import ast
import logging
from typing import Optional

from fastapi import APIRouter, status, HTTPException

from modules.mainPage import schemas
from redis_utils import get_redis
from .utils import REGIONS, get_data_from_json

logger = logging.getLogger(__file__)
router = APIRouter()


@router.get('/products/{region_slug}', response_model=Optional[list[schemas.Pizza]])
async def get_all_pizzas(
        region_slug: str
):
    redis_client = get_redis()
    region_pizzas = redis_client.lrange(region_slug, 0, -1)
    return [schemas.Pizza(**ast.literal_eval(el)) for el in region_pizzas]


@router.get("/regions")
async def get_regions() -> list[schemas.Region]:
    return [schemas.Region(id=i, name=el_dict['name'], slug=el_dict['slug']) for i, el_dict in enumerate(REGIONS, 1)]


@router.post("/products/{region_slug}")
async def add_pizza(
        region_slug: str,
        new_pizza: schemas.Pizza,
):
    redis_client = get_redis()
    redis_client.rpush(region_slug, str(new_pizza.model_dump()))
    raise HTTPException(status_code=status.HTTP_201_CREATED)


@router.post("/admin/52/load/{region}")
async def load_random_pizzas_from_json(
        region: str,
        secret_key: int
):
    if secret_key != 52:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    for pizza in get_data_from_json():
        redis_client = get_redis()
        redis_client.rpush(region, str(pizza.model_dump()))

    return HTTPException(status_code=status.HTTP_201_CREATED)
