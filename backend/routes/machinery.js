const express = require('express');
const router = express.Router();
const Machinery = require('../models/Machinery');

// GET all machinery
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type) filter.type = type;
    const machinery = await Machinery.find(filter).sort({ createdAt: -1 });
    res.json(machinery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single machinery
router.get('/:id', async (req, res) => {
  try {
    const item = await Machinery.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Machinery not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new machinery (admin)
router.post('/', async (req, res) => {
  try {
    const item = new Machinery(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update machinery (admin)
router.put('/:id', async (req, res) => {
  try {
    const item = await Machinery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Machinery not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE machinery (admin)
router.delete('/:id', async (req, res) => {
  try {
    const item = await Machinery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Machinery not found' });
    res.json({ message: 'Machinery deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
