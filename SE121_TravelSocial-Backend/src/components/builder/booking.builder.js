const { default: mongoose } = require("mongoose")
const Room = require("../../models/booking/room.model")

class BookingBuilder {
    constructor() {
        this.booking = {
            userId: null,
            dateBooking: null,
            checkinDate: null,
            checkoutDate: null,
            items: [],
            services: [],
            totalPrice: 0,
            discount: 0,
            totalAfterDiscount: 0,
            tax: 0,
            voucherId: null,
            totalPriceAfterTax: 0,
            amountPaid: 0,
            status: 'pending'
        }
    }

    setUserId(userId) {
        this.booking.userId = userId
        return this
    }
    setDateBooking(dateBooking) {
        this.booking.dateBooking = dateBooking
        return this
    }

    setRooms(rooms, checkinDate, checkoutDate) {
        // const roomMap = await Room.find(
        //     { _id: { $in: rooms.map(r => r.roomId) } },
        //     { _id: 1, pricePerNight: 1 }
        // ).then(data => {
        //     return new Map(data.map(r => [r._id.toString(), r.pricePerNight]));
        //   });

        // this.booking.items = rooms.map(room => {
        //     const price = roomMap.get(room.roomId)
        //     if (!price) {
        //         throw new Error(`Room with id ${room.roomId} not found`)
        //     }
        //     return {
        //         roomId: room.roomId,
        //         price: price,
        //         quantity: room.quantity || 1,
        //         nights: room.nights || 1
        //     }
        // })
        this.booking.items = rooms.map(room => {
            return {
                roomId: room.roomId,
                price: room.price,
                quantity: room.quantity || 1,
                nights: room.nights || 1
            }
        })
        this.booking.checkinDate = checkinDate
        this.booking.checkoutDate = checkoutDate
        return this
    }

    setServices(services) {
        if(services.length !== 0) {
            this.booking.services = services.map(service => {
                return {
                    serviceId: service.serviceId,
                    price: service.price,
                    quantity: service.quantity
                }
            })
        }
        return this
    }

    setPrice(totalPrice) {
        this.booking.totalPrice = totalPrice
        return this
    }

    setDiscount(discountAmount) {
        this.booking.discount = discountAmount | 0
        this.booking.totalAfterDiscount = this.booking.totalPrice - discountAmount
        return this
    }
    
    setTax(taxPercent) {
        this.booking.tax = this.booking.totalAfterDiscount * taxPercent / 100
        this.booking.totalPriceAfterTax = this.booking.totalAfterDiscount + this.booking.tax
        return this
    }

    setVoucherId(voucherId) {
        this.booking.voucherId = voucherId
        return this
    }

    build() {
        if(!this.booking.userId || !this.booking.dateBooking ||
            !this.booking.checkinDate || !this.booking.checkoutDate ||
            this.booking.items.length === 0 || !this.booking.totalPrice ||
            !this.booking.tax || !this.booking.totalPriceAfterTax) {
            throw new Error('Missing required fields')
        }
        return this.booking
    }
}

module.exports = BookingBuilder