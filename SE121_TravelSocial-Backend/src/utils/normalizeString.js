
const slugify = (text) => {
    return text
        .toLowerCase()                          // Chuyển thành chữ thường
        .normalize("NFD")                        // Chuẩn hóa Unicode (tách dấu)
        .replace(/[\u0300-\u036f]/g, "")         // Loại bỏ dấu tiếng Việt
        .replace(/đ/g, "d")                      // Chuyển "đ" thành "d"
        .replace(/[^a-z0-9\s-]/g, "")            // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, "-")                    // Thay khoảng trắng bằng "-"
        .replace(/-+/g, "-")                     // Loại bỏ dấu "-" thừa
        .trim();                                 // Xóa khoảng trắng thừa
};

module.exports = {
    slugify
}