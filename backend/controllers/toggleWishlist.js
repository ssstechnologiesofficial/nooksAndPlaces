

const Product = require("../models/Product");
const Wishlist = require("../models/wishlistSchema");

const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  const guestToken = req.cookies.guest_token;

  if (!guestToken) {
    return res.status(400).json({ message: 'Guest token not found' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let wishlist = await Wishlist.findOne({ guestToken });

    if (!wishlist) {
      wishlist = new Wishlist({ guestToken, items: [productId] });
      await wishlist.save();
      return res.status(200).json({ message: 'Added to wishlist' });
    }

    const alreadyInWishlist = wishlist.items.includes(productId);

    if (alreadyInWishlist) {
      wishlist.items = wishlist.items.filter(
        (item) => item.toString() !== productId
      );
      await wishlist.save();
      return res.status(200).json({ message: 'Removed from wishlist' });
    } else {
      wishlist.items.push(productId);
      await wishlist.save();
      return res.status(200).json({ message: 'Added to wishlist' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getWishlist = async (req, res) => {
    const guestToken = req.cookies.guest_token;
  
    if (!guestToken) {
      return res.status(400).json({ message: 'No guest session found' });
    }
  
    try {
      const wishlist = await Wishlist.findOne({ guestToken }).populate("items.product");
  
      if (!wishlist) {
        return res.status(200).json({ wishlist: [] });
      }
  
      return res.status(200).json({ wishlist: wishlist.items });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };

module.exports = { toggleWishlist, getWishlist };
