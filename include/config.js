let config = {}

config.PORT = 5000
config.MONGODB_URL = "mongodb://localhost:27017"
config.BASE_URL = "http://localhost:5000/backend/api"
config.EMAIL_REGEX = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
config.SALT = 10

module.exports = config 