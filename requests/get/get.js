const router = require('express').Router();
const Medicament = require('../../model/Medicament');
const User = require('../../model/User');
const verify = require('../../routes/verifyToken');

//! Get all user medicament
router.get('/getUserMedicaments', verify, (req, res) => {
    //! get medicament
    try {
        Medicament.find({ userID: req.header('id') }).then(function getMed(result) {
            res.status(200).send({ medicaments: result });
        });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

//! get user
router.get('/getUser', verify, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.header('id') });
        if (user) {
            res.status(200).send({ user });

        }

    } catch (error) {
        res.status(400).send({ error: error });
    }
});

module.exports = router;