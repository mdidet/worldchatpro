// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2tOaKpzJ3HSuKL3Dmb86lBEQPdaiowhQ",
    authDomain: "worldchatpro.firebaseapp.com",
    projectId: "worldchatpro",
    storageBucket: "worldchatpro.appspot.com",
    messagingSenderId: "846276115463",
    appId: "1:846276115463:web:5605db88ab543677f7bea2",
    measurementId: "G-SHWXM4VLYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Get DOM elements
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to display messages
function displayMessages() {
    const messagesRef = ref(database, 'messages/');
    onValue(messagesRef, (snapshot) => {
        chatWindow.innerHTML = ''; // Clear the chat window
        const messages = snapshot.val();
        if (messages) {
            Object.values(messages).forEach((msg) => {
                const messageElement = document.createElement('div');
                messageElement.textContent = msg;
                chatWindow.appendChild(messageElement);
            });
        }
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
    });
}

// Send button click event
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const messagesRef = ref(database, 'messages/');
        push(messagesRef, message); // Add message to Firebase
        messageInput.value = ''; // Clear the input field
    }
});

// Load messages when the page loads
window.onload = displayMessages;
const messageElement = document.createElement('div');
messageElement.classList.add('message');
messageElement.innerHTML = `<p>${msg}</p>`;
chatWindow.appendChild(messageElement);
