const { OK } = require("../../constants/httpStatusCode");
const {deleteOrphanedImages, detectOrphanedImages} = require('../../utils/cronJobs') 

module.exports.cleanImage = async (req, res, next) => {
    try {
        await deleteOrphanedImages()
        res.status(OK).json({
            isSuccess: true,
            data: "Executed",
            error: null,
        });
    } catch (error) {
       next(error) 
    }
}

module.exports.detectImages = async (req, res) => {
    await detectOrphanedImages();
        res.status(OK).json({
            isSuccess: true,
            data: "Executed",
            error: null,
        });
}