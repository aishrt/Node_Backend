const express = require("express");

const landingRoute = require("./landing.route");
const authRoute = require("./auth.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "",
    route: landingRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
