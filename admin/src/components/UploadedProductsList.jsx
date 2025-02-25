import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UploadedProductsList = () => {
  const [products, setProducts] = useState([]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getproducts');
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  const BASE_URL = 'http://localhost:5000/';

  return (
    <div className=" p-4 m-0 rounded-md text-white">
     
      <h2 className="text-2xl text-black mb-4">Uploaded Products : </h2>

      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-md shadow-md text-black">
              {/* Show only the first image (index 0) */}
              {product.images.length > 0 && (
                <img
                  src={`${BASE_URL}${product.images[0]}`}
                  alt="Product"
                  className="w-32 h-32 object-cover mb-2 border rounded"
                />
              )}
              <h3 className="text-lg font-bold">{product.productName}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedProductsList;
