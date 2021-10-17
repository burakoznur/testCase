db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_name", "email", "password", "registration_date", "activation_date"],
            description: "It is designed to store user informations.",
            additionalProperties: false,
            properties: {
                _id: {
                    description: "unique user identifier"
                },
                user_name: {
                    bsonType: "string",
                    description: "user name"
                },
                email: {
                    bsonType: "string",
                    description: "email address."
                },
                password: {
                    bsonType: "string",
                    description: "hashed password"
                },
                registration_date: {
                    bsonType: "date",
                    description: "user registration date."
                },
                activation_date: {
                    bsonType: ["date", "null"],
                    description: "user email activation date"
                }
            }
        }
    }
});

db.users.createIndex({email: 1}, {unique: true});

db.createCollection("email_activation_codes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "code", "expire_date", "code_is_used"],
            description: "It is designed to store the unique code in the activation mail sent to the user.",
            additionalProperties: false,
            properties: {
                _id: {
                    description: "identifier"
                },
                user_id: {
                    bsonType: "string",
                    description: "user id"
                },
                code: {
                    bsonType: "string",
                    description: "email activation code"
                },
                expire_date: {
                    bsonType: "int",
                    description: "email activation code expire date. unix format."
                },
                code_is_used: {
                    bsonType: "int",
                    enum: [0, 1],
                    description: "is the code used? 1 is used, 0 is unused."
                }
            }
        }
    }
});

db.email_activation_codes.createIndex({code: 1}, {unique: true});

db.createCollection("user_sessions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "access_token", "expire_time"],
            description: "It is designed to store and control jwt tokens created when users log in.",
            additionalProperties: false,
            properties: {
                _id: {
                    description: "identifier"
                },
                user_id: {
                    bsonType: "string",
                    description: "user id"
                },
                access_token: {
                    bsonType: "string",
                    description: "jwt token"
                },
                expire_time: {
                    bsonType: "int",
                    description: "jwt token expire time"
                }
            }
        }
    }
});



