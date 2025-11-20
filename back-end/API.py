from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    set_access_cookies, jwt_required, get_jwt_identity, unset_access_cookies
)
import json
import os
from dotenv import load_dotenv
import uuid



#===== FUNCTINS ======

# db section ======

# path of the db (json)
DB_PATH = "db/data.json"

#create the db
def create_db_json() -> None: 
    """create the db (json)"""
    if not os.path.exists(DB_PATH):
        with open(DB_PATH, "w") as f:
            json.dump([], f, indent=4)

    with open(DB_PATH, "r") as f:
        data = f.read()
        if not data:
            with open(DB_PATH, "w") as f:
                json.dump([], f, indent=4)

#get data from db
def get_data_db() -> list: 
    """get data from the db (json) and return it as list"""
    create_db_json()
    with open(DB_PATH, "r") as f:
       data = json.load(f)
    return data

#add data to db
def add_data_db(data: dict) -> None: 
    """add data to the db (json)"""
    
    create_db_json()

    new_data = get_data_db()
    new_data.append(data)
    with open(DB_PATH, "w") as f:
        json.dump(new_data, f, indent=4)

# env section ======

#create env
def create_env_file() -> None:
    """make sure there is env file and it is not empty
    and cteate the secret key"""
    ENV_PATH = ".env"


    def create_secret_key():
        s_key = str(uuid.uuid4())
        return s_key


    if not os.path.exists(ENV_PATH):
        with open(ENV_PATH, "w") as f:
            secret_key = create_secret_key()
            f.write(f'SECRET_KEY="{secret_key}"\n \
            WP_SECRET_PASSWORD="put ur wp secret password"')

    
    with open(ENV_PATH, "r") as f:
        data = f.read()
        print(data)
        if not data:
            with open(ENV_PATH, "w") as f:
                secret_key = create_secret_key()
                f.write(f'SECRET_KEY="{secret_key}"\n \
                WP_SECRET_PASSWORD="put ur wp secret password"')


#load secret key
def load_secret_key() -> str:
    """return the secret key as str"""
    create_env_file()
    load_dotenv()
    secret_key = os.getenv("SECRET_KEY")
    return secret_key




#===== FLASK =====

app = Flask(__name__)

# configurations
app.config["JWT_SECRET_KEY"] = load_secret_key()
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_SECURE"] = "True"


CORS(app, supports_credentials=True)
jwt = JWTManager(app)


#==== ROUTES =====

@app.post("/login")
def login():
    """login, need username and password so it will be post method"""
    # {"un": "ali", "pw": "123..."}
    user_data = request.get_json()

    username = user_data.get("username")
    password = user_data.get("password")


    db_users = get_data_db()
 
    for users in db_users:
        
        if username.strip() == users["username"] and password.strip() == users["password"]:
    
            access_token = create_access_token(identity=str(users["id"]))
            res = jsonify({"msg": "log in successful"})
            set_access_cookies(res, access_token)
            return res
        
    return jsonify({"msg": "username or password is wrong"})            


@app.get("/logout")
@jwt_required()
def logout():
    """logout, need nothing so it will be get method"""
    res = jsonify({"msg": "logput successful"})
    unset_access_cookies(res)
    return res



@app.post("/signup")
def sign_up():
    """signup, need username email and password so it will be post method"""
    #{"un": "abc", "email": "abc@gmail.com", "pw": "123"}
    user_data = request.get_json()

    username = user_data.get("username")
    email = user_data.get("email")
    password = user_data.get("password")


    users_db = get_data_db()
    new_id = 1
    if users_db:
        new_id = users_db[-1]["id"] + 1
    

    for user in users_db:
        if username == user["username"] or email == user["email"]:
            return jsonify({"msg": "user exist"})
    

    new_data = {
        "id": new_id,
        "username": username,
        "email": email,
        "password": password,
        "post": [
            {
            "post_id": 1,
            "post_title": "this is post 1"
            }
        ]
    }
    add_data_db(new_data)
    return jsonify({"msg": "add user successfuly"})


@app.get("/get_data")
@jwt_required()
def get_data():
    """get data, need nothing so it will be get method"""
    id = get_jwt_identity()

    db_users = get_data_db()
    for user in db_users:
        if int(id) == user["id"]:
            return jsonify({"name": user["username"],"post": user["post"]})
        
    return jsonify({"msg": "no data found"})


@app.post("/add_data")
@jwt_required()
def add_data():
    """add data, need the data u want to add so it will be post method"""
    pass

if __name__ == "__main__":
    app.run(debug=True)
