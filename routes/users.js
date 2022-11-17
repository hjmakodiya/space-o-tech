const { validateForm } = require("../include/common")
const { SALT } = require("../include/config")
const Users = require("../model/users")
const bcrypt = require("bcryptjs")

module.exports = app => {

    //Register endpoint
    app.post(`${BASE_URL}/sign_up`, validateForm, async (req, res, next) => {
        try {
            const { email, password } = req.body

            //check email exist or not
            const user = await Users.findOne({ email })
            if (user) {
                throw { status: 500, message: "Email id already exist." }
            }

            //encrypt password.
            const salt = await bcrypt.genSalt(SALT);
            req.body.password = await bcrypt.hash(password, salt);

            const result = await Users.create(req.body)
            res.status(200)
                .json({ message: "User Registered Successfully", data: result })
        } catch (error) {
            next(error)
        }
    })

    //Login endpoint
    app.post(`${BASE_URL}/sign_in`, validateForm, async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email })
            //check email exist or not
            if (user) {
                let passwordCompare = await bcrypt.compare(password, user.password)
                if (!passwordCompare) {
                    throw { status: 500, message: "Invalid Password" }
                }
            } else {
                throw { status: 500, message: "Invalid Email" }
            }
            res.status(200)
                .json({ message: "Login Successfully", data: user })
        } catch (error) {
            next(error)
        }
    })
}