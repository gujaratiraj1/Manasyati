const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('.'));

// Endpoint to get client logos
app.get('/ourclients', async (req, res) => {
  try {
    const files = await fs.readdir('ourclients');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read client logos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
