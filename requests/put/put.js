const router = require('express').Router();
const { addInfoValidation } = require('./validation');
const verify = require('../../routes/verifyToken');
const User = require('../../model/User');
const e = require('express');

//! Add information about user
router.put('/addInfo/:id', verify, (req, res) => {
    //! Validate data
    const { error } = addInfoValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //! Add info
    try {
        User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function addInfo() {
            res.status(200).send('Okey');
        });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

//! validate heartbeat
let hCounter = 0;
let hArray = [];

function heartbeatValidate(h) {
    if (hArray.length == 5) {
        hArray.shift();
        hArray.push(h);
    } else {
        hArray.push(h);
    }
    if (hArray[1] != null) {
        for (let i = 0; i < hArray.length; i++) {
            if ((hArray[i] + 5) >= hArray[i + 1]) {
                return false;
            } else if ((hArray[0] + 20) > hArray[hArray.length - 1]) {
                return false;
            }
        }
        for (let i = 0; i < hArray.length; i++) {
            if ((hArray[i] - 5) >= hArray[i + 1]) {
                return false;
            } else if ((hArray[0] - 20) > hArray[hArray.length - 1]) {
                return false;
            }
        }
    } else {
        return true;
    }

    if (parseInt(h) > 110 || parseInt(h) < 50) {
        hCounter++;
        if (hCounter > 5) {
            return false;
        }
    } else {
        hCounter--;
        return true;
    }
}

//! o2 validate
let o2Counter = 0;
let o2Array = [];

function o2validate(o2) {
    if (o2Array.length == 5) {
        o2Array.shift();
        o2Array.push(o2);
    } else {
        o2Array.push(o2);
    }

    if (o2Array[1] != null) {
        for (let i = 0; i < o2Array.length; i++) {
            if ((o2Array[i] + 2) >= o2Array[i + 1]) {
                return false;
            } else if ((o2Array[0] + 5) > o2Array[o2Array.length - 1]) {
                return false;
            }
        }
        for (let i = 0; i < o2Array.length; i++) {
            if ((o2Array[i] - 2) >= o2Array[i + 1]) {
                return false;
            } else if ((o2Array[0] - 5) > o2Array[o2Array.length - 1]) {
                return false;
            }
        }
    } else {
        return true;
    }

    if (parseInt(o2) > 98 || parseInt(o2) < 94) {
        o2Counter++;
        if (o2Counter > 5) {
            return false;
        }
    } else {
        o2Counter--;
        return true;
    }
}

//! medical data validate
function medDataValidate(h, o2) {
    if (h == false && o2 == false) return 'Heartbeat -- bad, o2 -- bad';

    if (h == false && o2 == true) return 'Heartbeat -- bad';

    if (h == true && o2 == false) return 'o2 -- bad';

    if (h == true && o2 == true) return 'Okey';
}


//! Update heartbeat and o2 info
router.put('/updateMedicalData', verify, (req, res) => {
    try {
        User.findByIdAndUpdate({ _id: req.header('id') }, req.body).then(function updateMedicalData() {
            if (medDataValidate(heartbeatValidate(req.body.heartbeatNow), o2validate(req.body.o2Now) == 'Okey')) {
                res.status(200).send({
                    status: 'Okey',
                    heartbeat: req.body.heartbeatNow,
                    o2: req.body.o2Now,
                });
            } else {
                res.status(200).send({
                    status: medDataValidate(heartbeatValidate(req.body.heartbeatNow), o2validate(req.body.o2Now)),
                    heartbeat: req.body.heartbeatNow,
                    o2: req.body.o2Now,
                });
            }
        });
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

module.exports = router;