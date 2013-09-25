/*
  *
  * API: snippet
  *
*/

/* all users */
exports.list = function(req, res){
  return SnippetModel.find(function (err, snippets) {
    if (!err) {
      return res.send(snippets);
    } else {
      return console.log(err);
    }
  });
};

/* registration */
exports.add = function(req, res){
  var snippet;
  var body = req.body.body,
      keywords = body.split(" ");

  snippet = new SnippetModel({
    title: req.body.title,
    body: req.body.body,
    keywords: keywords
  });

  snippet.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });

  return res.send(snippet);
};

/* find snippet */
exports.search = function(req, res){
  return SnippetModel.find( {keywords: req.params.id }, function (err, snippet) {
    if (!err) {
      return res.send(snippet);
    } else {
      return console.log(err);
    }
  });
};

/* find snippet */
exports.find = function(req, res){
  return SnippetModel.findById(req.params.id, function (err, snippet) {
    if (!err) {
      return res.send(snippet);
    } else {
      return console.log(err);
    }
  });
};

/* edit snippet */
exports.edit = function(req, res){
  return SnippetModel.findById(req.params.id, function (err, snippet) {
    snippet.password = req.body.password;
    return snippet.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(snippet);
    });
  });
};

/* delete snippet */
exports.delete = function(req, res){
  return SnippetModel.findById(req.params.id, function (err, snippet) {
    return snippet.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
};