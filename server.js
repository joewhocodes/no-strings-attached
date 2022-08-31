const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose
    .connect('mongodb+srv://joe:test@habits.9o0tigu.mongodb.net/?retryWrites=true&w=majority')
    .catch((err) => console.log(err));

// DB SCHEMA AND MODEL
const postSchema = mongoose.Schema({
    title: String,
    description: String
})

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    res.send('Express is here');
});

app.post('/create', (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description,
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
})

app.get('/posts', (req, res) => {
    Post.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});

app.listen(3001, () => {
    console.log('server is running');
});