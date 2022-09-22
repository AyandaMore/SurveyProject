const express = require("express");
const dboperations = require('./users');


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - UserName
 *         - Password
 *       properties:
 *         Name:
 *           type: string
 *           description: The user logged in
 *         UserName:
 *           type: string
 *           description: The email of the logged in user
 *         Password:
 *           type: string
 *           description: The user password
 *         Email:
 *           type: string
 *           description: The user's email
 *         PhoneNumber:
 *           type: string
 *           description: The user phonenumber
 *
 *       example:

 *         UserName: Nyarie
 *         Password: heyhey
 */

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: User Authentication Apis
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Login user
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res, next) => {

    try {
        dboperations.login(req.body).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }

});

module.exports = router;