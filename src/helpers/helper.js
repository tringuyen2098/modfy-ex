import moment from "moment";
import randomstring from "randomstring";
import _ from 'lodash';
import logger from "./logger.js";
import {msg} from '../utils/config.js';



export const regexEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export const regexPhone = (phone) => {
    const regex = /^[+-]?\d+(?:\s*\d+)*$/;
    return regex.test(phone);
}

export const set = (data, point, excl= []) => {
    _.forOwn(data, (val, key) => {
        if(data && data[key] !== undefined &&  _.indexOf(excl, key) == -1) {
            Object.defineProperty(point, key, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: data[key]
              });
        }
    })
}


const _SECONDS = 5000;
import os from 'os';
import process from 'process';

const checkOverload = () => {
    setInterval(() => {
        // count connection ... <code check>
        const numConnections = 40;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maximum number of connections based on number of cores
        // Example: my computer has 5 cores and can suffer 5 connection;

        const maxConnections = numCores * 5;

        console.log('active connections: ' + numConnections);
        console.log(`Memory ussage: ${memoryUsage / 1024 / 1024}`)

        if(numConnections > maxConnections) {
            console.log('Connetion overload detected. Please upgrade this server');
            // notify send team
        }

    }, _SECONDS) // Monitor every 5 seconds
}