import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Cridential from "../pages/Auth/Cridential";
import THome from "../pages/Tourist/THome";
import ThankYou from "../components/ThankYou";
import SProduct from "../pages/Shop/SProduct";
import SProductEdit from "../pages/Shop/SProductEdit";
import SPurchasement from "../pages/Shop/SPurchasement";
import SHome from "../pages/Shop/SHome";
import TShopPurchasement from "../pages/Tourist/TShopPurchasement";
import TShopDetail from "../pages/Tourist/TShopDetail";
import TShops from "../pages/Tourist/TShops";
import TActivities from "../pages/Tourist/TActivities";

function Layout() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/cridentials/:role?/:id?" element={<Cridential />} />
      <Route path="/thanks" element={<ThankYou />} />
      <Route path="/tourist">
        <Route path="" element={<THome />} />
        <Route path="see-shops" element={<TShops />} />
        <Route path="see-shops/detail/:id?" element={<TShopDetail />} />
        <Route path="see-shops/detail/:id?/buy/:pid?" element={<TShopPurchasement />} />
        <Route
          path="my-activities"
          element={<TActivities/>}
        />
  
      </Route>

      <Route path="/shop owner/*" element={<ShopOwnerLayout />} />
    </Routes>
  );
}

function ShopOwnerLayout() {
  return (
    <Routes>
      <Route path="/" element={<SHome />} />
      <Route path="add-product" element={<SProduct />} />
      <Route path="edit-product/:id?" element={<SProductEdit />} />
      <Route path="see-purchasement" element={<SPurchasement />} />
    </Routes>
  );
}

export default Layout;
