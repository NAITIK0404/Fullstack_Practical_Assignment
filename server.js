const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/userRegistration').then(() => {
    console.log('MongoDB connected successfully');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  files: [String]
});
const User = mongoose.model('User', userSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', upload.array('files'), async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    files: req.files.map(file => file.filename)
  });
  await user.save();
  res.redirect('/files');
});

app.get('/files', async (req, res) => {
  const users = await User.find();
  res.render('files', { users });
});

app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);
  res.download(file);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
