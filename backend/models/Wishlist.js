const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productType: { type: String, enum: ['tractor', 'machinery'], required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  imageKey: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
