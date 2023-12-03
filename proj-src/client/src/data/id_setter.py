import json

file = "exercises.json"

with open(file, "r") as f:
    data = json.load(f)

for i in range(len(data)):
    data[i]["id"] = i
    data[i].__delitem__("_id")

with open(file, "w") as f:
    json.dump(data, f, indent=2)