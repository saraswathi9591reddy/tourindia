const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANT: Replace the link below with your real MongoDB Atlas link
const MONGO_URI = "mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/portfolio";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log("DB Error: ", err));

const Project = mongoose.model('Project', {
    title: String,
    description: String
});

app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.listen(5000, () => console.log("Server is running on port 5000"));