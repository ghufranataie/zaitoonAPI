const users = require('./HR/users');

exports.handler = async (event) => {
    const method = event.httpMethod;
    const resource = event.resource;  // Use resource, not path
    console.log("Event:", event);

    try {
        if (method === "POST" && resource === "/users") {
            return await users.createUser(event);
        }

        if (method === "GET" && resource === "/users") {
            return await users.getUsers();
        }

        if (method === "PUT" && resource === "/users/{id}") {
            return await users.updateUser(event);
        }

        if (method === "DELETE" && resource === "/users/{id}") {
            return await users.deleteUser(event);
        }

        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Not Found" })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};