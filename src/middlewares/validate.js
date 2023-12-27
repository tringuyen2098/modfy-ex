import ajv from 'ajv';

export default (schema) => (req, res, next) => {
    const validator = new ajv({ allErrors: true });
    const fnValidate = validator.compile(schema);
    const isValid = fnValidate(req.body);
    
    if (!isValid) {
        return res.status(400).json({
            error: true,
            code: 400,
            data: [],
            msg: fnValidate.errors
        })
    }
    
    return next();
}