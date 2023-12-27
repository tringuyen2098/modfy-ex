import * as helper from './utils/helper.js';
import * as defined from './utils/defined.js';
import * as jwt from './utils/jwt.js';
import * as mail from './utils/mail.js';
import validate from './middlewares/validate.js';
import limiter from './middlewares/limiter.js';
import * as config from './utils/config.js';
import knex from './database/knexfile.js'
import * as schema from './utils/schema.js';

export default {
    helper: helper,
    defined: defined,
    jwt: jwt,
    mail: mail,
    validate: validate,
    limiter: limiter,
    config: config,
    knex: knex,
    schema: schema
};