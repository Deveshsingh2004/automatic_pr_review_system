"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Auth() {
  const { data: session, status } = useSession();
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);

  // Fetch user's repositories after authentication
  useEffect(() => {
    if (session) {
      const fetchRepos = async () => {
        const res = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${session.accessToken}`, // Pass the GitHub access token
          },
        });
        setRepositories(res.data);
      };

      fetchRepos();
    }
  }, [session]);

  // Handle repository selection
  const handleRepoSelection = (event) => {
    const options = Array.from(event.target.options);
    const selected = options
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedRepos(selected);
  };

  // Handle webhook creation on selected repositories
  const handleWebhookCreation = async () => {
    try {
      for (const repo of selectedRepos) {
        // Call API to create a webhook
        await axios.post("/api/webhook", { repo });
      }
      alert("Webhooks created successfully!");
    } catch (error) {
      console.error("Error creating webhooks", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center space-y-6">
        {!session ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800">
              Connect with GitHub
            </h2>
            <p className="text-gray-600">
              Sign in to get started with your account
            </p>
            <button
              onClick={() => signIn("github", { scope: "repo" })}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
            >
              Connect GitHub
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, {session.user.name}!
            </h2>
            <p className="text-gray-600">
              You are signed in with GitHub. Select repositories to authorize
              webhooks.
            </p>

            <select
              multiple
              onChange={handleRepoSelection}
              className="block w-full mt-2 bg-gray-100 border border-gray-300 rounded-md p-2"
            >
              {repositories.map((repo) => (
                <option key={repo.id} value={repo.full_name}>
                  {repo.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleWebhookCreation}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out"
            >
              Authorize Webhook
            </button>

            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out mt-2"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
