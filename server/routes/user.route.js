const express = require("express");
const app = express();

const userRoutes = express.Router();
let UserModel = require("../model/User");

// Get Users
userRoutes.route("/").get((req, res) => {
  UserModel.find((error, user) => {
    if (error) {
      return next(error);
    } else {
      res.json(user);
      console.log("Users fetched");
    }
  });
});

// Create a user
userRoutes.route("/create-user").post((req, res, next) => {
  UserModel.create(req.body, (error, user) => {
    if (error) {
      return next(error);
    } else {
      res.json(user);
      console.log("User created");
    }
  });
});

// Get a user
userRoutes.route("/fetch-user/:id").get((req, res) => {
  UserModel.findById(req.params.id, (error, user) => {
    if (error) {
      return next(error);
    } else {
      res.json(user);
      console.log("User fetched");
    }
  });
});

// Update a user
userRoutes.route("/update-user/:id").put((req, res, next) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, user) => {
      if (error) {
        return next(error);
      } else {
        res.json(user);
        console.log("User updated successfully");
      }
    }
  );
});

// Delete a user
userRoutes.route("/delete-user/:id").delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: user,
      });
      console.log("User deleted successfully");
    }
  });
});

module.exports = userRoutes;
