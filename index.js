let express = require("express");
var address = require("./db.json");
const fs = require("fs");

let app = express();
let PORT = 8000;
const middleware = (req, res, next) => {
  if (
    parseInt(req.body.Pincode) >= 100000 &&
    parseInt(req.body.Pincode) <= 999999
  ) {
    next();
  } else {
    res.status(400);
    res.send("Pincode should be 6 digit");
  }
};
app.use(express.json());
app.get("/addresses", (req, res) => {
  res.json(address);
});
app.post("/addresses/create", middleware, (req, res) => {
  address.push(req.body);
  fs.writeFileSync("db.json", JSON.stringify(address));
  res.json(req.body);
});
app.patch("/addresses/:id", middleware, (req, res) => {
  const { id } = req.params;
  console.log(id);
  address.map((el) => {
    if (id == el.id) {
      el.FlatNo = req.body.FlatNo;
      el.City = req.body.City;
      el.Landmark = req.body.Landmark;
      el.Locality = req.body.Locality;
      el.Pincode = req.body.Pincode;
      el.State = req.body.State;
      el.Street = req.body.Street;
    }
  });
  fs.writeFileSync("db.json", JSON.stringify(address));
  res.json(req.body);
});
app.delete("/addresses/:id", (req, res) => {
  const { id } = req.params;
  address = address.filter((el) => id != el.id);
  fs.writeFileSync("db.json", JSON.stringify(address));
  res.json(req.body);
});
app.listen(8000, () => console.log("server started"));
