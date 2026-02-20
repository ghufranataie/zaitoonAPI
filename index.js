const users = require('./HR/users');

exports.handler = async (event) => {

    const method = event.httpMethod;
    const path = event.resource;

    try {

        if (method === "POST" && path === "/users") {
            return await users.createUser(event);
        }

        if (method === "GET" && path === "/users") {
            return await users.getUsers();
        }

        if (method === "PUT" && path === "/users/{id}") {
            return await users.updateUser(event);
        }

        if (method === "DELETE" && path === "/users/{id}") {
            return await users.deleteUser(event);
        }

        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Not Found" })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};