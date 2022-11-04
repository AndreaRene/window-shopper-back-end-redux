const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

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

// update a category
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCat = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } });
    res.json(updatedCat);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.json(category);
  } catch (err) {
    res.status(500).json(er.message);
  }
});

module.exports = router;
