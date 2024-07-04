from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

restaurants = [
    {"id": 1, "name": "Restaurant 1", "description": "Delicious food", "location": "Location 1", "image": "https://b.zmtcdn.com/data/collections/c67357df1d79854b624355b0272c5f28_1674826727.jpg"},
    {"id": 2, "name": "Restaurant 2", "description": "Amazing cuisine", "location": "Location 2", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX85iLXo8rl0uEBmZszlacP0bzRpkjkVLQoA&usqp=CAU"}
]

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    return jsonify(restaurants)

@app.route('/restaurants', methods=['POST'])
def add_restaurant():
    new_restaurant = request.json
    new_restaurant["id"] = len(restaurants) + 1
    restaurants.append(new_restaurant)
    return jsonify(new_restaurant), 201

@app.route('/restaurants/<int:id>', methods=['PUT'])
def update_restaurant(id):
    restaurant = next((r for r in restaurants if r["id"] == id), None)
    if restaurant:
        restaurant.update(request.json)
        return jsonify(restaurant)
    return jsonify({"error": "Restaurant not found"}), 404

@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    global restaurants
    restaurants = [r for r in restaurants if r["id"] != id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
