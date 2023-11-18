# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import os
# import cohere
# import conversant

# # COHERE_API_KEY = os.environ.get('APIKEY')
# cohere_client = cohere.Client("YOUR_COHERE_ API_KEY")

# app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# CORS(app)  # This will enable CORS for all routes
# co = cohere.Client(COHERE_API_KEY)

# @app.route('/receive_transcript', methods=['POST','GET'])
# def receive_transcript():
#     if (request.method == 'POST'):
#         transcript = request.json['transcript']
#         print(f"Transcript received: {transcript}")  # You can handle the transcript here as per your requirements
#         return 'Transcript received successfully', 200

# if __name__ == '__main__':
#     app.run(debug=True)