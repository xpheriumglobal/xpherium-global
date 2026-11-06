const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // FIX 1

const app = express();
const PORT = process.env.PORT || 3000;

const DIFY_URL = process.env.DIFY_API_URL || 'https://api.xpheriumglobal.com/v1/chat-messages';
const DIFY_KEY = process.env.DIFY_API_KEY;

console.log('DIFY_URL:', DIFY_URL);
console.log('KEY loaded:', !!DIFY_KEY, 'len:', DIFY_KEY?.length);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function isDifyUUID(id){ return typeof id==='string' && /^[a-f0-9-]{30,}$/i.test(id); } // FIX 2 helper

app.post('/api/dify', async (req, res) => {
  if (!DIFY_KEY) return res.status(500).json({ error: 'DIFY_API_KEY not set in .env file' });
  
  const { message, session_id, conversation_id } = req.body;
  const sid = session_id || `user-${Date.now()}`;
  
  if (!message || !sid) return res.status(400).json({ error: 'message and session_id required' });

  try {
    const payload = {
      inputs: { text: message },
      query: message,
      response_mode: 'blocking',
      user: sid,
    };

    if (isDifyUUID(conversation_id)) { // FIX 2 - only send real Dify UUIDs
      payload.conversation_id = conversation_id;
    }

    console.log(`\n-> Dify call: query="${message.substring(0,50)}" user=${sid} conv=${payload.conversation_id || '(new)'}`);

    const difyRes = await fetch(DIFY_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${DIFY_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload),
    });

    const rawText = await difyRes.text();
    
    if (!difyRes.ok) {
      console.error(`Dify ERROR ${difyRes.status}:`, rawText.substring(0, 500));
      return res.status(difyRes.status).json({ error: 'Dify error', details: rawText });
    }

    let difyData = {};
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

    console.log(`<- Dify OK, conv_id=${difyData.conversation_id}`);

    res.json({ 
      type: isReady ? 'lead_capture_trigger' : 'normal_message', 
      message: cleanMessage, 
      lead_prefill: { problem_summary: prefill }, 
      conversation_id: difyData.conversation_id
    });

  } catch (err) {
    console.error('SERVER CATCH:', err);
    res.status(500).json({ error: 'Internal error', details: err.message });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`LYRA running on http://localhost:${PORT}`));

process.stdin.resume();
process.on('uncaughtException', (err) => { console.error('Uncaught Exception:', err); });
process.on('unhandledRejection', (reason, promise) => { console.error('Unhandled Rejection at:', promise, 'reason:', reason); });