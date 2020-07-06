var router = require('express').Router()
var bodyParser = require('body-parser')

router.use(bodyParser.json())

router.use('/upload', require('./upload'))
router.use('/', require('./static'))

module.exports = router