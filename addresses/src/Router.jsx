import React from "react";
import { Routes, Route } from "react-router-dom";
import { AddressForm } from "./components/AddressForm";
import { Addresses } from "./pages/Addresses";
import { NewAddress } from "./pages/NewAddress";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/addresses" element={<Addresses />}></Route>
        <Route path="/addresses/:id" element={<AddressForm />}></Route>
        <Route path="/addresses/create" element={<NewAddress />}></Route>
      </Routes>
    </div>
  );
};
