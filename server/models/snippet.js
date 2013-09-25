var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

var Snippet = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  keywords: { type: Array, index: true}
});

SnippetModel = mongoose.model('Snippet', Snippet);