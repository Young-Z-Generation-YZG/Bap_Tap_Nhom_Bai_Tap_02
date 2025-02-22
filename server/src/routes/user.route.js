"use strict";

const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');
const ErrorHandler = require('../utils/catchError');

/**
 * @swagger
 * tags:
 *  name: User 
 *  description: user router
 */

/**
 * @swagger
 * /ap1/v1/users/profile:
 *   get:
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get(
     '/profile',
     ErrorHandler(userController.getProfile)
);

// Add module.exports at the end of the file
module.exports = router;


