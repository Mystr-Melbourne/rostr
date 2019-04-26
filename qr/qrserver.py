from flask import Flask, request, Response, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
import time
import os
import json
import re

app = Flask(__name__, static_url_path='/static')
cors = CORS(app, support_credentials=True, resources={r"/api/*": {"origins": "*"}})

@app.route("/generate" , methods=['POST'])
@cross_origin()
def generateQR():
    if not request.json:
        return "not a json post"
    data = request.json
    authToken = data['authToken']
    
    return "json post succeeded"
