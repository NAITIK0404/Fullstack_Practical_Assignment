const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Student = require('./models/Student');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://127.0.0.1:27017/jwtStudentCRUD').then(() => {
    console.log('MongoDB connected successfully');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });;

const authenticateJWT = (req, res, next) => {
    const token = req.session.token;
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const username = 'admin';
    const password = 'password';

    if (req.body.username === username && req.body.password === password) {
        const token = jwt.sign({ username }, 'your_jwt_secret');
        req.session.token = token;
        res.redirect('/students');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/students', authenticateJWT, async (req, res) => {
    const students = await Student.find();
    res.render('students', { students });
});

app.post('/students', authenticateJWT, async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.redirect('/students');
});

app.post('/students/delete/:id', authenticateJWT, async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/students');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
