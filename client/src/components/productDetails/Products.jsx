import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import { fetchWishlist } from "../../store/wishlistSlice";
import ProductImages from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ActionButtons from "./ActioButtos";
import QuantitySelector from "./QuantitySelecter";

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const BASE_URL = "https://nooksandplacesbackend.onrender.com";

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getproduct/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");

        const data = await response.json();
        setProduct(data);
        if (data.images.length > 0) {
          setSelectedImage(`${BASE_URL}/${data.images[0].replace(/^\/+/, "")}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = async () => {
    const productId = product._id;
  
    try {
      const response = await fetch(`http://localhost:5000/api/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }), // quantity from state
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Product added to cart:", data.cart);
        dispatch(fetchCart());
      } else {
        alert(data.message);
        console.error("Error adding to cart:", data.message);
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };
  

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(fetchWishlist());
        console.log("Wishlist updated:", data.message);
        setIsLiked(!isLiked);
      } else {
        console.error("Error adding to wishlist:", data.message);
      }
    } catch (error) {
      console.error("Wishlist request failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <ProductImages
          selectedImage={selectedImage}
          images={product.images}
          setSelectedImage={setSelectedImage}
          BASE_URL={BASE_URL}
          productName={product.productName}
        />

        <div className="md:w-1/2 mt-6">
          <ProductDetails product={product} />
          <QuantitySelector
            quantity={quantity}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
          />
          <p className="mt-4 text-lg font-semibold">
            Subtotal: Rs. {product.sellingPrice}
          </p>
          <ActionButtons
            handleAddToCart={handleAddToCart}
            handleAddToWishlist={handleAddToWishlist}
            isLiked={isLiked}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
