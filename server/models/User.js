// server/models/User.js
// Mock in-memory database for users
let users = [];

module.exports = {
    findAll: () => users,
    findByEmail: (email) => users.find(user => user.email === email),
    findById: (id) => users.find(user => user.id === id),
    create: (userData) => {
        const newUser = { id: Date.now().toString(), ...userData };
        users.push(newUser);
        return newUser;
    }
};
