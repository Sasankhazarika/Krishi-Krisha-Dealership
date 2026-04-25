const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  productName: { type: String, required: true },
  productType: { type: String, enum: ['tractor', 'machinery'], required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['upi', 'cash'], required: true },
  paymentPlan: { type: String, default: 'full' },
  downPayment: { type: Number, default: 0 },
  emiDuration: { type: Number, default: 12 },
  idProofPath: { type: String },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Confirmed', 'Delivered', 'Cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
