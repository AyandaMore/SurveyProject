class SurveyQuestion {
    constructor(QuestionId, Question, FromSurvey, QuestionType) {
        this.QuestionId = QuestionId;
        this.Question = Question;
        this.FromSurvey = FromSurvey;
        this.QuestionType = QuestionType;
    }
}

module.exports = SurveyQuestion;