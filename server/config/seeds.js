const db = require("./connection");
const { User, Items, list } = require("../models");

db.once("open", async () => {
  await list.deleteMany();

  const options = await list.insertmany([
    { name: "sculpturces" },
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
      description:
        "",
      image: "",
      list: options[0]._id,
      price: 2.99,
      quantity: 500,
    },
    {
      name: "mini scuplture",
      description:
        "",
      image: "",
      list: options[0]._id,
      price: 1.99,
      quantity: 500,
    },
    {
      name: "Molds",
      list: options[1]._id,
      description:
        "",
      image: "",
      price: 7.99,
      quantity: 20,
    },
    {
      name: "Clay",
      list: options[1]._id,
      description:
        "",
      image: "",
      price: 3.99,
      quantity: 50,
    },
    {
      name: "paint supplies ",
      list: options[1]._id,
      description:
        "",
      image: "",
      price: 14.99,
      quantity: 100,
    },
  ]);

  console.log('Items seeds');

  await User.deleteMany();

  await User.create({
    email: "brooksb@mail.com",
    password: "brooks",
    orders: [
        {
            Items: [items[0]._id, items[0]._id, items[1]._id]
        }
    ]
  });
  await User.create({
    email: "jasmineJ@mainModule.com",
    password: "jasmine",
  });
  console.log("user seeds");

  process.exit();
});
