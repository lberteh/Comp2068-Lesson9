var mongoose = require('mongoose');

// reference passport-local-mongoose so passport can use this model for user Authentication
var plm = require('passport-local-mongoose');

// define the user schema
var AccountSchema = new mongoose.Schema({
  // username: String     ----  I can use an empty schema if all I need is username and password, it auto creates these two fields
});

// used for configuration options - do we need this???
AccountSchema.plugin(plm); // check documentation to see options for validation

// make it public
module.exports = mongoose.model('Account', AccountSchema);
