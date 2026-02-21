// lambdaHandler.js
const users = require('./HR/users');

exports.handler = async (event) => {
    const method = event.httpMethod;
    const resource = event.resource; // Use resource for routing
    console.log("Event received from API Gateway:", JSON.stringify(event, null, 2));

    try {
        // CREATE USER
        if (method === "POST" && resource === "/users") {
            const result = await users.createUser(event);
            return {
                statusCode: 201,
                headers: { "Content-Type": "application/json" },
                body: result
            };
        }

        // GET ALL USERS
        if (method === "GET" && resource === "/users") {
            const result = await users.getUsers();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: result
            };
        }

        // UPDATE USER
        if (method === "PUT" && resource === "/users/{id}") {
            const id = event.pathParameters?.id;
            if (!id) {
                return { statusCode: 400, body: JSON.stringify({ message: "User ID missing" }) };
            }
            const result = await users.updateUser(event, id);
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: result
            };
        }

        // DELETE USER
        if (method === "DELETE" && resource === "/users/{id}") {
            const id = event.pathParameters?.id;
            if (!id) {
                return { statusCode: 400, body: JSON.stringify({ message: "User ID missing" }) };
            }
            const result = await users.deleteUser(event, id);
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: result
            };
        }

        // Route not found
        return {
            statusCode: 404,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Not Found" })
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};