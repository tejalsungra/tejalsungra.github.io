document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("sustainbot-widget");

  widget.innerHTML = `
    <button id="chat-button">💬 Chat</button>
    <div id="chat-box">
      <div id="chat-header">SustainBot</div>
      <div id="chat-messages"></div>
      <input type="text" id="chat-input" placeholder="Ask me anything...">
    </div>
  `;

  const chatButton = document.getElementById("chat-button");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  chatButton.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  });

  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const userMessage = chatInput.value;
      appendMessage("user", userMessage);
      respond(userMessage.toLowerCase());
      chatInput.value = "";
    }
  });

  function appendMessage(type, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${type}`;
    bubble.innerText = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function respond(input) {
    let reply = "Sorry, I’m still learning. Please ask a different question.";

    if (input.includes("scope 3")) {
      reply = "The Scope 3 Estimator helps you estimate indirect emissions using category-specific logic.";
    } else if (input.includes("csrd")) {
      reply = "The CSRD Navigator guides you through EU reporting requirements step-by-step.";
    } else if (input.includes("circular")) {
      reply = "The Circularity Dashboard helps you track material flows and circular KPIs.";
    } else if (input.includes("contact")) {
      reply = "You can reach us at example@example.com or use the Contact page.";
    }

    setTimeout(() => appendMessage("bot", reply), 600);
  }
});

