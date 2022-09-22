const express = require("express");
const dboperations = require("../routes/surveys");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Survey:
 *       type: object
 *       required:
 *         - SurveyId
 *       properties:
 *         SurveyId:
 *           type: string
 *           description: The auto-generated id of the Survey
 *         SurveyName:
 *             type: string
 *             description: The name of the survey   
 *         CreatedBy:
 *           type: string
 *           description: The Name of the user who created the survey
 *         IsDeleted:
 *           type: string
 *           description: Indicates whether the survey has been deleted or not   
 *
 *       example:
 *         SurveyId: d5fE_asz
 *         SurveyName: Candidate Survey
 *         CreatedBy: Aya
 *         IsDeleted: No 
 */



/**
 * @swagger
 * tags:
 *   name: Survey
 *   description: Survey API
 */

/**
 * @swagger
 * /surveys:
 *   get:
 *     summary: Returns the list of all the created Surveys
 *     tags: [Survey]
 *     responses:
 *       200:
 *         description: The list of the Survey
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Survey'
 */

router.get("/", (req, res) => {
    dboperations.getAllSurveys().then((result) => {
        res.status(200).json(result[0]);
    });
});
/**
 * @swagger
 * /surveys/{id}:
 *   get:
 *     summary: get the survey based on id
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey id
 *     responses:
 *       200:
 *         description: The survey description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       404:
 *         description: The survey was not found
 */

router.get("/:id", (req, res) => {
    dboperations.getSurveyById(req.params.id).then((result) => {
        res.status(200).json(result[0]);
    });
});

/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Create a new Survey
 *     tags: [Survey]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Survey'
 *     responses:
 *       200:
 *         description: The Survey was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Survey'
 *       409:
 *         description: The request could not be processed because of conflict in the request
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {

    let survey = {
        SurveyId: nanoid(idLength),
        SurveyName: req.body.SurveyName,
        CreatedBy: req.body.CreatedBy,
        IsDeleted: req.body.IsDeleted,

    };
    try {
        dboperations.createNewSurvey(survey).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /surveys/{id}:
 *  put:
 *    summary: Update the Survey by the id
 *    tags: [Survey]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Survey ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: The survey was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    let survey = {
        SurveyId: req.params.SurveyId,
        SurveyName: req.body.SurveyName,
        CreatedBy: req.body.CreatedBy,
        IsDeleted: req.body.IsDeleted,
    }
    try {
        dboperations.updateSurvey(survey).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /surveys/{id}:
 *   delete:
 *     summary: Remove the Survey by ID
 *     tags: [Survey]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey id
 *
 *     responses:
 *       200:
 *         description: The survey was deleted
 *       404:
 *         description: The survey was not found
 */

router.delete("/:id", (req, res) => {
    try {
        dboperations.deleteSurvey(req.params.id).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
///dep[loy]