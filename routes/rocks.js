const router = require('express').Router();
let Rock = require('../models/rock.model');

router.route('/').get((req, res) => {
    Rock.find()
        .then(rocks => res.json(rocks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/last').get((req, res) => {
    console.log("you got to /rocks/last");
    Rock.findOne({ }, null,{ "sort": { "_id": -1 } })
        .then(rocks => res.json(rocks))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/report/:id').post((req, res) => {
    console.log("you got to /rocks/:id");
    var id = req.params.id

    Rock.updateOne({_id:id},{"isReported": true} )
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
    console.log("you got to /rocks/unreport");
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
    console.log("you got to /rocks/reported");
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

router.route('/see-all').get((req, res) => {
    console.log("you got to /rocks/see-all");
    Rock.find()
    .then(rocks => {
        res.render('all-paintings', {
            title: 'All Rocks',
            message: 'All Paintings!',
            rocks: rocks
        })
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/last-eighteen').get((req, res) => {
    console.log("you got to /rocks/last-eighteen");
    Rock.find()
    .sort({'_id': -1})
    .limit(18)
    .then(rocks => res.json(rocks))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    console.log("you got to a specific rock via id");
    var id = req.params.id;
    Rock.findOne({"_id": id})
        .then(rocks => res.json(rocks))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const lastModifiedDate = req.body.lastModifiedDate;
    const painterName = req.body.painterName;
    const canvasImgData = req.body.canvasImgData;
    const isReported = false;
    const numOfReports = req.body.numOfReports;
    const paintedOverName = req.body.paintedOverName;
    const paintedOverId = req.body.paintedOverId;

    const newRock = new Rock({
        lastModifiedDate,
        painterName,
        canvasImgData,
        isReported,
        numOfReports,
        paintedOverName,
        paintedOverId
    });

    newRock.save()
        .then(() => res.json('Rock added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;