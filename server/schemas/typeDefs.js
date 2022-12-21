// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql` 
type Category {
    _id: ID
    name: String
}
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

    type checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: user
    }

    type Query {
        categories: [Category]
        products(category: ID, name: String): [product]
        product(_id: ID!): product
        user: user
        order:(_id: ID!): order
        checkout(products: [ID]!): checkout
    }
    type Mutation {
        plusUser(firstName: String!, lastName: String!, email: String!, password: String!) Auth
        plusOrder(products: [ID]!): order
        modifyUser(firstName: String, lastName: String, emial: String!, password: String): user
        modifyProduct(_id: ID!, quantity: Int!): product
        login(email: String!, password: String!): Auth
    }
    

}
`;
module.exports = typeDefs;

// export the typeDefs
module.exports = typeDefs;