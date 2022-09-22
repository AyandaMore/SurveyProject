//SIGN UP PAGE

const registerBtn = document.querySelector(".registerBtn");
const userNameInput = document.querySelector(".userNameInput");
const passwordInput = document.querySelector(".passWordInput");
let confirmPassword = document.querySelector(".confirmPassword");

let url = "http://localhost:3000/users";

registerBtn.addEventListener("click", register);

function register(event) {
    //Validation
    if ((userNameInput.value === '') || (passwordInput.value === '') || (confirmPassword.value === '')) {
        alert("Please make sure you entered all your details!");
    } else {
        let userName = userNameInput.value;
        if (confirmPassword.value != passwordInput.value) {
            alert("Passwords do not match");
        } else {
            let userPassword = passwordInput.value;

            let UserObject = {
                UserName: userName,
                IsAdmin: 'No',
                Password: userPassword,
            };

            console.log(UserObject);

            postData(UserObject).then(res => { console.log(res) });

            window.location.href = "/loginPg";

        }

    }


}

async function postData(data) {
    try {
        const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            //return response.json()
        return response;
    } catch (err) {
        console.log("found error", err);
    }
}