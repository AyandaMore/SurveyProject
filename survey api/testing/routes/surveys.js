var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');

//queryDatabase();

// async function createNewTable() {
//     try {
//         let pool = await sql.connect(config);

//         var query =
//             "CREATE TABLE Survey (SurveyId VarChar(255) PRIMARY KEY, SurveyName VarChar(255), CreatedBy VarChar(255));";
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     } catch (error) {
//         console.log(error);
//     }
// }
//createNewTable();

async function getAllSurveys() {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request().query("SELECT * FROM Survey");
        return records.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSurveyById(id) {
    try {
        let survey = await sql.connect(config);
        let record = await survey
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("SELECT * FROM Survey WHERE SurveyId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}

// async function validateUniqueUser(user_name) {
//     try {
//         let user = await sql.connect(config);

//         let userfound = await user
//             .request()
//             .input("user_name", sql.VarChar(255), user_name)
//             .query("SELECT * FROM Users WHERE UserName = @user_name");

//         return userfound.recordset.length;
//     } catch (error) {
//         console.log(error);
//     }
// }

async function createNewSurvey(survey) {
    try {
        let newSurvey = await sql.connect(config);

        let insertSurvey = await newSurvey
            .request()
            .input("SurveyId", sql.VarChar(255), survey.SurveyId)
            .input("SurveyName", sql.VarChar(255), survey.SurveyName)
            .input("CreatedBy", sql.VarChar(255), survey.CreatedBy)
            .input("IsDeleted", sql.VarChar(50), survey.IsDeleted)
            .query(
                "INSERT INTO Survey (SurveyId,SurveyName,CreatedBy,IsDeleted) VALUES (@SurveyId,@SurveyName,@CreatedBy,@IsDeleted)",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            SurveyId: insertSurvey.parameters.SurveyId.value,
            SurveyName: insertSurvey.parameters.SurveyName.value,
            CreatedBy: insertSurvey.parameters.CreatedBy.value,
            IsDeleted: insertSurvey.parameters.IsDeleted.value,
        };
    } catch (err) {
        console.log(err);
    }
}



async function deleteSurvey(id) {
    try {
        let survey = await sql.connect(config);
        let record = await survey
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("DELETE FROM Survey WHERE SurveyId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function updateSurvey(survey) {
    try {
        let updatedSurvey = await sql.connect(config);
        let record = await updatedSurvey
            .request()
            .input("SurveyId", sql.VarChar(255), survey.SurveyId)
            .input("SurveyName", sql.VarChar(255), survey.SurveyName)
            .input("CreatedBy", sql.VarChar(255), survey.CreatedBy)
            .input("IsDeleted", sql.VarChar(255), survey.IsDeleted)
            .query(
                "UPDATE Survey SET SurveyName=@SurveyName, CreatedBy=@CreatedBy IsDeleted@IsDeleted WHERE SurveyId = @SurveyId",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            SurveyId: record.parameters.SurveyId.value,
            SurveyName: record.parameters.SurveyName.value,
            CreatedBy: record.parameters.CreatedBy.value,
            IsDeleted: record.parameters.IsDeleted.value
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateSurvey,
    deleteSurvey,
    createNewSurvey,
    getSurveyById,
    getAllSurveys,
    //validateUniqueUser,
};