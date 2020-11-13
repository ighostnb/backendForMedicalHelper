const router = require('express').Router();
const Medicament = require('../../model/Medicament');
const verify = require('../../routes/verifyToken');
const { medicamentValidation } = require('./validation');

router.post('/medicament', verify, async (req, res) => {
    //! Validate data
    const { error } = medicamentValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //! Save medicament
    const medicament = new Medicament({
        name: req.body.name,
        time: req.body.time,
        userID: req.header('id'),
    });

    try {
        const savedMedicament = await medicament.save();
        res.status(200).send({
            status: 'okey',
            medicamentID: medicament._id,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;