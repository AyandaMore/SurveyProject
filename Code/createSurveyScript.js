const questionsForm = document.querySelector(".popUp");
const darken = document.getElementById("darken");
const div = document.getElementById("SurveyNameDiv");
const heading = document.querySelector(".display");
const admin = 'LDigl-Is';

//GET NAME OF SURVEY
const surveyName = document.getElementById("surveyName");
const create = document.querySelector(".create");
const numberQuestions = document.getElementById("numQuestions")

console.log('userId', sessionStorage.getItem('userId'));

create.onclick = function(e) {
    e.preventDefault();
    console.log(surveyName.value);
    if (surveyName.value == ' ' || numberQuestions.value == ' ') {
        alert("Please fill in all details required to create the survey");
    } else {
        let nameSurvey = surveyName.value;
        let numQuestions = numberQuestions.value;

        let surveyObject = {
            SurveyName: nameSurvey,
            CreatedBy: sessionStorage.getItem('userId'),
            IsDeleted: 'No',
        }
        var id;
        postData(surveyObject).then(res => {
            console.log(res)
            id = res.SurveyId;
        });


        let counter = 0;
        //submitQuestions(nameSurvey);
        const label = document.createElement("label");
        label.innerHTML = "Enter the first question: <br> ";
        questionsForm.appendChild(label);

        const questionInput = document.createElement("input");
        questionInput.classList.add("input");
        questionInput.type = "text";
        questionsForm.appendChild(questionInput);



        const labelType = document.createElement("label");
        labelType.innerHTML = " <br> <br> <br> Type: <br>";
        questionsForm.appendChild(labelType);

        //type select
        const types = document.createElement("select");
        types.setAttribute('id', 'inputTypes');
        types.name = "type";
        questionsForm.appendChild(types);


        const type1 = document.createElement("option");
        //type1.name = "type";
        type1.value = "1";
        type1.innerHTML = "Text Area";
        types.appendChild(type1);


        const type2 = document.createElement("option");
        //type2.name = "type";
        type2.value = "2";
        type2.innerHTML = "Yes/No";
        types.appendChild(type2);

        const type3 = document.createElement("option");
        //type3.name = "type";
        type3.value = "3";
        type3.innerHTML = "Range";
        types.appendChild(type3);

        var typeOfQuestion = document.getElementById('inputTypes');
        submitQBtn = document.createElement("button");
        submitQBtn.classList.add("submit")
        submitQBtn.innerHTML = "Submit Question";
        questionsForm.appendChild(submitQBtn);

        questionsForm.style.display = "block";
        darken.style.display = "block";

        submitQBtn.onclick = function(e) {
            counter++;
            e.preventDefault();
            let questionObject = {
                Question: questionInput.value,
                FromSurvey: id,
                QuestionType: typeOfQuestion.options[typeOfQuestion.selectedIndex].value,
            }

            label.innerHTML = "Next Question";
            questionInput.value = '';

            console.log(questionObject);
            submitQuestions(nameSurvey);

            async function submitQuestions(nameSurvey) {
                const surveys = await getSurveys();
                surveys.forEach(survey => {
                    if (survey.SurveyName == nameSurvey) {
                        id = survey.SurveyId;
                        console.log("from:" + id);

                        postQuestion(questionObject);
                    }
                });
            }

            questionsForm.style.display = "block";
            darken.style.display = "block";

            // darken.onclick = function(e) {
            //     e.preventDefault();
            //     darken.style.display = "none";
            // }




            if (counter == numQuestions) {
                darken.style.display = "none";
                window.location.href = "./adminPg.html";
            }
        }
    }

}


//FUNCTION
async function postData(data) {
    url = 'http://localhost:3000/surveys';
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
            //return response;
    } catch (err) {
        console.log("found error", err);
    }
}

async function postQuestion(data) {
    url = 'http://localhost:3000/surveyQs';
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