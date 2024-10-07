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
