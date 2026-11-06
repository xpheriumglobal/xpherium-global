import { useEffect, useRef, useState } from 'react';

const CONFIG = {
  CHAT_WEBHOOK_URL: '/api/dify',
  AVATAR_URL: '/lyra-avatar.webp',
  TIMEOUT_MS: 60000,
  MAX_MESSAGE_LENGTH: 2000,
  SOURCE: 'x-pherium-widget',
  BRAND_NAME: 'X-PHERIUM',
  TAGLINE: 'AUTOMATE - DEPLOY - SCALE FASTER',
  QUICK_PROMPTS: [
    'Show me what I’m missing',
    'What should I automate first?',
    'Challenge my business',
  ],
  SESSION_KEY: 'x-pherium-session-id',
  CONVERSATION_ID_KEY: 'x-pherium-dify-conversation-id',
  CONVERSATION_KEY: 'x-pherium-conversation',
  // REMOVED LEAD_SUBMITTED_KEY - pure renderer, Dify handles lead
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
  ts: number;
  error?: boolean;
};

type LyraResponse = {
  type: string;
  message: string;
  leadPrefill: string;
  conversation_id?: string;
};

function getSessionId(): string {
  try {
    let id = localStorage.getItem(CONFIG.SESSION_KEY);

    if (!id) {
      id =
        window.crypto?.randomUUID?.() ||
        `${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .slice(2)}`;

      localStorage.setItem(CONFIG.SESSION_KEY, id);
    }

    return id;
  } catch {
    return `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2)}`;
  }
}

function loadConversation(): Message[] {
  try {
    const raw = sessionStorage.getItem(CONFIG.CONVERSATION_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveConversation(messages: Message[]) {
  try {
    sessionStorage.setItem(
      CONFIG.CONVERSATION_KEY,
      JSON.stringify(messages)
    );
  } catch {
    // Storage may be unavailable.
  }
}

function getDifyConversationId(): string {
  try {
    return localStorage.getItem(CONFIG.CONVERSATION_ID_KEY) || '';
  } catch {
    return '';
  }
}

function setDifyConversationId(id: string) {
  try {
    if (id) localStorage.setItem(CONFIG.CONVERSATION_ID_KEY, id);
  } catch {}
}

function normalizeResponse(data: unknown): LyraResponse {
  if (data === null || data === undefined) {
    return {
      type: 'error',
      message: '',
      leadPrefill: '',
    };
  }

  if (typeof data === 'string') {
    const trimmed = data.trim();

    if (trimmed.startsWith('{')) {
      try {
        return normalizeResponse(JSON.parse(trimmed));
      } catch {
        // Continue as plain text.
      }
    }

    return {
      type: 'normal_message',
      message: trimmed,
      leadPrefill: '',
    };
  }

  if (Array.isArray(data)) {
    return data.length
      ? normalizeResponse(data[0])
      : {
          type: 'error',
          message: '',
          leadPrefill: '',
        };
  }

  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;

    const type =
      obj.type ||
      obj.response_type ||
      'normal_message';

    const message =
      obj.message ||
      obj.message_text ||
      '';

    const conversation_id =
      (obj.conversation_id as string) || '';

    let leadPrefill = '';

    if (
      obj.lead_prefill &&
      typeof obj.lead_prefill === 'object'
    ) {
      const lead = obj.lead_prefill as Record<
        string,
        unknown
      >;

      if (lead.problem_summary) {
        leadPrefill = String(
          lead.problem_summary
        );
      }
    }

    return {
      type: String(type),
      message: String(message).trim(),
      leadPrefill,
      conversation_id,
    };
  }

  return {
    type: 'error',
    message: '',
    leadPrefill: '',
  };
}

function getErrorMessage(error: unknown): string {
  if (
    error instanceof DOMException &&
    error.name === 'AbortError'
  ) {
    return "Give me a moment. I'm still with you.";
  }

  if (
    error instanceof TypeError &&
    /fetch|network/i.test(error.message)
  ) {
    return "I'm having a brief connection hiccup. Try that once more.";
  }

  return "I didn't quite catch that. Can you say it again?";
}

export function XpheriumLyraChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] =
    useState<Message[]>(loadConversation);

  const [input, setInput] = useState('');

  const [showAsk, setShowAsk] = useState(false);

  const sessionIdRef = useRef(getSessionId());

  const abortControllerRef =
    useRef<AbortController | null>(null);

  const messagesRef =
    useRef<HTMLDivElement | null>(null);

  const tingPlayedRef = useRef(false);

  const askDismissedRef = useRef(false);

  useEffect(() => {
    saveConversation(messages);

    requestAnimationFrame(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop =
          messagesRef.current.scrollHeight;
      }
    });
  }, [messages]);



  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const dismissed =
          sessionStorage.getItem(
            'x-pherium-ask-dismissed'
          ) === '1';

        if (!dismissed && !isOpen) {
          setShowAsk(true);
          playTing();
        }
      } catch {
        if (!isOpen) {
          setShowAsk(true);
          playTing();
        }
      }
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!showAsk) return;

    const timer = window.setTimeout(() => {
      setShowAsk(false);
    }, 12000);

    return () => window.clearTimeout(timer);
  }, [showAsk]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);



  function dismissAsk() {
    setShowAsk(false);

    askDismissedRef.current = true;

    try {
      sessionStorage.setItem(
        'x-pherium-ask-dismissed',
        '1'
      );
    } catch {
      // Ignore storage errors.
    }
  }

  function openChat() {
    setIsOpen(true);
    setIsMinimized(false);
    dismissAsk();

    window.setTimeout(() => {
      document
        .getElementById('xph-lyra-input')
        ?.focus();
    }, 300);
  }

  function closeChat(showMinimized: boolean) {
    setIsOpen(false);
    setIsMinimized(showMinimized);
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop =
          messagesRef.current.scrollHeight;
      }
    });
  }

  async function sendToWebhook(
    url: string,
    payload: unknown
  ) {
    abortControllerRef.current?.abort();

    const controller = new AbortController();

    abortControllerRef.current = controller;

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, CONFIG.TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      const contentType = (
        response.headers.get('content-type') || ''
      ).toLowerCase();

      if (
        contentType.includes('application/json')
      ) {
        return await response.json();
      }

      const text = await response.text();

      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } finally {
      window.clearTimeout(timeout);
      abortControllerRef.current = null;
    }
  }

  async function handleSend(
    rawText: string
  ) {
    const text = rawText.trim();

    if (!text || isLoading) return;

    if (
      text.length >
      CONFIG.MAX_MESSAGE_LENGTH
    ) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'That message is a bit long — could you shorten it?',
          ts: Date.now(),
          error: true,
        },
      ]);

      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: text,
      ts: Date.now(),
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // FIX: Persist Dify conversation_id so is_in_journey / discovery_state doesn't reset
      const difyConvId = getDifyConversationId();
      const response =
  await sendToWebhook(
    CONFIG.CHAT_WEBHOOK_URL,
    {
      session_id: sessionIdRef.current,
      message: text,
      conversation_id: difyConvId,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      user_id: null,
    }
  );

      const normalized =
        normalizeResponse(response);

      // FIX: Save conversation_id returned by your api/dify.ts
      if (normalized.conversation_id) {
        setDifyConversationId(normalized.conversation_id);
      } else if ((response as any)?.conversation_id) {
        setDifyConversationId((response as any).conversation_id);
      }

      const message =
        normalized.message ||
        'I’m here to help. Could you tell me a little more?';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: message,
          ts: Date.now(),
          error:
            normalized.type === 'error',
        },
      ]);

      // PURE RENDERER: No lead modal - Dify handles lead via chat itself
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            getErrorMessage(error),
          ts: Date.now(),
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);

      window.setTimeout(
        scrollToBottom,
        50
      );
    }
  }

  function submitMessage(
    event: React.FormEvent
  ) {
    event.preventDefault();

    handleSend(input);
  }

  function playTing() {
    if (tingPlayedRef.current) {
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      const context =
        new AudioContextClass();

      const tone = (
        frequency: number,
        volume: number,
        delay: number,
        duration: number
      ) => {
        const oscillator =
          context.createOscillator();

        const gain =
          context.createGain();

        const filter =
          context.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = 1900;

        oscillator.type = 'sine';
        oscillator.frequency.value =
          frequency;

        gain.gain.setValueAtTime(
          0,
          context.currentTime + delay
        );

        gain.gain.linearRampToValueAtTime(
          volume,
          context.currentTime +
            delay +
            0.02
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          context.currentTime +
            delay +
            duration
        );

        oscillator
          .connect(filter)
          .connect(gain)
          .connect(context.destination);

        oscillator.start(
          context.currentTime + delay
        );

        oscillator.stop(
          context.currentTime +
            delay +
            duration +
            0.1
        );
      };

      tone(880, 0.09, 0, 1.1);
      tone(1320, 0.04, 0.03, 0.9);
      tone(1760, 0.02, 0.06, 0.7);

      tingPlayedRef.current = true;

    } catch {
      // Audio is optional.
    }
  }

  return (
    <>
      <style>{`
        .xph-widget,
        .xph-widget * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Inter, ui-sans-serif, system-ui,
            -apple-system, Segoe UI, Roboto, sans-serif;
          -webkit-tap-highlight-color: transparent;
        }

        .xph-widget {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          pointer-events: none;
        }

        .xph-widget button {
          cursor: pointer;
          border: none;
          background: none;
          font: inherit;
        }

        .xph-widget input,
        .xph-widget textarea {
          font: inherit;
        }

        .xph-launcher {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          pointer-events: auto;
          overflow: visible;
          transition:
            transform .3s cubic-bezier(.4,0,.2,1),
            opacity .3s;
          z-index: 10;
        }

        .xph-launcher.xph-hidden {
          transform: translateY(120px);
          opacity: 0;
          pointer-events: none;
        }

        .xph-launcher-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: #0D0D0F;
          border: 1.5px solid rgba(201,168,106,.55);
          box-shadow:
            0 8px 28px rgba(0,0,0,.5),
            0 0 0 1px rgba(201,168,106,.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .2s;
        }

        .xph-launcher:hover .xph-launcher-inner {
          transform: scale(1.05);
        }

        .xph-launcher:active .xph-launcher-inner {
          transform: scale(.97);
        }

        .xph-launcher img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 10%;
          display: block;
        }

        .xph-launcher-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #C9A86A;
          border: 2px solid #07070A;
          box-shadow:
            0 0 6px rgba(201,168,106,0.6);
        }

        .xph-launcher-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,106,.25);
          animation:
            xphPulse 3.4s cubic-bezier(.4,0,.6,1)
            infinite;
          pointer-events: none;
        }

        .xph-launcher-pulse.xph-delay {
          animation-delay: 1.15s;
          border-color:
            rgba(201,168,106,.18);
        }

        @keyframes xphPulse {
          0% {
            transform: scale(.9);
            opacity: .45;
          }

          60% {
            opacity: .10;
          }

          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .xph-panel {
          position: absolute;
          bottom: 24px;
          right: 24px;
          width: 388px;
          max-width: calc(100vw - 32px);
          height: 640px;
          max-height: calc(100dvh - 48px);
          background: #0B0B0D;
          border: 1px solid rgba(201,168,106,.20);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 20px 60px rgba(0,0,0,.75),
            0 0 0 1px rgba(201,168,106,.06);
          pointer-events: auto;
          opacity: 0;
          transform:
            translateY(16px) scale(.98);
          transition:
            opacity .32s cubic-bezier(.4,0,.2,1),
            transform .32s cubic-bezier(.4,0,.2,1);
        }

        .xph-panel.xph-open {
          opacity: 1;
          transform:
            translateY(0) scale(1);
        }

        .xph-panel.xph-closed {
          pointer-events: none;
        }

        .xph-header {
          height: 88px;
          flex-shrink: 0;
          padding: 0 12px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #111113;
          border-bottom:
            1px solid rgba(255,255,255,.07);
        }

        .xph-header-avatar {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }

        .xph-header-avatar-glow {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background:
            rgba(201,168,106,.15);
          filter: blur(14px);
        }

        .xph-header-avatar-ring {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background:
            linear-gradient(
              180deg,
              #E8C98C 0%,
              #C9A86A 45%,
              #8A6D3B 100%
            );
          padding: 2px;
          box-shadow:
            0 0 0 1px rgba(201,168,106,.18);
        }

        .xph-header-avatar-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center 12%;
          background: #1A1A1E;
          display: block;
        }

        .xph-header-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          margin-left: 12px;
          padding: 2px 0;
        }

        .xph-header-title {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: .06em;
          color: #fff;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .xph-header-sub {
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .xph-header-sub-dot {
          width: 6px;
          height: 6px;
          min-width: 6px;
          min-height: 6px;
          border-radius: 50%;
          background: #22C55E;
          flex-shrink: 0;
          animation: xphLyraOnlinePulse 1.8s ease-in-out infinite;
          box-shadow:
            0 0 5px rgba(34,197,94,.55);
        }

        @keyframes xphLyraOnlinePulse {
          0% {
            transform: scale(1);
            opacity: 1;
            box-shadow:
              0 0 5px rgba(34,197,94,.55);
          }

          50% {
            transform: scale(1.35);
            opacity: .65;
            box-shadow:
              0 0 12px rgba(34,197,94,.95);
          }

          100% {
            transform: scale(1);
            opacity: 1;
            box-shadow:
              0 0 5px rgba(34,197,94,.55);
          }
        }

        .xph-header-sub-text {
          font-size: 8.5px;
          letter-spacing: .10em;
          color: rgba(255,255,255,.52);
          font-weight: 600;
          line-height: 1;
        }

        .xph-header-tagline {
          font-size: 9px;
          color: #FFFFFF;
          margin-top: 1px;
          line-height: 1.3;
          letter-spacing: .05em;
          font-weight: 700;
        }

        .xph-header-actions {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-left: auto;
          flex-shrink: 0;
        }

        .xph-header-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background:
            rgba(255,255,255,.08);
          border:
            1px solid rgba(255,255,255,.10);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,.75);
        }

        .xph-header-btn:hover {
          background:
            rgba(255,255,255,.10);
          border-color:
            rgba(255,255,255,.12);
        }

        .xph-header-btn svg {
          opacity: .75;
          width: 12px;
          height: 12px;
        }

        .xph-messages {
          flex: 1;
          overflow-y: auto;
          padding: 28px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          scrollbar-width: thin;
          scrollbar-color:
            rgba(255,255,255,.12)
            transparent;
          background: #0B0B0D;
        }

        .xph-messages::-webkit-scrollbar {
          width: 3px;
        }

        .xph-messages::-webkit-scrollbar-thumb {
          background:
            rgba(255,255,255,.12);
          border-radius: 2px;
        }

        .xph-msg {
          display: flex;
          gap: 8px;
          max-width: 86%;
        }

        .xph-msg-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .xph-msg-ai {
          align-self: flex-start;
        }

        .xph-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border:
            1px solid rgba(255,255,255,.08);
          margin-top: 2px;
        }

        .xph-msg-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 12%;
          display: block;
        }

        .xph-msg-bubble {
          padding: 10px 13px;
          font-size: 12.5px;
          line-height: 1.55;
          letter-spacing: -.01em;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .xph-msg-user .xph-msg-bubble {
          background: #1C1C1F;
          border:
            1px solid rgba(201,168,106,.14);
          border-radius:
            16px 16px 4px 16px;
          color: #fff;
        }

        .xph-msg-ai .xph-msg-bubble {
          background: #16161A;
          border:
            1px solid rgba(255,255,255,.08);
          border-radius:
            16px 16px 16px 4px;
          color: rgba(255,255,255,.92);
        }

        .xph-msg-error .xph-msg-bubble {
          border-color:
            rgba(239,68,68,.35);
          color: #FCA5A5;
        }

        .xph-typing {
          display: flex;
          gap: 8px;
          align-self: flex-start;
          max-width: 86%;
        }

        .xph-typing-bubble {
          background: #16161A;
          border:
            1px solid rgba(255,255,255,.08);
          border-radius:
            16px 16px 16px 4px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .xph-typing-bar {
          position: relative;
          width: 18px;
          height: 2px;
          background:
            rgba(255,255,255,.10);
          border-radius: 1px;
          overflow: hidden;
        }

        .xph-typing-bar-fill {
          position: absolute;
          inset: 0;
          width: 10px;
          background: #C9A86A;
          border-radius: 1px;
          animation:
            xphShimmer 1.2s ease-in-out infinite;
        }

        @keyframes xphShimmer {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(200%);
          }
        }

        .xph-typing-dots {
          display: flex;
          gap: 3px;
        }

        .xph-typing-dot {
          width: 3.5px;
          height: 3.5px;
          border-radius: 50%;
          background:
            rgba(255,255,255,.7);
          animation:
            xphDot 1.2s infinite;
        }

        .xph-typing-dot:nth-child(2) {
          animation-delay: .2s;
        }

        .xph-typing-dot:nth-child(3) {
          animation-delay: .4s;
        }

        @keyframes xphDot {
          0%,80%,100% {
            opacity: .25;
          }

          40% {
            opacity: 1;
          }
        }

        .xph-typing-label {
          font-size: 10px;
          letter-spacing: .06em;
          color:
            rgba(255,255,255,.65);
          font-weight: 500;
        }

        .xph-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px 32px;
          background: #0B0B0D;
          gap: 0;
        }

        .xph-empty-avatar {
          position: relative;
          width: 148px;
          height: 148px;
          margin-bottom: 24px;
          flex-shrink: 0;
        }

        .xph-empty-avatar-glow {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background:
            rgba(201,168,106,.10);
          filter: blur(18px);
          transform: scale(1.12);
        }

        .xph-empty-avatar-ring {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 1.5px;
          background:
            linear-gradient(
              to bottom,
              #E8DCC6,
              #8A6D3B
            );
          box-shadow:
            0 10px 28px rgba(0,0,0,.55),
            0 0 0 1px
              rgba(201,168,106,.18);
        }

        .xph-empty-avatar-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center 10%;
          background: #141416;
          display: block;
        }

        .xph-empty-title {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -.01em;
          line-height: 1.2;
          margin-top: 4px;
        }

        .xph-empty-sub {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(255,255,255,.78);
          max-width: 300px;
          margin-top: 14px;
          text-align: center;
        }

        .xph-empty-sub strong {
          font-weight: 700;
          color: #fff;
        }

        .xph-empty-prompt {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255,255,255,.52);
          max-width: 280px;
          margin-top: 18px;
          text-align: center;
        }

        .xph-empty-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          max-width: 340px;
        }

        .xph-chip {
          height: 32px;
          padding: 0 16px;
          border-radius: 9999px;
          background: #1A1A1E;
          border:
            1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.92);
          font-size: 11.5px;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition:
            border-color .2s,
            background .2s,
            transform .15s;
        }

        .xph-chip:hover {
          border-color:
            rgba(255,255,255,.22);
          background: #202025;
        }

        .xph-chip:active {
          transform: scale(.97);
        }

        .xph-input-area {
          flex-shrink: 0;
          padding: 0;
          background: #08080A;
          border-top:
            1px solid rgba(255,255,255,.06);
        }

        .xph-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px 0 16px;
        }

        .xph-input-field {
          flex: 1;
          height: 42px;
          border-radius: 16px;
          padding: 0 14px;
          background: #19191D;
          border:
            1px solid rgba(255,255,255,.10);
          color: #fff;
          font-size: 12.5px;
          outline: none;
          transition:
            border-color .2s,
            background .2s;
        }

        .xph-input-field::placeholder {
          color: rgba(255,255,255,.36);
          font-size: 12.5px;
        }

        .xph-input-field:focus {
          border-color:
            rgba(201,168,106,.22);
          background: #1C1C20;
        }

        .xph-input-field:disabled {
          opacity: .55;
        }

        .xph-send-btn {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          flex-shrink: 0;
          background: #1E1E22;
          border:
            1px solid rgba(255,255,255,.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background .2s,
            border-color .2s,
            transform .15s;
        }

        .xph-send-btn:hover:not(:disabled) {
          background: #25252B;
          border-color:
            rgba(255,255,255,.12);
        }

        .xph-send-btn:active:not(:disabled) {
          transform: scale(.97);
        }

        .xph-send-btn:disabled {
          background:
            rgba(255,255,255,.06);
          opacity: .45;
        }

        .xph-send-btn svg {
          color:
            rgba(255,255,255,.75);
          width: 18px;
          height: 18px;
        }

        .xph-send-btn:disabled svg {
          color:
            rgba(255,255,255,.28);
        }

        .xph-footer {
          flex-shrink: 0;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top:
            1px solid rgba(255,255,255,.06);
          gap: 4px;
          background: #0B0B0D;
        }

        .xph-cta-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 12px 16px 16px 16px;
          background: transparent;
          width: 100%;
        }

        .xph-cta-btn {
          height: 34px;
          padding: 0 20px;
          border-radius: 999px;
          background: #000000;
          border: 0.3px solid #C9A86A;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.2px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: border-color .2s, transform .15s;
          white-space: nowrap;
          line-height: 1;
        }

        .xph-cta-btn:hover {
          border-color: #E8C97A;
          background: #000000;
        }

        .xph-cta-btn:active {
          transform: scale(0.98);
        }

        .xph-cta-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .xph-cta-btn-contact svg {
          stroke: #C9A86A;
        }

        .xph-cta-btn-call svg {
          stroke: #FFFFFF;
        }




        .xph-footer-text {
          font-size: 10px;
          letter-spacing: .04em;
          color: rgba(255,255,255,.48);
        }
        .xph-footer-brand {
          display: inline-flex;
          align-items: center;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: .025em;
          color: rgba(255,255,255,.90);
          text-decoration: none;
          line-height: 1;
        }

        .xph-footer-x {
          color: #C9A86A;
          font-weight: 800;
        }

        .xph-footer-dash {
          color: rgba(255,255,255,.65);
          margin: 0 1px;
          font-weight: 500;
        }

        .xph-footer-global {
          color: rgba(255,255,255,.90);
          font-weight: 600;
        }

        .xph-ask {
          position: absolute;
          bottom: 80px;
          right: 24px;
          display: ${showAsk ? 'block' : 'none'};
          pointer-events: auto;
          z-index: 9;
        }

        .xph-ask-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px 9px 10px;
          background: #151518;
          border:
            1px solid rgba(255,255,255,.10);
          border-radius: 16px;
          box-shadow:
            0 12px 32px rgba(0,0,0,.55),
            0 0 0 1px
              rgba(201,168,106,.08);
          white-space: nowrap;
          animation:
            xphFadeIn .55s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        @keyframes xphFadeIn {
          from {
            opacity: 0;
            transform:
              translateY(6px) scale(.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0) scale(1);
          }
        }

        .xph-ask-arrow {
          position: absolute;
          bottom: -5px;
          right: 20px;
          width: 9px;
          height: 9px;
          background: #151518;
          border-right:
            1px solid rgba(255,255,255,.10);
          border-bottom:
            1px solid rgba(255,255,255,.10);
          transform: rotate(45deg);
        }

        .xph-ask-avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          border:
            1px solid rgba(255,255,255,.08);
          flex-shrink: 0;
        }

        .xph-ask-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 10%;
          display: block;
        }

        .xph-ask-text {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: -.01em;
          color: #fff;
        }

        .xph-ask-close {
          margin-left: 4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background:
            rgba(255,255,255,.06);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .xph-minimized {
          position: absolute;
          inset: 0;
          display: ${isMinimized ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 14px;
          pointer-events: none;
        }

        .xph-minimized-card {
          padding: 9px 14px;
          border-radius: 10px;
          background: #0D0D0F;
          border:
            1px solid rgba(201,168,106,.18);
          box-shadow:
            0 10px 28px rgba(0,0,0,.5);
          pointer-events: auto;
        }

        .xph-minimized-text {
          font-size: 10.5px;
          color: rgba(255,255,255,.75);
          letter-spacing: .02em;
        }

        .xph-minimized-hint {
          font-size: 11px;
          color: rgba(255,255,255,.45);
        }

        .xph-modal {
          position: fixed;
          inset: 0;
          background:
            rgba(0,0,0,.72);
          align-items: center;
          justify-content: center;
          z-index: 2147483647;
          pointer-events: auto;
          padding: 18px;
        }

        .xph-modal-card {
          width: 420px;
          max-width: 100%;
          background: #0D0D0F;
          border:
            1px solid rgba(201,168,106,.24);
          border-radius: 14px;
          box-shadow:
            0 24px 80px rgba(0,0,0,.8);
          padding: 22px;
          color: #fff;
          max-height: 90vh;
          overflow-y: auto;
        }

        .xph-modal-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .xph-modal-sub {
          font-size: 13px;
          color: rgba(255,255,255,.72);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .xph-modal-label {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,.56);
          margin: 12px 0 6px;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .xph-modal-input,
        .xph-modal-textarea {
          width: 100%;
          background: #17171A;
          border:
            1px solid rgba(255,255,255,.10);
          color: #fff;
          border-radius: 10px;
          padding: 11px 12px;
          outline: none;
          font-size: 13px;
        }

        .xph-modal-input:focus,
        .xph-modal-textarea:focus {
          border-color:
            rgba(201,168,106,.34);
        }

        .xph-modal-textarea {
          min-height: 88px;
          resize: vertical;
        }

        .xph-modal-error {
          min-height: 18px;
          color: #FCA5A5;
          font-size: 12px;
          margin-top: 10px;
        }

        .xph-modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }

        .xph-modal-btn {
          flex: 1;
          height: 42px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13px;
        }

        .xph-modal-btn-primary {
          background:
            linear-gradient(
              180deg,
              #E8C98C 0%,
              #C9A86A 45%,
              #8A6D3B 100%
            );
          color: #111;
        }

        .xph-modal-btn-primary:disabled {
          opacity: .55;
          cursor: not-allowed;
        }

        .xph-modal-btn-secondary {
          background:
            rgba(255,255,255,.08);
          border:
            1px solid rgba(255,255,255,.10);
          color: #fff;
        }

        @media (max-width: 640px) {
          .xph-panel {
            bottom: 0;
            right: 0;
            width: 100vw;
            max-width: 100vw;
            height: 100dvh;
            max-height: 100dvh;
            border-radius: 0;
            border: none;
          }

          .xph-launcher {
            bottom: 18px;
            right: 18px;
          }

          .xph-ask {
            bottom: 84px;
            right: 18px;
          }
        }
      `}</style>

      <div className="xph-widget">

        {/* Launcher */}
        <button
          className={`xph-launcher ${
            isOpen ? 'xph-hidden' : ''
          }`}
          aria-label="Open LYRA chat"
          onClick={() => {
            openChat();
          }}
        >
          <span className="xph-launcher-pulse" />
          <span className="xph-launcher-pulse xph-delay" />

          <span className="xph-launcher-inner">
            <img
              src={CONFIG.AVATAR_URL}
              alt="LYRA"
              draggable={false}
            />
          </span>

          <span className="xph-launcher-dot" />
        </button>

        {/* Ask popup */}
        {showAsk && !isOpen && (
          <div className="xph-ask">
            <div className="xph-ask-inner">

              <div className="xph-ask-arrow" />

              <div className="xph-ask-avatar">
                <img
                  src={CONFIG.AVATAR_URL}
                  alt="LYRA"
                />
              </div>

              <div className="xph-ask-text">
                Ask LYRA about your bottlenecks
              </div>

              <button
                className="xph-ask-close"
                aria-label="Dismiss"
                onClick={(event) => {
                  event.stopPropagation();
                  dismissAsk();
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

            </div>
          </div>
        )}

        {/* Chat panel */}
        <section
          className={`xph-panel ${
            isOpen
              ? 'xph-open'
              : 'xph-closed'
          }`}
          aria-label="X-PHERIUM LYRA"
        >

          {/* Header */}
          <header className="xph-header">

            <div className="xph-header-avatar">

              <div className="xph-header-avatar-glow" />

              <div className="xph-header-avatar-ring">
                <img
                  src={CONFIG.AVATAR_URL}
                  alt="LYRA"
                />
              </div>

            </div>

            <div className="xph-header-info">

              <div className="xph-header-title">
                <span
                  style={{
                    color: '#C9A86A',
                  }}
                >
                  X
                </span>
                -PHERIUM
              </div>

              <div className="xph-header-sub">
                <span className="xph-header-sub-dot" />
                <span className="xph-header-sub-text">
                  ONLINE - LYRA AT YOUR SERVICE
                </span>
              </div>

              <div className="xph-header-tagline">
                {CONFIG.TAGLINE}
              </div>

            </div>

            <div className="xph-header-actions">

              <button
                className="xph-header-btn"
                aria-label="Minimize"
                onClick={() =>
                  closeChat(false)
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>

              <button
                className="xph-header-btn"
                aria-label="Close"
                onClick={() =>
                  closeChat(true)
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                  />
                </svg>
              </button>

            </div>

          </header>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="xph-messages"
          >

            {messages.length === 0 &&
            !isLoading ? (
              <div className="xph-empty">

                <div className="xph-empty-avatar">

                  <div className="xph-empty-avatar-glow" />

                  <div className="xph-empty-avatar-ring">
                    <img
                      src={CONFIG.AVATAR_URL}
                      alt="LYRA"
                    />
                  </div>

                </div>

                <div className="xph-empty-title">
                  Welcome to X-PHERIUM.
                </div>

                <div
                  className="xph-empty-sub"
                  dangerouslySetInnerHTML={{
                    __html:
                      'I’m <strong>LYRA</strong>. Tell me one task that you hate I’ll show you how our AI agent can eliminate it.',
                  }}
                />

                <div className="xph-empty-prompt">
                  What operational problem should we
                  look at first?
                </div>

                </div>
            ) : (
              <>
                {messages.map(
                  (message, index) => (
                    <div
                      key={`${message.ts}-${index}`}
                      className={`xph-msg ${
                        message.role === 'user'
                          ? 'xph-msg-user'
                          : 'xph-msg-ai'
                      } ${
                        message.error
                          ? 'xph-msg-error'
                          : ''
                      }`}
                    >

                      {message.role ===
                        'assistant' && (
                        <div className="xph-msg-avatar">
                          <img
                            src={
                              CONFIG.AVATAR_URL
                            }
                            alt="LYRA"
                          />
                        </div>
                      )}

                      <div className="xph-msg-bubble">
                        {message.content}
                      </div>

                    </div>
                  )
                )}

                {isLoading && (
                  <div className="xph-typing">

                    <div className="xph-msg-avatar">
                      <img
                        src={CONFIG.AVATAR_URL}
                        alt="LYRA"
                      />
                    </div>

                    <div className="xph-typing-bubble">

                      <div className="xph-typing-bar">
                        <div className="xph-typing-bar-fill" />
                      </div>

                      <div className="xph-typing-dots">
                        <span className="xph-typing-dot" />
                        <span className="xph-typing-dot" />
                        <span className="xph-typing-dot" />
                      </div>

                      <span className="xph-typing-label">
                        LYRA is understanding your objective
                      </span>

                    </div>

                  </div>
                )}
              </>
            )}

          </div>

          {/* Input */}
          <div className="xph-input-area">

            <form
              className="xph-input-row"
              onSubmit={submitMessage}
            >

              <input
                id="xph-lyra-input"
                className="xph-input-field"
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Tell me what you want to accomplish..."
                autoComplete="off"
                disabled={isLoading}
                maxLength={
                  CONFIG.MAX_MESSAGE_LENGTH
                }
              />

              <button
                className="xph-send-btn"
                type="submit"
                disabled={
                  isLoading ||
                  !input.trim()
                }
                aria-label="Send"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </button>

            </form>

            <div className="xph-cta-row">
              <button
                className="xph-cta-btn xph-cta-btn-contact"
                type="button"
                onClick={() => handleSend('want to talk to human')}
                style={{border: '0.3px solid #C9A86A', background: '#000000', color: '#FFFFFF'}}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M2 7l10 6 10-6"/>
                </svg>
                Contact Us
              </button>

              <a
                href="tel:+919999999999"
                className="xph-cta-btn xph-cta-btn-call"
                style={{ textDecoration: 'none', border: '0.8px solid #C9A86A', background: '#000000', color: '#FFFFFF' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Now
              </a>
            </div>


          </div>

          {/* Footer */}
          <footer className="xph-footer">
            <span className="xph-footer-text">
              Powered by
            </span>

            <a
              className="xph-footer-brand"
              href="https://www.xpheriumglobal.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="xph-footer-x">X</span>
              <span className="xph-footer-dash">-</span>
              <span>PHERIUM</span>
              <span className="xph-footer-global">&nbsp;Global</span>
            </a>
          </footer>

        </section>

        {/* Minimized state */}
        {isMinimized && !isOpen && (
          <div className="xph-minimized">

            <div className="xph-minimized-card">

              <div className="xph-minimized-text">
                LYRA is waiting • conversation preserved
              </div>

              <div className="xph-minimized-hint">
                Continue where you left off
              </div>

            </div>

          </div>
        )}

        
      </div>
    </>
  );
}
