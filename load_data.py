import json
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dashboard_db']
collection = db['data']

# Load JSON data with UTF-8 encoding
with open('jsondata.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Insert data into MongoDB
if isinstance(data, list):  # Check if JSON data is a list
    collection.insert_many(data)
else:
    collection.insert_one(data)

print("Data loaded successfully!")