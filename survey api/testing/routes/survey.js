class Survey {
    constructor(SurveyId, SurveyName, CreatedBy, IsDeleted) {
        this.SurveyId = SurveyId;
        this.SurveyName = SurveyName;
        this.CreatedBy = CreatedBy;
        this.IsDeleted = IsDeleted;
    }
}

module.exports = Survey;