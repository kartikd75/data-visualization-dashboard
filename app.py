from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['dashboard_db']
collection = db['data']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    data = list(collection.find({}, {'_id': 0}))
    return jsonify(data)

@app.route('/api/data/filter')
def get_filtered_data():
    filters = {}
    if request.args.get('end_year'):
        filters['end_year'] = int(request.args.get('end_year'))
    if request.args.get('start_year'):
        filters['start_year'] = int(request.args.get('start_year'))
    if request.args.get('country'):
        filters['country'] = request.args.get('country')
    if request.args.get('region'):
        filters['region'] = request.args.get('region')
    if request.args.get('topic'):
        filters['topic'] = request.args.get('topic')
    if request.args.get('sector'):
        filters['sector'] = request.args.get('sector')
    if request.args.get('pestle'):
        filters['pestle'] = request.args.get('pestle')
    if request.args.get('source'):
        filters['source'] = request.args.get('source')
    if request.args.get('city'):
        filters['city'] = request.args.get('city')
    
    data = list(collection.find(filters, {'_id': 0}))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)