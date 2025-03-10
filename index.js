const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// ✅ Initialize Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Failed', err));

// ✅ Use Routes
app.use('/api/auth', authRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('SpeechFlow Backend is Running...');
});

// ✅ Start the Server
app.listen(5000, () => console.log("✅ Backend running on port 5000 🚀"));
