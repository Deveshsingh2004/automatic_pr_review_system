const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateReview(patchUrl) {
  const response = await fetch(patchUrl);
  const patchData = await response.text();
  const prompt = `Analyze the following patch in GitHub pull request and provide feedback. Give me feedback as a comment which can be posted below the PR so it helps in reviewing and only give me comment:${patchData}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
