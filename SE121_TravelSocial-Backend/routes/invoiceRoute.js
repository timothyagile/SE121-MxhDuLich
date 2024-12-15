const Router = require('express')
const invoiceController = require('../controllers/invoiceController')
const router = new Router()

router.post('/invoice', invoiceController.createInvoice)

module.exports = router 