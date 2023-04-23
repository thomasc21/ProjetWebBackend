const mysql = require('mysql');

const thingSchema = mysql.Schema({
    idusers: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mysql.model('user', thingSchema);