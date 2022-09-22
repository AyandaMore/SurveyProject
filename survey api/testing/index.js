const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const surveyRouter = require("./routes/apis");
const usersRouter = require("./routes/userApis");
const surveyQuestionsRouter = require("./routes/surveyQuestionsApis");
const surveyResponseRouter = require("./routes/surveyResponseApis");
const surveyResponseAnswerRouter = require("./routes/surveyResponseAnswersApis");
const accountRouter = require("./routes/accountApi");

const PORT = 3000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Survey API",
            version: "1.0.0",
            description: "A Survey API",
        },
        servers: [{
            url: "http://localhost:3000",
        }, ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/surveys", surveyRouter);
app.use("/users", usersRouter)
app.use("/surveyQs", surveyQuestionsRouter);
app.use("/surveyRs", surveyResponseRouter);
app.use("/surveyRAs", surveyResponseAnswerRouter);
app.use("/accounts", accountRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));