const bcrypt = require("bcrypt");

const password = "Admin@123";  // change to the password you want
const hash = bcrypt.hashSync(password, 10);

console.log("Your bcrypt hash:", hash);
