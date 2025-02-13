import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#232323] text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="font-bold text-lg mb-3">ABOUT</h2>
          <p className="text-gray-400">
            Share store details, promotions, or brand content with your customers.
          </p>
        </div>

        {/* Shop Section */}
        <div>
          <h2 className="font-bold text-lg mb-3">SHOP</h2>
          <ul className="text-gray-400 space-y-2">
            {[
              "All",
              "Artisanal Sculptures",
              "Bestseller",
              "Botanicals",
              "Candlestands",
              "Furniture",
              "Handmade Art",
              "Home Furnishing",
              "Lighting & Chandeliers",
              "Mirrors",
              "Table Decor",
            ].map((item, index) => (
              <li
                key={index}
                className="relative hover:text-white transition-all duration-300 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gray-400 w-1/2 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h2 className="font-bold text-lg mb-3">INFORMATION</h2>
          <ul className="text-gray-400 space-y-2">
            {["Privacy Policy", "Terms And Condition", "Shipping Policy", "Return And Refund"].map(
              (item, index) => (
                <li
                  key={index}
                  className="relative hover:text-white transition-all duration-300 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] w-1/2 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter Signup Section */}
        <div>
          <h2 className="font-bold text-lg mb-3">NEWSLETTER SIGN UP</h2>
          <p className="text-gray-400 mb-3">
            Sign up for exclusive updates, new arrivals & insider-only discounts
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 text-black border bg-[#232323] border-gray-400"
            />
            <button className="bg-white text-black px-4 py-2 font-semibold">SUBMIT</button>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-transparent hover:border-white transition-all duration-300 bg-black">
              <TiSocialFacebook className="text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-transparent hover:border-white transition-all duration-300 bg-black">
              <AiFillInstagram className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-600 mt-10 pt-5 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">Nook & Places. All Rights Reserved.</p>

        {/* Payment Methods */}
        {/* <div className="flex space-x-2">
          <img src="visa.png" alt="Visa" className="h-6" />
          <img src="mastercard.png" alt="MasterCard" className="h-6" />
          <img src="amex.png" alt="Amex" className="h-6" />
          <img src="applepay.png" alt="Apple Pay" className="h-6" />
          <img src="discover.png" alt="Discover" className="h-6" />
          <img src="paypal.png" alt="PayPal" className="h-6" />
          <img src="shop.png" alt="Shop" className="h-6" />
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
