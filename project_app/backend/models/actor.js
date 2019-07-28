const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
  name: { type: String, required: true },
  gender : { type: String, required: true },
  dob: { type: String, required: true },
  bio: { type: String, required: true}
});

module.exports = mongoose.model("Actor", actorSchema);
