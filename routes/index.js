const {
  Router
} = require('express');
const router = Router();

const dynamoDb = require("../models")

router.get('/create/:name', async (req, res) => {


  const newCat = new dynamoDb.Cat({
    "name": req.params.name
  })

  try {
    await newCat.save();
    console.log("Save operation was successful.");
  } catch (error) {
    console.error(error);
  }

  res.json("aabb");
});

module.exports = router;