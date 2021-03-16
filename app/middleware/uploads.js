const multer = require("multer");

const checkFileType = (req, file, cb) =>  {
  if(file.fieldname==="contractfile")
  {
   if (
          file.mimetype === 'application/pdf' ||
          file.mimetype === 'application/msword' ||
          file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
          cb(null, true);
        } else {
          cb(null, false); // else fails
        }
  }
  else if(file.fieldname==="property")
  {
      if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'||
          fiel.mimetype==='image/gif'
        ) { // check file type to be png, jpeg, or jpg
          cb(null, true);
        } else {
          cb(null, false); // else fails
        }
      }
  };

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname==="property")
    {
     cb(null, __basedir + "/PropertyImages/");
    }
    else if(file.fieldname==="contractfile")
    {
      cb(null, __basedir + "/PropertyContractFiles/");
    }
  },
  filename: (req, file, cb) => {
    if(file.fieldname==="property"){
      //cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    }
    else if(file.fieldname==="contractfile"){
     // cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    }
    //cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var adminInsertProperty = multer({ 
  storage: storage, 
  limits: {
      fileSize: 10000000
  },
  fileFilter: checkFileType });
module.exports = adminInsertProperty;

var adminUpdateProperty = multer({ 
  storage: storage, 
  limits: {
      fileSize: 10000000
  },
  fileFilter: checkFileType });
module.exports = adminUpdateProperty;

