import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("http://localhost:5000/api/getCategories") // Update API URL as per your backend
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 7 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <div className="bg-white z-10 py-10">
      <div className="">
        {/* Show Slider if More than 10 Categories */}
        {categories.length > 10 ? (
          <div className="block lg:hidden">
            <Slider {...settings} className="flex justify-center items-center">
              {categories.map((category) => (
                <div key={category._id} className="flex flex-col items-center">
                  <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-gray-300">
                    <img
                      src={`http://localhost:5000${category.banner}`} // Backend image path
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-gray-800 font-medium text-center text-sm">
                    {category.title}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          // Show Grid if Categories are 10 or Less
          <div className="hidden lg:flex justify-center gap-6 flex-wrap">
            {categories.map((category) => (
              <div key={category._id} className="flex flex-col items-center">
                <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={`http://localhost:5000${category.banner}`}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-gray-800 font-medium text-center text-sm">
                  {category.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
