# SurveyProject
This is a survey creator project that I created using HTML, CSS, and JavaScript. 

Inside "Code" is the front-end code which is written in HTML, CSS and JavaScript

Inside SurveyApi/testing is the back-end code which is written in NodeJS.

HOW TO REPRODUCE:

Must have:
- OS: Windows 10+
- VS Code
- Microsoft SQL Server
- Node.JS 

STEPS to reproduce the database:
- Open SurveyApi/testing
- run: npm install
- Update line 3 inside: [dbconfig.js, userDBConfig.js, surveyResponseDBConfig.js, surveyRAdbconfig.js,surveyQuestionsdbConfig.js]  
- uncomment the "createNewTable" functions in: [users.js, surveys.js, surveyRs.js, surveyRAs.js, surveyQs.js]
- run: npm start

STEPS to reproduce the Web API:
- Open SurveyApi/testing
- Comment out the "createNewTable" functions in: [users.js, surveys.js, surveyRs.js, surveyRAs.js, surveyQs.js]
- run: npm install

STEPS to reproduce the Front end
- Open SurveyApi/Code using VS Code
- Open registerPg.html using Live Server 


