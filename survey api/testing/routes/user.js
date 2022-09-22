class User {
    constructor(UserId, UserName, IsAdmin, Password) {
        this.UserId = UserId;
        this.UserName = UserName;
        this.IsAdmin = IsAdmin;
        this.Password = Password;

    }
}

module.exports = User;