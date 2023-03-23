// import express
const express = require('express');
// import router
const router = express.Router();
// import favorites controller
const favoritesController = require('../controllers/favorites_controller');


// define the add favorite route
router.post('/add/:id', favoritesController.addToFavorites);

// define the remove favorite route
router.post('/remove/:id', favoritesController.removeFromFavorites);

// export the router
module.exports = router;