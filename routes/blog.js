const express = require('express');
const db = require('../data/database');  //go up one to get database
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
  const posts = db.getDb().collection('posts').find({}, {title: 1, summary: 1, 'author.name': 1}).toArray();   //projection
  res.render('posts-list', {posts: posts});
});

router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection('authors').find().toArray();         //getting the collection of authors, returns a promise
  
  res.render('create-post', {authors: authors});
});


router.post('/posts', async function(req, res){
  const authorId = new ObjectId(req.body.author);
  const author = await db.getDb().collection('authors').findOne({_id: authorId});
  
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    }
  };
  const result = await db.getDb().collection('posts').insertOne(newPost);
  console.log(result);  //checking result, temporary
  res.redirect('/posts');
});

module.exports = router;
