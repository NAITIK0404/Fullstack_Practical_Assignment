const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

mongoose.connect('mongodb://127.0.0.1:27017/jwtStudentCRUD').then(() => {
    console.log('MongoDB connected successfully');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });;

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.json({ token });
    }
    return res.status(401).send('Invalid credentials');
});

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
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

app.get('/api/students', authenticateJWT, async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/api/students', authenticateJWT, async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
});

app.delete('/api/students/:id', authenticateJWT, async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
