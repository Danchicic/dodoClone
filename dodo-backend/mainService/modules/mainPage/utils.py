import json
import logging
import random
from typing import Iterator

from .schemas import Pizza

logger = logging.getLogger(__name__)


def get_data_from_json() -> Iterator[Pizza]:
    with open('../dodo_parser/data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    for pizza_info in data.values():
        yield Pizza(
            title=pizza_info["title"],
            ingredients=pizza_info["ingredients"],
            picture_server_path=pizza_info["picture"],
            weights=[random.randint(200, 350), random.randint(400, 600), random.randint(600, 1024)],
            costs=[random.randint(300, 500), random.randint(500, 700), random.randint(700, 1024)],
        )


REGIONS = [
    {
        "name": "Королев",
        "slug": "korolev"
    },
    {
        "name": "Мытищи",
        "slug": "mytishchi"
    },
    {
        "name": "Новосибирск",
        "slug": "novosibirsk"
    },
    {
        "name": "Люберцы",
        "slug": "lyubertsy"
    },
    {
        "name": "Домодедово",
        "slug": "domodedovo"
    },
    {
        "name": "Видное",
        "slug": "vidnoe"
    },
    {
        "name": "Нижний Новгород",
        "slug": "nizhnyi-novgorod"
    },
    {
        "name": "Нальчик",
        "slug": "nalchik"
    }
]
