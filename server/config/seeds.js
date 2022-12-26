const db = require("./connection");
const { User, category, product } = require("../models");

db.once("open", async () => {
  await category.deleteMany();

  const categories = await category.insertmany([
    { name: "sculptures" },
    { name: "paintings" },
    { name: "clay" },
    { name: "supplies" },
    { name: "molds" }

  ]);

  console.log("options seeds");

  await product.deleteMany();
  const Products = await product.insertmany([
    {
      name: "Large Paint brush",
      illustration:
        "",
      potrait: "",
      category: categories[0]._id,
      cost: 2.99,
      quantity: 500,
    },
    {
      name: "mini scuplture",
      illstration:"",
      potrait: "",
      category: categories[0]._id,
      cost: 1.99,
      quantity: 500,
    },
    {
      name: "Molds",
      category: categories[1]._id,
      illstration:
        "",
      potrait: "",
      cost: 7.99,
      quantity: 20,
    },
    {
      name: "Clay",
      category: categories[1]._id,
      illstration:
        "",
      potrait: "",
      cost: 3.99,
      quantity: 50,
    },
    {
      name: "paint supplies ",
      category: categories[1]._id,
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
            products: [Products[0]._id, Products[0]._id, Products[1]._id]
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
