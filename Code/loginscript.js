const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");
const anon = document.querySelector(".anonymous");

anon.addEventListener('click', function(e) {
    let AnonymousDetails = {
        UserName: "Anonymous",
        Password: "",
        IsAdmin: "No"
    }
    postAnonymous(AnonymousDetails).then(res => {
        sessionStorage.setItem("userId", res.UserId);
        window.location.href = "/surveyViewsPage.html";
        console.log(res)
    });
})





loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (username.value == '' && password.value == '') {
        alert("Please enter your details!")
    } else {
        var user = username.value;
        var pWord = password.value;

        let loginDetails = {
            UserName: user,
            Password: pWord,
        };


        postData(loginDetails).then(res => {
            console.log('res', res);
            debugger;
            sessionStorage.setItem("userId", res.UserId)
            if (res.IsAdmin == 'Yes') {
                sessionStorage.setItem("userId", res.UserId)
                window.location.href = "/adminPg.html";
            } else {
                sessionStorage.setItem("userId", res.UserId);
                window.location.href = "/surveyViewsPage.html";
            }

        });




    }

})










//FUNCTION
async function postAnonymous(data) {
    var url = "http://localhost:3000/users"
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
        return response.json()




    } catch (err) {
        console.log("found error", err);
    }
}

async function postData(data) {
    var url = "http://localhost:3000/accounts";
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
        return response.json()

    } catch (err) {
        console.log("found error", err);
    }
}