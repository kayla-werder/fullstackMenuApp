module.exports = (app) => {
  const menus = require("../controllers/menu.controller.js");

  var router = require("express").Router();

  // Create a new Menu
  router.post("/", menus.create);

  // Retrieve all Menus
  router.get("/", menus.findAll);

  // Retrieve all published Menus
  router.get("/published", menus.findAllPublished);

  // Retrieve a single Menu with id
  router.get("/:id", menus.findOne);

  // Update a Menu with id
  router.put("/:id", menus.update);

  // Delete a Menu with id
  router.delete("/:id", menus.delete);

  // Create a new Menu
  router.delete("/", menus.deleteAll);

  app.use("/api/menus", router);
};
