import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddressContext } from "../Context/AddressProvider";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Address = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setAddress } = useContext(AddressContext);
  const navigate = useNavigate();
  const location = useLocation();
  const deleted = () => {
    fetch(`/addresses/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetch("/addresses")
          .then((res1) => res1.json())
          .then((res1) => {
            setAddress([...res1]);
          });
      });
  };
  return (
    <tr>
      <td>{item.FlatNo}</td>
      <td>{item.Street}</td>
      <td>{item.Landmark}</td>
      <td>{item.Locality}</td>
      <td>{item.City}</td>
      <td>{item.State}</td>
      <td>{item.Pincode}</td>
      <button onClick={() => navigate(`${location.pathname}/${item.id}`)}>
        Edit
      </button>
      {/* <button onClick={() => deleted()}>Delete</button> */}
      <Button onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <button
              onClick={() => {
                deleted();
                setOpen(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setOpen(false)}>Cancel</button>
          </Typography>
        </Box>
      </Modal>
    </tr>
  );
};
