const { Recipe, Comment } = require('../models');

class CommentController {

    // Create Comment
    static async createComment(req, res, next) {
        try {
          const { komentar, rating, recipeId } = req.body;
          const user = req.authUser;
          const recipe = await Recipe.findByPk(recipeId);
          if (!recipe){
            return res.status(404).json({ message: "Resep tidak ditemukan" });
          }
            const comments = await Comment.create({ 
              komentar, rating, recipeId: recipe.id, 
              userId: user?.id, 
            });
            await comments.reload ({
                include: [
                    {
                        model: Recipe,
                        as: "recipes",
                    },
                ],
            });
            return res.status(201).json(comments);
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };

    //GET Comment List
    static async getComment(req, res) {
        try {
          const comments = await Comment.findAll({
            include: [
                {
                    model: Recipe,
                    as: "recipes",
                },
            ],
          });
          res.status(200).json({ comment: comments });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
      // Update Comment
      static async updateComment(req, res) {
        try {
        const { komentar, rating } = req.body;
        const commentId = req.params.id;
        
        const comments = await Comment.findByPk(commentId);
        if (!comments) {
            return res.status(404).json({ error: 'komentar tidak tesedia' });
        }
        comments.komentar = komentar || comments.komentar;
        comments.rating = rating || comments.rating;

        await comments.save();

        return res.status(200).json({
            komentar: comments.komentar,
            rating: comments.rating,
            createdAt: comments.createdAt,
            updatedAt: comments.updatedAt
        });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };

      // Delete Comment
      static async deleteComment(req, res) {
        try {
            const { id } = req.params;
            const comments = await Comment.findByPk(id);

            if (!comments) {
                return res.status(404).json({ error: 'komentar tidak tersedia' });
              }
              await comments.destroy();
              return res.status(200).json({ message: `komentar dengan id ${id} telah dihapus` });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };
}

module.exports = CommentController;