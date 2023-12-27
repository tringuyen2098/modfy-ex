import express, {Router} from 'express';
import instance from "../instance.js";
import iController from '../controllers/iController.js';

const {schema, validate} = instance;
const {users} = iController;


const router = Router();

router.post('/api/users/create', validate(schema.user), users.create)
router.get('/api/users/active/:code', users.active)


export default router;