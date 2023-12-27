import { Router } from 'express';
import instance from '../instance.js';

const {limiter} = instance;

const router  = Router();

router.use('/v1/api', require('./users.js'));

router.get('/', limiter, (req, res) => {
    return res.status(200).json({
        error: false,
        code: 200,
        data: [],
        msg: "Welcome to API"
    });
});

export default router;