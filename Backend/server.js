const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 4000;

app.use(cors()); // Allows frontend to talk to backend
app.use(bodyParser.json()); // Parses JSON from requests
app.use('/api', authRoutes); // Mount our login/signup routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
