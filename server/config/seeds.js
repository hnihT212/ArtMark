const db = require("./connection");
const { User, Items, list } = require("../model");
const { mainModule } = require("process");

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
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "cookie-tin.jpg",
      list: options[0]._id,
      price: 2.99,
      quantity: 500,
    },
    {
      name: "mini scuplture",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      image: "canned-coffee.jpg",
      list: options[0]._id,
      price: 1.99,
      quantity: 500,
    },
    {
      name: "Molds",
      list: options[1]._id,
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      image: "toilet-paper.jpg",
      price: 7.99,
      quantity: 20,
    },
    {
      name: "Clay",
      list: options[1]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image: "soap.jpg",
      price: 3.99,
      quantity: 50,
    },
    {
      name: "paint supplies ",
      list: options[1]._id,
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      image: "wooden-spoons.jpg",
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
