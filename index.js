// app.js
const express = require('express');
const faker = require('faker');
const specialities = require('./specialities');
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "https://wondrous-malasada-99113d.netlify.app/",
  })
)

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

const generateFakeData = (speciality) => {
    return {
      name: faker.name.findName(),
      experience: faker.datatype.number({ min: 1, max: 30 }),
      fee: faker.datatype.number({ min: 50, max: 500 }),
      clinicLocation: faker.address.city()
    };
  };


app.get('/api/specialities', (req, res) => {
  res.json(specialities);
});

app.get('/api/doctors/:speciality', (req, res) => {
    const specialityName = req.params.speciality;
    const numberOfDoctors = 7; 
  
    const doctors = Array.from({ length: numberOfDoctors }, () => generateFakeData(specialityName));
  
    res.json(doctors);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
