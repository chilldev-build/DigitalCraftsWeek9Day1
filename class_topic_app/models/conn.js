const pgp = require('pg-promise') ({
    query: function(e) {
        console.log('QUERY:', e.query)
    }
});

const options = {
    host: 'localhost',
    database: 'class_topic_app',
    user: 'chilldev',
    password: 'password'
};

const db = pgp(options);

module.exports = db;