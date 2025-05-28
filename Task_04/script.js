const form = document.getElementById("docForm");
const usernameInput = document.getElementById("username");
const contentInput = document.getElementById("docContent");
const docList = document.getElementById("docList");
const errorMsg = document.getElementById("errorMsg");
const themeToggle = document.getElementById("themeSwitcher");

// Load saved data and theme
document.addEventListener("DOMContentLoaded", () => {
  renderDocuments();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const content = contentInput.value.trim();

  if (!username || !content) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  errorMsg.textContent = "";

  const newDoc = {
    id: Date.now(), // Unique ID
    username,
    content,
    timestamp: new Date().toLocaleString()
  };

  const docs = getDocuments();
  docs.push(newDoc);
  localStorage.setItem("documents", JSON.stringify(docs));

  form.reset();
  renderDocuments();
});

// Get documents from localStorage
function getDocuments() {
  const stored = localStorage.getItem("documents");
  return stored ? JSON.parse(stored) : [];
}

// Save updated document list
function saveDocuments(docs) {
  localStorage.setItem("documents", JSON.stringify(docs));
}

// Render documents
function renderDocuments() {
  docList.innerHTML = "";
  const docs = getDocuments();

  if (docs.length === 0) {
    docList.innerHTML = "<li>No documents shared yet.</li>";
    return;
  }

  docs.forEach((doc) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${doc.username}</strong> <em>(${doc.timestamp})</em><br/>
      <p>${doc.content}</p>
      <button class="delete-btn" onclick="deleteDocument(${doc.id})">Delete</button>
    `;
    docList.appendChild(li);
  });
}

// Delete document
function deleteDocument(id) {
  let docs = getDocuments();
  docs = docs.filter(doc => doc.id !== id);
  saveDocuments(docs);
  renderDocuments();
}

// Theme toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
