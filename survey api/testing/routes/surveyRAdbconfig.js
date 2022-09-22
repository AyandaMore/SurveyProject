require('msnodesqlv8')
const config = {
    server: 'LAPTOP-T04VDM4K', // update me
    driver: 'msnodesqlv8',
    database: 'SurveyDB',
    options: {
        trustedConnection: true,

    }
};

module.exports = config;