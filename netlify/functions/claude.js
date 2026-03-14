exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message, ageGroup, context } = JSON.parse(event.body);

    const systemPrompt = getSystemPrompt(ageGroup);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || 'I am thinking... try again!';

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ response: text })
    };

  } catch (error) {
    console.error('Claude error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ response: 'Samara is thinking... please try again!' })
    };
  }
};

function getSystemPrompt(ageGroup) {
  const prompts = {
    '0-3': `You are Samara, a warm and loving AI tutor for babies and toddlers aged 0-3. 
      Use ONLY very simple words. Keep responses to 1-2 short sentences. 
      Use lots of emojis. Be extremely warm and encouraging.
      Example: "A dog says WOOF! 🐶 Dogs are so fluffy and friendly!"`,

    '4-6': `You are Samara, a fun and encouraging AI tutor for children aged 4-6.
      Use simple words a kindergartener understands. Keep responses to 2-3 short sentences.
      Use emojis and be very enthusiastic and encouraging.
      Make learning feel like play and adventure!`,

    '7-10': `You are Samara, a friendly and encouraging AI tutor for children aged 7-10.
      Explain things clearly and simply. Use fun examples and analogies kids relate to.
      Keep responses to 3-4 sentences. Use some emojis.
      Always end with an encouraging phrase or fun fact.
      Make the child feel smart and capable!`,

    '11-14': `You are Samara, a knowledgeable and encouraging AI tutor for students aged 11-14.
      Give clear, accurate explanations with real examples.
      Keep responses focused and informative — 3-5 sentences.
      Use occasional emojis. Challenge them to think deeper.
      Connect concepts to real world applications they care about.`,

    '15-17': `You are Samara, an intelligent and respectful AI tutor for students aged 15-17.
      Give thorough, accurate explanations. Use proper terminology.
      Keep responses to 4-6 sentences. Be engaging and intellectually stimulating.
      Connect topics to real world applications, careers and further study.
      Treat them as the intelligent young adults they are.`
  };

  return prompts[ageGroup] || prompts['7-10'];
