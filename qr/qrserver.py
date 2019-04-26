from flask import Flask, request, Response, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
import time
import os
import json
import re
import qrcode

app = Flask(__name__, static_url_path='/static')
cors = CORS(app, support_credentials=True, resources={r"/api/*": {"origins": "*"}})

@app.route("/generate" , methods=['POST'])
@cross_origin()
def callGenerate():
    if not request.json:
        return "Not a JSON post!"
    data = request.json
    authToken = data['authToken']
    qrgenerate(data, authToken)
    # use twiilio to send sms here?
    return "QR Code successfully generated!"

@app.route("/remove" , methods=['POST'])
@cross_origin()
def removeQr():
    if not request.json:
        return "Not a JSON post!"
    data = request.json
    authToken = data['authToken']
    os.remove("static/"+ authToken +".jpg")
    return "Existing QR Code successfully removed from server!"

@app.route("/verify" , methods=['POST'])
@cross_origin()
def verifyAuthToken():
    if not request.json:
        return "Not a JSON post!"
    data = request.json
    authToken = data['authToken']
    # talk to mongodb to verify!
    return "Existing QR Code successfully removed from server!"

def qrgenerate(data, authToken):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image()
    img.save("static/"+ authToken +".jpg")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
