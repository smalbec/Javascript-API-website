import json
import random
import urllib.request


def get_review_data(url):
    with urllib.request.urlopen(url) as json_url:
        list = json.loads(json_url.read().decode())  # Make the url readable in a list
        value_array = []  # the new array that is gonna contain the values
        array = []  # array that is gonna contain the array with values
        for i in list:  # go trough the array
            if 'product' in i.keys() and 'manufacturer' in i.keys() and 'rating' in i.keys():
                product = i['product']
                manufacturer = i['manufacturer']
                rating = i['rating']
                value_array.extend([product, manufacturer, float(rating)])  # push all values into an array
                array.append(value_array)  # push that array into the retun array
            value_array = []
        random_review = random.choice(array)
        return_array = json.dumps(random_review)  # make it into a json string
    return return_array


