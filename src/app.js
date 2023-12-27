import express from 'express';
import http from 'http';
import helmet from "helmet";
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import router from './routers/index.js';
import instance from './instance.js';

const {helper, limiter} = instance;

const app = express();

app.use(cors({
    credentials: true
}))

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(helmet());

app.use(limiter);


// delay response
const delay = process.env.DELAY;
app.use((req, res, next) => {
    setTimeout(next, delay);
})

const server = http.createServer(app);

app.use('/', router());

// Page not found
app.use((req, res, next) => {
    return res.status(404).json({
        error: true,
        code: 404,
        data: [],
        msg: helper.getMsg('error.server')
    });
})

// Check cheating system
app.use((error, req, res, next) => {

    helper.error("System error: " + error.message);
    
    return res.status(500).json({
        error: true,
        code: 500,
        data: [],
        msg: helper.getMsg('error.server')
    }); 
})

server.listen(process.env.PORT, () => {
    helper.info(`Server running on http://localhost:${process.env.PORT}`);
})