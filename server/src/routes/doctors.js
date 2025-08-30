const express = require('express');
const Doctor = require('../models/Doctor');
const { protect } = require('../middleware/auth');   // ✅ fixed path
const { permit } = require('../middleware/rbac');    // ✅ fixed path

const router = express.Router();

router.use(protect);

// Get all doctors
router.get('/', async (_req, res) => { 
  const docs = await Doctor.find(); 
  res.json(docs); 
});

// Add doctor (admin only)
router.post('/', permit('admin'), async (req, res) => { 
  const d = await Doctor.create(req.body); 
  res.status(201).json(d); 
});

// Update doctor (admin only)
router.put('/:id', permit('admin'), async (req, res) => { 
  const d = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
  res.json(d); 
});

// Delete doctor (admin only)
router.delete('/:id', permit('admin'), async (req, res) => { 
  await Doctor.findByIdAndDelete(req.params.id); 
  res.json({ ok: true }); 
});

module.exports = router;
