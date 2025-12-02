import requests
import json

class WP_REQUSET:
    def __init__(self, username, application_password):
        self.username = username
        self.application_password = application_password

    
    def add_post(self, title:str, content:str, img:str = None, status:str = "private") -> int:
        """Using this method will create posts by passing some values and it will return the id of the post
        you create"""
       
        # if there is img 
        if not img:
            url = "http://localhost/wordpress/wp-json/wp/v2/posts"
            data = {
                "title": title,
                "content": content,
                "status": status
            }
            res = requests.post(url, json=data, auth=(self.username, self.application_password))
            if res.status_code == 201:
                wp_res = res.json()
                post = {
                    "post_id": wp_res["id"],
                    "featured_media": "None",
                    "title": wp_res["title"].get("rendered"),
                    "content": wp_res["content"].get("rendered"),
                    "modified_gmt": wp_res.get("modified_gmt"),
                    "link": wp_res.get("link")
                }
                return post

            else:
                print("error", res.status_code, res.text)

        