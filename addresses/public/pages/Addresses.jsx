import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Address } from "../components/Address";
import { AddressContext } from "../Context/AddressProvider";

export const Addresses = () => {
  const { address } = useContext(AddressContext);
  console.log("add", address);
  return (
    <div>
      <button>
        <Link to="/addresses/create">New</Link>
      </button>
      <table>
        <tr>
          <td>FlatNo</td>
          <td>Street</td>
          <td>Landmark</td>
          <td>Locality</td>
          <td>City</td>
          <td>State</td>
          <td>Pincode</td>
        </tr>
        {address.map((item) => (
          <Address item={item} />
        ))}
      </table>
    </div>
  );
};
