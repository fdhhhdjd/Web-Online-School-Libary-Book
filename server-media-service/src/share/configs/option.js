const CONSTANTS = require('./constants');

module.exports = {
    SWAGGER_MEDIA: {
        definition: {
            openapi: CONSTANTS.OPEN_API_SWAGGER,
            info: {
                title: CONSTANTS.TITLE_MEDIA_SWAGGER,
                version: CONSTANTS.VERSION_SWAGGER,
                description: CONSTANTS.DESCRIPTION_MEDIA_SWAGGER,
            },
            servers: [
                {
                    url: CONSTANTS.URL_MEDIA_SWAGGER,
                },
            ],
        },
        apis: [CONSTANTS.APIS_MEDIA_SWAGGER],
    }
};
