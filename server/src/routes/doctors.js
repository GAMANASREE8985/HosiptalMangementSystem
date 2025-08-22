const express = require('express');
const Doctor = require('../models/Doctor');
const { protect } = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const router = express.Router();
router.use(protect);

router.get('/', async (_req, res) => { const docs = await Doctor.find(); res.json(docs); });
router.post('/', permit('admin'), async (req, res) => { const d = await Doctor.create(req.body); res.status(201).json(d); });
router.put('/:id', permit('admin'), async (req, res) => { const d = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(d); });
router.delete('/:id', permit('admin'), async (req, res) => { await Doctor.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;
