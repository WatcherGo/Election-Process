const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');

// Generate a random user ID for this session
const userId = 'user_' + Math.random().toString(36).substring(2, 10);
let currentState = "";
let currentCountry = "";
let currentNode = "Register";

// Handle dropdown selection
window.handleSelection = function(select) {
    const value = select.value;
    if (!value) return;
    
    // Disable the select after use
    select.disabled = true;
    
    // Simulate user sending the selection
    addMessage(value, true);
    
    // Update local state if it's a country or state
    if (["USA", "India"].includes(value)) {
        currentCountry = value;
    } else {
        currentState = value;
    }
    
    sendMessage(value);
};

// Function to add a message to the UI
function addMessage(text, isUser = false, options = []) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex items-end gap-3 message-animate ${isUser ? 'justify-end' : ''}`;
    
    let innerHTML = '';
    
    if (isUser) {
        innerHTML = `
            <div class="bg-gray-500 text-white p-4 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                <p class="text-sm leading-relaxed">${escapeHtml(text)}</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center shadow-sm shrink-0">
                <i class="fa-solid fa-user text-sm"></i>
            </div>
        `;
    } else {
        let optionsHtml = '';
        if (options && options.length > 0) {
            optionsHtml = `
                <div class="mt-4 pt-3 border-t border-blue-400">
                    <select class="w-full p-2 rounded-lg bg-white text-blue-600 font-bold outline-none cursor-pointer" onchange="handleSelection(this)">
                        <option value="" disabled selected>Choose your region...</option>
                        ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        innerHTML = `
            <div class="w-8 h-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shadow-sm shrink-0 mb-1">
                <i class="fa-solid fa-robot text-sm"></i>
            </div>
            <div class="bg-blue-600 border border-blue-700 text-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                <p class="text-sm leading-relaxed">${escapeHtml(text)}</p>
                ${optionsHtml}
            </div>
        `;
    }
    
    wrapper.innerHTML = innerHTML;
    chatContainer.appendChild(wrapper);
    scrollToBottom();
}

// Function to show/hide typing indicator
function setTyping(isTyping) {
    if (isTyping) {
        typingIndicator.classList.remove('hidden');
        scrollToBottom();
    } else {
        typingIndicator.classList.add('hidden');
    }
}

// Update the timeline UI based on the current node
function updateTimeline(nodeName) {
    const steps = ['Register', 'Research', 'Vote'];
    let reachedCurrent = false;

    steps.forEach(step => {
        const stepEl = document.getElementById(`step-${step}`);
        if (!stepEl) return;
        
        const icon = stepEl.querySelector('.step-icon');
        const title = stepEl.querySelector('.step-text');
        const desc = stepEl.querySelector('.step-desc');
        
        if (step === nodeName) {
            stepEl.classList.add('active');
            icon.className = 'w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 step-icon shadow-md transition-colors';
            title.className = 'font-bold text-gray-900 text-lg step-text transition-colors';
            desc.className = 'text-sm text-gray-500 mt-1 step-desc transition-colors';
            reachedCurrent = true;
        } else if (!reachedCurrent) {
            icon.className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center z-10 step-icon shadow-md transition-colors';
            icon.innerHTML = '<i class="fa-solid fa-check"></i>';
            title.className = 'font-bold text-gray-900 text-lg step-text transition-colors';
            desc.className = 'text-sm text-gray-500 mt-1 step-desc transition-colors';
        } else {
            stepEl.classList.remove('active');
            icon.className = 'w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10 step-icon transition-colors';
            if (step === 'Register') icon.innerHTML = '<i class="fa-solid fa-id-card"></i>';
            if (step === 'Research') icon.innerHTML = '<i class="fa-solid fa-book-open"></i>';
            if (step === 'Vote') icon.innerHTML = '<i class="fa-solid fa-envelope-open-text"></i>';
            title.className = 'font-bold text-gray-500 text-lg step-text transition-colors';
            desc.className = 'text-sm text-gray-400 mt-1 step-desc transition-colors';
        }
    });
}

// Send message to the backend
async function sendMessage(message) {
    setTyping(true);
    messageInput.disabled = true;
    sendButton.disabled = true;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                message: message,
                state: currentState,
                country: currentCountry
            })
        });

        const data = await response.json();
        
        if (data.next_node && data.next_node !== currentNode) {
            currentNode = data.next_node;
            updateTimeline(currentNode);
            
            if (currentNode === "Vote" && typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
        
        setTyping(false);
        addMessage(data.reply, false, data.options || []);

    } catch (error) {
        console.error('Error:', error);
        setTyping(false);
        addMessage("Sorry, I'm having trouble connecting right now. Please try again later.");
    } finally {
        messageInput.disabled = false;
        sendButton.disabled = false;
        messageInput.focus();
    }
}

// Utility functions
function scrollToBottom() {
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 10);
}

function escapeHtml(unsafe) {
    if (!unsafe) return "";
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Event Listeners
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    messageInput.value = '';
    
    sendMessage(message);
});

// Initial load
window.addEventListener('DOMContentLoaded', () => {
    updateTimeline(currentNode);
    sendMessage("start");
});
