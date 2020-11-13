const router = require('express').Router();
const Medicament = require('../../model/Medicament');
const verify = require('../../routes/verifyToken');
const { deleteMedicamentValidation } = require('./validation');

//! Delete medicament
router.delete('/deleteMedicament', verify, (req, res) => {
    //! validation
    const { error } = deleteMedicamentValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    //! delete medicament
    try {
        Medicament.findOneAndDelete({ userID: req.header('id'), name: req.body.name }).then(function deleteMedicament() {
            res.status(200).send(req.body.name + ' delete successfully');
        })
    } catch (error) {
        res.status(200).send({ error: error });
    }
});

module.exports = router;