const express = require('express');
const { processData } = require('./controllers/bfhlController');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/bfhl', processData);

app.use((req, res) => {
  res.status(404).json({ is_success: false, error: 'Route not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ is_success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
