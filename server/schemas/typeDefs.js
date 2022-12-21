// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql` 
type Category {
    _id: ID
    name: String
}
{
    type product {
        _id: ID
        name: String
        illstration: String
        potrait: String
        quantity: Int
        cost: Float
        category: Category
    }
    type order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [order]
    }
    
}`;

// export the typeDefs
module.exports = typeDefs;