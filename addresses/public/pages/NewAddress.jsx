import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../Context/AddressProvider";
import { v4 as uuid } from "uuid";

export const NewAddress = () => {
  const { address, setAddress } = useContext(AddressContext);
  const [curAdd, setCurAdd] = useState({ id: uuid() });
  const navigate = useNavigate();
  const change = (e) => {
    setCurAdd({ ...curAdd, [e.currentTarget.name]: e.currentTarget.value });
  };
  const click = () => {
    fetch("/addresses/create", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(curAdd),
    });
    if (curAdd.Pincode >= 100000 && curAdd.Pincode <= 999999) {
      alert("Added");
      setAddress([...address, curAdd]);
    }
    navigate("/addresses");
  };
  return (
    <div>
      <div>
        <input
          value={curAdd.FlatNo}
          onChange={(e) => change(e)}
          name="FlatNo"
          placeholder="Add Flat No. / Floor No."
          required
        />
      </div>
      <div>
        <input
          value={curAdd.Street}
          onChange={(e) => change(e)}
          name="Street"
          placeholder="Add Street"
          required
        />
      </div>
      <div>
        <input
          value={curAdd.Landmark}
          onChange={(e) => change(e)}
          name="Landmark"
          placeholder="Add Landmark"
        />
      </div>
      <div>
        <input
          value={curAdd.Locality}
          onChange={(e) => change(e)}
          name="Locality"
          placeholder="Add Locality"
          required
        />
      </div>
      <div>
        <input
          value={curAdd.City}
          onChange={(e) => change(e)}
          name="City"
          placeholder="Add City"
          required
        />
      </div>
      <div>
        <input
          value={curAdd.State}
          onChange={(e) => change(e)}
          name="State"
          placeholder="Add state"
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={curAdd.Pincode}
          onChange={(e) => change(e)}
          name="Pincode"
          placeholder="Add Pincode"
          required
        />
      </div>
      <button onClick={() => click()}>AddNew</button>
    </div>
  );
};
