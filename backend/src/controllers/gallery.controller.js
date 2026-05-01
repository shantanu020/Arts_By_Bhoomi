import Gallery from '../models/gallery.model.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find({}).sort({ displayOrder: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch gallery items' });
  }
};

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryItem = async (req, res) => {
  const { title, category, imageUrl, displayOrder } = req.body;

  try {
    const item = new Gallery({
      title,
      category,
      imageUrl,
      displayOrder: displayOrder || 0,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create gallery item' });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete gallery item' });
  }
};
