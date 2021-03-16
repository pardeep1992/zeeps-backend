module.exports = app => {
    const adminapi = require("../controller/adminAPI.js");
    const memberapi= require("../controller/memberAPI.js");
    const propertyapi= require("../controller/propertyAPI.js");
    var router = require("express").Router();
    var routerMember = require("express").Router();
    var routerProperty=require("express").Router();
    const upload = require("../middleware/upload");
    const uploads = require("../middleware/uploads");
    // login admin
    router.post("/login", adminapi.login);  

    // Retrieve all records
    router.get("/", adminapi.findAll);

    //-- Insert company detail
    router.post("/InsertCompanyDetail", adminapi.create);  

    // retrive company detail by id
    router.get("/GetCompanydetail/:id", adminapi.findOne);

    // Update a Company detail with id
    router.post("/UpdateCompanyDetail", adminapi.updateCompany);
    // router.put("/UpdateCompanyDetail/:id", adminapi.update);

    // retrive company agreements detail by id
    router.get("/GetCompanyAgreementdetail/:id", adminapi.GetAgreementdetail);

    // Update a Company Agreement detail with id
    router.post("/UpdateAgreementContents",adminapi.agreements);

     //-- Insert FAQ detail
     router.post("/InsertFAQ", adminapi.createFAQ);

     // Retrieve all faqs
    router.get("/GetAllFAQ", adminapi.getAllFaq);

     

    app.use("/adminapi", router);
    app.use("/memberapi", routerMember);
    app.use("/propertyapi", routerProperty);
  };
  