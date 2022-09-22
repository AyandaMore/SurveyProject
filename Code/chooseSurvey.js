var userId = sessionStorage.getItem("userId");
console.log(userId);

showSurveys();

const darken = document.getElementById("darken");
const displayQuestions = document.getElementById("popUp")

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


var counter = 0;
async function showSurveys() {
    const surveys = await getSurveys();

    const surveyParent = document.getElementById("activeSurveys");
    surveys.forEach(survey => {
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
        openBtn.innerHTML = 'Take Survey';
        openBtn.classList.add("open");
        surveyDiv.appendChild(openBtn);
        //displays
        const darken = document.getElementById("darken");
        const displayQuestions = document.getElementById("popUp")

        openBtn.onclick = function(e) {
            e.preventDefault();
            darken.style.display = "block";
            displayQuestions.style.display = "block";

            displayQs(idSelectedSurvey);

            var countDown = 0;
            async function displayQs(idSelectedSurvey) {
                questions = await getQuestions();
                var counter = 0;
                questions.forEach(question => {
                    if (question.FromSurvey == idSelectedSurvey) {
                        countDown++;
                        //create div 
                        const questionDiv = document.createElement("div");
                        questionDiv.classList.add("surveyDiv");
                        displayQuestions.appendChild(questionDiv)

                        const questionHeading = document.createElement("h4");
                        questionHeading.innerHTML = question.Question + "<br> <br> <br>";
                        questionDiv.appendChild(questionHeading);

                        if (question.QuestionType == '1') {
                            const inputField = document.createElement("input");
                            inputField.type = "text"
                            inputField.name = "answer";
                            inputField.classList.add("textInput");
                            inputField.setAttribute('id', 'input');
                            questionDiv.appendChild(inputField);
                        } else if (question.QuestionType == '2') {
                            const yesR = document.createElement("input");
                            yesR.type = "radio";
                            yesR.name = "yes";
                            yesR.value = "Yes";
                            yesR.classList.add("chosenYes");
                            const labelYes = document.createElement("label");
                            labelYes.for = yesR;
                            labelYes.innerHTML = "Yes";
                            questionDiv.appendChild(yesR);
                            questionDiv.appendChild(labelYes);

                            const noR = document.createElement("input");
                            noR.type = "radio";
                            noR.name = "no"
                            noR.value = "No";
                            noR.classList.add("chosenNo");
                            const labelNo = document.createElement("label");
                            labelNo.for = noR;
                            labelNo.innerHTML = "No";
                            questionDiv.appendChild(noR);
                            questionDiv.appendChild(labelNo);
                        } else {
                            const range = document.createElement("input");
                            range.type = "range";
                            range.name = "answer";
                            range.min = "1";
                            range.max = "10";
                            range.step = "1";
                            range.classList.add("rangeClass");
                            range.setAttribute('id', 'rangebar');
                            questionDiv.appendChild(range);
                        }

                        const br = document.createElement("br");
                        questionDiv.appendChild(br);
                        questionDiv.appendChild(br);
                        questionDiv.appendChild(br);

                        const saveAnswer = document.createElement("button");
                        saveAnswer.classList.add("submit");
                        saveAnswer.innerHTML = "Save Answer";
                        questionDiv.appendChild(saveAnswer);

                        var ans;
                        saveAnswer.onclick = function(e) {
                            e.preventDefault();
                            counter++;

                            countDown--;


                            if (counter == 1) {
                                let surveyResponseObject = {
                                    SurveyId: idSelectedSurvey,
                                    UserId: userId,
                                }


                                postSurveyResponse(surveyResponseObject).then(res => {
                                    console.log(res)
                                    sessionStorage.setItem('survRespId', res.SurveyResponseId);
                                    //console.log("response Id is " + survRespId)
                                });
                            }
                            var survRespId = sessionStorage.getItem('survRespId')
                            console.log("still checking " + survRespId);


                            if (question.QuestionType == '1') {
                                ans = document.getElementById('input').value;
                                let surveyRAObject = {
                                    SurveyResponseId: survRespId,
                                    QuestionId: question.QuestionId,
                                    Answer: ans,
                                }
                                console.log(surveyRAObject);
                                postSurveyResponseAnswer(surveyRAObject);
                            } else if (question.QuestionType == '2') {
                                ans = document.querySelectorAll('input[type="radio"]');
                                var answ;
                                for (const an of ans) {
                                    if (an.checked) {
                                        answ = an.value;
                                    }
                                }

                                let surveyRAObject = {
                                    SurveyResponseId: survRespId,
                                    QuestionId: question.QuestionId,
                                    Answer: answ,
                                }

                                for (var i = 0; i < ans.length; i++) {
                                    ans[i].checked = false;
                                }
                                //ans.checked = false;
                                console.log(surveyRAObject);
                                postSurveyResponseAnswer(surveyRAObject);


                            } else {
                                ans = document.getElementById('rangebar').value;
                                let surveyRAObject = {
                                    SurveyResponseId: survRespId,
                                    QuestionId: question.QuestionId,
                                    Answer: ans,
                                }
                                console.log(surveyRAObject);
                                postSurveyResponseAnswer(surveyRAObject);
                                ans.value = 0;

                            }




                            if (countDown == 0) {
                                darken.style.display = "none";
                            }


                            questionDiv.style.display = "none";
                            darken.style.display = "block";

                        }

                    }
                })
            }
        }

    })

    async function postSurveyResponse(data) {
        let url = "http://localhost:3000/surveyRs";
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


    async function postSurveyResponseAnswer(data) {
        let url = "http://localhost:3000/surveyRAs";
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

    async function getSurveyResponse() {
        let url = "http://localhost:3000/surveyRs";
        try {
            const response = await fetch(url, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(), // body data type must match "Content-Type" header
            })
            return response.json()




        } catch (err) {
            console.log("found error", err);
        }
    }
}