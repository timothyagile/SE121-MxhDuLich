const VOUCHER_STATUS ={
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expried'
}

const DISCOUNT_TYPE = {
    PERCENT: 'percentage',
    DIRECT: 'direct',
}

const VOUCHER_SOURCE = {
    SYSTEM: 'system', 
    LOCATION: 'location'
}

const VOUCHER_USER = {
    SAVED: 'saved',
    USED: 'used',
    EXPIRED: 'expired',
} 

module.exports = {
    VOUCHER_STATUS, DISCOUNT_TYPE, VOUCHER_SOURCE, VOUCHER_USER
}