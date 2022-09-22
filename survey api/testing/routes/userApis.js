const express = require("express");
const dboperations = require("./users");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - UserName
 *         - Password
 *       properties:
 *         UserId:
 *           type: string
 *           description: The auto-generated id of the user
 *         UserName:
 *           type: string
 *           description: The Name of the user
 *         IsAdmin:
 *            type: string
 *            description: Is the user an admin or not     
 *         Password:
 *            type: string
 *            description: user's strong password
 *
 *
 *       example:
 *         UserId: d5fE_asz
 *         UserName: Aya
 *         IsAdmin: No 
 *         Password: test
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users apis
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the registered users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.get("/", (req, res) => {
    dboperations.getAllUsers().then((result) => {
        res.status(200).json(result[0]);
    });
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: The task was not found
 */

router.get("/:id", (req, res) => {
    dboperations.getUserById(req.params.id).then((result) => {
        res.status(200).json(result[0]);
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       409:
 *         description: he request could not be processed because of conflict in the request
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    let user = {
        UserId: nanoid(idLength),
        UserName: req.body.UserName,
        IsAdmin: req.body.IsAdmin,
        Password: req.body.Password,
    };
    try {
        dboperations.signUp(user).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    let task = {
        UserId: req.params.id,
        UserName: req.body.UserName,
        IsAdmin: req.body.IsAdmin,
        Password: req.body.Password,
    };
    try {
        dboperations.updateUser(task).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
    try {
        dboperations.deleteUser(req.params.id).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
///dep[loy]