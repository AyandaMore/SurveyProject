var config = require("./surveyResponseDBconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');

//queryDatabase();

// async function createNewTable() {
//     try {
//         let pool = await sql.connect(config);

//         var query =
//             "CREATE TABLE SurveyResponse (SurveyResponseId VarChar(255) PRIMARY KEY, SurveyId VarChar(255), UserId VarChar(255));";
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     } catch (error) {
//         console.log(error);
//     }
// }
// createNewTable();

async function getAllSurveyResponses() {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request().query("SELECT * FROM SurveyResponse");
        return records.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSurveyResponseById(id) {
    try {
        let surveyResponse = await sql.connect(config);
        let record = await surveyResponse
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("SELECT * FROM SurveyResponse WHERE SurveyResponseId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function createNewSurveyResponse(surveyResponse) {
    try {
        let newSurvey = await sql.connect(config);

        let insertSurvey = await newSurvey
            .request()
            .input("SurveyResponseId", sql.VarChar(255), surveyResponse.SurveyResponseId)
            .input("SurveyId", sql.VarChar(255), surveyResponse.SurveyId)
            .input("UserId", sql.VarChar(255), surveyResponse.UserId)
            .query(
                "INSERT INTO SurveyResponse (SurveyResponseId,SurveyId,UserId) VALUES (@SurveyResponseId,@SurveyId,@UserId)",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            SurveyResponseId: insertSurvey.parameters.SurveyResponseId.value,
            SurveyId: insertSurvey.parameters.SurveyId.value,
            UserId: insertSurvey.parameters.UserId.value,
        };
    } catch (err) {
        console.log(err);
    }
}

async function deleteSurveyResponse(id) {
    try {
        let surveyResponse = await sql.connect(config);
        let record = await surveyResponse
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("DELETE FROM SurveyResponse WHERE SurveyResponseId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}


// async function updateSurvey(survey) {
//     try {
//         let updatedSurvey = await sql.connect(config);
//         let record = await updatedSurvey
//             .request()
//             .input("SurveyId", sql.VarChar(255), survey.SurveyId)
//             .input("SurveyName", sql.VarChar(255), survey.SurveyName)
//             .input("CreatedBy", sql.VarChar(255), survey.IsAdmin)
//             .query(
//                 "UPDATE Survey SET SurveyName@SurveyName,CreatedBy=@CreatedBy WHERE SurveyId = @SurveyId",
//                 function(err, result) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     sql.close();
//                 }
//             );

//         return {
//             SurveyId: record.parameters.SurveyId.value,
//             SurveyName: record.parameters.SurveyName.value,
//             CreatedBy: record.parameters.CreatedBy.value,
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = {
    //     updateSurvey,
    deleteSurveyResponse,
    createNewSurveyResponse,
    getSurveyResponseById,
    getAllSurveyResponses,
    //     //validateUniqueUser,
};