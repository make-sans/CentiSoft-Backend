let express = require('express');
let router = express.Router();

const Developer = require('../developers/Developer');

/*
 * /api/developers/{id} (delete)
 */

router.get('/', (req, res) => {
    Developer.find()
        .then((developers) => {
            res.json(developers)
        })
})

router.get('/:id', (req, res) => {
    Developer.findById(req.params.id)
        .then(developer => res.json(developer))
        .catch(err => res.status(404).json({}))
})

router.post('/', (req, res) => {
    // TODO validate json body

    const dev = new Developer({
        name: req.body.name,
        email: req.body.email
    })

    dev.save().then(dev => res.send(dev));
})

router.put('/:id', (req, res) => {
    Developer.findById(req.params.id)
        .then(developer => {
            developer.name = req.body.name || developer.name;
            developer.email = req.body.email || developer.email;

            developer.save().then(dev => res.send(dev));
        })
        .catch(err => res.status(404).json({}))
})

router.delete('/:id', (req, res) => {
    Developer.findById(req.params.id)
        .then(developer => {
            developer.remove()
                .then(() => res.json({success: true}))
        })
        .catch(err => res.status(404).json({}))
})

module.exports = router;
