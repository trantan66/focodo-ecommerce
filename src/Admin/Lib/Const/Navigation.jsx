import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
} from "react-icons/hi";
import { IoNotificationsCircleOutline, IoTicketOutline } from "react-icons/io5";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "products",
    label: "Sản phẩm",
    path: "product",
    icon: <HiOutlineCube />,
  },
  {
    key: "orders",
    label: "Hóa đơn",
    path: "order",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "customers",
    label: "Khách hàng",
    path: "customer",
    icon: <HiOutlineUsers />,
  },
  {
    key: "categories",
    label: "Danh mục",
    path: "category",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "reviews",
    label: "Đánh giá",
    path: "review",
    icon: <HiOutlineAnnotation />,
  },
  {
    key: "vouchers",
    label: "Vouchers",
    path: "voucher",
    icon: <IoTicketOutline />,
  },
  {
    key: "notifications",
    label: "Thông báo",
    path: "notification",
    icon: <IoNotificationsCircleOutline />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "settings",
  //   label: "Cài đặt",
  //   path: "setting",
  //   icon: <HiOutlineCog />,
  // },
  // {
  //   key: "support",
  //   label: "Help & Support",
  //   path: "support",
  //   icon: <HiOutlineQuestionMarkCircle />,
  // },
];
