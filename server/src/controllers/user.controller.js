const userService = require('../services/user.service');
const { OK, CREATED } = require("../core/success.response");

class userController{
   async getProfile(req,res){
      new OK({
         message:"OK",
         statusCode:200,
         data: await userService.getProfile(req),
      }).send(res);
   }

   async getAddress(req,res){
         new OK({
            message:"OK",
            statusCode:200,
            data: await userService.getAddress(req)
         }).send(res);
   }

   async updateAddresses(req,res){
         new OK({
            message:"OK",
            statusCode:200,
            data: await userService.updateAddresses(req)
         }).send(res);
   }

   async updateProfile(req,res){
         new OK({
            message:"OK",
            statusCode:200,
            data: await userService.updateProfile(req)
         }).send(res);
   }

   async updatePassword(req,res){
         new OK({
            message:"OK",
            statusCode:200,
            data: await userService.updatePassword({email: req.user.email, password: req.user.password})
         }).send(res);
   }

   async updateVerify(req,res){
         new OK({
            message:"OK",
            statusCode:200,
            data: await userService.updateVerify({email: req.use.email})
         }).send(res);
   }

   // async findOneByEmail(req,res){
   //      new OK({
   //           message:"OK",
   //           statusCode:200,
   //           data: await userService.findOneByEmail({email: req.user.email})
   //      }).send(res);
   // }

   // async findOneUser(req,res){
   //      new OK({
   //           message:"OK",
   //           statusCode:200,
   //           data: await userService.findOneByEmail({email: req.user.email})
   //      }).send(res);
   // }

   
   // async createUser(req,res){
   //       new OK({
   //          message:"OK",
   //          statusCode:200,
   //          data: await userService.createUser(req)
   //       }).send(res);
   // }
   
}


module.exports = new userController();