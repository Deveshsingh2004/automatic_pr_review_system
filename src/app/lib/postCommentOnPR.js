// Function to post comment on a PR
export async function postCommentOnPR(
  accessToken,
  feedback,
  repoOwner,
  repoName,
  pullNumber
) {
  if (!accessToken) {
    console.log("No accessToken found \nError while commenting on PR");
    return;
  }
  const token = accessToken; // Pass the GitHub access token
  // console.log("token######", token);
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${pullNumber}/comments`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      body: feedback,
    }),
  });

  if (!response.ok) {
    console.error("Failed to post comment:", await response.text());
  } else {
    console.log("Comment posted successfully!");
  }
}
