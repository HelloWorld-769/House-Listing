const express = require("express");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const app = express();
const HouseSchema = require("./models/House.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const dbUrl =
  "mongodb+srv://HelloWorld:iggaIcN8ZQ2YzpHE@cluster0.he8dwcr.mongodb.net/?retryWrites=true&w=majority";

const validate = [
  check("title")
    .isLength({ min: 5, max: 50 })
    .withMessage("Title must be 5 chars long"),
  check("description")
    .isLength({ min: 10, max: 200 })
    .withMessage("Description should be between 10 to 200 characters"),
  check("address")
    .isLength({ min: 10, max: 100 })
    .withMessage("Address should be between 10 to 100 characters"),
  check("price").isNumeric().withMessage("Price should be a number"),
];

mongoose.connect(dbUrl, () => {
  userNewParser: true;
  useUnifiedTopology: true;
});

mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  HouseSchema.find()
    .then((data) => {
      res.send(data);
      //console.log(data);
    })
    .catch((err) => console.log(err));
});

app.post("/send", validate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const house = new HouseSchema({
    title: req.body.title,
    address: req.body.address,
    homeType: req.body.homeType,
    price: req.body.price,
    image: req.body.image,
    yearBuilt: req.body.yearBuilt,
    description: req.body.description,
  });
  house
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log("Unable to dave to the databse");
    });
});

// Update
// app.put("/:id", validate, (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const houseId = req.params.id;
//   HouseSchema.findByIdAndUpdate(houseId, {
//     title: req.body.title,
//     address: req.body.address,
//     homeType: req.body.homeType,
//     price: req.body.price,
//     image: req.body.image,
//     yearBuilt: req.body.yearBuilt,
//   })
//     .then((data) => {
//       console.log("Data updated sucessfully");
//       console.log(data);
//       res.send(data);
//     })
//     .catch((err) => console.log("Not updated"));
// });

app.put("/:id", validate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const currhouseId = req.params.id;
  HouseSchema.findById(currhouseId)
    .then((house) => {
      house.title = req.body.title;
      house.address = req.body.address;
      house.homeType = req.body.homeType;
      house.description = req.body.description;
      house.price = req.body.price;
      house.image = req.body.image;
      house.yearBuilt = req.body.yearBuilt;

      return house.save();
    })
    .then((Newdata) => {
      console.log(Newdata);
      res.send(Newdata);
    })
    .catch((err) => {
      console.log(err);
    });
});
// Delete request
app.delete("/delete/:id", (req, res) => {
  const houseId = req.params.id;
  HouseSchema.findByIdAndDelete(houseId)
    .then((dataNew) => {
      console.log("Data deleted sucessfully");
      res.send(dataNew);
    })
    .catch((err) => console.log(err));
});
const port = 3000;
app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
