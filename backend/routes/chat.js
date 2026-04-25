const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
       return res.status(500).json({ error: 'Gemini API key is not configured' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const promptContext = `
You are a helpful and knowledgeable AI assistant for "Krisha Krishi Agro", a premium agriculture dealership in India. 
We specialize in Mahindra tractors and advanced farming machinery.
Key products: Mahindra Yuvo, Jivo, Novo, and various implements like Rotavators and Ploughs.
Goal: Be helpful, polite, and guide the customer towards our tractor range.
If the customer asks something unrelated to farming or our business, politely steer them back to our products.

Customer query: ${message}
    `;

    try {
      const result = await model.generateContent(promptContext);
      const response = await result.response;
      const text = response.text();
      res.json({ response: text });
    } catch (aiError) {
      console.error('Gemini API Invocation Error:', aiError);
      // Fallback response if API limit reached or key invalid
      res.json({ 
        response: "I'm currently specialized in tractors but I'm having a slight technical glitch. For immediate assistance with pricing or models, please call our sales team at +91 12345 67890 or visit our Contact Us page!" 
      });
    }
  } catch (error) {
    console.error('Server Chat Route Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
