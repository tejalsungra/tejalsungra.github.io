const widget = document.getElementById('sustainbot-widget');

const chatHTML = `
  <div id="sustainbot-container">
    <div id="sustainbot-header">
      <span>SustainBot 🤖</span>
      <button id="minimize-btn">—</button>
    </div>
    <div id="sustainbot-messages"></div>
    <form id="sustainbot-form">
      <input type="text" id="sustainbot-input" placeholder="Ask me about sustainability..." autocomplete="off" />
      <button type="submit">➤</button>
    </form>
  </div>
  <button id="sustainbot-toggle">💬</button>
`;

widget.innerHTML = chatHTML;

const messages = document.getElementById('sustainbot-messages');
const form = document.getElementById('sustainbot-form');
const input = document.getElementById('sustainbot-input');
const toggle = document.getElementById('sustainbot-toggle');
const container = document.getElementById('sustainbot-container');
const minimize = document.getElementById('minimize-btn');

let knowledgeBase = [];

fetch('assets/chatbot/data.json')
  .then(res => res.json())
  .then(data => knowledgeBase = data);

const matchAnswer = (query) => {
  const cleanQuery = query.toLowerCase();
  for (let item of knowledgeBase) {
    for (let q of item.questions) {
      if (cleanQuery.includes(q)) {
        return item.answer;
      }
    }
  }
  return "I'm still learning. Try asking something else about sustainability 🌱.";
};

const appendMessage = (text, sender) => {
  const div = document.createElement('div');
  div.className = `sustainbot-msg ${sender}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage(userMsg, 'user');
  const botReply = matchAnswer(userMsg);
  appendMessage(botReply, 'bot');

  input.value = '';
});

toggle.addEventListener('click', () => {
  container.style.display = 'block';
  toggle.style.display = 'none';
});

minimize.addEventListener('click', () => {
  container.style.display = 'none';
  toggle.style.display = 'block';
});

// Auto-show on load after 2s
setTimeout(() => {
  container.style.display = 'block';
  toggle.style.display = 'none';
}, 2000);
