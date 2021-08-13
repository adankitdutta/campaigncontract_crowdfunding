const routes = require("next-routes")();

routes
  .add("/campaigns/new", "camapigns/new")
  .add("/campaigns/:address", "/campaigns/show");

module.exports = routes;
