const mongoose = require('mongoose');

const guestCartSchema = new mongoose.Schema(
  {
    guestToken: { type: String, required: true, unique: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const GuestCart = mongoose.model('GuestCart', guestCartSchema);

module.exports = GuestCart;
