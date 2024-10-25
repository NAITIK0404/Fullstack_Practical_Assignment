const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default || require('connect-redis');
const redis = require('redis');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/loginApp').then(() => {
    console.log('MongoDB connected successfully');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });
;

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    if (user) {
        req.session.userId = user._id;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.userId) {
        res.sendFile(__dirname + '/views/dashboard.html');
    } else {
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
