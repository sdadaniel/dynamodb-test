const dynamoose = require("dynamoose");

const express = require("express")
const app = express();
const morgan = require("morgan");
require("dotenv").config();

app.use(morgan("dev"));

app.use((req, res, next) => {

  dynamoose.aws.sdk.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": process.env.AWS_REGION
  });

  next()
})
app.get("/", async (req, res) => {

  const schema = new dynamoose.Schema({
    "id": String,
    "age": Number
  }, {
    "saveUnknown": true,
    "timestamps": true
  });

  const Cat = dynamoose.model("Cat", {
    "name": String
  });
  dynamoose.model("Cat", new dynamoose.Schema({
    "name": String
  }), {
    "create": false
  });

  console.log(schema)

  const newCat = new Cat({
    "name": "Tim"
  })

  try {
    await newCat.save();
    console.log("Save operation was successful.");
  } catch (error) {
    console.error(error);
  }
  console.log(newCat.name);


  res.send("aabb");



})

app.get("/test", (req, res) => {

  // const schema = new dynamoose.Schema({
  //   "id": String,
  //   "age": Number
  // }, {
  //   "saveUnknown": true,
  //   "timestamps": true
  // });


  res.send("test");



})

app.listen(8000, () => {
  console.log("8000포트 대기중")
})