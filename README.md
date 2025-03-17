# 🚀 Automatic GitHub PR Review System

An AI-powered system that automates GitHub Pull Request (PR) reviews. Built with **Next.js 14** and **React 18**, it uses GitHub OAuth for authentication, **Google Gemini AI** for generating PR reviews, and the **GitHub API** for posting comments on PRs.

## 🛠️ Technologies Used

- **Next.js 14**: Server-side rendering and API routes.
- **React 18**: Frontend framework.
- **NextAuth (MongoDB Adapter)**: For GitHub OAuth authentication and secure storage of access tokens.
- **MongoDB**: Database for storing GitHub OAuth tokens and user session data.
- **Google Gemini 1.5 Flash AI**: Generates intelligent PR review feedback.
- **GitHub API**: Fetches PR data and posts review comments.
- **Axios**: For making API requests.

## 📜 Features

- **GitHub OAuth Authentication**: Allows users to log in using their GitHub account.
- **Repo Selection**: Users can select a GitHub repository for automatic PR reviews.
- **Webhook Creation**: Automatically creates a webhook on the selected repository for new PRs.
- **AI-Powered PR Reviews**: Uses Google Gemini AI to analyze PR changes and generate review comments.
- **Automated Feedback Posting**: The system posts AI-generated feedback as a comment on the PR.

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Deveshsingh2004/automatic_pr_review_system.git
   cd auto-pr-review
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following variables:
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   MONGODB_URI=your_mongodb_connection_uri
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GOOGLE_AI_API_KEY=your_google_gemini_api_key
   WEBHOOK_URL=your_project_deployed_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 How It Works

1. **GitHub OAuth**: 
   - Users log in using GitHub OAuth.
   - The access token is securely stored in MongoDB via the **NextAuth MongoDB adapter**.

2. **Repo Selection**: 
   - After logging in, users can select a repository they own for automatic PR review.

3. **Webhook Setup**:
   - The system creates a webhook on the selected repo that triggers whenever a new pull request is created.

4. **AI-Powered Review**:
   - When a new PR is raised, the webhook sends a POST request to the server.
   - The server retrieves the patch data and sends it to **Google Gemini AI** for analysis.

5. **Posting Review**:
   - The AI generates a review, which is posted as a comment on the PR via the GitHub API using the stored access token.



## 📑 API Routes

- **`/api/auth`**: Manages GitHub OAuth with **NextAuth**.
- **`/api/webhook`**: Handles GitHub webhook events for new PRs.
- **`/api/gitWeebhook`**: Triggered by github Webhook and Analyse the PR and comment on it.

## 💡 Key Functionalities

1. **OAuth Integration**: Utilizes GitHub OAuth for secure authentication.
2. **Webhook Listener**: Automatically triggers on new PRs to process the changes.
3. **AI Analysis**: Analyzes the changes in PRs using **Google Gemini AI**.
4. **Automated Review Posting**: Posts AI-generated reviews as comments on PRs via the **GitHub API**.

## Screenshot

### Login
![image](https://github.com/Deveshsingh2004/automatic_pr_review_system/blob/fba8eb90b9093d27294fe904c4ace55034f22bdb/Readme%20image/Login%20page.jpg)

### Github OAuth 
![image](https://github.com/Deveshsingh2004/automatic_pr_review_system/blob/fba8eb90b9093d27294fe904c4ace55034f22bdb/Readme%20image/Gitgub%20OAuth.jpg)


### Repository select page
![image](https://github.com/Deveshsingh2004/automatic_pr_review_system/blob/fba8eb90b9093d27294fe904c4ace55034f22bdb/Readme%20image/Repository%20select%20drop%20down%20.jpg)
