const getDbConnection = require('../config/db');

exports.createUser = async (event) => {
    const db = await getDBConnection();
    const body = JSON.parse(event.body);

    const [result] = await db.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [body.name, body.email]
    );

    return {
        statusCode: 201,
        body: JSON.stringify({ id: result.insertId })
    };
};

exports.getUsers = async () => {
    const db = await getDBConnection();

    const [rows] = await db.execute("SELECT * FROM users");

    return {
        statusCode: 200,
        body: JSON.stringify(rows)
    };
};

exports.updateUser = async (event) => {
    const db = await getDBConnection();
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;

    await db.execute(
        "UPDATE users SET name=?, email=? WHERE id=?",
        [body.name, body.email, id]
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Updated" })
    };
};

exports.deleteUser = async (event) => {
    const db = await getDBConnection();
    const id = event.pathParameters.id;

    await db.execute(
        "DELETE FROM users WHERE id=?",
        [id]
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Deleted" })
    };
};