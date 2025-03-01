const adminModel = require('../models/admin.model');

module.exports.createAdmin = async ({ firstname, lastname, phone, email }) => {
    try {
        if (!firstname || !phone || !email  ) {
            throw new Error('All fields are required');
        }

        const admin = await adminModel.create({
            fullname: {
                firstname,
                lastname
            },
            phone,
            email,
        });

        return admin;

    } catch (error) {
        console.error("Error creating admin:", error.message);
        throw new Error(`Admin creation failed: ${error.message}`);
    }
};
