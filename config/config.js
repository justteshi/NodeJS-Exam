const env = process.env.NODE_ENV || 'development'

const config = {
    development: {
        port: process.env.PORT || 9999,
        dbUrl: 'mongodb+srv://user:pass@softuni.etcdp.mongodb.net/theaters?retryWrites=true&w=majority',
        cookie: 'authId',
        secret: 'my-little-secret'
    },
    production:{}
}

module.exports = config[env]

