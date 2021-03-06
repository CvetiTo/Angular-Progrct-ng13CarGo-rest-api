const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


const JWT_SECRET = 'aeb4e4355fhgdfghjdfg';
const blacklist = [];

async function register(username, email, telephone, password) {
    const existing = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    console.log(existing);
    if (existing) {
        throw new Error('Email already exists');
    }

    const user = new User({
        username,
        email,
        telephone,
        hashedPassword: await bcrypt.hash(password, 10),    
    });
    //console.log(user)
    await user.save();
    
    return createSession(user);
}

async function login(username, password, _id) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
     
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return createSession(user);
}

function logout(token) {
    blacklist.push(token);
}

function createSession(user) {
    return {
        username: user.username,
        _id: user._id,
        accessToken: jwt.sign({
            username: user.username,
            _id: user._id
        }, JWT_SECRET)
    };
}

function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error('Token is invalidated');
    }
    
    const payload = jwt.verify(token, JWT_SECRET);
    
    return {
        username: payload.username,
        _id: payload._id,
        token
    };
}

module.exports = {
    register,
    login,
    logout,
    verifySession
};