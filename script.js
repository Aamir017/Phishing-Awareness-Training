document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    try {
        const response = await fetch('http://localhost:3001/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message })
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Email sent successfully!');
            // Clear the form
            this.reset();
        } else {
            alert('Failed to send email. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the email. Please try again.');
    }
});

// Voice training simulation
const trainingScript = [
    {
        role: 'caller',
        text: 'Hello, this is Sarah from the Security Training Team. I\'m conducting a brief interactive training session about phishing awareness.',
        delay: 2000
    },
    {
        role: 'caller',
        text: 'Let me share a scenario with you. Imagine you receive an urgent email from your bank claiming your account has been compromised.',
        delay: 3000
    },
    {
        role: 'caller',
        text: 'The email says: "Your account has been locked due to suspicious activity. Click here to verify your identity."',
        delay: 3000
    },
    {
        role: 'caller',
        text: 'What would you do in this situation? Would you click the link?',
        delay: 3000
    },
    {
        role: 'caller',
        text: 'This is a common phishing tactic. Legitimate banks never ask you to verify your identity through email links.',
        delay: 3000
    },
    {
        role: 'caller',
        text: 'Instead, you should: 1) Never click suspicious links 2) Contact your bank directly 3) Report suspicious emails to your IT department',
        delay: 3000
    },
    {
        role: 'caller',
        text: 'Thank you for participating in this security awareness training. Stay safe online!',
        delay: 2000
    }
];

let currentScriptIndex = 0;
let isCallActive = false;
let scriptInterval;

function startCall() {
    isCallActive = true;
    currentScriptIndex = 0;
    
    // Update UI
    document.getElementById('startCall').disabled = true;
    document.getElementById('endCall').disabled = false;
    document.getElementById('callStatus').textContent = 'Call in progress...';
    document.getElementById('callerInfo').classList.remove('hidden');
    document.getElementById('callTranscript').innerHTML = '';
    
    // Start the script
    playNextScript();
}

function endCall() {
    isCallActive = false;
    clearInterval(scriptInterval);
    
    // Update UI
    document.getElementById('startCall').disabled = false;
    document.getElementById('endCall').disabled = true;
    document.getElementById('callStatus').textContent = 'Call ended';
    document.getElementById('callerInfo').classList.add('hidden');
    document.getElementById('callTranscript').innerHTML = 'Click "Start Training Call" to begin a new training session.';
}

function playNextScript() {
    if (!isCallActive || currentScriptIndex >= trainingScript.length) {
        endCall();
        return;
    }

    const script = trainingScript[currentScriptIndex];
    const transcriptBox = document.getElementById('callTranscript');
    
    // Add the message to the transcript
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${script.role}`;
    messageDiv.innerHTML = `<strong>${script.role === 'caller' ? 'Caller' : 'You'}:</strong> ${script.text}`;
    transcriptBox.appendChild(messageDiv);
    transcriptBox.scrollTop = transcriptBox.scrollHeight;
    
    // Move to next script after delay
    currentScriptIndex++;
    scriptInterval = setTimeout(playNextScript, script.delay);
}

// Event listeners for call controls
document.getElementById('startCall').addEventListener('click', startCall);
document.getElementById('endCall').addEventListener('click', endCall);

// Add some interactivity to the page
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 