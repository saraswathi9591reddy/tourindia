const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB Connection (FIXED)
mongoose.connect('mongodb+srv://saraswathi:saraswathireddy99024@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority')
    .then(() => console.log('✅ Database Connected'))
    .catch(err => console.log('❌ Connection Error:', err));

// Schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});
const Project = mongoose.model('Project', projectSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.post('/add-project', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.send('<h1>Success!</h1><p>Project added to Database.</p><a href="/">Go Back</a>');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving project.');
    }
});

// Server
app.listen(3000, () => console.log('🚀 Running at http://localhost:3000'));

