const Router = require('express')
const invoiceController = require('../../controllers/booking/invoice.controller')
const router = new Router()

router.post('/invoice', invoiceController.createInvoice)

module.exports = router 