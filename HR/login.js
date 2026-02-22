const getDBConnection = require('../config/db');
const argon2 = require('argon2');

exports.userLogin = async (event) => {
    const db = await getDBConnection();
    const body = JSON.parse(event.body);
    const { email, password } = body;
    const [rows] = await db.execute(`SELECT * from users where usrName=? or usrEmail=?`, [email, email]);

    if (rows.length === 0) {
        // No user found
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "incorrect" })
        };
    }

    const user = rows[0];

    if (user.usrStatus !== 1) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: "blocked" })
        };
    }


    return {
        statusCode: 200,
        body: rows
    };
}