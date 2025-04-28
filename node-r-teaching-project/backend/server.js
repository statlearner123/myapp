const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

app.get('/', (req, res) => {
  res.send('Node.js R Teaching Project Backend');
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
