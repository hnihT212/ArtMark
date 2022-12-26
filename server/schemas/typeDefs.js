// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql` 
    type Category {
        _id: ID
        name: String
    }
    type Product {
        _id: ID
        name: String
        illstration: String
        potrait: String
        quantity: Int
        cost: Float
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        products: [Product]
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
   
    }
    type Mutation {
        plusUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        plusOrder(products: [ID]!): Order
        modifyUser(firstName: String, lastName: String, email: String!, password: String): User
        modifyProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
    }

`;


// // export the typeDefs
module.exports = typeDefs;
