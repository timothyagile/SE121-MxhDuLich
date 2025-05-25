export const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    throw new Error("Input must be a number");
  }

  return amount
    .toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0, // Không hiển thị số lẻ
    })
    .replace(/\./g, ",") // Thay dấu . bằng dấu ,
    .replace("₫", "đ"); // Thay ký hiệu ₫ bằng "đ" nếu cần
};