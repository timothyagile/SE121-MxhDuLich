const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = formatDate(dateString);
  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Định dạng 24 giờ
  });

  return `${formattedDate} ${formattedTime}`;
};
export { formatDate, formatDateTime };