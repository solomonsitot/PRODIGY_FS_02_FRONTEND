import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import axios from "axios";

function SPurchasement() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    async function fetchPurchases() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/purchase/get-my-purchases`,
          { withCredentials: true }
        );
        setPurchases(result.data);
        console.log("Fetched purchases:", result.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }
    fetchPurchases();
  }, [BACKEND_URL]);

  return (
    <div>
      <Nav
        href0="/shop owner"
        link1="Add Product"
        href1="/shop owner/add-product"
        link2="Purchases"
        href2="/shop owner/see-purchasement"
      />
      <div className="min-h-screen mt-20 bg-gray-100 p-10">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">Purchase History</h1>
        
        {purchases.length === 0 ? (
          <p className="text-2xl text-center font-light text-gray-500">No purchases found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="bg-white rounded-lg p-8 shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  {purchase.product.product_name}
                </h2>
                
                <div className="text-lg mb-3">
                  <span className="font-medium text-gray-500">Customer:</span>{" "}
                  <span className="text-gray-800">{purchase.customer.full_name}</span>
                </div>

                <div className="text-lg mb-3">
                  <span className="font-medium text-gray-500">Quantity:</span>{" "}
                  <span className="text-gray-800">{purchase.quantity}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-medium text-gray-500 mr-2">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      purchase.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SPurchasement;
