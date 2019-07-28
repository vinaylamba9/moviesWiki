const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  year : { type: String, required: true },
  story: { type: String, required: true },
  cast: { type: [], required: true},
  poster: { type: String, required: true}
});

module.exports = mongoose.model("Movie", movieSchema);
