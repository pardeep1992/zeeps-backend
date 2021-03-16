module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "root123",
    DB: "db_Zeeps",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
// module.exports = {
//   HOST: "ec2-52-44-46-66.compute-1.amazonaws.com",
//   USER: "fkirfgjsfyezpv",
//   PASSWORD: "5668e6307a2d206224d2811e2c30f1e3e13f76f2f2bb23a65455272f4006adce",
//   DB: "dch8l14sr7g3te",
//   PORT:5432,
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

// module.exports = {
//   HOST: "34.84.3.98",
//   USER: "postgres",
//   PASSWORD: "zeep1231@@",
//   DB: "zeep-db",
// PORT:5432,
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
// idle: 10000
//   }
// };