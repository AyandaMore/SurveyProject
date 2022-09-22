let submitButton = document.querySelector(".submitting-answers");

submitButton.addEventListener("click", receivedAnswers);

function receivedAnswers() {
    console.log("checking....", questionsAnswers);
}

function surveyUpdater(questionId, type) {
    let questionsIds = questionsAnswers.map(({ questionId }) => questionId);
    const idAlreadyAdded = questionsIds.includes(questionId);
    if (idAlreadyAdded) {
        questionsAnswers = questionsAnswers.filter((ans) => ans.questionId !== questionId);
    }

    if (type == questionTypes.yesNo || type == questionTypes.radioGroup) {
        let answers = document.querySelectorAll(`[id='${questionId}']`);

        questionsAnswers.push({
            questionId: questionId,
            answer: [...answers].find((elmnt) => elmnt.checked == true).value,
        });
    } else if (type == questionTypes.multiCheckBox) {
        let answers = [...document.querySelectorAll(`[id='${questionId}']`)];

        answers = answers.filter((elmnt) => elmnt.checked).map((elnt) => elnt.value);

        questionsAnswers.push({
            questionId: questionId,
            answer: [...answers],
        });
    }

    questionsAnswers.push({
        questionId: questionId,
        answer: document.querySelector(`[id='${questionId}']`).value,
    });

    sessionStorage.setItem("surveyAnswers", JSON.stringify(questionsAnswers));
    console.log("filtered", questionsAnswers, questionId);
}