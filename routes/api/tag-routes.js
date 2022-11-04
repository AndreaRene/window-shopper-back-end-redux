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

// add a tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(
      { tag_name: req.body.tag_name });
    res.json(newTag);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// update a tag
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id
        }
      });

    res.json(updateTag);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json(er.message);
  }
});

module.exports = router;
