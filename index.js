const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let nextCarId = 1;

let cars = [];

//GET /cars
app.get("/cars", (req, res) => {
  console.log("GET /cars");
  res.status(200).json(cars);
});

//POST /cars
app.post("/cars", (req, res) => {
  console.log("POST /cars");
  req.body.id = nextCarId;
  cars.push(req.body);
  nextCarId++;
  console.log(cars);
  res.status(201).json({ message: "car added" });
});

//GET /cars/{carsId}
app.get("/cars/:id", (req, res) => {
  console.log("GET /cars/:id", req.params.id);
  let carFound = cars.find((car) => car.id === parseInt(req.params.id, 10));
  if (carFound) {
    res.status(200).json(carFound);
  } else {
    res.status(404).json({ error: "No car by that id" });
  }
});

//PUT /cars/{carsId}
app.put("/cars/:id", (req, res) => {
  console.log("PUT /cars/:id", req.params.id);
  const index = cars.findIndex((car) => {
    return car.id === parseInt(req.params.id, 10);
  });
  if (index !== -1) {
    cars[index].make = req.body.make;
    cars[index].model = req.body.model;
    cars[index].year = req.body.year;
    res.status(200).json(cars[index]);
  } else {
    res.status(404).json({ error: "No car by that id" });
  }
});
//DELETE /cars/{carsId}
app.delete("/cars/:id", (req, res) => {
  console.log("DELETE /cars/:id", req.params.id);
  const index = cars.findIndex((car) => {
    return car.id === parseInt(req.params.id, 10);
  });
  if (index !== -1) {
    cars.splice(index, 1);
    res.status(200).json(cars);
  } else {
    res.status(404).json({ error: "No car by that id" });
  }
});

app.listen(port, () => {
  console.log(`Cars backend listening on port ${port}`);
});
