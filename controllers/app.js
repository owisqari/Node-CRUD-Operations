const express = require("express");
const url = require("mongoose");
const CarsDB = require("../modules/Cars");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

url
  .connect(
    "mongodb+srv://admin:admin@cluster0.e0ld66h.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
  });

//config ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.send("Hello World");
});

//adding new car to the database and redirecting to the carsView page using forms

app.get("/carsView", (req, res) => {
  CarsDB.find()
    .then((data) => {
      res.render("carsView.ejs", { cars: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

//adding new car to the database and redirecting to the carsView page using forms
app.post("/carsView", (req, res) => {
  const newCar = new CarsDB({
    name: req.body.carName,
    model: req.body.model,
    driverName: req.body.driverName,
  });
  newCar
    .save()
    .then(() => {
      res.redirect("/carsView");
    })
    .catch((err) => {
      console.log(err);
    });
});

//endpoint that show all the cars as array.
app.get("/carsArray", (req, res) => {
  CarsDB.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//removing car record from the database using the id
app.get("/removeCar/:id", (req, res) => {
  CarsDB.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/carsView");
    })
    .catch((err) => {
      console.log(err);
    });
});

//removing car record from the database using the driver name
app.get("/removeCarBydriverName/:driverName", (req, res) => {
  CarsDB.deleteOne({ driverName: req.params.driverName })
    .then(() => {
      res.redirect("/carsView");
    })
    .catch((err) => {
      console.log(err);
    });
});

//displaying the car details in the showCar page using the id as path parameter
app.get("/showCar/:id", (req, res) => {
  CarsDB.findById(req.params.id)
    .then((data) => {
      res.render("showCar.ejs", { car: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

//testing port 8080
app.listen(8888, () => {
  console.log("Server is running on port 8080");
});
