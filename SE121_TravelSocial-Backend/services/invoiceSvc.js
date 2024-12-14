const { deteleRoom } = require('../controllers/roomController')
const { NotFoundException, ForbiddenError } = require('../errors/exception')
const Invoice = require('../models/Invoice')
const InvoiceItem = require('../models/Invoice')

const createInvoice = async (invoiceData) => {
    const result = invoiceData.save()
    if(result)
        return result
    else throw new ForbiddenError('Cannot create invoice')
}

const createInvoiceItem = async (item) => {
    const {
        serviceId,
        quantity,
        price,
    } = item
    const result = new InvoiceItem({
        itemId: serviceId,
        quantity: quantity,
        price: price,
        totalPrice: price * quantity
    })
    if(result)
        return result
    else throw new ForbiddenError('Cannot create')
}

module.exports = {
    createInvoice,
    createInvoiceItem,
}