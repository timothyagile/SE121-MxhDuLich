const { deteleRoom } = require('../controllers/roomController')
const { NotFoundException, ForbiddenError } = require('../errors/exception')
const Invoice = require('../models/Invoice').Invoice
const InvoiceItem = require('../models/Invoice').InvoiceItem

const createInvoice = async (invoiceData) => {
    const result = invoiceData.save()
    if(result)
        return result
    else throw new ForbiddenError('Cannot create invoice')
}

const createInvoiceItem = async (items, services) => {
    
    
    const invoiceItems = [];
    
    // Xử lý danh sách các phòng đã đặt (items)
    if (Array.isArray(items)) {
        for (const item of items) {
            const { roomId, quantity, price, nights } = item;

            if (!roomId || !price || !quantity || !nights) {
                throw new ForbiddenError('Invalid room data in items');
            }

            const invoiceItem = new InvoiceItem({
                itemName: roomId.name,
                quantity: quantity * nights,
                price: price,
                totalPrice: price * quantity * nights,
            });

            invoiceItems.push(invoiceItem);
        }
    }

    // Xử lý danh sách các dịch vụ đã sử dụng (services)
    if (Array.isArray(services)) {
        for (const service of services) {
            const { serviceId, quantity, price } = service;

            if (!serviceId || !price || !quantity) {
                throw new ForbiddenError('Invalid service data in services');
            }

            const invoiceItem = new InvoiceItem({
                itemName: serviceId.name,
                quantity: quantity,
                price: price,
                totalPrice: price * quantity,
            });

            invoiceItems.push(invoiceItem);
        }
    }
    if (invoiceItems.length !== 0)
        return invoiceItems
    else 
        throw new NotFoundException('Khong tim thay')
}

module.exports = {
    createInvoice,
    createInvoiceItem,
}