import Dashboard from "views/dashboard/Dashboard.jsx";
import Settings from "views/settings/Settings.jsx";
import Form from "views/form/Form";
import ItemDetail from "views/detail/ItemDetail";
import ItemBorrow from "views/borrow/ItemBorrow";
//import Icons from "views/Icons.jsx";

import Logout from "views/Logout.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "ภาพรวมทั้งหมด",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "ตั้งค่า",
    icon: "nc-icon nc-settings-gear-65",
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/add-item",
    name: "เพิ่มรายการครุภัณฑ์",
    icon: "nc-icon nc-simple-add",
    component: Form,
    layout: "/admin",
  },
  {
    path: "/item-detail",
    name: "รายการครุภัณฑ์ทั้งหมด",
    icon: "nc-icon nc-bullet-list-67",
    component: ItemDetail,
    layout: "/admin",
  },
  {
    path: "/item-borrow",
    name: "การ ยืม/คืน ครุภัณฑ์",
    icon: "nc-icon nc-basket",
    component: ItemBorrow,
    layout: "/admin",
  },

  /*
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  */

  {
    pro: true,
    path: "/Logout",
    name: "ออกจากระบบ",
    icon: "nc-icon nc-user-run",
    component: Logout,
    layout: "/admin",
  },
];
export default routes;
