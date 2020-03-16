import Dashboard from "views/Dashboard.jsx";
import Settings from "views/settings/Settings.jsx";
import Form from "views/form/Form";
import ItemDetail from "views/detail/ItemDetail"
import Icons from "views/Icons.jsx";
//import Typography from "views/Typography.jsx";
//import Maps from "views/Map.jsx";
//import UserPage from "views/User.jsx";
import Logout from "views/Logout.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "ภาพรวมทั้งหมด",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "ตั้งค่า",
    icon: "nc-icon nc-settings-gear-65",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/add-item",
    name: "เพิ่มรายการครุภัณฑ์",
    icon: "nc-icon nc-simple-add",
    component: Form,
    layout: "/admin"
  },
  {
    path: "/item-detail",
    name: "รายการครุภัณฑ์ทั้งหมด",
    icon: "nc-icon nc-bullet-list-67",
    component: ItemDetail,
    layout: "/admin"
  },
  /*
  {
    path: "/maps",
    name: "แผนที่",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "จัดทำเอกสาร",
    icon: "nc-icon nc-single-copy-04",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "จัดการสิทธิ์เข้าใช้ระบบ",
    icon: "nc-icon nc-badge",
    component: UserPage,
    layout: "/admin"
  },
  */
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  
  {
    pro: true,
    path: "/Logout",
    name: "ออกจากระบบ",
    icon: "nc-icon nc-user-run",
    component: Logout,
    layout: "/admin"
  }
];
export default routes;
