class SurveyResponseAnswer {
    constructor(SurveyRA_Id, SurveyResponseId, QuestionId, Answer) {
        this.SurveyRA_Id = SurveyRA_Id;
        this.SurveyResponseId = SurveyResponseId;
        this.QuestionId = QuestionId;
        this.Answer = Answer;
    }
}

module.exports = SurveyResponseAnswer;