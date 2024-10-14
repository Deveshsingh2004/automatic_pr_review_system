import axios from "axios";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { getServerSession } from "next-auth";

// Define POST method explicitly
export async function POST(req) {
  const session = await getServerSession(authOptions);
  // console.log("Session:", session);
  if (!session) {
    return new Response(
      JSON.stringify({ message: "Unauthorized from my side" }),
      {
        status: 401,
      }
    );
  }

  const body = await req.json(); // Parse the incoming request
  const { repo } = body;
  const webhookUrl = process.env.WEBHOOK_URL; // Your app's webhook URL

  try {
    // Create a webhook for the selected repository
    const response = await axios.post(
      `https://api.github.com/repos/${repo}/hooks`,
      {
        name: "web",
        active: true,
        events: ["pull_request"],
        config: {
          url: webhookUrl,
          content_type: "json",
        },
      },
      {
        headers: {
          Authorization: `token ${session.accessToken}`, // Ensure accessToken exists
        },
      }
    );
    console.log("Webhook created successfully");

    return new Response(
      JSON.stringify({ message: "Webhook created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating webhook", error);
    return new Response(
      JSON.stringify({ message: "Failed to create webhook" }),
      { status: 500 }
    );
  }
}
