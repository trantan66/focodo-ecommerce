export function getOrderStatus(status) {
  switch (status) {
    case "Chưa xác nhận":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-800 bg-sky-200">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Đã xác nhận":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-orange-700 bg-orange-200">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "ĐANG GIAO HÀNG":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-800 bg-yellow-200">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Đã giao":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-900 bg-green-300">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    case "Đã hủy":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-rose-800 bg-rose-300">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-700 bg-gray-300">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
