// import favorites model
const Favorites = require('../models/favorites');


// controller for add to favorites
module.exports.addToFavorites = async (req, res) => {
    try {
        // find the favorites document for the user
        const favorites = await Favorites.findOne({ user: req.user._id });
        // if the user has no favorites document, create one
        if (!favorites) {
            const newFavorites = await Favorites.create({ user: req.user._id });
            // add the project to the favorites document
            newFavorites.projects.push(req.params.id);
            // save the favorites document
            await newFavorites.save();
            // send the favorites document to the client
            return res.status(200).json(newFavorites);
        }
        // if the user already has a favorites document, add the project to it
        favorites.projects.push(req.params.id);
        // save the favorites document
        await favorites.save();
        // send the favorites document to the client
        return res.status(200).json(favorites);
    } catch (err) {
        return res.status(500).json(err);
    }
}


// controller for remove from favorites
module.exports.removeFromFavorites = async (req, res) => {
    try {
        // find the favorites document for the user
        const favorites = await Favorites.findOne({ user: req.user._id });
        // if the user has no favorites document, send an error
        if (!favorites) {
            return res.status(404).json({ message: 'No favorites found' });
        }
        // find the index of the project to remove
        const projectIndex = favorites.projects.indexOf(req.params.id);
        // if the project is not in the favorites document, send an error
        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // remove the project from the favorites document
        favorites.projects.splice(projectIndex, 1);
        // save the favorites document
        await favorites.save();
        // send the favorites document to the client
        return res.status(200).json(favorites);
    } catch (err) {
        return res.status(500).json(err);
    }
}