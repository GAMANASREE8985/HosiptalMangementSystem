

const mongoose = require("mongoose");

mongoose.connect("your_atlas_uri_here")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection error:", err));
