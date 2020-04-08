const router = require('express').Router();
let Rock = require('../models/rock.model');

router.route('/').get((req, res) => {
    Rock.find()
        .then(rocks => res.json(rocks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/last').get((req, res) => {
    Rock.findOne({ }, null,{ "sort": { "_id": -1 } })
        .then(rocks => res.json(rocks))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/report/:id').post((req, res) => {
    var id = req.params.id

    Rock.updateOne({_id:id},{"isReported": true})
    .then(docs => {
        if(docs) {
            res.send("Painting was succesfully reported. Thank you.")
        } else {
            res.send("There was an error reporting this painting: " + docs);
        }
    })
    .catch((err) => {
        res.send("There was an error reporting this painting: " + err);
    })
})

router.route('/unreport/:id').post((req, res) => {
    var id = req.params.id

    Rock.updateOne({_id:id},{"isReported": false})
    .then(docs => {
        if(docs) {
            res.send("Painting was succesfully reported. Thank you.")
        } else {
            res.send("There was an error reporting this painting: " + docs);
        }
    })
    .catch((err) => {
        res.send("There was an error reporting this painting: " + err);
    })
})

router.route('/delete/:id').post((req, res) => {
    var id = req.params.id

    Rock.findOneAndRemove({_id: id})
    .then(docs => {
        if(docs) {
            res.send("Painting was succesfully removed.")
        } else {
            res.send("There was an error removing this painting: " + docs);
        }
    })
    .catch((err) => {
        res.send("There was an error removing this painting: " + err);
    })
})

/* PAINTING WITH 4 ON IT: 5e8e2b1395c3c16f0158f9ef */

router.route('/reported').get((req, res) => {
    Rock.find({ $or:[ {'isReported':"true"}, {'isReported':true} ]})
    .then(rocks => {
        res.render('reports', {
            title: 'Reported Rocks',
            message: 'Reported Rock Paintings',
            rocks: rocks
        })
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updatewithreportnums').post((req, res) => {
    Rock.update(
        {_id: 'uid'}, 
        {vehicle_status : 'vehicleSatus' },
        {multi:true}, 
          function(err, numberAffected){  
          });
})

router.route('/add').post((req, res) => {
    const lastModifiedDate = req.body.lastModifiedDate;
    const painterName = req.body.painterName;
    const canvasImgData = req.body.canvasImgData;
    const isReported = false;
    const numOfReports = req.body.numOfReports;

    const newRock = new Rock({
        lastModifiedDate,
        painterName,
        canvasImgData,
        isReported,
        numOfReports
    });

    newRock.save()
        .then(() => res.json('Rock added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;