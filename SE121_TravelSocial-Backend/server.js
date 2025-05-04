const {app, server} = require('./src/app');

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})


// process.on('SIGINT', () => {
//     server.close(() => console.log(`Server has been closed`))
// })