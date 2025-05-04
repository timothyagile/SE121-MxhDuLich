const { NotFoundException } = require("../../errors/exception");
const reactCommentModel = require("../../models/social/react-comment.model");


const createOrToggle = async (reactData) => {
    console.log("Create r-comment service::" + reactData)
    const { commentId, userId, type } = reactData
    const existed = await reactCommentModel.findOne({commentId, userId});

    if (!existed) {
        // ✅ Chưa react: tạo mới
        const newReact = new reactCommentModel({ commentId, userId, type });
        const savedReact = await newReact.save();
        return savedReact
    }

    if (existed.type === type) {
        // ✅ Đã react cùng loại: toggle (xóa)
        const reactId = existed._id
        deletedReact = await reactCommentModel.findByIdAndDelete(reactId)
        return deletedReact
    }

    // ✅ Đã react khác loại: cập nhật
    existed.type = type;
    const savedReact = await existed.save();
    return deletedReact
};


const getReactsByCommentId = async (commentId) => {
    const reacts = await reactCommentModel
    .find(commentId)
    .populate("userId", "userName userAvatar")

    if(reacts.length === 0) {throw new NotFoundException()}
    return reacts

}

module.exports = {
    getReactsByCommentId,
    createOrToggle
}