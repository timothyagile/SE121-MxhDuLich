const mongoose = require('mongoose')
const _SECONDS = 5000
const os = require('os')
const proccess = require('process')

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log('Number of connections: ', numConnection)
}

const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCore = os.cpus().length
        const numMemoryUsage = proccess.memoryUsage().rss

        console.log('Active connection: ', numConnection)
        console.log('Memory usage: ', numMemoryUsage / 1024 / 1024, 'MB')

        const maxConnection = numCore * 2

        if(numConnection > maxConnection) {
            console.log('Overload connection')
        }
    }, _SECONDS) //Monitor every 5 seconds
}

module.exports = {
    countConnect,
    checkOverload
}