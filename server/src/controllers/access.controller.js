const accessService = require('../services/access.service');
const { OK, CREATED } = require("../core/success.response");

class accessController{
   async register(req, res){
      return new CREATED({
         message:"Register successfully",
         statusCode:200,
         data: await accessService.register(req),
      }).send(res);
   };

   async verify(req, res) {
      return new OK({
        message: "Verify successfully",
        statusCode: 200,
        data: await accessService.verify(req.query),
      }).send(res);
   };

   async sendMailToken(req,res){
      return new OK({
         message: "Send mail token successfully",
         statusCode: 200,
         data: await accessService.sendMailToken(req.query),
      }).send(res);
   };

   async verifyEmail(req,res){
      return new OK({
         message: "Verify email successfully",
         statusCode: 200,
         data: await accessService.verifyEmail(req.body),
      }).send(res);
   };

   async login(req,res){
      return new OK({
         message: "Login successfully",
         statusCode: 200,
         data: await accessService.login(req.body),
      }).send(res);
   };
}


module.exports = new accessController();