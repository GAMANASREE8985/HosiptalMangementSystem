const express = require('express');
const Patient = require('../models/Patient');
const { protect } = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const router = express.Router();
router.use(protect);

router.get('/', async (_req, res) => { const items = await Patient.find().populate('assignedDoctor'); res.json(items); });
router.post('/', permit('admin','reception'), async (req, res) => { const p = await Patient.create(req.body); res.status(201).json(p); });
router.put('/:id', permit('admin','reception'), async (req, res) => { const p = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(p); });
router.delete('/:id', permit('admin'), async (req, res) => { await Patient.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;
