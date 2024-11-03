export function getPaymentStatus(status) {
  switch (status) {
    case "Thất bại":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-rose-800 bg-rose-300">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );

    case "Thành công":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-900 bg-green-300">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );

    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-800 bg-gray-300">
          {status.replaceAll("_", " ").toLowerCase()}
        </span>
      );
  }
}
