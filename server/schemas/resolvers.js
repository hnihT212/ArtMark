const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { product, user, order, category } = require("../models");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
    Query: {
        categories: async () => {
            return await category.find();
        },
        products: async (parent, {Category, name}) => {
            const params = {};
            if (Category) {
                params.Category = Category;
            }
            if (name) {
                params.name = {
                    $regex: name
                };
            }
            return await product.find(params).populate('Category');
        },
        Product: async (parent, {_id}) => {
            return await product.findById(_id).populate('Category');
        },
        User: async (parent, args, context) => {
            if (context.User)  {
                const User = await user.findById(context.User._id).populate({
                    path: 'Orders.Products',
                    populate: 'Category'
                });

                User.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return User;
            }

            throw new AuthenticationError('log in please');
        },
        Order: async (parent, {_id}, context) => {
            if(context.User) {
                const User = await user.findById(context.User._id).populate({
                    path: 'Orders.Products',
                    populate: 'Category'
                });
                return User.Orders.id(_id);
            }
            throw new AuthenticationError('please logg in ');
        },

        
    }
}
  


module.exports = resolvers;
