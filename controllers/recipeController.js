const { Recipe, Comment } = require('../models');

class RecipeController {
    // Create Recipe
    static async createRecipe(req, res) {
        try {
          const { resep, deskripsi, bahan, pembuatan } = req.body;
          const user = req.authUser;
          const recipes = await Recipe.create({ resep, deskripsi, bahan, pembuatan, userId: user?.id,  });
          res.status(201).json(recipes);
        } catch (error) {
          console.log(`Error: ${error}`);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
    // Get Recipe List
    static async getRecipe(req, res) {
      try {
        const recipes = await Recipe.findAll();
        res.status(200).json({ recipes });
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    //Get Recipe List by ID
    static async getRecipeById(req, res) {
      try {
        const { id } = req.params;
        const recipes = await Recipe.findByPk(id, {
          include: [
              {
                  model: Comment,
                  as: "comments"
              },
          ],
        });
        if (!recipes) {
          return res.status(404).json({ error: 'Resep tidak ditemukan' });
        }
        res.status(200).json(recipes);
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    
    // Update Recipe
    static async updateRecipe(req, res) {
      try {
      const { id } = req.params;
      const { resep, deskripsi, bahan, pembuatan } = req.body;
      const recipes = await Recipe.findOne({ where: {id} });
      if (!recipes) {
          return res.status(404).json({ error: 'Resep tidak ditemukan' });
      }
      recipes.resep = resep;
      recipes.deskripsi = deskripsi;
      recipes.bahan = bahan;
      recipes.pembuatan = pembuatan;
          
      await recipes.save();
      return res.status(200).json(recipes);
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    // Delete Recipe
    static async deleteRecipe(req, res) {
      try {
          const { id } = req.params;
          const recipes = await Recipe.findOne({ where: { id } });

          if (!recipes) {
              return res.status(404).json({ error: 'Resep tidak ditemukan' });
            }
          await recipes.destroy();
          return res.status(200).json({ message: `Resep ${recipes.resep} telah dihapus` });
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

}
module.exports = RecipeController;