const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/gigs', require('./routes/gigs'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/ledger', require('./routes/ledger'));
app.use('/api/hustle', require('./routes/hustle'));

app.get('/', (req, res) => res.send('GrindOS API running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
