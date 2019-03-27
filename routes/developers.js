let express = require('express');
let router = express.Router();

const Developer = require('../developers/Developer');

/*
 * /api/developers (get)
 * /api/developers/{id} (get)
 * /api/developers (post)
 * /api/developers/{id} (put)
 * /api/developers/{id} (delete)
 */

router.get('/', (req, res) => {
    Developer.find()
        .then((developers) => {
            res.json(developers)
        })
})

router.post('/', (req, res) => {
    // TODO validate json body

    const dev = new Developer({
        name: req.body.name,
        email: req.body.email
    })

    dev.save().then(dev => res.send(dev));
})

module.exports = router;
