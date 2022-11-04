const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// view all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.json(categories)
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get a single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(
      { category_name: req.body.category_name });
    res.json(newCategory);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
