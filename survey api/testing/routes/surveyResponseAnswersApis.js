const express = require("express");
const dboperations = require("../routes/surveyRAs");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SurveyResponseAnswer:
 *       type: object
 *       required:
 *         - SurveyRA_Id
 *       properties:
 *         SurveyRA_Id:
 *           type: string
 *           description: The auto-generated id of the Survey Response Answer
 *         SurveyResponseId:
 *             type: string
 *             description: The id of the Response   
 *         QuestionId:
 *           type: string
 *           description: The id of the question
 *         Answer:
 *              type: string
 *              description: the answer of the question
 *
 *
 *       example:
 *         SurveyRA_Id: d5fE_asz
 *         SurveyResponseId: respn1
 *         QuestionId: q12
 *         Answer: "Yes"
 */



/**
 * @swagger
 * tags:
 *   name: SurveyResponseAnswer
 *   description: Survey Response Answer API
 */

/**
 * @swagger
 * /surveyRAs:
 *   get:
 *     summary: Returns the list of all the created Survey Response Answers
 *     tags: [SurveyResponseAnswer]
 *     responses:
 *       200:
 *         description: The list of the Survey
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SurveyResponseAnswer'
 */

router.get("/", (req, res) => {
    dboperations.getAllSurveyResponseAnswers().then((result) => {
        res.status(200).json(result[0]);
    });
});
/**
 * @swagger
 * /surveyRAs/{id}:
 *   get:
 *     summary: get the survey based on id
 *     tags: [SurveyResponseAnswer]
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
 *               $ref: '#/components/schemas/SurveyResponseAnswer'
 *       404:
 *         description: The survey was not found
 */

router.get("/:id", (req, res) => {
    dboperations.getSurveyResponseAnswerById(req.params.id).then((result) => {
        res.status(200).json(result[0]);
    });
});

/**
 * @swagger
 * /surveyRAs:
 *   post:
 *     summary: Create a new Survey Response Answer
 *     tags: [SurveyResponseAnswer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SurveyResponseAnswer'
 *     responses:
 *       200:
 *         description: The Response was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyResponseAnswer'
 *       409:
 *         description: The request could not be processed because of conflict in the request
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {

    let survey = {
        SurveyRA_Id: nanoid(idLength),
        SurveyResponseId: req.body.SurveyResponseId,
        QuestionId: req.body.QuestionId,
        Answer: req.body.Answer,
    };
    try {
        dboperations.createNewSurveyResponseAnswer(survey).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /surveyRAs/{id}:
 *  put:
 *    summary: Update the Survey by the id
 *    tags: [SurveyResponseAnswer]
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
 *            $ref: '#/components/schemas/SurveyResponseAnswer'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SurveyResponseAnswer'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    let survey = {
        SurveyRA_Id: nanoid(idLength),
        SurveyResponseId: req.body.SurveyResponseId,
        QuestionId: req.body.QuestionId,
        Answer: req.body.Answer,
    }
    try {
        dboperations.updateSurveyResponseAnswer(survey).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /surveyRAs/{id}:
 *   delete:
 *     summary: Remove the Survey by ID
 *     tags: [SurveyResponseAnswer]
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
        dboperations.deleteSurveyResponseAnswer(req.params.id).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
///dep[loy]