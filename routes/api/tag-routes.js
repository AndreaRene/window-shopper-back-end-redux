const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// view all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product,
        {
          model: Product, through: ProductTag,
        }]
    })
    res.json(tags)
  } catch (err) {
    res.status(500).json(err.message);
  }

});

// view one tag 
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product,
        {
          model: Product, through: ProductTag,
        }]
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
