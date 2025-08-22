const express = require('express');
const Appointment = require('../models/Appointment');
const { protect } = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => { const list = await Appointment.find().populate('patient doctor'); res.json(list); });
router.post('/', permit('admin','reception'), async (req, res) => { const a = await Appointment.create(req.body); res.status(201).json(a); });
router.put('/:id', permit('admin','reception','doctor'), async (req, res) => { const a = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(a); });
router.delete('/:id', permit('admin'), async (req, res) => { await Appointment.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;
