document.addEventListener("DOMContentLoaded", () => {
  // Create chatbot bubble
  const bubble = document.createElement("div");
  bubble.id = "chatbot-bubble";
  bubble.innerHTML = "💬";
  document.body.appendChild(bubble);

  // Create chat window
  const chatWindow = document.createElement("div");
  chatWindow.id = "chatbot-window";
  chatWindow.innerHTML = `
    <div class="chatbot-header">
      <span>SustainBot</span>
      <button id="minimize-chat">−</button>
    </div>
    <div class="chatbot-messages" id="chatbot-messages"></div>
    <form id="chatbot-form" autocomplete="off">
      <input type="text" id="chatbot-input" placeholder="Ask me anything..." required />
    </form>
  `;
  document.body.appendChild(chatWindow);

  // Auto open on load
  chatWindow.style.display = "block";

  // Minimize
  bubble.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
    document.getElementById("chatbot-input").focus();
  });

  document.getElementById("minimize-chat").addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  // Chat functionality
  const messages = document.getElementById("chatbot-messages");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");

  let responses = [];
  fetch("assets/chatbot/data/responses.json")
    .then(res => res.json())
    .then(data => responses = data);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = input.value.trim();
    if (!userInput) return;

    appendMessage("user", userInput);
    input.value = "";
    input.focus(); // ✅ Reopen keyboard on mobile

    const found = responses.find(entry =>
      entry.keywords.some(kw => userInput.toLowerCase().includes(kw))
    );

    const reply = found
      ? found.response
      : "Sorry, I don't have an answer for that yet. Try another topic!";

    setTimeout(() => appendMessage("bot", reply), 500);
  });

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `chat-msg ${sender}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
});
