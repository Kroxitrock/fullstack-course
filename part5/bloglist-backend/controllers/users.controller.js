const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const usersRouter = require('express').Router();

usersRouter.get('', async (request, response) => {
    const users = await User.find({}).populate('blogs');
    response.json(users)
})

usersRouter.post('', async (request, response) => {
    const user = new User(request.body)

    if (!user.username) {
        return response.status(400).json({ error: 'username missing' })
    }

    if (!user.password) {
        return response.status(400).json({ error: 'password missing' })
    }

    if (user.password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const existingUser = await User.findOne({ username: user.username })

    if (existingUser) {
        return response.status(400).json({ error: 'username already exists' })
    }

    user.password = await bcrypt.hash(user.password, 10)

    const result = await user.save()

    response.status(201).json(result)
})

usersRouter.post('/login', async (request, response) => {
    const {username, password} = request.body

    if (!username || !password) {
        return response.status(400).json({error: 'username and password required'})
    }

    const user = await User.findOne({username})

    if (!user) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const passwordCorrect = await bcrypt.compare(password, user.password)

    if (!passwordCorrect) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        config.JWT_SECRET,
        {expiresIn: '1h'}
    )

    response.status(200).json({token, username, name: user.name})
})

module.exports = usersRouter