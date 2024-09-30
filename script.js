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

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const usernameInput = document.getElementById('username-input');
const setUsernameButton = document.getElementById('set-username');

let username = localStorage.getItem('username') || '';

// Check if a username already exists in localStorage
if (username) {
    document.getElementById('username-container').style.display = 'none';
    chatWindow.style.display = 'flex';
    document.querySelector('.input-container').style.display = 'flex';
    displayMessages();
} else {
    document.getElementById('username-container').style.display = 'flex';
}

setUsernameButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        localStorage.setItem('username', username); // Save username in localStorage
        document.getElementById('username-container').style.display = 'none';
        chatWindow.style.display = 'flex';
        document.querySelector('.input-container').style.display = 'flex';
        displayMessages();
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && username) {
        const messagesRef = ref(database, 'messages/');
        push(messagesRef, { username, message, emoji: getEmoji(username) });
        messageInput.value = '';
    }
});

function displayMessages() {
    const messagesRef = ref(database, 'messages/');
    onValue(messagesRef, (snapshot) => {
        chatWindow.innerHTML = '';
        const messages = snapshot.val();
        if (messages) {
            Object.values(messages).forEach(({ username, message, emoji }) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<span>${emoji}</span> <strong>${username}:</strong> <p>${message}</p>`;
                chatWindow.appendChild(messageElement);
            });
        }
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
}

function getEmoji(username) {
    // Map username to a specific emoji
    const emojis = ['😀', '😎', '🤔', '🎉', '🥳'];
    const index = username.charCodeAt(0) % emojis.length;
    return emojis[index];
}

