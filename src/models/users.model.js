import users from './users.mongo.js';

export async function createNewUser(user) {
    return await users.create(user);
}

export async function getUserByEmail(email) {
    return await users.findOne({email});
}
