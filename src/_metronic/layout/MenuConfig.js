export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        translate: "MENU.DASHBOARD"
      },
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Users",
        root: false,
        icon: "flaticon2-architecture-and-city",
        page: "partners",
        bullet: "dot",
        roles: ["Super_admin"]
      },
    ]
  }
};
