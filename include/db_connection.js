const mongoose = require('mongoose');
const { MONGODB_URL } = require("./config");

function initPool(pool) {
    return new Promise(async (resolve, reject) => {
        try {
            if (pool) {
                resolve(pool)
            } else {
                //establish connection 
                pool = await mongoose.connect(MONGODB_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                    });
                resolve(pool);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {initPool}