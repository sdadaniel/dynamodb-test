const dynamoose = require("dynamoose");

const express = require("express")
const app = express();
const morgan = require("morgan");
const routes = require("./routes")

require("dotenv").config();


class App {
  constructor() {
    this.app = express();
    this.middleware()
    this.dbConnection()
    this.router()
  }


  //middleWare
  middleware() {
    app.use(morgan("dev"));
  }

  dbConnection() {
    //dynamoDB 연결
    dynamoose.aws.sdk.config.update({
      "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
      "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
      "region": process.env.AWS_REGION
    });
  }

  router() {

    this.app.get("/", (req, res) => {
      res.send("WelCome To DynamoDb")
    })
    
    this.app.use("/api", routes)
    
  }
}



module.exports = new App().app;