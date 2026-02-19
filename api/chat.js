export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.AIzaSyBSWca_YMP595oNTJf1skhEPWRFmmfE9zw}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: `You are a friendly AI assistant on Deither's portfolio website.
Your job is to help visitors learn about Deither — his skills, projects, experience, and how to contact him.
Keep your answers concise, friendly, and helpful. If you don't know something specific, suggest the visitor use the contact section.` }]
          },
          contents,
        }),
      }
    );

    const data = await response.json();
    console.log('Gemini raw response:', JSON.stringify(data));

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Temporarily show raw Gemini response for debugging
    return res.status(200).json({ reply: text || JSON.stringify(data) });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: err.message });
  }
}