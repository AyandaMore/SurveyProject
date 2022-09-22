var config = require("./surveyQuestionsDBconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');

//queryDatabase();

// async function createNewTable() {
//     try {
//         let pool = await sql.connect(config);

//         var query =
//             "CREATE TABLE SurveyQuestions (QuestionId VarChar(255) PRIMARY KEY, Question VarChar(255), FromSurvey VarChar(255));";
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     } catch (error) {
//         console.log(error);
//     }
// }
// createNewTable();

async function getAllSurveyQuestions() {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request().query("SELECT * FROM SurveyQuestions");
        return records.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getQuestionById(id) {
    try {
        let surveyQ = await sql.connect(config);
        let record = await surveyQ
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("SELECT * FROM SurveyQuestions WHERE QuestionId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function createNewSurveyQuestion(surveyQ) {
    try {
        let newSurveyQ = await sql.connect(config);

        let insertSurvey = await newSurveyQ
            .request()
            .input("QuestionId", sql.VarChar(255), surveyQ.QuestionId)
            .input("FromSurvey", sql.VarChar(255), surveyQ.FromSurvey)
            .input("Question", sql.VarChar(255), surveyQ.Question)
            .input("QuestionType", sql.VarChar(255), surveyQ.QuestionType)
            .query(
                "INSERT INTO SurveyQuestions (QuestionId,Question, FromSurvey, QuestionType) VALUES (@QuestionId,@Question,@FromSurvey, @QuestionType)",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            QuestionId: insertSurvey.parameters.QuestionId.value,
            Question: insertSurvey.parameters.Question.value,
            FromSurvey: insertSurvey.parameters.FromSurvey.value,
            QuestionType: insertSurvey.parameters.QuestionType.value,
        };
    } catch (err) {
        console.log(err);
    }
}

async function deleteQuestion(id) {
    try {
        let surveyQ = await sql.connect(config);
        let record = await surveyQ
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("DELETE FROM SurveyQuestions WHERE QuestionId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function updateSurveyQuestion(surveyQ) {
    try {
        let updatedSurveyQ = await sql.connect(config);
        let record = await updatedSurveyQ
            .request()
            .input("QuestionId", sql.VarChar(255), surveyQ.QuestionId)
            .input("Question", sql.VarChar(255), surveyQ.Question)
            .input("FromSurvey", sql.VarChar(255), surveyQ.FromSurvey)
            .input("QuestionType", sql.VarChar(255), surveyQ.QuestionType)
            .query(
                "UPDATE SurveyQuestions SET Question=@Question, FromSurvey=@FromSurvey, QuestionType=@QuestionType WHERE QuestionId = @QuestionId",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            QuestionId: record.parameters.QuestionId.value,
            Question: record.parameters.Question.value,
            FromSurvey: record.parameters.FromSurvey.value,
            QuestionType: record.parameters.QuestionType.value,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateSurveyQuestion,
    deleteQuestion,
    createNewSurveyQuestion,
    getQuestionById,
    getAllSurveyQuestions,
};