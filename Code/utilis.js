let questionsAnswers = JSON.parse(sessionStorage.getItem("surveyAnswers")) || [];

function regenerateQuestions() {
    let questionViews = "";


    questionViews += questionsGenerator(question, type, questionId);

    questionContainer.innerHTML = questionViews;
}

function radioOptionCreator(questionId, options) {
    let initiaOptions = "";
    options.forEach(({ text, value }) => {
        initiaOptions +=
            `<input type="radio" id=${questionId} ${getRadioValue(
        questionId,
        value
      )} oninput="surveyUpdater('${questionId}','${questionTypes.radioGroup}')" name=${questionId} value=${value} />` +
            `<label>${text}</label><br />`;
    }) + "</div>";
    return initiaOptions;
}

function checkOptionCreator(questionId, options) {
    let initiaOptions = "";
    options.forEach(({ text, value }) => {
        initiaOptions +=
            `<input type="checkbox" id=${questionId} name=${questionId} oninput="surveyUpdater('${questionId}','${
        questionTypes.multiCheckBox
      }')" ${getMultiValues(questionId, value)} value=${value} />` + `<label>${text}</label><br />`;
    }) + "</div>";
    return initiaOptions;
}

function getValue(id) {
    return questionsAnswers.find((record) => record.questionId === id) ?
        questionsAnswers.find((record) => record.questionId === id).answer :
        "";
}

function getMultiValues(id, value) {
    let answers = questionsAnswers.find((record) => record.questionId === id) ?
        questionsAnswers.find((record) => record.questionId === id).answer : [];

    if ([...answers].find((num) => num == value) == value) {
        return "checked";
    }
}

function getRadioValue(id, value) {
    if (questionsAnswers.find((record) => record.questionId === id)) {
        if (questionsAnswers.find((record) => record.questionId === id).answer == value) return "checked";
    }
}