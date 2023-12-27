'use strict'

import moment from "moment";
import randomstring from "randomstring";
import _ from 'lodash';
import logger from "../helpers/logger.js";

export const now = () => {
    return moment().format("DD/MM/YYYY HH:mm:ss");
}

export const defaultNow = () => {
    return moment().format();
}

export const randomStr = () => {
    return randomstring.generate(process.env.GEN_SALT);
}

export const info = (msg) => {
    logger.info(msg);
}

export const error = (msg) => {
    logger.error(msg);
}

export const getMsg = (name) => {
    return msg[name] ? msg[name] : name;
}