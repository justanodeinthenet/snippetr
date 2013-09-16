/*
  *
  * API: Users
  *
*/

/* all users */
exports.list = function(req, res){
  return UserModel.find(function (err, snippets) {
    if (!err) {
      return res.send(users);
    } else {
      return console.log(err);
    }
  });
};

/* registration */
exports.add = function(req, res){
  var user;

  user = new UserModel({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });

  return res.send(user);
};

/* find user */
exports.find = function(req, res){
  return UserModel.findById(req.params.id, function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return console.log(err);
    }
  });
};

/* edit user */
exports.edit = function(req, res){
  return UserModel.findById(req.params.id, function (err, user) {
    user.password = req.body.password;
    return user.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(user);
    });
  });
};

/* delete user */
exports.delete = function(req, res){
  return UserModel.findById(req.params.id, function (err, user) {
    return user.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
};