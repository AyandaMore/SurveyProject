class SurveyResponse {
    constructor(SurveyResponseId, SurveyId, UserId) {
        this.SurveyResponseId = SurveyResponseId;
        this.SurveyId = SurveyId;
        this.UserId = UserId;
    }
}

module.exports = SurveyResponse;