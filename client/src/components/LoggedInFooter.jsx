import React from "react";
import { Link } from "react-router-dom";

const LoggedInFooter = () => {
    return (
        <footer className="bg-gray-100 py-6 text-center">
            <div className="flex justify-center gap-6 text-gray-700 text-sm">
                <Link to="/refund-policy" className="hover:text-blue-600">Refund Policy</Link>
                <Link to="/shipping-policy" className="hover:text-blue-600">Shipping Policy</Link>
                <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link>
            </div>
        </footer>
    );
};

export default LoggedInFooter;
