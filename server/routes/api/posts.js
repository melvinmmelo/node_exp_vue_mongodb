const express = require("express");
const mongo = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find().toArray());
});

router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({ _id: new mongo.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostCollection() {
  const client = await mongo.MongoClient.connect(
    "mongodb+srv://mongolloyd:code1234@cluster0-1b4gi.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return client.db("vue_exp_full_stack").collection("posts");
}

module.exports = router;
