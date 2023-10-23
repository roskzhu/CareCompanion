from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/receive_transcript', methods=['POST'])
def receive_transcript():
    transcript = request.json['transcript']
    print(f"Transcript received: {transcript}")  # You can handle the transcript here as per your requirements
    return 'Transcript received successfully', 200

if __name__ == '__main__':
    app.run(debug=True)