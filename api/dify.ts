// api/dify.ts - Serverless API for Vercel/Netlify
import type { VercelRequest, VercelResponse } from '@vercel/node';

const DIFY_URL = process.env.DIFY_API_URL || 'https://api.xpheriumglobal.com/v1/chat-messages';
const DIFY_KEY = process.env.DIFY_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!DIFY_KEY) {
    return res.status(500).json({ error: 'DIFY_API_KEY not set in environment' });
  }

  const { message, session_id, conversation_id } = req.body || {};
  const sid = session_id || `user-${Date.now()}`;

  if (!message || !sid) {
    return res.status(400).json({ error: 'message and session_id required' });
  }

  try {
    // ✅ FIXED: Send 'text' in inputs to match Dify workflow
    const payload = {
      inputs: { text: message },
      query: message,
      response_mode: 'blocking',
      conversation_id: conversation_id || "",
      user: sid,
    };

    const difyRes = await fetch(DIFY_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const rawText = await difyRes.text();
    
    if (!difyRes.ok) {
      console.error(`Dify ERROR ${difyRes.status}:`, rawText.substring(0, 500));
      return res.status(difyRes.status).json({ error: 'Dify error', details: rawText });
    }

    let difyData: any = {};
    try { difyData = JSON.parse(rawText); } catch { difyData = { answer: rawText }; }
    
    const rawAnswer = difyData.answer || '';
    let cleanMessage = rawAnswer;
    let prefill = '';
    let isReady = false;

    const stateMatch = rawAnswer.match(/__LYRA_STATE__(.*?)__END_STATE__/s);
    const readyMatch = rawAnswer.match(/__LYRA_READY__(.*?)__END_READY__/s);

    if (stateMatch) {
      try {
        const debugState = JSON.parse(stateMatch[1]);
        const facts = debugState.facts || {};
        prefill = Object.values(facts).filter(Boolean).join(' | ');
      } catch {}
      cleanMessage = cleanMessage.replace(stateMatch[0], '').trim();
    }
    
    if (readyMatch) {
      isReady = readyMatch[1].toLowerCase().includes('true');
      cleanMessage = cleanMessage.replace(readyMatch[0], '').trim();
    }

    return res.status(200).json({ 
      type: isReady ? 'lead_capture_trigger' : 'normal_message', 
      message: cleanMessage, 
      lead_prefill: { problem_summary: prefill }, 
      conversation_id: difyData.conversation_id
    });

  } catch (err: any) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal error', details: err.message });
  }
}