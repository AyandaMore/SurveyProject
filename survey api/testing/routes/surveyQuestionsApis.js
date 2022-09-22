const express = require("express");
const dboperations = require("./surveyQs");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SurveyQuestion:
 *       type: object
 *       required:
 *         - QuestionId
 *       properties:
 *         QuestionId:
 *           type: string
 *           description: The auto-generated id of the Question   
 *         Question:
 *           type: string
 *           description: The Question
 *         FromSurvey:
 *             type: string
 *             description: The id of the survey the question is from
 *         QuestionType:
 *             type: string
 *             description: the type of the question   
 *
 *       example:
 *         QuestionId: d5fE_asz
 *         Question: Where did you hear about Boxfusion?
 *         FromSurvey: Candidate Survey 
 *         QuestionType: YesNo 
 */



/**
 * @swagger
 * tags:
 *   name: SurveyQuestion
 *   description: SurveyQuestions API
 */

/**
 * @swagger
 * /surveyQs:
 *   get:
 *     summary: Returns the list of all the created Survey Questions
 *     tags: [SurveyQuestion]
 *     responses:
 *       200:
 *         description: The list of the Questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SurveyQuestion'
 */

router.get("/", (req, res) => {
    dboperations.getAllSurveyQuestions().then((result) => {
        res.status(200).json(result[0]);
    });
});
/**
 * @swagger
 * /surveyQs/{id}:
 *   get:
 *     summary: get the question based on id
 *     tags: [SurveyQuestion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *     responses:
 *       200:
 *         description: The survey question by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyQuestion'
 *       404:
 *         description: The survey was not found
 */

router.get("/:id", (req, res) => {
    dboperations.getQuestionById(req.params.id).then((result) => {
        res.status(200).json(result[0]);
    });
});

/**
 * @swagger
 * /surveyQs:
 *   post:
 *     summary: Create a new Question
 *     tags: [SurveyQuestion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SurveyQuestion'
 *     responses:
 *       200:
 *         description: The Question was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyQuestion'
 *       409:
 *         description: The request could not be processed because of conflict in the request
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {

    let surveyQuestion = {
        QuestionId: nanoid(idLength),
        Question: req.body.Question,
        FromSurvey: req.body.FromSurvey,
        QuestionType: req.body.QuestionType,
    };
    try {
        dboperations.createNewSurveyQuestion(surveyQuestion).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /surveyQs/{id}:
 *  put:
 *    summary: Update the Survey by the id
 *    tags: [SurveyQuestion]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Question ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SurveyQuestion'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SurveyQuestion'
 *      404:
 *        description: The question was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    let surveyQuestion = {
        QuestionId: nanoid(idLength),
        Question: req.body.Question,
        FromSurvey: req.body.FromSurvey,
        QuestionType: req.body.QuestionType,
    };
    try {
        dboperations.updateSurveyQuestion(surveyQuestion).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /surveyQs/{id}:
 *   delete:
 *     summary: Remove the Survey by ID
 *     tags: [SurveyQuestion]
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
 *         description: The survey question was deleted
 *       404:
 *         description: The survey question was not found
 */

router.delete("/:id", (req, res) => {
    try {
        dboperations.deleteQuestion(req.params.id).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
///dep[loy]