import requests
from flask import Flask, render_template, request, jsonify


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/search", methods=["GET"])
def search_character():
    char_name = request.args.get('q')
    if char_name:
        URL = f"https://api.jikan.moe/v4/characters?q={char_name}"
        response = requests.get(URL)
        if response.status_code == 200:
            data = response.json()
            return jsonify(data["data"])

if __name__ == "__main__":
    app.run(debug=True)

