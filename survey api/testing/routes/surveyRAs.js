var config = require("./surveyRAdbconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');

//queryDatabase();

// async function createNewTable() {
//     try {
//         let pool = await sql.connect(config);

//         var query =
//             "CREATE TABLE SurveyResponseAnswers (SurveyRA_Id VarChar(255) PRIMARY KEY, SurveyResponseId VarChar(255), QuestionId VarChar(255), Answer VarChar(255));";
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     } catch (error) {
//         console.log(error);
//     }
// }
//createNewTable();

async function getAllSurveyResponseAnswers() {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request().query("SELECT * FROM SurveyResponseAnswers");
        return records.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSurveyResponseAnswerById(id) {
    try {
        let survey = await sql.connect(config);
        let record = await survey
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("SELECT * FROM SurveyResponseAnswers WHERE SurveyRA_Id = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function createNewSurveyResponseAnswer(surveyResponseAnswer) {
    try {
        let newSurvey = await sql.connect(config);

        let insertSurvey = await newSurvey
            .request()
            .input("SurveyRA_Id", sql.VarChar(255), surveyResponseAnswer.SurveyRA_Id)
            .input("SurveyResponseId", sql.VarChar(255), surveyResponseAnswer.SurveyResponseId)
            .input("QuestionId", sql.VarChar(255), surveyResponseAnswer.QuestionId)
            .input("Answer", sql.VarChar(255), surveyResponseAnswer.Answer)
            .query(
                "INSERT INTO SurveyResponseAnswers (SurveyRA_Id,SurveyResponseId,QuestionId, Answer) VALUES (@SurveyRA_Id,@SurveyResponseId,@QuestionId, @Answer)",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            SurveyRA_Id: insertSurvey.parameters.SurveyRA_Id.value,
            SurveyResponseId: insertSurvey.parameters.SurveyResponseId.value,
            QuestionId: insertSurvey.parameters.QuestionId.value,
            Answer: insertSurvey.parameters.Answer.value,
        };
    } catch (err) {
        console.log(err);
    }
}

async function deleteSurveyResponseAnswer(id) {
    try {
        let survey = await sql.connect(config);
        let record = await survey
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("DELETE FROM SurveyResponseAnswers WHERE SurveyRA_Id = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function updateSurveyResponseAnswer(survey) {
    try {
        let updatedSurvey = await sql.connect(config);
        let record = await updatedSurvey
            .request()
            .input("SurveyRA_Id", sql.VarChar(255), survey.SurveyRA_Id)
            .input("SurveyResponseId", sql.VarChar(255), survey.SurveyResponseId)
            .input("QuestionId", sql.VarChar(255), survey.QuestionId)
            .input("Answer", sql.VarChar(255), survey.Answer)
            .query(
                "UPDATE SurveyResponseAnswers SET Answer@Answer WHERE SurveyRA_Id = @SurveyRA_Id",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            SurveyRA_Id: record.parameters.SurveyRA_Id.value,
            SurveyResponseId: record.parameters.SurveyResponseId.value,
            QuestionId: record.parameters.QuestionId,
            Answer: record.parameters.Answer.value,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateSurveyResponseAnswer,
    deleteSurveyResponseAnswer,
    createNewSurveyResponseAnswer,
    getSurveyResponseAnswerById,
    getAllSurveyResponseAnswers,
    //validateUniqueUser,
};