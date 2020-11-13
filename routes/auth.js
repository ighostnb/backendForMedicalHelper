const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

router.post('/register', async (req, res) => {
    //! Validate data
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //! Checking is user already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    //! Hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //! Create a new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        role: 'user',
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id, role: user.role });
    } catch (error) {
        res.status(400).send(error);
    }
});

//! Login
router.post('/login', async (req, res) => {
    //! Validate data
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //! Checking if the email exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send('Email or password is wrong');
    }

    //! Password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Email or password is wrong');
    }
    //! Create jwt token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('token', token).send({ id: user.id, token: token });
});

//! Delete account
router.post('/deleteAccount', verify, (req, res) => {
    try {
        User.findByIdAndDelete({ _id: req.header('id') }).then(function deleteUser() {
            res.status(200).send('Account delete successfully');
        });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

module.exports = router;