const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// 1. Connect to MongoDB
mongoose.connect('mongodb+srv://saraswathi:saraswathireddy99024@cluster0.mongodb.net/portfolioDB')
    .then(() => console.log('✅ Database Connected'))
    .catch(err => console.log('❌ Connection Error', err));

// 2. Define what a "Project" looks like in the Database
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});
const Project = mongoose.model('Project', projectSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// 3. Route to save a new project
app.post('/add-project', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.send('<h1>Success!</h1><p>Project added to Database.</p><a href="/">Go Back</a>');
    } catch (err) {
        res.status(500).send('Error saving project.');
    }
});

// 4. Start Server
app.listen(3000, () => console.log(' Portfolio running at http://localhost:3000'));
