"use strict";

const { BadRequestError } = require('../core/error.response');
const { Database } = require('../db/mongo.config');
const userModel = require('../models/user.model');
const addressModel = require('../models/address.model');
const profileModel = require('../models/profile.model');
const { getValueObj } = require('../utils/getValueObj');

const findOneByEmail = async (email) => {
   const user = await userModel.findOne({ email }).lean().exec();
   return user;
};

// const findOneUser = async (email, password) => {
//    const user = await userModel.findOne({ email, password }).lean().exec();
//    return user;
// };

const getProfile = async (req) => {
   //   const { email } = req.user;
   
   //   const user = await userModel.findOne({ email }).populate({
   //     path: "user_profile",
   //     model: "profile",
   //   });
   
   //   if (!user) {
   //     throw new BadRequestError("User not found");
   //   }
   
   //   const data = getValueObj({
   //     obj: user.user_profile,
   //     fields: ["profile_firstName", "profile_lastName", "profile_phoneNumber"],
   //   });
   
   return {
      profile_firstName:'Tran', 
      profile_lastName:'Quoc', 
      profile_phoneNumber:'Phuong',
   };
};

// const getAddress = async (req) => {
//    const { email } = req.user;

//    const user = await userModel.findOne({ email }).populate({
//       path: "user_profile",
//       model: "profile",
//       populate: {
//       path: "profile_address",
//       model: "address",
//       },
//    });

//    if (!user) {
//       throw new BadRequestError("User not found");
//    }

//    const address = user.user_profile.profile_address;

//    return getValueObj({
//       obj: address,
//       fields: [
//       "address_addressLine",
//       "address_district",
//       "address_province",
//       "address_country",
//       ],
//    });
// };

// const updateAddresses = async (req) => {
//    const { addressLine, district, province, country } = req.body;
//    const { email } = req.user;

//    const user = await userModel.findOne({ email }).populate({
//       path: "user_profile",
//       model: "profile",
//       populate: {
//       path: "profile_address",
//       model: "address",
//       },
//    });

//    const newAddress = {
//       address_country: country,
//       address_province: province,
//       address_district: district,
//       address_addressLine: addressLine,
//    };

//    const address = user.user_profile.profile_address;

//    Object.assign(address, newAddress);

//    await address.save();

//    return getValueObj({
//       obj: address,
//       fields: [
//       "address_country",
//       "address_province",
//       "address_district",
//       "address_addressLine",
//       ],
//    });
// };

const createUser = async ({
     firstName = "",
     lastName = "",
     email,
     password,
   }) => {
      const mongo = Database.getInstance();
      let session = await mongo.startSession();
      
      try {
         session.startTransaction();
      
         const address = await addressModel.create({});
      
         const profile = await profileModel.create({
            profile_firstName: firstName,
            profile_lastName: lastName,
            profile_address: address._id,
         });
      
         const newUser = await userModel.create({
            email,
            password,
            user_profile: profile._id,
         });
      
         await session.commitTransaction();
      
         return newUser;
      } catch (err) {
         await session.abortTransaction();
      
         throw new BadRequestError(err);
      } finally {
         session.endSession();
      }
      
      return null;
};
   
// const updateProfile = async (req) => {
//      const { email } = req.user;
   
//      const { firstName = "", lastName = "", phoneNumber = "" } = req.body;
   
//      const user = await userModel.findOne({ email }).populate({
//        path: "user_profile",
//        model: "profile",
//      });
   
//      const newProfile = {
//        profile_firstName: firstName,
//        profile_lastName: lastName,
//        profile_phoneNumber: phoneNumber,
//      };
   
//      const profile = user.user_profile;
   
//      Object.assign(profile, newProfile);
   
//      await profile.save();
   
//      return getValueObj({
//        obj: profile,
//        fields: ["profile_firstName", "profile_lastName", "profile_phoneNumber"],
//      });
// };

// const updatePassword = async (email, password) => {
//      try {
//        const user = await userModel.findOneAndUpdate(
//          {
//            email: email,
//          },
//          {
//            password: password,
//          }
//        );
   
//        return user;
//      } catch (err) {
//        console.log(err);
//      }
   
//      return null;
// };   

const updateVerify = async (email) => {
   try {
      const user = await userModel.findOneAndUpdate(
         {
               email: email,
         },
         {
               verified: true,
         }
      );
      return user;
   } catch (err) {
      console.log(err);
   }

   return null;
};

const setTokenPair = async (email, token) => {
   try {
      const user = await userModel.findOneAndUpdate(
         {
            email: email,
         },
         {
            tokenPair: token,
         }
      );
      return user;
   } catch (err) {
         console.log(err);
   }
   
   return null;
};


const getTokenPair = async (email) => {
   try {
      const user = await userModel.findOne({ email });
      return user.tokenPair;
   } catch (err) {
      console.log(err);
   }
   
   return null;
};

const setMailToken = async (email, token) => {
   try {
      const user = await userModel.findOneAndUpdate(
         {
            email: email,
         },
         {
            mailToken: token,
         }
      );
      return user;
   } catch (err) {
         console.log(err);
   }
   
   return null;
};


const getMailToken = async (email) => {
   try {
      const user = await userModel.findOne({ email });
      return user.mailToken;
   } catch (err) {
      console.log(err);
   }
   
   return null;
};

// [GET] /updateImage?q=
const updateImage = async (email, image) => {
   
};

module.exports = {
   findOneByEmail,
   //   findOneUser,
   getProfile,
   //   getAddress,
   //   updateAddresses,
   createUser,
   //   updateProfile,
   //   updatePassword,
   updateVerify,
   setTokenPair,
   getTokenPair,
   setMailToken,
   getMailToken,
};