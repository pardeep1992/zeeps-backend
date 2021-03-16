const fs = require("fs");
const db = require("../models");
const MemberDetail=db.Member;
const PropertyDetail=db.Property;
const PropertyImage=db.PropertyImage;
const PropertyFacilities=db.PropertyMaintance;
const PropertyOptions=db.PropertyFeatures;
const PropertyContracts=db.PropertyContract;
const Op = db.Sequelize.Op;

  //module.exports = upload;
const memberInsertProperty=async(req,res)=>{       
    var idd=req.body.memberId;
    var propertyfeaturesids=req.body.propertyFeatureId.split(',');
    var propertyFacilityIds=req.body.propertyFacilityId.split(',');
    var imagesCount=req.files.length; 
    
    // Validate request
    if (idd==null || idd==0) {
      res.status(200).send({
        status:0,
        message: "You should be member to insert property!",
        data:[]
      });
      return;
    }
    else if (imagesCount==0) {
      res.status(200).send({
        status:0,
        message: "You must select atleast one image!",
        data:[]
      });
      return;
    }
    else{
          const property={
            memberId:idd,
            name:req.body.name,
            phone:req.body.mobile,
            address:req.body.address,
            detailAddress:req.body.detailAddress,
            showAddress:req.body.showAddress,
            areaSquare:req.body.areaSquare,
            propertyType:req.body.propertyType,
            elevator:req.body.elevator,
            rooms:req.body.rooms,
            floor:0,
            direction:req.body.direction,
            availableMoveInStatus:req.body.availableMoveInStatus,
            availableMoveInDate:req.body.availableMoveInDate,
            isLandlord:req.body.isLandlord,
            isPetAvailable:req.body.isPetAvailable,
            isMortgage:req.body.isMortgage,
            contractStatus:req.body.contractStatus,
            memberContractStatus:req.body.memberContractStatus,
            propertyCost:req.body.propertyCost,
            maintanceFee:req.body.maintanceFee,
            managerId:0,
            managerComment:"Not Assigned",
            status:true,
            createdbytype:"member",
            createdbyid:idd
          }
          PropertyDetail.create(property)
          .then(data=>{
              if(data.id!=0){
                var propertyIdd=data.id;
                for(var p=0;p<propertyfeaturesids.length;p++){
                  const propertyFeature={
                    propertyId:propertyIdd,
                    propertyFeatureId:propertyfeaturesids[p]
                  }
                  PropertyOptions.create(propertyFeature)
                  .then(num=>{                            
                  })
                }
                for(var q=0;q<propertyFacilityIds.length;q++){
                  const propertyFacility={
                    propertyId:propertyIdd,
                    propertyFacilityId:propertyFacilityIds[q],
                  }
                  PropertyFacilities.create(propertyFacility)
                  .then(num1=>{});                          
                }
                for(var j=0;j<imagesCount;j++){
                  var isMainImage1=false;
                  if(j==0){
                    isMainImage1=true;
                  }
                  else{
                    isMainImage1=false;
                  }
                  const images={
                    propertyId: propertyIdd,
                    isMainImage: isMainImage1,
                    status:true,
                    propertyImage: req.files[j].filename
                  }
                  PropertyImage.create(images)
                  .then(num2 => {});
                }
                res.status(200).send({
                  status:1,
                  message: "Property detail inserted successfully!",
                  data:data
                });
              }
              else{
                res.status(200).send({
                  status:0,
                  message: "Property detail doesn't save!",
                  data:[]
                });
              }
          })
          .catch(err => {
            res.status(500).send({
              status:-100,
              message:
                err.message || "There is some technical error, please try again.",
                data:[]
            });
          });
      }
  };

   //module.exports = upload;
const unsignedMemberInsertProperty=async(req,res)=>{       
  
  var propertyfeaturesids=req.body.propertyFeatureId.split(',');
  var propertyFacilityIds=req.body.propertyFacilityId.split(',');
  var imagesCount=req.files.length; 
  var mobile1=req.body.mobile;
   if (imagesCount==0) {
    res.status(200).send({
      status:0,
      message: "You must select atleast one image!",
      data:[]
    });
    return;
  }
  else{    
    // Save User login detail in the database
    MemberDetail.findAll({ 
      attributes:['id'],
      where: {mobile:mobile1} 
    }).then(data1=>{
        if(data1.length!=0){ 
          res.status(200).send({
            status:0,
            message: "Mobile already exists for other member!",
            data:[]
          });
          return;        
        } 
        else
        {
          var createdByType="non-member";
          const member={
          name:req.body.m_name,  
          mobile: req.body.mobile,
          createdbytype: createdByType,
          createdbyid: 0,        
          ismobileverified: false,
          status: true,
          ismemberdeleted:false,
          ismember:false
          }
         // Save Company detail in the database
         MemberDetail.create(member)
         .then(data => {
          const property={
            memberId:data.id,
            name:req.body.name,
            phone:req.body.mobile,
            address:req.body.address,
            detailAddress:req.body.detailAddress,
            showAddress:req.body.showAddress,
            areaSquare:req.body.areaSquare,
            propertyType:req.body.propertyType,
            elevator:req.body.elevator,
            rooms:req.body.rooms,
            floor:0,
            direction:req.body.direction,
            availableMoveInStatus:req.body.availableMoveInStatus,
            availableMoveInDate:req.body.availableMoveInDate,
            isLandlord:req.body.isLandlord,
            isPetAvailable:req.body.isPetAvailable,
            isMortgage:req.body.isMortgage,
            contractStatus:req.body.contractStatus,
            memberContractStatus:req.body.memberContractStatus,
            propertyCost:req.body.propertyCost,
            maintanceFee:req.body.maintanceFee,
            managerId:0,
            managerComment:"Not assigned",
            status:true,
            createdbytype:"non-member",
            createdbyid:data.id
          }
          PropertyDetail.create(property)
        .then(data1=>{
            if(data1.id!=0){
              var propertyIdd=data1.id;
              for(var p=0;p<propertyfeaturesids.length;p++){
                const propertyFeature={
                  propertyId:propertyIdd,
                  propertyFeatureId:propertyfeaturesids[p]
                }
                PropertyOptions.create(propertyFeature)
                .then(num=>{                            
                })
              }
              for(var q=0;q<propertyFacilityIds.length;q++){
                const propertyFacility={
                  propertyId:propertyIdd,
                  propertyFacilityId:propertyFacilityIds[q],
                }
                PropertyFacilities.create(propertyFacility)
                .then(num1=>{});                          
              }
              for(var j=0;j<imagesCount;j++){
                var isMainImage1=false;
                if(j==0){
                  isMainImage1=true;
                }
                else{
                  isMainImage1=false;
                }
                const images={
                  propertyId: propertyIdd,
                  isMainImage: isMainImage1,
                  status:true,
                  propertyImage: req.files[j].filename
                }
                PropertyImage.create(images)
                .then(num2 => {});
              }
              res.status(200).send({
                status:1,
                message: "Property detail inserted successfully!",
                data:data
              });
            }
            else{
              res.status(200).send({
                status:0,
                message: "Property detail doesn't save!",
                data:[]
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              status:-100,
              message:
                err.message || "There is some technical error, please try again.",
                data:[]
            });
          });
        })
         .catch(err => {
           res.status(500).send({
             status:-100,
             message:
               err.message || "There is some technical error, please try again.",
               data:[]
           });
         });
      }
    });
  }
};
