require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            text: message,
            html: message.replace(/\n/g, '<br>')
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// Training scenario endpoint
app.post('/generate-scenario', async (req, res) => {
    try {
        // Generate AI script using OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a security training specialist creating realistic phishing scenarios for educational purposes. Focus on common tactics used by attackers and how to identify them."
                },
                {
                    role: "user",
                    content: "Generate a detailed phishing scenario that includes: 1) A realistic situation (e.g., bank account, package delivery, work email) 2) Common red flags and warning signs 3) What information attackers might request 4) How to verify if it's legitimate 5) What actions to take if suspicious"
                }
            ],
        });

        const scenario = completion.choices[0].message.content;
        res.json({ success: true, scenario });
    } catch (error) {
        console.error('Error generating scenario:', error);
        res.status(500).json({ success: false, message: 'Failed to generate scenario' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 