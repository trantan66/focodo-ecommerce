export function getPaymentStatus(status) {
  switch (status) {
    case "ĐÃ HỦY":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-rose-700 bg-rose-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );

    case "ĐÃ THANH TOÁN":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );

    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
