document.getElementById("send-button").addEventListener("click", sendMessage);

function sendMessage() {
    const username = document.getElementById("username").value;
    const messageInput = document.getElementById("message-input").value;
    const chatBox = document.getElementById("chat-box");

    if (!username) {
        alert("Please enter a username.");
        return;
    }
    
    if (messageInput.trim()) {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${username}: ${messageInput}`;
        chatBox.appendChild(messageElement);
        document.getElementById("message-input").value = "";
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Handle image upload
    const imageUpload = document.getElementById("image-upload");
    if (imageUpload.files.length > 0) {
        const file = imageUpload.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageElement = document.createElement("img");
            imageElement.src = e.target.result;
            imageElement.style.maxWidth = "100%";
            chatBox.appendChild(imageElement);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        }
        reader.readAsDataURL(file);
        imageUpload.value = ""; // Reset the input
    }
}

onValue(messagesRef, (snapshot) => {
    chatBox.innerHTML = ""; // Clear chat box before adding new messages
    snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        const messageElement = document.createElement("div");

        // Check if the message is from the current user
        if (message.user === username) {
            messageElement.className = 'message sent'; // User's messages on the right
        } else {
            messageElement.className = 'message received'; // Other user's messages on the left
        }

        messageElement.innerHTML = `<span class="username">${message.user}</span>: ${message.text}`;

        // If there's an image URL, display the image
        if (message.imageUrl) {
            const imgElement = document.createElement("img");
            imgElement.src = message.imageUrl;
            imgElement.className = 'message-image';
            messageElement.appendChild(imgElement);
        }

        chatBox.appendChild(messageElement);
    });
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
});

