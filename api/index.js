const express = require('express');
const path = require('path');
const { processData } = require('../controllers/bfhlController');

const app = express();
app.use(express.json());

// Serve a very small HTML UI for manual testing
app.get('/', (_req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
<!doctype html>
<html>
  <head><meta charset="utf-8"><title>BFHL Tester</title></head>
  <body>
    <h3>POST /bfhl</h3>
    <p>Enter JSON like: {"data":["a","1","334","4","R","$"]}</p>
    <textarea id="payload" rows="6" cols="60">{ "data": ["a","1","334","4","R","$"] }</textarea><br/>
    <button id="send">Send</button>
    <pre id="out"></pre>
    <script>
      const btn = document.getElementById('send');
      btn.onclick = async () => {
        const body = document.getElementById('payload').value;
        try {
          const r = await fetch('/bfhl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });
          const txt = await r.text();
          document.getElementById('out').textContent = txt;
        } catch (e) {
          document.getElementById('out').textContent = e.message;
        }
      };
    </script>
  </body>
</html>
  `);
});

// The required POST route
app.post('/bfhl', processData);

module.exports = app;
