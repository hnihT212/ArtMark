const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { product, user, order, category } = require("../models");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    categories: async () => {
      return await category.find();
    },
    products: async (parent, { Category, name }) => {
      const params = {};
      if (Category) {
        params.Category = Category;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await product.find(params).populate("Category");
    },
    Product: async (parent, { _id }) => {
      return await product.findById(_id).populate("Category");
    },
    User: async (parent, args, context) => {
      if (context.User) {
        const User = await user.findById(context.User._id).populate({
          path: "Orders.Products",
          populate: "Category",
        });

        User.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return User;
      }

      throw new AuthenticationError("log in please");
    },
    Order: async (parent, { _id }, context) => {
      if (context.User) {
        const User = await user.findById(context.User._id).populate({
          path: "Orders.Products",
          populate: "Category",
        });
        return User.Orders.id(_id);
      }
      throw new AuthenticationError("please log in ");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const Order = new order({ products: args.products });
      const line_items = [];

      const { products } = await Order.populate("Products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          illustration: products[i].illustration,
          potrait: [`${url}/potrait/${products[i].potrait}`],
        });

        const cost = await stripe.costs.create({
          product: product.id,
          unit_amount: products[i].cost * 100,
          curreny: "usd",
        });

        line_items.push({
          cost: cost.id,
          quantity: 1,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { session: session.id };
    },
  },
  Mutation: {
    plusUser: async (parent, args) => {
      const User = await User.create(args);
      const token = signToken(User);

      return { token, User };
    },
    plusOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.User) {
        const Order = new order({ products });
        await user.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return Order;
      }
      throw new AuthenticationError("please log in ");
    },

    modifyUser: async (parent, args, context) => {
        if (context.User) {
            return await user.findByIdAndUpdate(context.user._id, args, {new: true});
        }
        throw new AuthenticationError('please log in');
    },
    modifyProduct: async (parent, args, context) => {
        if (context.User) {
            return await user.findByIdAndUpdate(context.User._id, args,{ new: true})
            }
             throw new AuthenticationError('invaild try again');
        },
        login: async (parent, { email, password}) => {
            const user = await user.findOne({email});
        if (!user) {
            throw new AuthenticationError('invaild try again');
        
        }

      const correctPass = await user.isCorrectPassword(password);

      if (!correctPass) {
        throw new AuthenticationError('incorrect login')
      }
      
      const token = signToken(User);
      return { token, user};
    },
  },
};



module.exports = resolvers;
