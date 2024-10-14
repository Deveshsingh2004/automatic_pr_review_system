import { NextResponse } from "next/server";
import { generateReview } from "@/app/lib/analyzePR.js";
import { postCommentOnPR } from "@/app/lib/postCommentOnPR.js";
import { MongoClient } from "mongodb";

// Check if MONGO_URI is defined in environment variables
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

export async function POST(req) {
  let client;

  try {
    const payload = await req.json();

    // Ensure it's a pull request event
    if (payload.action === "opened" && payload.pull_request) {
      console.log("#########    A New Pull request is opened  #########");
      // Extract repository owner ID from the webhook payload
      const repoOwnerId = payload.repository.owner.id;

      // Connect to MongoDB
      client = new MongoClient(MONGO_URI);
      await client.connect();
      const db = client.db();

      // Find the account in the accounts collection by providerAccountId (which is repoOwnerId)
      const account = await db
        .collection("accounts")
        .findOne({ providerAccountId: String(repoOwnerId) });

      if (!account) {
        return new Response(
          JSON.stringify({ message: "Owner account not found" }),
          { status: 404 }
        );
      }
      // console.log(" Owner account found##########", account);

      // Get the GitHub access token from the account document
      const accessToken = account.access_token;

      if (!accessToken) {
        return new Response(
          JSON.stringify({ message: "Access token not found for owner" }),
          { status: 401 }
        );
      }

      // PR details for making a comment
      const patchUrl = payload.pull_request.patch_url; // Optional: Patch or diff URL
      const repoOwner = payload.repository.owner.login; // Repository owner login (username)
      const repoName = payload.repository.name; // Repository name
      const pullNumber = payload.pull_request.number; // Pull Request number

      // Analyze the patch for the changes
      const analysis = await generateReview(patchUrl);
      console.log(
        "#########     Review from the AI Model received successfully    ########"
      );

      // console.log("Analysis", analysis);

      // Post a comment on the PR using the owner's access token

      await postCommentOnPR(
        accessToken,
        analysis,
        repoOwner,
        repoName,
        pullNumber
      );
      console.log(
        "###############    Successfully posted comment on the PR    ###############"
      );

      // Return success response
      return NextResponse.json({
        success: true,
        analysis: "Successfully posted comment on the PR",
      });
    }

    return NextResponse.json({ success: false, message: "Not a PR event" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  } finally {
    // Ensure MongoDB connection is closed
    if (client) {
      await client.close();
    }
  }
}
