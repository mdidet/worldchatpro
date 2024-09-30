// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getDatabase, ref, onValue, push, get } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

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

let username = '';
let userEmoji = '';

// Generate a random emoji
function generateEmoji() {
    return String.fromCodePoint(0x1F600 + Math.floor(Math.random() * 80));
}

// Check if the username exists in the database
function checkUsernameExists(username) {
    const usersRef = ref(database, 'users/');
    return get(usersRef).then((snapshot) => {
        const users = snapshot.val();
        return users && Object.values(users).some(user => user.username === username);
    });
}

// Set username
setUsernameButton.addEventListener('click', async () => {
    username = usernameInput.value.trim();
    if (username) {
        const exists = await checkUsernameExists(username);
        if (exists) {
            alert('Username already taken. Please choose a different one.');
            return;
        }
        userEmoji = generateEmoji(); // Assign a unique emoji to the user
        const usersRef = ref(database, 'users/');
        push(usersRef, { username, emoji: userEmoji });
        
        document.getElementById('username-container').style.display = 'none';
        chatWindow.style.display = 'flex';
        document.querySelector('.input-container').style.display = 'flex';
        displayMessages();
    }
});

// Send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && username) {
        const messagesRef = ref(database, 'messages/');
        push(messagesRef, { username, message, emoji: userEmoji });
        messageInput.value = '';
    }
});

// Display messages
function displayMessages() {
    const messagesRef = ref(database, 'messages/');
    onValue(messagesRef, (snapshot) => {
        chatWindow.innerHTML = '';
        const messages = snapshot.val();
        if (messages) {
            Object.values(messages).forEach(({ username, message, emoji }) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `
                    <span style="font-size: 30px; margin-right: 10px;">${emoji}</span>
                    <p><strong>${username}:</strong> ${message}</p>`;
                chatWindow.appendChild(messageElement);
            });
        }
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
}
