from data import *
import json
all_titles = s | s2 | s3
all_ingredients = i1 | i2 | i3

output_json = {}
for i in range(len(all_titles.values())):
    output_json[i] = {
    "title" : all_titles[i],
    "ingredients" : list(map(lambda x: x.strip(), all_ingredients[i].split(',')))
    }
with open('data.json', 'w+', encoding='utf-8') as f:
    json.dump(output_json, f, indent=4, ensure_ascii=False)
