const questionContainer = document.querySelector(".questions-container");
var userId = sessionStorage.getItem("userId");
//console.log(userId);

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

            displayQs(idSelectedSurvey)

            async function displayQs(idSelectedSurvey) {
                questions = await getQuestions();
                var counter = 0;
                questions.forEach(question => {
                    if (question.FromSurvey == idSelectedSurvey) {
                        counter++;
                        questionsGenerator(question.Question, question.QuestionType, question.QuestionId, counter);
                        let questionsMakeObject = {
                            question: question.Question,
                            type: question.QuestionType,
                            questionId: question.QuestionId,
                        }

                        console.log(questionsMakeObject);
                        regenerateQuestions();
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

const prevButton = document.querySelector(".submitting-prev");
const nextButton = document.querySelector(".submitting-next");
const saveButton = document.querySelector(".submitting-answers");




const questionTypes = Object.freeze({
    textArea: 1,
    range: 2,
    yesNo: 3,
});

const dummyQuestions = [{
        question: "What is your home language ?",
        type: 0,
        questionId: "77tvjvjvjvjvjeds",
    },
    {
        question: "Are you still going to Limpopo?",
        type: 3,
        questionId: "77tvjv43djvjeds",
    },
    {
        question: "What's you mode of transport?",
        type: 5,
        questionId: "85411s686hhh",
        options: [{
                text: "I have a bike",
                value: 1,
            },
            {
                text: "I have a car",
                value: 2,
            },
            {
                text: "I have a Boat",
                value: 3,
            },
        ],
    },
    {
        question: "Rate your experience from 1 to 10",
        type: 2,
        questionId: "77tv1qaqvjvjvjeds",
    },
    {
        question: " Do you agree with Russians?",
        type: 4,
        questionId: "854758686hhh",
        options: [{
                text: "Agrees",
                value: 1,
            },
            {
                text: "Strongly Agree",
                value: 2,
            },
            {
                text: "Disagree",
                value: 3,
            },
        ],
    },
    {
        question: " Do you agree with Russians?",
        type: 4,
        questionId: "854758686hhh",
        options: [{
                text: "Agrees",
                value: 1,
            },
            {
                text: "Strongly Agree",
                value: 2,
            },
            {
                text: "Disagree",
                value: 3,
            },
        ],
    },
    {
        question: "Write your short bio",
        type: 1,
        questionId: "7987v1qaqvjvjeds",
    },
    {
        question: "Are you still going to Limpopo?",
        type: 3,
        questionId: "77tvjv9843djvjeds",
    },
];

//tempDummyQuestions = dummyQuestions;

prevButton.addEventListener("click", () => {
    regenerateQuestions(dummyQuestions.slice(0, 5));
});
nextButton.addEventListener("click", () => {
    regenerateQuestions(dummyQuestions.slice(5));
});
saveButton.addEventListener("click", () => console.log("submitButton"));




function questionsGenerator(question, type, questionId, questionNumber) {
    switch (type) {
        case questionTypes.yesNo:
            return (
                "<div class='question-answer'>" +
                "<div class='question'>" +
                "<div class='dot'>" +
                `<span class='numbering'>${questionNumber}</span>` +
                "</div>" +
                `<h2>${question}</h2>` +
                " </div>" +
                "<div class='answer-yes-no'>" +
                "<span class='arrow-answer'>&#10551;</span>" +
                "<div class='yes-no'>" +
                `<input type="radio" id=${questionId} ${getRadioValue(questionId, 1)} oninput="surveyUpdater('${questionId}','${
          questionTypes.yesNo
        }')"  name=${questionId} value="1" />` +
                "<label for='yes'>Yes</label>" +
                "<br />" +
                `<input type="radio" id=${questionId} ${getRadioValue(questionId, 0)} oninput="surveyUpdater('${questionId}','${
          questionTypes.yesNo
        }')" name=${questionId} value="0" />` +
                "<label for='no'>No</label>" +
                "<br/>" +
                "</div>" +
                "</div>" +
                "</div>"
            );
        case questionTypes.range:
            return (
                "<div class='question-answer'>" +
                "<div class='question'>" +
                "<div class='dot'>" +
                `<span class='numbering'>${questionNumber}</span>` +
                "</div>" +
                `<h2>${question}</h2>` +
                " </div>" +
                "<div class='answer'>" +
                "<span class='arrow-answer'>&#10551;</span>" +
                `<input id=${questionId}  oninput="surveyUpdater('${questionId}','${questionTypes.range}')" value="${getValue(
          questionId
        )}" class="standard-input" type="range" min="0" max="10" />` +
                "</div>" +
                "</div>"
            );
        case questionTypes.textArea:
            return (
                "<div class='question-answer'>" +
                "<div class='question'>" +
                "<div class='dot'>" +
                `<span class='numbering'>${questionNumber}</span>` +
                "</div>" +
                `<h2>${question}</h2>` +
                " </div>" +
                "<div class='answer-textAreaField'>" +
                "<span class='arrow-answer'>&#10551;</span>" +
                `<textarea id=${questionId} oninput="surveyUpdater('${questionId}','${questionTypes.textArea}')" class="textAreaField" rows="4" cols="45">` +
                "" +
                `${getValue(questionId)}` +
                "</textarea>" +
                "</div>" +
                "</div>"
            );
        default:
            return null;
    }
}
//regenerateQuestions(dummyQuestions.slice(0, 5));