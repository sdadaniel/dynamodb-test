const dynamoose = require("dynamoose");
const db = {};


db.Cat = dynamoose.model("Cat", new dynamoose.Schema({
  "name": String
}), {
  "create": true
});




module.exports = db;