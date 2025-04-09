const cron = require('node-cron');
const cloudinary = require('../config/cloudinary.config') 
const Post = require('../models/social/post.model'); // Import model bài viết

const modelsWithImages = [
    { model: require('../models/social/post.model'), field: 'images' },
    { model: require('../models/general/location.model'), field: 'image' },
    { model: require('../models/booking/room.model'), field: 'image' },
];

const getAllUsedImages = async () => {
    let usedImages = new Set();

    for (const { model, field } of modelsWithImages) {
        const docs = await model.find({}, field);
        docs.forEach(doc => {
            if (Array.isArray(doc[field])) {
                doc[field].forEach(img => usedImages.add(img.publicId));
            } else if (doc[field]) {
                usedImages.add(doc[field].publicId);
            }
        });
        //console.log("Docs::", docs)
        
    }

    //console.log("Used images::", usedImages)

    return usedImages;
};

const detectOrphanedImages = async () => {
  const allImages = await cloudinary.api.resources({ type: 'upload', max_results: 500 });
  //console.log("All images::", allImages.resources.length, allImages.resources.map(img => img.public_id))
  
  const usedImages = await getAllUsedImages();
  //console.log("Used images::", usedImages)

  const orphanedImages = allImages.resources.filter(img => !usedImages.has(img.public_id));

  if (orphanedImages.length === 0) {
      console.log('✅ Không có ảnh rác để xóa.');
      return;
  }

  console.log("Orphaned images::", orphanedImages.map(img => img.url))
  
  return;
};

// 🛠 Hàm xóa ảnh rác trên Cloudinary
const deleteOrphanedImages = async () => {
    const allImages = await cloudinary.api.resources({ type: 'upload', max_results: 500 });
    //console.log("All images::", allImages.resources.length, allImages.resources.map(img => img.public_id))
    
    const usedImages = await getAllUsedImages();
    //console.log("Used images::", usedImages)

    const orphanedImages = allImages.resources.filter(img => !usedImages.has(img.public_id));
  
    console.log("Orphaned images::", orphanedImages.length)
    if (orphanedImages.length === 0) {
        console.log('✅ Không có ảnh rác để xóa.');
        return;
    }
    
  // Xóa từng ảnh rác
  for (const image of orphanedImages) {
    try {
      await cloudinary.uploader.destroy(image.public_id);
      console.log(`🗑 Đã xóa ảnh: ${image.public_id}`);
    } catch (error) {
      console.error(`❌ Lỗi khi xóa ảnh ${image.public_id}:`, error);
    }
  }

  console.log('✅ Hoàn thành dọn dẹp ảnh rác.');
};

// 🔥 Cài đặt cron job chạy vào **0h mỗi ngày**
cron.schedule('0 0 * * *', async () => {
  await deleteOrphanedImages();
}, {
  scheduled: true,
  timezone: 'Asia/Ho_Chi_Minh' // Đặt theo múi giờ Việt Nam
});

// ✅ Xuất cron job để gọi từ nơi khác nếu cần
module.exports = { deleteOrphanedImages, detectOrphanedImages };
