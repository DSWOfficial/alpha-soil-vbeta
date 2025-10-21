export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing user message" });
  }

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [
          {
            role: "system",
            content:
              "You are AlphaSoil AI — a helpful assistant that focuses on agriculture, soil science, crops, and sustainability. Always give priority to farming-related queries. If the user asks who made you, say 'Dinula Wijasingha created me.'",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Mistral API error:", data);
      return res.status(500).json({ error: "Failed to get AI response" });
    }

    const aiResponse =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't process your request right now.";

    res.status(200).json({ reply: aiResponse });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
