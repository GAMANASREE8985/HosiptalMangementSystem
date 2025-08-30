const express = require('express');
const Appointment = require('../models/Appointment');
const { protect } = require('../middleware/auth');
const { permit } = require('../middleware/rbac');
const router = express.Router();

router.use(protect);

// Admin & Reception: see all appointments
router.get('/', permit('admin', 'reception'), async (req, res) => {
  const list = await Appointment.find()
    .populate('patient', 'name email')
    .populate('doctor', 'name email');
  res.json(list);
});

// Patient: get only their appointments
router.get('/patient/:id', permit('patient'), async (req, res) => {
  const list = await Appointment.find({ patient: req.params.id })
    .populate('doctor', 'name email')
    .sort({ date: -1 });
  res.json(list);
});

// Doctor: get only their appointments
router.get('/doctor/:id', permit('doctor'), async (req, res) => {
  const list = await Appointment.find({ doctor: req.params.id })
    .populate('patient', 'name email')
    .sort({ date: -1 });
  res.json(list);
});

// Reception/Admin: create new appointment
router.post('/', permit('admin', 'reception'), async (req, res) => {
  const a = await Appointment.create(req.body);
  res.status(201).json(a);
});

// Doctor: add feedback
router.put('/:id/notes', permit('doctor'), async (req, res) => {
  const { notes } = req.body;
  const a = await Appointment.findByIdAndUpdate(
    req.params.id,
    { $set: { notes, status: 'completed' } },
    { new: true }
  );
  res.json(a);
});

// Admin & Reception: update appointment
router.put('/:id', permit('admin', 'reception'), async (req, res) => {
  const a = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(a);
});

// Admin only: delete
router.delete('/:id', permit('admin'), async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
