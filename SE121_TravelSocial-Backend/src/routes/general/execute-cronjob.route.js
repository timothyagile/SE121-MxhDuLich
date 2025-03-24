const {Router} = require('express')
const executeCronJobController = require('../../controllers/general/execute-cronjob.controller')
const router = Router()

router.post('/execute/delete/images', executeCronJobController.cleanImage)
router.post('/execute/detect/images', executeCronJobController.detectImages)

module.exports = router