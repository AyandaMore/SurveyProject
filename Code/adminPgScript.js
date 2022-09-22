const labelTotalSurveys = document.getElementById("totalSurveys");
const labelTotalUsers = document.getElementById("usersInteracted");
const navBar = document.getElementById("topNav");
var sticky = navBar.offsetTop;

window.onscroll = function() { myFunction() };

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navBar.classList.add("sticky")
    } else {
        navBar.classList.remove("sticky");
    }
}

//Displaying & calling functions
getNumSurveys();
getNumUsers();
showSurveys();
displayUsers();
var userId = sessionStorage.getItem("userId");

console.log(userId);
//Create a new survey
const createSurvey = document.getElementById("newSurvey");

createSurvey.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "./createSurvey.html";
})


//Fuctions
async function getSurveys() {
    let url = 'http://localhost:3000/surveys';
    try {
        let res = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getUsers() {
    let url = 'http://localhost:3000/users';
    try {
        let res = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getQuestions() {
    let url = 'http://localhost:3000/surveyQs';
    try {
        let res = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function displayUsers() {
    const users = await getUsers();
    const surveyResponse = await getSurveyResponse();
    const surveyGet = await getSurveys();
    const userParent = document.getElementById("users");


    surveyResponse.forEach(response => {
        users.forEach(user => {
            surveyGet.forEach(surv => {
                if ((response.UserId == user.UserId) && (response.SurveyId == surv.SurveyId)) {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("survey");
                    userParent.appendChild(userDiv);
                    //create image 

                    const image = document.createElement("img");
                    image.src = "/images/usercompleted.png";
                    image.classList.add("userImage");
                    userDiv.appendChild(image);
                    //create LI
                    const newUser = document.createElement("li");
                    newUser.innerHTML = user.UserName + " completed the " + surv.SurveyName + " survey.";
                    newUser.classList.add("name")
                    userDiv.appendChild(newUser);
                }
            })
        })







    })
}

async function getNumSurveys() {
    const surveys = await getSurveys();

    let count = 0;
    surveys.forEach(survey => {
        //console.log(survey.SurveyId);
        if (survey.SurveyId) {
            count++;
            return count;
        }
    });
    labelTotalSurveys.innerHTML = count + " Total Surveys";
}

async function updateSurvey(id) {
    let url = 'http://localhost:3000/surveys';
    try {
        let res = await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            body: JSON.stringify(id),
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function showSurveys() {
    const surveys = await getSurveys();

    const surveyParent = document.getElementById("activeSurveys");
    surveys.forEach(survey => {

        if (survey.IsDeleted == "No") {
            var idSelectedSurvey = survey.SurveyId;
            //create div
            const surveyDiv = document.createElement("div");
            surveyDiv.classList.add("survey");
            surveyParent.appendChild(surveyDiv);

            //create LI
            const newSurvey = document.createElement("li");
            newSurvey.innerHTML = survey.SurveyName;
            newSurvey.classList.add("name")
            surveyDiv.appendChild(newSurvey);

            //create open button
            const openBtn = document.createElement('button');
            openBtn.innerHTML = 'View Questions';
            openBtn.classList.add("open");
            surveyDiv.appendChild(openBtn);

            //create see Results button
            const seeBtn = document.createElement('button');
            seeBtn.innerHTML = 'See Results';
            seeBtn.classList.add("seeResults");
            surveyDiv.appendChild(seeBtn);

            seeBtn.onclick = function(e) {
                e.preventDefault();
                renderQuestions(survey.SurveyId);

                async function renderQuestions(surveyId) {
                    const questions = await getQuestions();
                    const answers = await getSurveyResponseAnswers();



                    questions.forEach(question => {
                        let countYes = 0;
                        let countNo = 0;
                        let count1 = 0;
                        let count2 = 0;
                        let count3 = 0;
                        let count4 = 0;
                        let count5 = 0;
                        let count6 = 0;
                        let count7 = 0;
                        let count8 = 0;
                        let count9 = 0;
                        let count10 = 0;
                        const darken = document.getElementById("darken");
                        const display = document.getElementById("popUp")

                        darken.style.display = "block";
                        display.style.display = "block";

                        if (question.FromSurvey == surveyId) {
                            //heading
                            const heading = document.createElement("h3");
                            heading.classList.add = "resultsHeading";
                            heading.innerHTML = question.Question;
                            display.appendChild(heading);
                            darken.appendChild(display);



                            //vals 
                            if (question.QuestionType == '1') {
                                const heading = document.createElement('h4');
                                heading.classList.add = "resultsParagraph";
                                heading.innerHTML = "Replies from users: <br><br>"
                                display.appendChild(heading);
                                answers.forEach(answer => {
                                    if (answer.QuestionId == question.QuestionId) {
                                        const displayAns = document.createElement('li');
                                        displayAns.innerHTML = answer.Answer;
                                        display.appendChild(displayAns);

                                    }
                                })
                            } else if (question.QuestionType == '2') {
                                answers.forEach(answer => {
                                    if (answer.QuestionId == question.QuestionId) {
                                        if (answer.Answer == "Yes") {
                                            countYes++;
                                        } else {
                                            countNo++;
                                        }
                                    }
                                })
                                const paragraph = document.createElement("h4");
                                paragraph.classList.add = "resultsParagraph";
                                paragraph.innerHTML = "YES : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        " + countYes + " <br> NO :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      " + countNo;
                                display.appendChild(paragraph);
                            } else {
                                answers.forEach(answer => {
                                    if (answer.QuestionId == question.QuestionId) {
                                        if (answer.Answer == '1') {
                                            count1++;
                                        } else if (answer.Answer == '2') {
                                            count2++;
                                        } else if (answer.Answer == '3') {
                                            count3++;
                                        } else if (answer.Answer == '4') {
                                            count4++;
                                        } else if (answer.Answer == '5') {
                                            count5++;
                                        } else if (answer.Answer == '6') {
                                            count6++;
                                        } else if (answer.Answer == '7') {
                                            count7++;
                                        } else if (answer.Answer == '8') {
                                            count8++;
                                        } else if (answer.Answer == '9') {
                                            count9++;
                                        } else {
                                            count9++;
                                        }
                                    }
                                })
                                const paragraph = document.createElement("h4");
                                paragraph.innerHTML = "Rated 1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + count1 + " <br> Rated 2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + count2 + " <br> Rated 3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                                    count3 + " <br> Rated 4: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + count4 + " <br> Rated 5:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + count5 + " <br> Rated 6:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + count6 + " <br> Rated 7:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + count7 + " <br> Rated 8:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + count8 + " <br> Rated 9:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + count9 + " <br> Rated 10:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + count10;
                                display.appendChild(paragraph);
                            }

                        }
                    })
                }
                darken.onclick = function(e) {
                    e.preventDefault()
                    darken.style.display = "none";
                }
            }


            //displays
            const darken = document.getElementById("darken");
            const displayQuestions = document.getElementById("popUp")


            openBtn.onclick = function(e) {
                e.preventDefault();
                darken.style.display = "block";
                displayQuestions.style.display = "block";

                getQs();

                //show questions.
                async function getQs() {
                    let questions = await getQuestions();
                    questions.forEach(question => {
                        //console.log(survey.SurveyId);
                        if (question.FromSurvey == idSelectedSurvey) {
                            const q = document.createElement("li");
                            q.innerHTML = question.Question;
                            displayQuestions.appendChild(q);
                        }
                    });

                }

                darken.onclick = function(e) {
                    e.preventDefault();
                    darken.style.display = "none";
                }

            }


        }

    })
}


async function getUsers() {
    let url = 'http://localhost:3000/users';
    try {
        let res = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getNumUsers() {
    const users = await getUsers();

    let count = 0;
    users.forEach(user => {
        //console.log(survey.SurveyId);
        if (user.UserId) {
            count++;
            return count;
        }
    });
    labelTotalUsers.innerHTML = count + " Total Users";
}

async function getSurveyResponse() {
    let url = 'http://localhost:3000/surveyRs';
    try {
        let res = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getSurveyResponseAnswers() {
    let url = 'http://localhost:3000/surveyRAs';
    try {
        let res = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}