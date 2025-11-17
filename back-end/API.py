#======== IMPORTS ========
from flask import Flask, jsonify, request # for crate the api and get the requests from clint
import requests # to send a request to any path
from flask_cors import CORS # solve the CORS problem
import os # to git the pahts or the file paths
import json # to make the data into json format
from dotenv import load_dotenv # to load the tokens (secret passwords)


#======== VARs AND FUNCTIONS ========
# the path of the env file that will contain the tokens
PATH = "back-end/.env"

# read or write from/on the env file
def read_write_file(mode, message = None):
    if mode == "w" and message:
        with open(PATH, mode) as f:
            f.write(message)
            
    elif mode == "r":
        with open(PATH, mode) as f:
            data = f.read()
            return data

# make sure the env file exist and contain the tokens
def make_env_file():
    if not os.path.exists(PATH): # if the env file not exist make one
        read_write_file("w", 'WP_SECRET_PASSWORD="put ur wp secret password"\n' \
        'JWT_SECRET_PASSWORD="put ur secret jwt password"')
    elif os.path.exists(PATH): # if the env exist make sure there is data inside it
        data = read_write_file("r")
        if not data: # if there is no data write some data inside it
            read_write_file("w", 'WP_SECRET_PASSWORD="put ur wp secret password"\n' \
            'JWT_SECRET_PASSWORD="put ur secret jwt password"')
            
    # if every thing is ok then load the keys inside the env file
    load_dotenv()
    wp_password = os.getenv("WP_SECRET_PASSWORD")
    jwb_password = os.getenv("JWT_SECRET_PASSWORD")
    return wp_password, jwb_password


token = make_env_file()

wp_secret_password = token[0]
jwt_secret_password = token[1]




#======== ROUTES ========

data = {
    "name": "ali",
    "age": 20
}

app = Flask(__name__)


@app.route("/")
def  home():
    return data
    

if __name__ == "__main__":
    app.run(debug=True)

