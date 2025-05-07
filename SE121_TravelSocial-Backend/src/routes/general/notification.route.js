const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/general/notification.controller');
const { checkUser } = require('../../middleware/auth.middleware');

// Lấy tất cả thông báo của người dùng đang đăng nhập
router.get('/notifications', checkUser, notificationController.getNotifications);

// Đánh dấu thông báo đã đọc
router.put('/notifications/:notificationId/mark-as-read', checkUser, notificationController.markAsRead);

// Xử lý lời mời kết bạn từ thông báo
router.post('/notifications/accept-friend-request', checkUser, notificationController.acceptFriendRequest);
router.post('/notifications/reject-friend-request', checkUser, notificationController.rejectFriendRequest);

// Xóa thông báo
router.delete('/notifications/:notificationId', checkUser, notificationController.deleteNotification);

module.exports = router;