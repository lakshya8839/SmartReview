# SmartReview

SmartReview is a web-based tool that provides AI-powered code review suggestions for pasted code snippets or public GitHub repositories. It helps developers identify potential issues, improve code quality, and learn best practices with minimal effort.

## 🚀 Features

- 🔍 Paste any code to get instant feedback and suggestions
- 📦 Analyze code from public GitHub repositories
- 💡 AI-generated improvement tips and warnings
- 🎨 Clean and interactive frontend UI (HTML/CSS/JS)
- 🧠 Python backend using Flask and OpenAI API

## 🖼️ Preview

![SmartReview - AI Code Review Assistant - Google Chrome 5_6_2025 3_20_40 PM](https://github.com/user-attachments/assets/cdc1e7e6-10e8-4cbc-a13f-86bcec13d4b3)

## 🛠️ Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- APIs: GitHub REST API, OpenAI (GPT)
- Tools: Git, GitHub

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/lakshya8839/SmartReview.git
cd SmartReview

'''
  2. Create & Activate Virtual Environment (Windows)
  python -m venv venv
  venv\Scripts\activate

'''
'''
  3. Install Dependencies
  pip install -r requirements.txt
'''
  4. Set Environment Variables
  Create a .env file in the root directory and add your GitHub and OpenAI tokens: GITHUB_TOKEN=your_github_token_here
  OPENAI_API_KEY=your_openai_key_here
  👉 Keep this file secret! Do not commit .env to GitHub. It's already ignored by .gitignore.
'''
   5. Run the Application
   python app.py
   Open your browser and go to http://127.0.0.1:5000
'''
   📁 Project Structure
   SmartReview/
  ├── static/
  │   ├── style.css
  ├── templates/
  │   └── index.html
  ├── .env
  ├── .gitignore
  ├── app.py
  ├── requirements.txt
  └── README.md
'''
  💬 Example Usage
--Paste Python/JavaScript/C++ code in the text box and click "Review"

--Enter a GitHub repo like https://github.com/psf/requests

--View instant suggestions below the code area

   🔒 Security Tips
---Never hardcode API tokens.

---Use environment variables (.env file) for all credentials.

---Your .gitignore file should include:__pycache__/
*.pyc
.env
node_modules/
.vscode/
*.log



