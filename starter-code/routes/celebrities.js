const express = require('express');
const router = express.Router();
const celebrities = require("../models/Celebrities");

/* GET home page */
router.get('/', (req, res, next) => {
  celebrities.find()
    .then((celebritiesFound) => {
      res.render('celebrities/index', { celebritiesFound })
    })
});

router.get('/:id', (req, res, next) => {
  celebrities.findOne({ _id: req.params.id })
    .then((celebrityFound) => {
      res.render('celebrities/show', celebrityFound)
    })
    .catch(() => {
      next()
    })

});

// router.get('/:id/edit', (req, res, next) => {
//   res.render('celebrities/edit',celebrity)
// });

router.post('/:id', (req, res, next) => {
  celebrities.updateOne(
    {_id: req.body.id},
    {
        name: req.body.name,
        ocupation: req.body.ocupation,
        catchPhrase: req.body.catchPhrase
      }
    )
    .then(()=>{
      res.redirect('/celebrities')
    })

})

router.post('/:id/edit', (req, res, next) => {
  celebrities.findOne({ _id: req.body.id })
    .then((celebrity) => {
      res.render('celebrities/edit', celebrity)
    })
    .catch(() => {
      next()
    })
});

router.post('/:id/delete', (req, res, next) => {
  celebrities.findByIdAndRemove(req.body.id)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(() => {
      next()
    })
});


router.get('/new', (req, res, next) => {
  res.render('celebrities/new')

});

router.post('/', (req, res, next) => {
  celebrities.create({
    name: req.body.name,
    ocupation: req.body.ocupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then(() => {
      res.redirect('/celebrities')
    })
});

module.exports = router;