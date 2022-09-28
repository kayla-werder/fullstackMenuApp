const db = require("../models");
const Menu = db.menus;

// Create and Save a new Menu
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Menu
  const menu = new Menu({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    published: req.body.published ? req.body.published : false,
  });

  // Save Menu in the database
  menu
    .save(menu)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Menu.",
      });
    });
};

// Retrieve all menus from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Menu.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menus.",
      });
    });
};

// Find a single Menu with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Menu.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Menu with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Menu with id=" + id });
    });
};

// Update a Menu by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Menu.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Menu with id=${id}. Maybe Menu was not found!`,
        });
      } else res.send({ message: "Menu was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Menu with id=" + id,
      });
    });
};

// Delete a Menu with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Menu.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`,
        });
      } else {
        res.send({
          message: "Menu was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Menu with id=" + id,
      });
    });
};

// Delete all menus from the database.
exports.deleteAll = (req, res) => {
  Menu.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} menus were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all menus.",
      });
    });
};

// Find all published menus
exports.findAllPublished = (req, res) => {
  Menu.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving menus.",
      });
    });
};
