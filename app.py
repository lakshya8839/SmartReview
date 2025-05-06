import os
import random
import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load GitHub token from environment, or fallback (not recommended for production)
from dotenv import load_dotenv
load_dotenv()

github_token = os.getenv("GITHUB_TOKEN")


# Mock suggestions for demo
REVIEW_SUGGESTIONS = [
    "Consider adding more descriptive variable names",
    "Function could be broken down into smaller, more focused functions",
    "Missing error handling for edge cases",
    "Add comments to explain complex logic",
    "Variable is declared but never used",
    "Consider adding proper indentation for better readability",
    "This loop could be replaced with Array methods for better readability",
    "Add proper documentation for functions",
    "Follow consistent naming conventions",
    "Consider using constants for magic numbers",
    "Add input validation",
    "Consider adding unit tests",
    "Use more semantic HTML elements",
    "Add proper accessibility attributes",
    "Optimize CSS selectors"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/review', methods=['POST'])
def review_code():
    if not request.json or 'code' not in request.json:
        return jsonify({"error": "No code provided"}), 400

    code = request.json['code']
    code_length = len(code)
    suggestions = random.sample(REVIEW_SUGGESTIONS, random.randint(3, 5))

    if code_length < 100:
        suggestions.append("Code seems quite short, consider if all requirements are implemented")
    elif code_length > 1000:
        suggestions.append("Consider breaking down this file into smaller modules")

    return jsonify({
        "results": suggestions,
        "stats": {
            "length": code_length,
            "suggestions": len(suggestions)
        }
    })

@app.route('/api/github/<owner>/<repo>', methods=['GET'])
def fetch_github_code(owner, repo):
    if not GITHUB_TOKEN:
        return jsonify({"error": "GitHub token not configured"}), 500

    contents_url = f'https://api.github.com/repos/{owner}/{repo}/contents'
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json'
    }

    response = requests.get(contents_url, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch repo contents"}), response.status_code

    files = response.json()
    relevant_files = [f for f in files if f['type'] == 'file' and f['name'].lower().endswith(('.html', '.css', '.js', '.py'))]

    if not relevant_files:
        return jsonify({"error": "No relevant files found"}), 404

    file_url = relevant_files[0]['download_url']
    file_response = requests.get(file_url)

    if file_response.status_code != 200:
        return jsonify({"error": "Failed to download file"}), 500

    return jsonify({
        "filename": relevant_files[0]['name'],
        "code": file_response.text
    })

if __name__ == '__main__':
    app.run(debug=True)
