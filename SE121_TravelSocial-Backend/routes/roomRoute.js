const {Router} = require('express')
const roomController = require('../controllers/roomController')

const router = Router()

router.get('/room/getall', roomController.getAllRoom);
router.get('room/getbyid', roomController.getRoomById);
router.post('/room/newroom', roomController.createRoom);
router.put('/room/update', roomController.updateRoom);
router.delete('/room/delete', roomController.deteleRoom);

module.exports = router