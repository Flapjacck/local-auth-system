const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 4000;

// Global rate limiter - allows 100 requests per IP per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again after some time'
});

// Apply global rate limiting to all requests
app.use(globalLimiter);

app.use(cors()); // Allows frontend to talk to backend
app.use(bodyParser.json()); // Parses JSON from requests
app.use('/api', authRoutes); // Mount login/signup routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});