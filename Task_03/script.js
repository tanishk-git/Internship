const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const botReplies = {
  "hi": "Hello! How can I help you today?",
  "hello": "Hi there! Need any help?",
  "how are you": "I'm just a bot, but I'm doing great!",
  "bye": "Goodbye! Have a great day!",
  "thanks": "You're welcome!",
};

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = userInput.value.trim();
  
  if (input === "") {
    alert("Please enter a message.");
    return;
  }

  displayMessage(input, "user-message");
  userInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(input);
    displayMessage(reply, "bot-message");
  }, 500);
});

function displayMessage(message, className) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(className);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(input) {
  const msg = input.toLowerCase();
  return botReplies[msg] || "Sorry, I didn't understand that.";
}
