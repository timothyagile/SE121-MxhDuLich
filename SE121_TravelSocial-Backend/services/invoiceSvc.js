const { deteleRoom } = require('../controllers/roomController')
const { NotFoundException } = require('../errors/exception')
const Invoice = require('../models/Invoice')


const getAllInvoice = async () => {
    const result = null
    if(result)
        return result
    else throw new NotFoundException('Not found')
}
const getInvoiceById = async () => {
    const result = null
    if(result)
        return result
    else throw new NotFoundException('Not found')
}

const getInvoiceByLocationId = async () => {
    const result = null
    if(result)
        return result
    else throw new NotFoundException('Not found')
}

const getInvoiceByRangeDate = async () => {

}

const createInvoice = async () => {
    const result = null
    if(result)
        return result
    else throw new NotFoundException('Not found')
}
const updateInvoice = async () => {
    const result = null
    if(result)
        return result
    else throw new NotFoundException('Not found')
}
 
const deleteInvoice = async () => {
    const result = null
    if(result)
        return result
    else throw new NotFoundException('Not found')
}

module.exports = {
    getAllInvoice,
    getInvoiceById,
    getInvoiceByLocationId,
    createInvoice,
    updateInvoice, 
    deleteInvoice,
}