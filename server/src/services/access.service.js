"use strict";

const bcrypt = require("bcrypt");
// const User = require("../entities/user.entity");
const {
  BadRequestError,
  AuthenticationError,
  NotFoundError,
} = require("../core/error.response");
const { 
  generateTokenPair, 
  decode, 
  generateMailToken 
} = require("../auth/jwt");
const {
  findOneByEmail,
  createUser,
  updateVerify,
  setTokenPair,
//   getTokenPair,
  setMailToken,
  getMailToken,
} = require("../services/user.service");
const {sendEmail} = require("../mailer/mailer.service");

// const { random } = require("lodash");
// const RedisService = require("./redis.service");
const { getValueObj } = require("../utils/getValueObj");

class AccessService {
   // [POST] /auth/register
   async register(req) {
      // 1. Get data
      const { firstName = "", lastName = "", email, password } = req.body; 
      
      // 2. Checking email exists
      const existedUser = await findOneByEmail(email); 

      if (existedUser) {
         throw new BadRequestError("User already registered");
      }
      
      // 3. Hashing password
      const HashPassword = await bcrypt.hash(password, 10); 

      // 4. Create user with data input
      const user = {  
         firstName: firstName,
         lastName: lastName,
         email:email,
         password:HashPassword,
      }

      const newUser = await createUser(user);

      if (!newUser) {
         throw new BadRequestError("Something went wrong");
      }

      // 5. redirect /verify?q=
      const payload = { 
         email: newUser.email,
         firstName: newUser.firstName,
         verified: newUser.verified,
      };

      const token = generateMailToken(payload);

      // ** Add token pair
      await setTokenPair(newUser.email, token);

      //6. return page success
      return {
         redirect: "/verify?q=" + token,
      };
   }

   // [GET] /verify?q=
   async verify({ q }) {
     // q is a jwt token
      if (!q) {
         throw new AuthenticationError("Not permitted to access");
      }

      const decodedToken = decode(q);

      if (!decodedToken) {
         throw new AuthenticationError("Not permitted to access");
      }

      const { verified } = decodedToken;

      if (verified) {
         throw new AuthenticationError("Your are verified or not permitted to access");
      }

      return {
         message: "Verified !",
      };
   }

   // [GET] /sendMailToken?q=
   async sendMailToken({ q }) {
      // q is a jwt token
      if (!q) {
         throw new AuthenticationError("Not permitted to access");
      }

      const decodedToken = await decode(q);

      if (!decodedToken) {
         throw new AuthenticationError("Not permitted to access");
      }

      const { email, firstName } = decodedToken;

      const randomToken = Math.floor(100000 + Math.random() * 900000);

      await sendEmail({
         to: email,
         name: firstName,
         mailToken: randomToken,
      }); 

      // ** Set mail token
      await setMailToken(email, randomToken);

      // await RedisService.set(`${email}:token`, randomToken);

      return {
         message: "Sended !",
      };
   }

   // [POST] /verifyEmail
   async verifyEmail({ q, mailToken }) {
      if (!q && !mailToken) {
         throw new BadRequestError("Something went wrong");
      }

      const decodedToken = await decode(q);

      if (!decodedToken) {
         throw new AuthenticationError("Not permitted to access");
      }

      // Compare mailToken with token in redis
      const { email } = decodedToken;

      // const redisToken = await RedisService.get(`${email}:token`);
      const token = await getMailToken(email);
      token.toString();

      if (mailToken != token) {
         throw new BadRequestError("Something went wrong");
      }

      const user = await findOneByEmail(email);

      await updateVerify(email);

      const payload = {
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
      };

      const { accessToken, refreshToken } = generateTokenPair(payload);

      return {
         user: getValueObj({
            obj: user,
            fields: ["firstName", "lastName", "email"],
         }),
         accessToken,
         refreshToken,
      };
   }

     // [POST] /login
   async login({ email = "", password = "" }, res) {
      // 1. check exist user
      const existUser = await findOneByEmail(email);

      if (!existUser) {
         throw new BadRequestError("Not found");
      }

      // 2. compare password
      const isMatch = await bcrypt.compare(password, existUser.password);
      if (!isMatch) {
         throw new BadRequestError("Wrong password");
      }

      // 3. check is verified
      if (!existUser.verified) {
         const payload = {
            email: existUser.email,
            firstName: existUser.firstName,
            verified: existUser.verify,
         };

         const token = generateMailToken(payload);

         // ** Add token pair
         await setTokenPair(existUser.email, token);

         return {
            redirect: "/verify?q=" + token,
         };
      }

      const roleId = existUser.roles[0];

      // 4. generate tokens
      const payload = {
         firstName: existUser.firstName,
         lastName: existUser.lastName,
         email: existUser.email,
      };

      const { accessToken, refreshToken } = generateTokenPair(payload);

      return {
         user: getValueObj({
            obj: existUser,
            fields: ["firstName", "lastName", "email"],
         }),
         accessToken,
         refreshToken,
      };
   }

   
}

module.exports = new AccessService();