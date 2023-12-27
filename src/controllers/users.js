import instance from '../instance.js';
import iModel from '../models/iModel.js';
import Hashids from 'hashids';
import _ from 'lodash';


const {jwt, mail, helper} = instance;
const {role, status, keyAuthen} = instance.defined
const {UserModel} = iModel;

export const create = async (req, res) => {
    try {
        const body = req.body;
        if(!body || !body.email || !body.username || !body.password || !body.firstName || !body.lastName || !body.phoneNumber) {
            throw new Error(helper.getMsg("data.invalid"));
        }

        if(!helper.regexPhone(body.phoneNumber)) {
            throw new Error(helper.getMsg("phone.invalid"));
        }

        if(!helper.regexEmail(body.email)) {
            throw new Error(helper.getMsg("email.invalid"));
        }

        const user = new UserModel(body);

        const isExists = await user.exists();
        if(isExists) {
            throw new Error(helper.getMsg('email.or.user.exists'));
        }

        const password = await jwt.hash(body.password);

        user.set({
            password: password,
            role: role.normal,
            status: status.inactive
        });

        const result = await user.create();
        if(!result || !result.length) {
            throw new Error(helper.getMsg("create.account.failed"));
        }

        //send mail confirm
        const hashids = new Hashids(keyAuthen);
        const code = hashids.encode(result[0].userId);

        mail.sendAuthenticationMail(body.email, code);

        return res.status(200).json({
            error: false,
            code: 200,
            data: result,
            msg: helper.getMsg("create.account.success")
        });

    } catch (e) {
        helper.error(e);

        return res.status(400).json({
            error: true,
            code: 400,
            data: [],
            msg: e.message,
        })
    }
};


export const active = async (req, res) => {
    try {
        const code = req.params.code;
        const email = req.query.email;
        

        const hashids = new Hashids(keyAuthen);
        const result = hashids.decode(code);

        if(!result || !result.length || !_.isNumber(result[0])) {
            throw new Error(helper.getMsg("active.acounnt.failed"));
        }

        const userModel = new UserModel({userId: result[0]});
        const users = await userModel.get();

        if(users[0].email === email) {

            await userModel.save({status: status.active});
            
            return res.status(200).json({
                error: false,
                code: 200,
                data: [],
                msg: helper.getMsg("active.account.success")
            });
        }

    } catch (e) {
        helper.error(e);

        return res.status(400).json({
            error: true,
            code: 400,
            data: [],
            msg: e.message,
        })
    }
}