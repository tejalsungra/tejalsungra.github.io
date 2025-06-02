document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('sustainbot-widget');
  widget.innerHTML = `
    <div id="chat-toggle" style="position: fixed; bottom: 20px; right: 20px; background: #007554; color: white; padding: 16px 20px; border-radius: 50px; cursor: pointer; z-index: 9999; font-weight: bold; font-size: 20px;">
      💬
    </div>
    <div id="chatbox" style="display:none; position:fixed; bottom:80px; right:20px; width:320px; max-height:460px; background:white; border-radius:10px; box-shadow:0 0 15px rgba(0,0,0,0.25); z-index: 9999; overflow: hidden; display: flex; flex-direction: column;">
      <div style="background:#004643; color:white; padding:10px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;">
        SustainBot
        <span id="minimize-chat" style="cursor:pointer; font-size:18px;">✖</span>
      </div>
      <div id="chat-content" style="padding:10px; flex-grow:1; overflow-y:auto; font-size:14px; color:#333;"></div>
      <div style="padding:10px; display:flex; gap:5px;">
        <input type="text" id="chat-input" style="flex:1; padding:6px; border:1px solid #ccc; border-radius:4px;" placeholder="Ask something..." />
        <button id="send-btn" style="padding:6px 10px; background:#007554; color:white; border:none; border-radius:4px;">Send</button>
      </div>
    </div>
  `;

  const toggle = document.getElementById('chat-toggle');
  const chatbox = document.getElementById('chatbox');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const content = document.getElementById('chat-content');
  const minimize = document.getElementById('minimize-chat');

  // Toggle visibility on button click
  toggle.addEventListener('click', () => {
    chatbox.style.display = 'flex';
    toggle.style.display = 'none';
  });

  minimize.addEventListener('click', () => {
    chatbox.style.display = 'none';
    toggle.style.display = 'block';
  });

  // Auto-open after 5 seconds
  setTimeout(() => {
    chatbox.style.display = 'flex';
    toggle.style.display = 'none';
  }, 5000);

  const sendMessage = () => {
    const msg = input.value.trim();
    if (msg) {
      content.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
      content.innerHTML += `<div><strong>Bot:</strong> This is a demo response.</div>`;
      input.value = '';
      content.scrollTop = content.scrollHeight;
    }
  };

  // Send on click
  sendBtn.addEventListener('click', sendMessage);

  // Send on Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
