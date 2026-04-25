const mongoose = require('mongoose');

const machinerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  features: [String],
  imageKey: { type: String, required: true },
  compatibility: { type: String },
  weight: { type: String },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Machinery', machinerySchema);
