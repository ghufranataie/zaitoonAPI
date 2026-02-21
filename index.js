const users = require('./HR/users');

exports.handler = async (event) => {
    const method = event.httpMethod;
    const path = event.path;
    console.log("Event received from API Gateway:", event);

    try {
        if (method === "POST" && path === "/users") {
            return await users.createUser(event);
        }

        if (method === "GET" && path === "/users") {
            return await users.getUsers();
        }

        if (method === "PUT" && path.startsWith("/users/")) {
            const id = path.split("/")[2];
            return await users.updateUser(event, id);
        }

        if (method === "DELETE" && path.startsWith("/users/")) {
            const id = path.split("/")[2];
            return await users.deleteUser(event, id);
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