const express = require("express");
const dboperations = require("../routes/surveyRs");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SurveyResponse:
 *       type: object
 *       required:
 *         - SurveyResponseId
 *       properties:
 *         SurveyResponseId:
 *           type: string
 *           description: The auto-generated id of the Survey Response
 *         SurveyId:
 *             type: string
 *             description: The Id of the survey taken  
 *         UserId:
 *           type: string
 *           description: The Id of the user who took the survey
 *
 *
 *       example:
 *         SurveyResponseId: d5fE_asz
 *         SurveyId: indx1
 *         UserId: uz1
 */



/**
 * @swagger
 * tags:
 *   name: SurveyResponse
 *   description: Survey Response API
 */

/**
 * @swagger
 * /surveyRs:
 *   get:
 *     summary: Returns the list of all the Survey Responses
 *     tags: [SurveyResponse]
 *     responses:
 *       200:
 *         description: The list of the Survey Responses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SurveyResponse'
 */

router.get("/", (req, res) => {
    dboperations.getAllSurveyResponses().then((result) => {
        res.status(200).json(result[0]);
    });
});
/**
 * @swagger
 * /surveysRs/{id}:
 *   get:
 *     summary: get the survey responses based on id
 *     tags: [SurveyResponse]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey response id
 *     responses:
 *       200:
 *         description: The survey response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyResponse'
 *       404:
 *         description: The survey was not found
 */

router.get("/:id", (req, res) => {
    dboperations.getSurveyResponseById(req.params.id).then((result) => {
        res.status(200).json(result[0]);
    });
});

/**
 * @swagger
 * /surveyRs:
 *   post:
 *     summary: Create a new Survey Response
 *     tags: [SurveyResponse]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SurveyResponse'
 *     responses:
 *       200:
 *         description: The Survey Response was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyResponse'
 *       409:
 *         description: The request could not be processed because of conflict in the request
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {

    let surveyResponse = {
        SurveyResponseId: nanoid(idLength),
        SurveyId: req.body.SurveyId,
        UserId: req.body.UserId,

    };
    try {
        dboperations.createNewSurveyResponse(surveyResponse).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});


/**
 * @swagger
 * /surveyRs/{id}:
 *   delete:
 *     summary: Remove the Survey Response by ID
 *     tags: [SurveyResponse]
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
        dboperations.deleteSurveyResponse(req.params.id).then((result) => {
            res.status(200).json(result);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
///dep[loy]