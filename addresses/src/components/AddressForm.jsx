import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AddressContext } from "../Context/AddressProvider";

export const AddressForm = () => {
  const { address, setAddress } = useContext(AddressContext);
  const location = useLocation();
  const navigate = useNavigate();
  let [curAdd, setCurAdd] = useState("");
  useEffect(() => {
    let arr = location.pathname.split("/");
    console.log(arr);
    address.map((res) => {
      if (res.id == arr[arr.length - 1]) {
        setCurAdd({ ...res });
      }
    });
  }, [location.pathname]);
  const change = (e) => {
    setCurAdd({ ...curAdd, [e.currentTarget.name]: e.currentTarget.value });
  };
  const click = () => {
    if (curAdd.Pincode >= 100000 && curAdd.Pincode <= 999999) {
      fetch(`/addresses/${curAdd.id}`, {
        method: "PATCH",
        body: JSON.stringify(curAdd),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((res) =>
          fetch("/addresses")
            .then((res1) => res1.json())
            .then((res1) => {
              setAddress([...res1]);
            })
        );
      alert("Changed");
      navigate("/addresses");
    }
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
      <button onClick={() => click()}>Change</button>
    </div>
  );
};
