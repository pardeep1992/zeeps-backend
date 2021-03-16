const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
global.__basedir = __dirname;
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};
                                                                                      
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/property', express.static('PropertyImages'));
app.use('/contractfile', express.static('PropertyContractFiles'));
app.use('/FeatureImages', express.static('FeatureImages'));
app.use('/FacilityImages', express.static('FacilityImages'));
const db = require("./app/models");
// below line of code is to create tables in database like migrations
 db.sequelize.sync();

////-- In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/route/api.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
