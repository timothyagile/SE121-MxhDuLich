const invoiceSvc = require('../services/invoiceSvc')

module.exports.getAllInvoice = async (req, res, next) => {
    try {
        const result = null
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getInvoiceById = async (req, res, next) => {
    try {
        const result = await invoiceSvc.getAllBooking()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.getInvoiceByLocationId = async (req, res, next) => {
    try {
        const result = await invoiceSvc.getAllBooking()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.createInvoice = async (req, res, next) => {
    try {
        const result = await invoiceSvc.getAllBooking()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.updateInvoice = async (req, res, next) => {
    try {
        const result = await invoiceSvc.getAllBooking()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteInvoice = async (req, res, next) => {
    try {
        const result = await invoiceSvc.getAllBooking()
        res.status(201).json({
            isSuccess: true,
            data: result,
            error: null
        })
    }
    catch (error) {
        next(error)
    }
}
