export async function fetchAI(message) {
  const response = await fetch("/api/chat", {   // serverless API
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return data.reply;
}
