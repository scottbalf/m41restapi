const User = require('./userModel');

const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await jwt.sign({_id: newUser.id}, process.env.SECRET);
        res.status(201).send({user: "User has been created."})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.readUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send({user: users})

    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.updateUser = async (req, res) => {
    try {
        await User.updateOne(
            {username: req.body.value},
            {[req.body.key]: req.body.value}
        );
        res.status(200).send({message: "Successfully updated a user"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    console.log(req.params)
    try {
        await User.deleteOne({username: req.params.username});
        res.status(200).send({message: "successfully deleted a user"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
// TASK is to generate a token on createuser and loginuser. This token should include unique information from the db entry. The token needs to sent back in the response and have an an endpoint that will find the user given just the token.
        const token = await jwt.sign({_id: req.user._id}, process.env.SECRET);
        res.status(200).send({user: req.user.username, token, text: "Sucessfully logged in"})
    } catch (error) {
        console.log(error)
        res.status(500).send({error: error.message})
    }
}