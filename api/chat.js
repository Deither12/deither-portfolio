// api/chat.js
// Vercel Serverless Function — place this file at the root of your project under /api/chat.js

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // Fast & cheap — perfect for a portfolio chatbot
        max_tokens: 1024,
        system: `You are a friendly AI assistant on Deither's portfolio website. 
Your job is to help visitors learn about Deither — his skills, projects, experience, and how to contact him.

Here is what you know about Deither:
- He is a developer who builds web applications
- His portfolio is built with Vite, Tailwind CSS, and JavaScript
- He is open to job opportunities and collaborations
- Visitors can reach him through the contact section of his portfolio

Keep your answers concise, friendly, and helpful. If you don't know something specific about Deither that isn't listed above, say so honestly and suggest the visitor use the contact section to reach him directly.`,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      return res.status(500).json({ error: 'Failed to get response from AI' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
