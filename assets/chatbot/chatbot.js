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
    <form id="chatbot-form">
      <input type="text" id="chatbot-input" placeholder="Ask me anything..." autocomplete="off" required />
    </form>
  `;
  document.body.appendChild(chatWindow);

  // Auto open on load
  chatWindow.style.display = "block";

  // Toggle visibility
  bubble.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
    input.focus();
  });

  document.getElementById("minimize-chat").addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  const messages = document.getElementById("chatbot-messages");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");

  // Load JSON data
  let responses = [];
  fetch("assets/chatbot/data/responses.json")
    .then(res => res.json())
    .then(data => {
      responses = data;
      appendMessage("bot", "Hi there! 👋 I’m SustainBot. How can I help you today? Try asking about ‘carbon emissions’, ‘circular economy’, or ‘SDG’.");
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = input.value.trim();
    if (!userInput) return;

    appendMessage("user", userInput);
    input.value = "";

    // Match greetings
    const greetingRegex = /^(hi|hello|hey|how are you)\b/i;
    if (greetingRegex.test(userInput)) {
      setTimeout(() => typeMessage("bot", "Hello! I'm here to help with sustainability topics 🌱. You can ask me about ESG, Scope 3, CSRD, and more."), 400);
      return;
    }

    // Match keywords from JSON
    const found = responses.find(entry =>
      entry.keywords.some(kw => userInput.toLowerCase().includes(kw))
    );

    const reply = found
      ? found.response
      : "Sorry, I don’t have an answer for that yet. Try asking about circular economy, LCA, or climate strategy.";

    setTimeout(() => typeMessage("bot", reply), 500);
  });

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `chat-msg ${sender}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function typeMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `chat-msg ${sender}`;
    messages.appendChild(div);

    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        div.textContent += text.charAt(i);
        messages.scrollTop = messages.scrollHeight;
        i++;
      } else {
        clearInterval(typing);
      }
    }, 20);
  }
});
