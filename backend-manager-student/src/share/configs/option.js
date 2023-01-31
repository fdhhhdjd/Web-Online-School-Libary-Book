const CONSTANTS = require('./constants');

module.exports = {
    SWAGGER_ADMIN: {
        definition: {
            openapi: CONSTANTS.OPEN_API_SWAGGER,
            info: {
                title: CONSTANTS.TITLE_ADMIN_SWAGGER,
                version: CONSTANTS.VERSION_SWAGGER,
                description: CONSTANTS.DESCRIPTION_ADMIN_SWAGGER,
            },
            servers: [
                {
                    url: CONSTANTS.URL_ADMIN_SWAGGER,
                },
            ],
        },
        apis: [CONSTANTS.APIS_ADMIN_SWAGGER],
    },
    SWAGGER_USER: {
        definition: {
            openapi: CONSTANTS.OPEN_API_SWAGGER,
            info: {
                title: CONSTANTS.TITLE_USER_SWAGGER,
                version: CONSTANTS.VERSION_SWAGGER,
                description: CONSTANTS.DESCRIPTION_USER_SWAGGER,
            },
            servers: [
                {
                    url: CONSTANTS.URL_USER_SWAGGER,
                },
            ],
        },
        apis: [CONSTANTS.APIS_USER_SWAGGER],
    },
};
