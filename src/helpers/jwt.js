import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function sign (payload) {
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = process.env.EXPIRESIN

    const token = await jwt.sign(payload, secretKey, { expiresIn:  expiresIn})
    if (!token)
        return false;

    return token;
}

export async function verify(token) {
    try {
        const secretKey = process.env.SECRET_KEY;
        let obj = await jwt.verify(token, secretKey, { ignoreExpiration: true });
        if (obj) {
            delete obj.exp;
            delete obj.iat;
            return obj;
        }

    } catch (error) {}
}

export async function hash(password) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export function compare(pwd, upwd) {
    return bcrypt.compare(pwd, upwd);
}