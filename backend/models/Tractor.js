const mongoose = require('mongoose');

const tractorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  hp: { type: Number, required: true },
  engine: { type: String },
  fuelType: { type: String, default: 'Diesel' },
  transmission: { type: String },
  liftCapacity: { type: String },
  warranty: { type: String },
  description: { type: String },
  features: [String],
  imageKey: { type: String, required: true },
  category: { type: String, default: 'Standard' },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Tractor', tractorSchema);
