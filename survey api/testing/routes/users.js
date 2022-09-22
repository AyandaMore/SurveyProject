var config = require("./userDBconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');

//queryDatabase();

// async function createNewTable() {
//     try {
//         let pool = await sql.connect(config);

//         var query =
//             "CREATE TABLE Users (UserId VarChar(255) PRIMARY KEY, UserName VarChar(255), IsAdmin VarChar(255), Password VarChar(255))";
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     } catch (error) {
//         console.log(error);
//     }
// }
//createNewTable();

async function getAllUsers() {
    try {
        let pool = await sql.connect(config);
        let records = await pool.request().query("SELECT * FROM Users");
        return records.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function login(userDetails) {
    console.log('found user', userDetails)
    try {
        let task = await sql.connect(config);
        let todo = await task
            .request()
            .input("input_parameter", sql.VarChar, userDetails.UserName)
            .query("SELECT * FROM Users WHERE UserName = @input_parameter");


        let UserNameExists = todo.recordsets[0].length;
        let userFound = todo.recordsets[0][0];

        if (UserNameExists) {
            let validate = (userDetails.Password,
                userFound.Password)
            console.log('password', userDetails.Password, userFound.Password)
            console.log('validated', validate)
            if (validate) {
                return todo.recordsets[0][0];
            } else {
                return false;
            }
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
    }
}

async function validateUniqueUser(UserName) {
    try {
        let user = await sql.connect(config);
        let userfound = await user
            .request()
            .input("UserName", sql.VarChar(255), UserName)
            .query("SELECT * FROM Users WHERE UserName = @UserName");

        return userfound.recordset.length;
    } catch (error) {
        console.log(error);
    }
}



async function getUserById(id) {
    try {
        let user = await sql.connect(config);
        let record = await user
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("SELECT * FROM Users WHERE UserId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function validateUniqueUser(user_name) {
    try {
        let user = await sql.connect(config);

        let userfound = await user
            .request()
            .input("user_name", sql.VarChar(255), user_name)
            .query("SELECT * FROM Users WHERE UserName = @user_name");

        return userfound.recordset.length;
    } catch (error) {
        console.log(error);
    }
}

async function signUp(user) {
    try {
        let newUser = await sql.connect(config);

        let insertTask = await newUser
            .request()
            .input("UserId", sql.VarChar(255), user.UserId)
            .input("UserName", sql.VarChar(255), user.UserName)
            .input("IsAdmin", sql.VarChar(255), user.IsAdmin)
            .input("Password", sql.VarChar(255), user.Password)
            .query(
                "INSERT INTO Users (UserId, UserName, IsAdmin, Password) VALUES (@UserId, @UserName, @IsAdmin, @Password)",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            UserId: insertTask.parameters.UserId.value,
            UserName: insertTask.parameters.UserName.value,
            IsAdmin: insertTask.parameters.IsAdmin.value,
            Password: insertTask.parameters.Password.value,
        };
    } catch (err) {
        console.log(err);
    }
}

async function deleteUser(id) {
    try {
        let user = await sql.connect(config);
        let record = await user
            .request()
            .input("input_parameter", sql.VarChar(255), id)
            .query("DELETE FROM Users WHERE UserId = @input_parameter");
        return record.recordsets;
    } catch (error) {
        console.log(error);
    }
}
async function updateUser(user) {
    try {
        let updatedUser = await sql.connect(config);
        let record = await updatedUser
            .request()
            .input("UserId", sql.VarChar(255), user.UserId)
            .input("UserName", sql.VarChar(255), user.UserName)
            .input("IsAdmin", sql.VarChar(255), user.IsAdmin)
            .input("Password", sql.VarChar(255), user.Password)
            .query(
                "UPDATE Users SET UserName=@UserName, IsAdmin=@IsAdmin, Password=@Password WHERE UserId = @UserId",
                function(err, result) {
                    if (err) {
                        console.log(err);
                    }
                    sql.close();
                }
            );

        return {
            UserId: record.parameters.UserId.value,
            UserName: record.parameters.UserName.value,
            IsAdmin: record.parameters.IsAdmin.value,
            Password: record.parameters.Password.value,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    signUp,
    getUserById,
    getAllUsers,
    validateUniqueUser,
    login,
};