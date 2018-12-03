from flask import Flask
from reviews import *

app = Flask(__name__)


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/style.css')
def server_static_style():
    return app.send_static_file('style.css')


@app.route('/reviews')
def get_tickets():
    return get_review_data("https://thereportoftheweek-api.herokuapp.com/reports")


app.run(host='localhost', port=8080, debug=True)
