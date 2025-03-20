def add_comas_to_file():
    with open('images_data_with_commas.py', 'w+') as file_to_write:
        with open('images_data.py', encoding='utf-8') as f:
            for row in f:
                if '"' in row:
                    row = row.replace('\n', '') + ',\n'
                file_to_write.write(row)

from data import *
from images_data_with_commas import *
import json

all_titles = s | s2 | s3
all_ingredients = i1 | i2 | i3
all_pictures = im1 | im2| im3
output_json = {}
for i in range(len(all_titles.values())):
    output_json[i] = {
        "title": all_titles[i],
        "ingredients": list(map(lambda x: x.strip(), all_ingredients[i].split(','))),
        "picture": all_pictures[i],
    }
with open('data.json', 'w+', encoding='utf-8') as f:
    json.dump(output_json, f, indent=4, ensure_ascii=False)
