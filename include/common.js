
const { EMAIL_REGEX } = require("./config.js")

module.exports = {
    validateForm: ({ body }, res, next) => {
        const data = { "email": body.email, "password": body.password }
        const findInvalid = Object.keys(data).find(r => !data[r] && data[r] !== false);
        if (findInvalid) {
            next({ status: 400, message: `${findInvalid} is required` })
        } else {
            if (data.email.match(EMAIL_REGEX))
                next();
            else
                next({ status: 400, message: "Please Enter valid email" })
        }
    }
}