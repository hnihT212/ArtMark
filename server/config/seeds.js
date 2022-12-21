const db = require("./connection");
const { User, Items, list, product } = require("../models");

db.once("open", async () => {
  await list.deleteMany();

  const options = await list.insertmany([
    { name: "sculptures" },
    { name: "paintings" },
    { name: "clay" },
    { name: "supplies" },
    { name: "molds" },
  ]);

  console.log("options seeds");

  await Items.deleteMany();
  const items = await Items.insertmany([
    {
      name: "Large Paint brush",
      illustration:
        "",
      potrait: "",
      list: options[0]._id,
      price: 2.99,
      quantity: 500,
    },
    {
      name: "mini scuplture",
      description:
        "",
      potrait: "",
      list: options[0]._id,
      price: 1.99,
      quantity: 500,
    },
    {
      name: "Molds",
      list: options[1]._id,
      description:
        "",
      potrait: "",
      cost: 7.99,
      quantity: 20,
    },
    {
      name: "Clay",
      list: options[1]._id,
      description:
        "",
      potrait: "",
      cost: 3.99,
      quantity: 50,
    },
    {
      name: "paint supplies ",
      list: options[1]._id,
      illustration:
        "",
      potrait: "",
      cost: 14.99,
      quantity: 100,
    },
  ]);

  console.log('Items seeds');

  await User.deleteMany();

  await User.create({
    firstName: "Brooklyn",
    lastName: "Barber",
    email: "brooksb@mail.com",
    password: "password123",
    orders: [
        {
            product: [product[0]._id, product[0]._id, product[1]._id]
        }
    ]
  });
  await User.create({
    firstName: "Rick",
    lastName: "Floss",
    email: "rickfJ@mail.com",
    password: "password123",
  });
  console.log("user seeds");

  process.exit();
});
