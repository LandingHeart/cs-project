const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SECRET = "mynameis";
const AdminSchema = mongoose.Schema({
  airline:{
    type: String, 
    require: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

AdminSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

AdminSchema.pre("save", function(next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

//new way

AdminSchema.methods.generateToken = function(cb) {
  var admin = this;
  var token = jwt.sign(admin._id.toHexString(), SECRET);

  admin.token = token;
  admin.save(function(err, admin) {
    if (err) return cb(err);
    cb(null, admin);
  });
};

AdminSchema.statics.findByToken = function(token, cb) {
  var admin = this;

  jwt.verify(token, SECRET, function(err, decode) {
    admin.findOne({ _id: decode, token: token }, function(err, admin) {
      if (err) return cb(err);
      cb(null, admin);
    });
  });
};


//on log out 
AdminSchema.methods.deleteToken = function(token, cb) {
  var user = this;

  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("Admin", AdminSchema);
