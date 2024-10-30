import React, { useEffect, useState } from "react";
import useRedirectLogoutUsers from "../../hooks/redirectLogoutUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import menu from "../../assets/menu.png";
import shopImage from "../../assets/hotel.png";
import locationIcon from "../../assets/location.png";
import contact from "../../assets/Contact.png";
import searchIcon from "../../assets/search.png";
import commentIcon from "../../assets/comment.png";
import starIcon from "../../assets/star.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import Cridential from "../Auth/Cridential";
function TShops() {
  useRedirectLogoutUsers("/login");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(BACKEND_URL)
  const [shops, setShops] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${BACKEND_URL}/user/search-shop/${key}`, {
          withCredentials: true
        });
        setShops(result.data);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [key]);
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav href0="/tourist" link5="Shops" href5="/tourist/see-shops" />
      <div className="w-full mt-20 text-center my-8">
        <h1 className="text-center text-4xl font-semibold">All Shops</h1>
        <div className="flex h-14 justify-center mt-7">
          <div className="relative w-2/3">
            <input
              className="w-full h-full p-4 border-solid border-2 border-gray-300 rounded-full focus:outline-none pl-12"
              type="text"
              placeholder="Search for shops..."
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <img
              className="absolute left-4 top-3 p-2 w-8 h-8"
              src={searchIcon}
              alt="Search"
            />
          </div>
        </div>
      </div>
      <div className="py-10 px-5 lg:px-20">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden mb-10"
          >
            <div className="lg:flex">
              <img
                className="w-full lg:w-1/3 object-cover h-64"
                src={shop.profile_image || shopImage}
                alt="shop"
              />
              <div className="p-5 lg:w-2/3">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {shop.company_name}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <img className="h-5 mr-2" src={locationIcon} alt="Location" />
                  <p>{shop.address}</p>
                </div>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <button
                  onClick={() => navigate(`detail/${shop._id}`)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  visit shop &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TShops;
