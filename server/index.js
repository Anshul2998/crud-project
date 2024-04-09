const mongo = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const signup = require("./signupschema");
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Home Page Called");
});

app.post("/adduser", (req, res) => {
  const Signup = new signup({
    name: req.body.nm,
    email: req.body.eid,
    password: req.body.pass,
  });
  Signup.save();
  return res.json({ success: "Data Submitted" });
});
//show user
app.get("/show", async (req, res) => {
  let data = await signup.find();
  //console.log(data);
  return res.json(data);
});

// delete user
app.get("/delete/:id", async (req, res) => {
  let uid = req.params.id;
  let data = await signup.deleteOne({ _id: new mongo.ObjectId(uid) });
  return res.json({ success: "Data Deleted" });
});
//edit data
app.get("/edit/:id", async (req, res) => {
  let uid = req.params.id;
  let data = await signup.findById({ _id: uid });
  //console.log(data);
  return res.json(data);
});
app.post("/update", async (req, res) => {
  let objectid = req.body._id;
  let updatadata = await signup.findByIdAndUpdate(objectid, {
    name: req.body.nm,
    email: req.body.eid,
    password: req.body.pass,
  });
  res.json({ success: "Record successfully updated" });
});

app.listen(port, () => {
  console.log(`Server is running on this ${port}`);
});
