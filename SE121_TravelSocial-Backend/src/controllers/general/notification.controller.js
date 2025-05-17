const notificationService = require('../../services/general/notification.service');
const { OK } = require('../../constants/httpStatusCode');

/**
 * Lấy tất cả thông báo của người dùng đang đăng nhập
 */
const getNotifications = async (req, res, next) => {
    try {
        const userId = res.locals.user._id;
        const notifications = await notificationService.getNotificationsByUserId(userId);
        
        res.status(OK).json({
            isSuccess: true,
            data: notifications,
            error: null
        });
    } catch (error) {
        console.error('Error getting notifications:', error);
        next(error);
    }
};

/**
 * Đánh dấu một thông báo là đã đọc
 */
const markAsRead = async (req, res, next) => {
    try {
        const { notificationId } = req.params;
        const userId = res.locals.user._id;
        
        // Kiểm tra xem thông báo có thuộc về người dùng hiện tại không
        const notifications = await notificationService.getNotificationsByUserId(userId);
        const isOwnNotification = notifications.some(notification => 
            notification._id.toString() === notificationId
        );
        
        if (!isOwnNotification) {
            return res.status(403).json({
                isSuccess: false,
                data: null,
                error: 'Không có quyền truy cập thông báo này'
            });
        }
        
        const updatedNotification = await notificationService.markAsRead(notificationId);
        
        res.status(OK).json({
            isSuccess: true,
            data: updatedNotification,
            error: null
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        next(error);
    }
};

/**
 * Chấp nhận lời mời kết bạn từ thông báo
 */
const acceptFriendRequest = async (req, res, next) => {
    try {
        const userId = res.locals.user._id;
        const { notificationId, senderId } = req.body;
        
        // Cập nhật trạng thái thông báo
        await notificationService.updateFriendRequestNotification(notificationId, 'accepted');
        
        // Chuyển đến controller relation để xử lý chấp nhận kết bạn
        req.body = { requestId: senderId, accept: true };
        const relationController = require('../social/relation.controller');
        await relationController.respondToRequest(req, res);
    } catch (error) {
        console.error('Error accepting friend request:', error);
        next(error);
    }
};

/**
 * Từ chối lời mời kết bạn từ thông báo
 */
const rejectFriendRequest = async (req, res, next) => {
    try {
        const userId = res.locals.user._id;
        const { notificationId, senderId } = req.body;
        
        // Cập nhật trạng thái thông báo
        await notificationService.updateFriendRequestNotification(notificationId, 'rejected');
        
        // Chuyển đến controller relation để xử lý từ chối kết bạn
        req.body = { requestId: senderId, accept: false };
        const relationController = require('../social/relation.controller');
        await relationController.respondToRequest(req, res);
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        next(error);
    }
};

/**
 * Xóa một thông báo
 */
const deleteNotification = async (req, res, next) => {
    try {
        const { notificationId } = req.params;
        const userId = res.locals.user._id;
        
        // Kiểm tra xem thông báo có thuộc về người dùng hiện tại không
        const notifications = await notificationService.getNotificationsByUserId(userId);
        const isOwnNotification = notifications.some(notification => 
            notification._id.toString() === notificationId
        );
        
        if (!isOwnNotification) {
            return res.status(403).json({
                isSuccess: false,
                data: null,
                error: 'Không có quyền xóa thông báo này'
            });
        }
        
        await notificationService.deleteNotification(notificationId);
        
        res.status(OK).json({
            isSuccess: true,
            data: { message: 'Đã xóa thông báo' },
            error: null
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        next(error);
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteNotification
};