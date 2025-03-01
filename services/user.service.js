const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, phone, email, password, city, state }) => {
    try {
        if (!firstname || !phone || !email || !password || !city || !state) {
            throw new Error('All fields are required');
        }

        const user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            address: {
                city,
                state
            },
            phone,
            email,
            password
        });

        return user;

    } catch (error) {
        console.error("Error creating user:", error.message);
        throw new Error(`User creation failed: ${error.message}`);
    }
};
