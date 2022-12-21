// const { AuthenticationError } = require("apollo-server-express");
// const { signToken } = require("../utils/auth");
// const { product, user, order, category } = require("../models");
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    helloWorld: () => {
      return "hello World";
    },
  },
};

module.exports = resolvers;
