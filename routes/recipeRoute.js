const express = require("express");
const recipeControllers = require("../controllers/recipeController");
const { authUser } = require("../middlewares/authentication");
const { isAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.post('/', authUser, isAdmin,recipeControllers.createRecipe);
router.get("/", recipeControllers.getRecipe);
router.get('/:id', recipeControllers.getRecipeById);
router.put('/:id', authUser, isAdmin,recipeControllers.updateRecipe);
router.delete('/:id', authUser, isAdmin,recipeControllers.deleteRecipe);

module.exports = router;