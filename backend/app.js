const { contacts } = require("./data/data.js");
const express = require("express");
const app = express();

app.use(express.static("../frontend"));
app.use(express.json());

//==

app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

app.post("/contacts", (req, res) => {
  if (req.body.name !== "")
    contacts.push({
      name: req.body.name,
      number: req.body.number,
    });
});

app.delete("/contacts/:delName", (req, res) => {
  let { delName } = req.params;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === delName) {
      contacts.splice(i, 1);
    }
  }
  res.status(201).end();
});

//app.patch("/contacts/:id", (req, res) => {});

//==

app.listen(5000, () => {
  console.log("\n----> PORT 5000 LIVE \n");
});
