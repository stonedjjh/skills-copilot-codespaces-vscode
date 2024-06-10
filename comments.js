// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Read data from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', function(req, res) {
  var comment = comments.filter(function(comment) {
    return comment.id == req.params.id;
  })[0];

  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
  } else {
    res.json(comment);
  }
});

// Add a new comment
app.post('/comments', function(req, res) {
  var comment = {
    id: Date.now(),