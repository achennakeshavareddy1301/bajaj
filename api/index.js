const express = require('express');
const { processData } = require('../controllers/bfhlController');

const app = express();
app.use(express.json());

app.post('/bfhl', processData);

app.get('/', (_req, res) => res.json({ status: 'ok' }));

module.exports = app;
